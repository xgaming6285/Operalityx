import { Together } from 'together-ai';
import config from '../config/config';

export interface TogetherMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: TogetherMessage[];
}

export interface ChatResponse {
  response: string;
  error?: string;
}

class TogetherService {
  private client: Together;

  constructor() {
    this.client = new Together({
      apiKey: config.together.apiKey,
    });
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const messages: TogetherMessage[] = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant for Operalytx, a business automation platform. You help users understand how AI can transform their business operations, automate processes, and drive growth. Be professional, knowledgeable, and focus on practical business solutions.'
        },
        ...(request.conversationHistory || []),
        {
          role: 'user',
          content: request.message
        }
      ];

      const response = await this.client.chat.completions.create({
        model: "Qwen/Qwen3-235B-A22B-fp8-tput",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      });

      if (response.choices && response.choices.length > 0) {
        const content = response.choices[0].message?.content;
        if (content) {
          return {
            response: content
          };
        }
      }
      
      return {
        response: 'I apologize, but I was unable to generate a response. Please try again.',
        error: 'No response from AI model'
      };

    } catch (error: any) {
      console.error('Together AI API Error:', error);
      
      if (error.status === 401) {
        return {
          response: 'I apologize, but there seems to be an authentication issue. Please contact support.',
          error: 'Authentication failed'
        };
      } else if (error.status === 429) {
        return {
          response: 'I\'m currently experiencing high demand. Please try again in a moment.',
          error: 'Rate limit exceeded'
        };
      } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return {
          response: 'The request timed out. Please try again.',
          error: 'Request timeout'
        };
      } else {
        return {
          response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.',
          error: error.message || 'Unknown error'
        };
      }
    }
  }
}

export default new TogetherService(); 