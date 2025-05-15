
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ToolInfo {
  toolName: string;
  toolReasoning: string;
  toolResult: any;
}

interface MessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp?: string;
    thinking?: boolean;
    isError?: boolean;
    toolInfo?: ToolInfo;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [showToolDetails, setShowToolDetails] = useState(false);

  // Format timestamp
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // Render thinking state
  if (message.thinking) {
    return (
      <div className="message-bubble assistant-message w-24">
        <div className="thinking">
          <div className="thinking-dot"></div>
          <div className="thinking-dot"></div>
          <div className="thinking-dot"></div>
        </div>
      </div>
    );
  }

  // Render normal message
  return (
    <div className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'assistant-message'} animate-fade-in`}>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
        <span className="font-medium">
          {message.sender === 'user' ? 'You' : 'Assistant'}
        </span>
        {message.timestamp && (
          <span>{formatTime(message.timestamp)}</span>
        )}
      </div>
      
      <div className={`${message.isError ? 'text-mcp-error' : ''}`}>
        {message.text}
      </div>
      
      {/* Show tool details if available */}
      {message.toolInfo && (
        <Collapsible className="mt-3">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 bg-muted/20 border-muted/30"
            >
              <Wrench className="h-3 w-3" />
              <span>Tool: {message.toolInfo.toolName}</span>
              {showToolDetails ? 
                <ChevronUp className="h-3 w-3" /> : 
                <ChevronDown className="h-3 w-3" />
              }
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-2 space-y-2 text-sm bg-black/20 rounded-md p-3">
            <div>
              <h4 className="text-xs font-medium text-mcp-teal mb-1">Reasoning:</h4>
              <p className="text-mcp-gray">{message.toolInfo.toolReasoning}</p>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-mcp-teal mb-1">Result:</h4>
              <pre className="text-xs bg-black/30 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(message.toolInfo.toolResult, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default Message;
