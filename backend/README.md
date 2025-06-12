# Operalytx Backend API

A Node.js TypeScript backend that integrates with Together AI to power the Operalytx chat interface.

## Features

- 🤖 **Together AI Integration** - Powered by Meta Llama 3.1 8B Instruct Turbo
- 🔒 **Secure API** - Environment-based configuration with API key protection
- 🌐 **CORS Support** - Configured for frontend integration
- 🛡️ **Security Headers** - Helmet.js for enhanced security
- 📝 **TypeScript** - Full type safety and better developer experience
- 🚀 **Express.js** - Fast and minimal web framework

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Together AI API Key

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` and add your Together AI API key:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Together AI Configuration
TOGETHER_API_KEY=your_actual_together_api_key_here

# CORS Configuration (frontend URL)
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

## API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
- **Body**: `{ "message": "Your question here" }`
- **Response**: `{ "response": "AI response here" }`

### Health Check
- **GET** `/api/health`
- **Response**: `{ "status": "OK", "timestamp": "...", "service": "Operalytx Chat API" }`

### Root
- **GET** `/`
- **Response**: API information and available endpoints

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── config.ts          # Environment configuration
│   ├── routes/
│   │   └── chatRoutes.ts      # Chat API routes
│   ├── services/
│   │   └── togetherService.ts # Together AI integration
│   └── server.ts              # Main server file
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove compiled files

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3001` | Server port |
| `NODE_ENV` | No | `development` | Environment mode |
| `TOGETHER_API_KEY` | **Yes** | - | Your Together AI API key |
| `FRONTEND_URL` | No | `http://localhost:3000` | Frontend URL for CORS |

## Together AI Integration

This backend integrates with Together AI's chat completion API using Meta Llama 3.1 8B Instruct Turbo. The service:

- Uses the official Together AI TypeScript library
- Sends messages with proper formatting
- Includes a system prompt for Operalytx-specific responses
- Handles errors gracefully with user-friendly messages
- Supports conversation context (ready for future enhancement)

## Error Handling

The API includes comprehensive error handling:

- **400**: Bad request (invalid message format)
- **401**: Authentication issues with Together AI API
- **429**: Rate limiting from Together AI API
- **500**: Server errors with appropriate user messages

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Configured for specific frontend origin
- **Input Validation**: Message content validation
- **API Key Protection**: Environment-based configuration
- **Request Timeout**: Automatic timeout handling

## Getting Your Together AI API Key

1. Visit [Together AI](https://api.together.xyz/)
2. Sign up or log in to your account
3. You'll get $1 free credit to start
4. Navigate to API keys section
5. Create a new API key
6. Copy the key to your `.env` file

### Setup Command
```bash
export TOGETHER_API_KEY=xxxxx
```

## Model Information

The backend uses **Meta Llama 3.1 8B Instruct Turbo** which provides:
- Fast response times
- High-quality conversational AI
- Business-focused responses
- Cost-effective usage

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install`
2. **API key errors**: Check your `.env` file and Together AI API key
3. **Port already in use**: Change the `PORT` in `.env`
4. **CORS errors**: Verify `FRONTEND_URL` matches your frontend

### Development Tips

- Use `npm run dev` for hot reload during development
- Check the console for detailed error messages
- Test the API with tools like Postman or curl
- Monitor the `/api/health` endpoint for service status

## License

Private - Operalytx Project 