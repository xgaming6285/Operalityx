import { Router, Request, Response } from 'express';
import togetherService from '../services/togetherService';
import { ChatRequest, TogetherMessage } from '../services/togetherService';

const router = Router();

interface ChatRequestBody {
  message: string;
  conversationHistory?: TogetherMessage[];
}

// POST /api/chat
router.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    // Validate request
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Validate conversation history if provided
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return res.status(400).json({
        error: 'Conversation history must be an array'
      });
    }

    // Prepare request for Together AI service
    const chatRequest: ChatRequest = {
      message: message.trim(),
      conversationHistory: conversationHistory || []
    };

    // Send message to Together AI API
    const result = await togetherService.sendMessage(chatRequest);

    // Return response
    if (result.error) {
      return res.status(500).json({
        response: result.response,
        error: result.error
      });
    }

    return res.status(200).json({
      response: result.response
    });

  } catch (error: any) {
    console.error('Chat route error:', error);
    return res.status(500).json({
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later.',
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Operalytx Chat API'
  });
});

export default router; 