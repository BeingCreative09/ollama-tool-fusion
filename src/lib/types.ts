
// Tool related types
export interface ToolParameter {
  type: string;
  description: string;
  required?: boolean;
  enum?: string[];
  default?: any;
}

export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
}

// Message related types
export interface ToolInfo {
  toolName: string;
  toolReasoning: string;
  toolResult: any;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp?: string;
  thinking?: boolean;
  isError?: boolean;
  toolInfo?: ToolInfo;
}

// History related types
export interface HistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

// API response types
export interface MCPInitResponse {
  success: boolean;
  message: string;
  tools: Tool[];
}

export interface MCPToolsResponse {
  success: boolean;
  tools: Tool[];
}

export interface MCPExecuteResponse {
  success: boolean;
  toolName: string;
  result: any;
}

export interface MCPStatusResponse {
  success: boolean;
  connected: boolean;
}

export interface LLMQueryResponse {
  success: boolean;
  toolUsed: boolean;
  toolName?: string;
  toolReasoning?: string;
  toolResult?: any;
  response: string;
}
