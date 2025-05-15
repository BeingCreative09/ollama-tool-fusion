
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Code, History } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

interface HistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

interface SidebarProps {
  tools: Tool[];
  history: HistoryItem[];
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ tools, history, isLoading }) => {
  // Truncate long text
  const truncateText = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-border h-[calc(100vh-4rem)] overflow-hidden flex flex-col bg-sidebar">
      <Tabs defaultValue="tools" className="w-full h-full flex flex-col">
        <div className="border-b border-border p-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Tools</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tools" className="flex-1 overflow-auto p-2 space-y-2">
          <h3 className="text-sm font-medium p-2">Available Tools</h3>
          
          {isLoading ? (
            <Card className="p-4">
              <div className="animate-pulse flex flex-col space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </Card>
          ) : tools.length === 0 ? (
            <Card className="p-4 text-center text-muted-foreground">
              No tools available
            </Card>
          ) : (
            <div className="space-y-2">
              {tools.map((tool, index) => (
                <Collapsible key={index} className="bg-card rounded-lg overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <div className="p-3 flex items-center justify-between hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="tool-badge">{index + 1}</div>
                        <h4 className="font-medium text-sm">{tool.name}</h4>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Separator />
                    <div className="p-3 space-y-2 text-sm bg-muted/10">
                      <p className="text-mcp-gray">{tool.description}</p>
                      <div>
                        <h5 className="text-xs font-medium text-mcp-teal mb-1">Parameters:</h5>
                        <pre className="text-xs bg-black/30 p-2 rounded overflow-x-auto">
                          {JSON.stringify(tool.parameters, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="flex-1 overflow-auto p-2 space-y-2">
          <h3 className="text-sm font-medium p-2">Conversation History</h3>
          
          {history.length === 0 ? (
            <Card className="p-4 text-center text-muted-foreground">
              No conversation history yet
            </Card>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <Card key={item.id} className="p-2 space-y-1 text-sm hover:bg-muted/10">
                  <div className="font-medium">Q: {truncateText(item.query)}</div>
                  <div className="text-mcp-gray">A: {truncateText(item.response)}</div>
                  <div className="text-xs text-muted-foreground text-right mt-1">
                    {formatTime(item.timestamp)}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
