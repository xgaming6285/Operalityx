import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  together: {
    apiKey: string;
  };
  cors: {
    frontendUrl: string;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  together: {
    apiKey: process.env.TOGETHER_API_KEY || '',
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};

// Validate required environment variables
if (!config.together.apiKey) {
  throw new Error('TOGETHER_API_KEY environment variable is required');
}

export default config; 