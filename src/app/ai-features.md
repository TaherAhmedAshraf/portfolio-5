# AI Features in Taher's Portfolio

This document outlines the AI features implemented in the portfolio website and how to configure them.

## Overview of AI Features

1. **AI Assistant Chatbot**
   - A floating chat interface accessible from any page
   - Answers questions about services, skills, and experience
   - Provides helpful information to site visitors
   - Uses OpenAI's GPT model for natural conversations
   - **Collects and relays user contact information to Discord** (when provided)
   - **Proactively asks for contact details when users discuss projects**

2. **Smart Input Assistant**
   - AI-powered form input suggestions
   - Available in the contact form
   - Offers intelligent completions as you type
   - Press Tab to accept suggestions

3. **AI Project Generator**
   - Helps generate creative project ideas based on user input
   - Available on the Portfolio page
   - Provides detailed project specifications including:
     - Title and description
     - Technology suggestions
     - Difficulty level
     - Estimated time to complete
     - Key features

4. **Discord Integration**
   - Automatically relays user contact information to a Discord channel
   - Works with both the contact form and AI Assistant
   - Formats messages with rich embeds for easy reading
   - Contact details and conversation context are preserved
   - **Detailed project inquiries are sent with special formatting**
   - **Identifies and extracts project requirements automatically**

## Configuration

To enable these AI features, you need to configure your OpenAI API key and Discord webhook:

1. Rename `.env.local.example` to `.env.local` if it doesn't exist yet
2. Add your OpenAI API key to the `.env.local` file:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```
3. Add your Discord webhook URL:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token
   ```
4. Restart the development server

### How to Create a Discord Webhook

1. Open Discord and go to the server where you want to receive notifications
2. Create or select a channel for the notifications
3. In channel settings, go to "Integrations" > "Webhooks"
4. Click "New Webhook", give it a name and assign it to your chosen channel
5. Click "Copy Webhook URL" and paste it in your `.env.local` file

## Implementation Details

### API Endpoints

The AI features use these API endpoints:
- `/api/ai-assistant` - Handles chat conversations with context tracking, input suggestions, and project idea generation
- `/api/discord-webhook` - Relays user information to Discord

### Components

- `AIAssistant`: The floating chat interface component
- `SmartInput`: Enhanced form input fields with AI suggestions
- `AIProjectGenerator`: The project idea generator component

## Customization

You can customize the AI behavior by modifying:

1. The system prompt in `src/app/api/ai-assistant/route.ts` to change how the AI responds
2. The suggestion generation logic in `src/components/smart-input.tsx`
3. The project idea generation prompt in `src/components/ai-project-generator.tsx`
4. The message format for Discord in `src/app/api/discord-webhook/route.ts`
5. The project keywords list for detecting project discussions

## User Information Collection

The AI assistant can detect and collect the following types of user information:
- Email addresses
- Phone numbers
- Names (when users introduce themselves)
- Company names
- Project details

## Project Information Collection

When visitors discuss projects, the AI assistant will:
1. Automatically detect when a conversation is project-related
2. Proactively ask for contact information if it hasn't been provided
3. Extract specific project details, including:
   - Project type (website, mobile app, etc.)
   - Budget information (when mentioned)
   - Timeline requirements
   - General project description
4. Format this information into a specialized project inquiry in Discord
5. Maintain a natural conversation while gathering the necessary information

All collected information is securely sent to your Discord channel for follow-up.

## Technical Considerations

- API calls are limited by your OpenAI rate limits and costs
- The AI Assistant loads only when needed to conserve resources
- Input suggestions are throttled to minimize API calls
- All AI features gracefully handle errors and timeouts
- User information is only sent when explicitly provided by the user
- The AI will only ask for contact information once to avoid being pushy 