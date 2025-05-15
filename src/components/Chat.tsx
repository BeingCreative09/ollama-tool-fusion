
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Trash2 } from "lucide-react";
import Message from './Message';

interface ChatProps {
  messages: Array<{
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp?: string;
    thinking?: boolean;
    isError?: boolean;
    toolInfo?: any;
  }>;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isConnected: boolean;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, onClearChat, isConnected }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !isConnected) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h2 className="font-medium">Chat</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearChat} 
          disabled={messages.length === 0}
          className="text-muted-foreground flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="bg-mcp/10 rounded-full p-4 mb-4">
              <svg className="h-8 w-8 text-mcp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Model Context Protocol</h3>
            <p className="text-muted-foreground max-w-sm">
              Start a conversation with the AI. It will automatically use external tools when needed to provide better answers.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Message message={message} />
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isConnected ? "Send a message..." : "Connecting to MCP server..."}
            disabled={!isConnected}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || !isConnected}
            className="bg-mcp hover:bg-mcp/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
