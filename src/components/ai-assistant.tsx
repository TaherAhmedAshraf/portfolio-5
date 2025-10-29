"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Taher's AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Detect if a message appears to be a form submission
   */
  const detectFormSubmission = (text: string): boolean => {
    // Check if message contains an email (likely contact info)
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
    
    // If email is the primary content, treat it as a submission
    if (hasEmail && text.trim().length < 100) {
      return true;
    }
    
    // Common patterns that indicate a form submission
    const formPatterns = [
      // Format patterns (fields and values together)
      /name:.*email:.*|email:.*name:.*/i,
      /contact.*(?:details|information|form)/i,
      /(?:submit|send).*(?:form|request|details)/i,
      
      // Content patterns suggesting form completion
      /(?:here are|here's|these are) my (?:details|information)/i,
      /(?:you can|please) (?:reach|contact) me/i,
      /my email(?:\s+is|:)/i,
      /email(?:\s+me|:)/i,
      /(?:my|the) (?:email|address|contact)/i
    ];
    
    // Check if message contains multiple lines (form-like)
    const hasMultipleLines = text.split('\n').length > 1;
    
    // Check for form submission patterns
    for (const pattern of formPatterns) {
      if (pattern.test(text)) {
        return true;
      }
    }
    
    // If it has both email and is formatted like a form, it's likely a submission
    return hasEmail && hasMultipleLines;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);
    
    try {
      // Check if this looks like a form submission
      const isFormSubmission = detectFormSubmission(message);
      console.log('Is form submission?', isFormSubmission);
      
      // Convert messages to the format expected by the API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));
      
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          history,
          sessionId,
          isFormSubmission
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }
      
      const data = await response.json();
      
      // Check if response contains sessionState with notification status
      if (data.sessionState && data.sessionState.notificationSent) {
        console.log('Email notification was sent to Taher!');
      }
      
      const aiResponse: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I couldn't process your request.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 210, 255, 0.4)",
              "0 0 40px rgba(0, 210, 255, 0.6)",
              "0 0 20px rgba(0, 210, 255, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full"
        >
          <Button
            onClick={toggleChat}
            className="rounded-full w-14 h-14 p-0 bg-gradient-to-br from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground shadow-lg"
            aria-label="Open AI Assistant"
          >
            <motion.span 
              className="text-2xl"
              animate={isOpen ? {} : { 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1]
              }}
              transition={isOpen ? {} : { duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              {isOpen ? "✕" : "🤖"}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] z-50 rounded-2xl shadow-2xl overflow-hidden border border-primary/30 bg-card backdrop-blur-xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary to-cyan-500 p-4 text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  🤖
                </motion.span>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <motion.button
                onClick={toggleChat}
                className="text-primary-foreground/80 hover:text-primary-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">✕</span>
              </motion.button>
            </div>

            {/* Chat messages */}
            <div className="h-[calc(100%-10rem)] overflow-y-auto p-4 flex flex-col gap-3 bg-gradient-to-b from-background/50 to-background">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl flex flex-col gap-1 shadow-sm",
                    msg.role === "user"
                      ? "bg-gradient-to-br from-primary to-cyan-500 text-primary-foreground ml-auto rounded-tr-sm"
                      : "bg-card border border-border/40 mr-auto rounded-tl-sm"
                  )}
                >
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                  <div className={cn(
                    "text-xs self-end",
                    msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {formatTime(msg.timestamp)}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[80%] p-3 rounded-2xl flex flex-col gap-1 bg-card border border-border/40 mr-auto rounded-tl-sm"
                >
                  <div className="flex gap-1 items-center">
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={handleSendMessage}
              className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/40 flex gap-2"
            >
              <Textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="resize-none h-12 py-2 min-h-0 rounded-xl border-border/60 focus:border-primary/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="rounded-full aspect-square p-0 w-12 h-12 bg-gradient-to-br from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg shadow-primary/25"
                  disabled={isLoading || !message.trim()}
                >
                  <span className="text-lg">➤</span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 