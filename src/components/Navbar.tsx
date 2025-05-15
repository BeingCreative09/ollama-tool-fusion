
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface NavbarProps {
  isConnected: boolean;
  onRetryConnection?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isConnected, onRetryConnection }) => {
  return (
    <header className="border-b border-border sticky top-0 bg-card z-10">
      <div className="mcp-container">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="font-bold text-xl md:text-2xl text-mcp">
              MCP Integration
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className={`status-indicator ${isConnected ? 'status-connected' : 'status-disconnected'}`}></div>
              <span className="text-sm font-medium">
                {isConnected ? 'Connected to MCP' : 'Disconnected'}
              </span>
            </div>
            
            {!isConnected && onRetryConnection && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetryConnection} 
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
