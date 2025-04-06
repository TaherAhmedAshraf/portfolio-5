"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface SmartInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSuggestionClick: (suggestion: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
}

export function SmartInput({
  name,
  value,
  onChange,
  onSuggestionClick,
  placeholder,
  label,
  required = false,
  className,
  type = "text",
  isTextarea = false,
  rows = 4,
}: SmartInputProps) {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear suggestion when input changes
  useEffect(() => {
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    // Only generate suggestions if enough text has been entered and the field is in focus
    if (isFocused && value.trim()) {
      if ((value.length > 3 && name === "subject") || 
          (value.length > 10 && name === "message")) {
        setIsLoading(true);
        // Simulating API call delay
        suggestionTimeoutRef.current = setTimeout(() => {
          generateSuggestion(value);
        }, name === "subject" ? 600 : 1000);
      } else {
        setSuggestion("");
        setIsLoading(false);
      }
    } else {
      setSuggestion("");
      setIsLoading(false);
    }

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [value, name, isFocused]);

  const generateSuggestion = async (inputValue: string) => {
    if (inputValue.trim().length === 0) {
      setSuggestion("");
      setIsLoading(false);
      return;
    }

    try {
      // Special handling for email field to preserve the email format
      const isEmailField = name === 'email';
      
      // Check if input might contain an email already
      const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      const containsEmail = emailPattern.test(inputValue);
      
      // Skip suggestion if it's an email field and already contains a valid email
      if (isEmailField && containsEmail) {
        setSuggestion("");
        setIsLoading(false);
        return;
      }
      
      // Call OpenAI to generate a suggestion based on the input
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Please complete this ${name} for a contact form in a natural, professional way. Current text: "${inputValue}"`,
          history: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion");
      }

      const data = await response.json();
      const aiSuggestion = data.reply || "";
      
      // Extract only the completion part, not the entire AI response
      let completionSuggestion = "";
      if (aiSuggestion.includes(inputValue)) {
        completionSuggestion = aiSuggestion.substring(aiSuggestion.indexOf(inputValue) + inputValue.length);
      } else {
        // Fallback if we can't find the exact input in the response
        const words = aiSuggestion.split(" ");
        const suggestedWords = words.slice(Math.max(0, words.length - 5)).join(" ");
        completionSuggestion = suggestedWords;
      }
      
      // For email fields, ensure the suggestion includes @ if not already present
      if (isEmailField && !containsEmail && !completionSuggestion.includes('@')) {
        // If input doesn't end with @ but suggestion doesn't have it, try to add a domain
        if (!inputValue.endsWith('@')) {
          if (inputValue.includes('@')) {
            // Already has @ but no domain - try to complete domain only
            setSuggestion(completionSuggestion.trim());
          } else {
            // No @ yet - suggest a full email domain
            setSuggestion("@gmail.com");
          }
        } else {
          // Input ends with @, suggest domain only
          setSuggestion("gmail.com");
        }
      } else if (completionSuggestion.trim()) {
        setSuggestion(completionSuggestion.trim());
      } else {
        setSuggestion("");
      }
    } catch (error) {
      console.error("Error getting suggestion:", error);
      setSuggestion("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Tab or right arrow to accept suggestion
    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
      e.preventDefault();
      onSuggestionClick(value + suggestion);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Small delay to allow for tab to work
    setTimeout(() => {
      setIsFocused(false);
      // Clear suggestion when input loses focus
      setSuggestion("");
    }, 100);
  };

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-1 block">
          {label}
        </label>
      )}
      
      <div className="relative">
        {isTextarea ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={cn("resize-none bg-background/50", className)}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            className={cn("bg-background/50", className)}
          />
        )}

        {/* Suggestion tooltip - now positioned below for textareas and to the right for inputs */}
        {isFocused && suggestion && (
          <div className={cn(
            "absolute z-10 rounded-md border border-primary/20 bg-background shadow-md",
            isTextarea 
              ? "left-4 right-4 -bottom-14 mt-2" 
              : "right-3 top-[calc(100%+8px)] w-auto min-w-[200px]"
          )}>
            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">Suggestion:</span>
                <span className="text-xs text-muted-foreground">Press Tab to accept</span>
              </div>
              <div className="text-sm font-normal">
                {value}<span className="text-primary font-medium">{suggestion}</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && isFocused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-background/80 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse"></span>
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse animation-delay-200"></span>
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse animation-delay-400"></span>
          </div>
        )}
      </div>
      
      {/* Helper text */}
      <div className="mt-1 text-xs text-muted-foreground h-4">
        {isFocused && suggestion && "Press Tab to accept suggestion"}
      </div>
    </div>
  );
} 