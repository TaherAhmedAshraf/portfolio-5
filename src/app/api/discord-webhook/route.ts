import { NextRequest, NextResponse } from 'next/server';

/**
 * Sends data to Discord via webhook
 * This endpoint relays user information collected by the AI assistant to a Discord channel
 */
export async function POST(request: NextRequest) {
  try {
    const { content, userInfo, messageType } = await request.json();
    
    if (!content && !userInfo) {
      return NextResponse.json(
        { error: 'Either content or userInfo is required' },
        { status: 400 }
      );
    }
    
    // Get Discord webhook URL from environment variables
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json(
        { 
          error: 'Discord webhook not configured', 
          message: 'The server has not been configured with a Discord webhook URL.'
        },
        { status: 500 }
      );
    }

    // Log the incoming data
    console.log(`Processing webhook request - Type: ${messageType}, UserInfo:`, userInfo);

    // Format the message based on the type
    let formattedMessage = {};
    const timestamp = new Date().toISOString();

    // Extract email for special highlighting
    const email = userInfo?.email || (content?.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)?.[0]);
    
    if (messageType === "contact" || messageType === "form") {
      // Format contact form submissions
      formattedMessage = {
        embeds: [{
          title: messageType === "form" ? "📝 AI Form Submission" : "📝 Contact Form Submission",
          color: 0x00d2ff, // Teal color
          fields: [
            ...(userInfo.name ? [{ name: "Name", value: userInfo.name, inline: true }] : []),
            ...(email ? [{ name: "📧 Email", value: email, inline: true }] : []),
            ...(userInfo.phone ? [{ name: "Phone", value: userInfo.phone, inline: true }] : []),
            ...(userInfo.subject ? [{ name: "Subject", value: userInfo.subject, inline: false }] : []),
            ...(userInfo.projectType ? [{ name: "Project Type", value: userInfo.projectType, inline: true }] : []),
            { name: "Message", value: content || "No message content", inline: false }
          ],
          footer: { text: messageType === "form" ? "AI Assistant Form Submission" : "Portfolio Website Contact Form" },
          timestamp
        }]
      };
    } else if (messageType === "chat") {
      // Check if this is a project-related chat
      const isProjectRelated = userInfo.projectType || userInfo.description;
      
      if (isProjectRelated) {
        // Format project-related chat messages
        formattedMessage = {
          embeds: [{
            title: "🚀 New Project Inquiry",
            description: `A visitor has shared project details through the AI chat.`,
            color: 0x3a7bd5, // Blue color
            fields: [
              // Contact fields
              ...(userInfo.name ? [{ name: "Name", value: userInfo.name, inline: true }] : []),
              ...(email ? [{ name: "📧 Email", value: email, inline: true }] : []),
              ...(userInfo.phone ? [{ name: "Phone", value: userInfo.phone, inline: true }] : []),
              ...(userInfo.company ? [{ name: "Company", value: userInfo.company, inline: true }] : []),
              
              // Project fields
              ...(userInfo.projectType ? [{ name: "Project Type", value: userInfo.projectType, inline: true }] : []),
              ...(userInfo.budget ? [{ name: "Budget", value: userInfo.budget, inline: true }] : []),
              ...(userInfo.timeline ? [{ name: "Timeline", value: userInfo.timeline, inline: true }] : []),
              ...(userInfo.description ? [{ name: "Project Description", value: userInfo.description, inline: false }] : []),
              
              { name: "Latest Message", value: content, inline: false }
            ],
            footer: { text: "AI Assistant - Project Inquiry" },
            timestamp
          }]
        };
      } else {
        // Format regular user information chat messages - emphasize email if present
        formattedMessage = {
          embeds: [{
            title: email ? "📧 New Email Received!" : "💬 AI Assistant Chat - User Info Provided",
            color: email ? 0x00d2ff : 0x3a7bd5, // Teal for email, Blue for others
            description: email 
              ? `A visitor has shared their email address through the AI chat: **${email}**` 
              : `A visitor has shared contact information through the AI chat.`,
            fields: [
              // Include all user info fields that are available
              ...(userInfo.name ? [{ name: "Name", value: userInfo.name, inline: true }] : []),
              ...(email ? [{ name: "📧 Email", value: email, inline: true }] : []),
              ...(userInfo.phone ? [{ name: "Phone", value: userInfo.phone, inline: true }] : []),
              ...(userInfo.company ? [{ name: "Company", value: userInfo.company, inline: true }] : []),
              
              { name: "Latest Message", value: content, inline: false }
            ],
            footer: { text: "AI Assistant Chat" },
            timestamp
          }]
        };
      }
    } else {
      // Generic message format - still check for emails in the content
      formattedMessage = {
        content: email ? `**📧 Email Detected:** ${email}\n\n**Message:**\n${content}` : 
                        `**New Information from Portfolio Website:**\n${content}`,
        embeds: [{
          title: email ? "Email Information" : "User Provided Information",
          color: 0x00d2ff,
          fields: [
            // Include all fields that aren't empty
            ...(userInfo.name ? [{ name: "Name", value: userInfo.name, inline: true }] : []),
            ...(email ? [{ name: "📧 Email", value: email, inline: true }] : []),
            ...(userInfo.phone ? [{ name: "Phone", value: userInfo.phone, inline: true }] : []),
            ...(userInfo.projectType ? [{ name: "Project Type", value: userInfo.projectType, inline: true }] : []),
            ...(userInfo.formSubmission ? [{ name: "Form Submission", value: "Yes", inline: true }] : [])
          ],
          timestamp
        }]
      };
    }

    // Log the formatted message before sending (for debugging)
    console.log('Sending formatted message to Discord:', JSON.stringify(formattedMessage).substring(0, 500) + '...');

    // Send the message to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedMessage),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }

    console.log('Discord webhook message sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discord webhook error:', error);
    return NextResponse.json(
      { error: 'Error sending message to Discord', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 