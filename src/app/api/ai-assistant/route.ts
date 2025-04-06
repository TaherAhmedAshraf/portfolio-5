import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
// Note: In production, use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Patterns to detect user information
const EMAIL_PATTERN = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
const PHONE_PATTERN = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

// Project-related keywords to identify potential projects
const PROJECT_KEYWORDS = [
  'project', 'app', 'website', 'application', 'development', 'build', 
  'create', 'design', 'develop', 'software', 'mobile', 'web', 'system',
  'platform', 'portal', 'e-commerce', 'startup', 'idea', 'business', 
  'plan', 'concept', 'proposal', 'service', 'product', 'solution'
];

// Store information for each user session
// In production, this should use a database or Redis
const sessionStore = new Map();

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], sessionId = 'default', isFormSubmission = false, forceJsonResponse = false } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // For JSON responses, we need a different approach
    if (forceJsonResponse) {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful AI assistant that always responds with valid, parseable JSON. Never include explanations, markdown formatting, or any text outside the JSON structure.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000, // Higher token limit for complex JSON
        response_format: { type: "json_object" } // Enforce JSON response format
      });

      const reply = response.choices[0].message.content;
      return NextResponse.json({ reply });
    }
    
    // Regular conversation flow (non-JSON responses)
    let session = sessionStore.get(sessionId);
    if (!session) {
      session = {
        notificationSent: false,
        projectType: null,
        contactInfo: null
      };
      sessionStore.set(sessionId, session);
    }

    // Extract information from the current message
    const userInfo = extractUserInfo(message, history);
    const projectInfo = extractProjectInfo(message, history);

    // Update session with any new information
    if (userInfo?.email) {
      session.contactInfo = userInfo.email;
      console.log(`Updated session with email: ${userInfo.email}`);
    }
    if (userInfo?.phone && !session.contactInfo) {
      session.contactInfo = userInfo.phone;
      console.log(`Updated session with phone: ${userInfo.phone}`);
    }
    if (projectInfo?.projectType) {
      session.projectType = projectInfo.projectType;
      console.log(`Updated session with project type: ${projectInfo.projectType}`);
    }

    // Force a notification for form submissions
    if (isFormSubmission) {
      try {
        const formInfo = {
          ...(userInfo || {}),
          ...(projectInfo || {}),
          formSubmission: true
        };
        
        await sendToDiscord(message, formInfo, 'form');
        session.notificationSent = true;
        console.log('Sent form submission to Discord');
      } catch (error) {
        console.error('Error sending form submission to Discord:', error);
      }
    }

    // Check if we have an email but haven't sent a notification yet
    const hasEmail = Boolean(userInfo?.email);
    const hasContact = Boolean(session.contactInfo);
    const hasProjectType = Boolean(session.projectType);
    const isProjectRelated = checkForProjectDiscussion(message, history);
    
    // Always send a notification if we detect a new email and haven't sent one yet
    if (hasEmail && !session.notificationSent) {
      try {
        console.log('Sending email notification to Discord');
        await sendToDiscord(message, {
          ...(userInfo || {}),
          projectType: session.projectType || "Not specified"
        }, 'chat');
        
        // Mark notification as sent
        session.notificationSent = true;
        console.log('Email notification sent successfully');
      } catch (error) {
        console.error('Error sending email notification to Discord:', error);
      }
    }
    // Also send if we have both project type and contact but haven't sent
    else if (isProjectRelated && hasProjectType && hasContact && !session.notificationSent) {
      try {
        console.log('Sending project inquiry to Discord');
        await sendToDiscord(message, {
          projectType: session.projectType,
          email: session.contactInfo,
          ...(userInfo || {})
        }, 'chat');
        
        // Mark notification as sent
        session.notificationSent = true;
        console.log('Project inquiry sent successfully');
      } catch (error) {
        console.error('Error sending project inquiry to Discord:', error);
      }
    }
    
    // Base system message - extremely simplified
    let systemMessage = `You are a brief, helpful AI assistant on Taher Ahmed's portfolio website. Keep ALL responses under 20 words. Be friendly but extremely concise.`;
    
    // For form submissions, always thank the user and let them know Taher will contact them
    if (isFormSubmission) {
      systemMessage = `The user has submitted their contact information. Thank them and tell them Taher will reach out soon. Keep it under 20 words.`;
    }
    // Otherwise, add guidance based on conversation state
    else if (isProjectRelated && !hasProjectType) {
      systemMessage += ` Simply ask what type of project they're interested in.`;
    } else if (isProjectRelated && hasProjectType && !hasContact) {
      systemMessage += ` Ask for their email to connect them with Taher.`;
    } else if (hasEmail || (isProjectRelated && hasProjectType && hasContact)) {
      // If we have their email or both project type and contact
      systemMessage += ` Thank them briefly. Tell them Taher will email them soon: hello@taherahmed.dev`;
    }
    
    // Prepare conversation for OpenAI
    const messages = [
      { role: 'system', content: systemMessage },
      ...history.slice(-5), // Only use the last 5 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI API with a timeout
    const response = await Promise.race([
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 100, // Limit token usage
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('OpenAI API timeout')), 10000)
      )
    ]) as OpenAI.Chat.Completions.ChatCompletion;

    // If response is a timeout error
    if (response instanceof Error) {
      throw response;
    }

    const reply = response.choices[0].message.content;
    return NextResponse.json({ reply, sessionState: session });
    
  } catch (error) {
    console.error('Error:', error);
    // Provide a simple fallback response if there's an error
    const fallbackReply = "I'm having trouble right now. Please try again or email Taher directly at hello@taherahmed.dev.";
    return NextResponse.json({ reply: fallbackReply }, { status: 500 });
  }
}

/**
 * Helper function to send data to Discord
 */
async function sendToDiscord(message: string, info: any, messageType: 'chat' | 'form' = 'chat') {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log('No Discord webhook URL configured');
      return;
    }
    
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    console.log(`Sending to Discord webhook: ${messageType} with info: ${JSON.stringify(info)}`);
    
    const response = await fetch(`${baseUrl}/api/discord-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        userInfo: info,
        messageType
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Discord webhook response not OK: ${response.status}`);
    }
    
    const responseText = await response.text();
    console.log(`Message sent to Discord successfully (type: ${messageType}). Response: ${responseText}`);
  } catch (error) {
    console.error('Error sending to Discord:', error);
    throw error; // Re-throw to handle in calling context
  }
}

/**
 * Extract potential user information from a message and conversation history
 */
function extractUserInfo(currentMessage: string, conversationHistory: any[]) {
  const userInfo: Record<string, string> = {};
  
  // Check current message for user information
  extractInfoFromMessage(currentMessage, userInfo);
  
  // Check recent conversation history for user information
  if (conversationHistory && conversationHistory.length > 0) {
    // Only check the last 5 messages to avoid old information
    const recentMessages = conversationHistory.slice(-5);
    for (const msg of recentMessages) {
      if (msg.role === 'user') {
        extractInfoFromMessage(msg.content, userInfo);
      }
    }
  }
  
  // Log detected user info for debugging
  if (Object.keys(userInfo).length > 0) {
    console.log('Detected user info:', JSON.stringify(userInfo));
  }
  
  return Object.keys(userInfo).length > 0 ? userInfo : null;
}

/**
 * Check if the conversation is about a project
 */
function checkForProjectDiscussion(currentMessage: string, conversationHistory: any[]): boolean {
  // Check if current message has project keywords
  if (containsProjectKeywords(currentMessage)) {
    return true;
  }
  
  // Check only recent conversation history for project keywords
  if (conversationHistory && conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-3); // Check only last 3 messages
    for (const msg of recentMessages) {
      if (msg.role === 'user' && containsProjectKeywords(msg.content)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check if a message contains project-related keywords
 */
function containsProjectKeywords(message: string): boolean {
  const lowerCaseMessage = message.toLowerCase();
  
  for (const keyword of PROJECT_KEYWORDS) {
    if (lowerCaseMessage.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Extract specific types of user information from a single message
 */
function extractInfoFromMessage(message: string, userInfo: Record<string, string>) {
  // Check for email addresses
  const emailMatch = message.match(EMAIL_PATTERN);
  if (emailMatch && !userInfo.email) {
    userInfo.email = emailMatch[0];
  }
  
  // Check for phone numbers
  const phoneMatch = message.match(PHONE_PATTERN);
  if (phoneMatch && !userInfo.phone) {
    userInfo.phone = phoneMatch[0];
  }
  
  // Check for name patterns (e.g. "My name is [name]" or "I am [name]")
  const namePatterns = [
    /my name is ([\w\s]+)/i,
    /i am ([\w\s]+)/i,
    /i'm ([\w\s]+)/i,
    /this is ([\w\s]+)/i,
    /name[:\s]+([\w\s]+)/i
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = message.match(pattern);
    if (nameMatch && nameMatch[1] && !userInfo.name) {
      // Clean up the name by removing extra words often found in self-introductions
      let name = nameMatch[1].trim();
      // Remove common filler words that might appear after a name
      name = name.replace(/\b(and|I|am|working|looking|for|interested|a|an)\b.*$/i, '').trim();
      userInfo.name = name;
      break;
    }
  }
  
  // Check for company patterns
  const companyPatterns = [
    /from ([^,.]+? company)/i,
    /work(?:ing)? (?:for|at) ([^,.]+)/i,
    /my company (?:is|called) ([^,.]+)/i,
    /(?:at|with) ([^,.]+? company)/i,
    /company[:\s]+([^,.]+)/i
  ];
  
  for (const pattern of companyPatterns) {
    const companyMatch = message.match(pattern);
    if (companyMatch && companyMatch[1] && !userInfo.company) {
      userInfo.company = companyMatch[1].trim();
      break;
    }
  }
  
  return userInfo;
}

/**
 * Extract project information from a message
 */
function extractProjectInfo(currentMessage: string, conversationHistory: any[]) {
  const projectInfo: Record<string, string> = {};

  // Combine current message with recent previous messages
  const recentMessages = conversationHistory.slice(-5).map(msg => msg.content);
  const allMessages = [...recentMessages, currentMessage];
  const fullText = allMessages.join(" ");

  // Enhanced patterns for project type detection
  const projectTypePatterns = [
    { regex: /\b(?:website|web app|web application|site|homepage|landing page|portfolio site|e-commerce site|blog)\b/i, type: "Website" },
    { regex: /\b(?:mobile app|ios app|android app|flutter app|react native|app development)\b/i, type: "Mobile App" },
    { regex: /\b(?:desktop app|desktop application|windows app|mac app|electron)\b/i, type: "Desktop App" },
    { regex: /\b(?:ai|artificial intelligence|machine learning|ml model|chatbot|virtual assistant|llm)\b/i, type: "AI Solution" },
    { regex: /\b(?:e-commerce|online store|shop|selling online|product catalog|payment gateway)\b/i, type: "E-commerce" },
    { regex: /\b(?:crm|customer relationship|cms|content management|erp|business management)\b/i, type: "Business System" }
  ];

  // Check for project type - simplified to just get the main category
  for (const pattern of projectTypePatterns) {
    if (pattern.regex.test(fullText) && !projectInfo.projectType) {
      projectInfo.projectType = pattern.type;
      break;
    }
  }

  // If no specific project type was found but project keywords exist, use a generic type
  if (!projectInfo.projectType && containsProjectKeywords(fullText)) {
    projectInfo.projectType = "Custom Project";
  }

  return Object.keys(projectInfo).length > 0 ? projectInfo : null;
} 