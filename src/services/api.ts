
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { toast } from "@/components/ui/use-toast";

// Base API URL - in a real app, configure this based on environment
const baseURL = 'http://localhost:3000/api';

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with an error status
      const { status } = error.response;
      
      if (status === 401) {
        toast({
          title: "Authentication error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
      } else if (status === 403) {
        toast({
          title: "Access denied",
          description: "You don't have permission to perform this action.",
          variant: "destructive",
        });
      } else if (status === 404) {
        toast({
          title: "Not found",
          description: "The requested resource was not found.",
          variant: "destructive",
        });
      } else if (status >= 500) {
        toast({
          title: "Server error",
          description: "Something went wrong on our servers. Please try again later.",
          variant: "destructive",
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast({
        title: "Network error",
        description: "Unable to connect to the server. Please check your internet connection.",
        variant: "destructive",
      });
    } else {
      // Something happened in setting up the request
      toast({
        title: "Request error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    
    return Promise.reject(error);
  }
);

// API service
export default {
  // MCP endpoints
  mcp: {
    initialize: (): Promise<AxiosResponse> => api.post('/mcp/init'),
    getTools: (): Promise<AxiosResponse> => api.get('/mcp/tools'),
    executeTool: (toolName: string, parameters: any): Promise<AxiosResponse> => 
      api.post('/mcp/execute', { toolName, parameters }),
    status: (): Promise<AxiosResponse> => api.get('/mcp/status')
  },

  // LLM endpoints
  llm: {
    query: (query: string): Promise<AxiosResponse> => 
      api.post('/llm/query', { query }),
    test: (): Promise<AxiosResponse> => api.get('/llm/test')
  }
};
