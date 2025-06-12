import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
}

interface TogetherMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const convertToTogetherFormat = (messages: Message[]): TogetherMessage[] => {
        return messages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }));
    };

    const parseResponse = (response: string): { content: string; thinking?: string } => {
        const thinkingMatch = response.match(/<think>(.*?)<\/think>/s);
        if (thinkingMatch) {
            const thinking = thinkingMatch[1].trim();
            const content = response.replace(/<think>.*?<\/think>/s, '').trim();
            return { content, thinking };
        }
        return { content: response };
    };

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = message.trim();
        setMessage('');
        setIsLoading(true);
        setIsExpanded(true); // Expand to show chat history when user sends first message
        
        // Add user message to chat history
        const newUserMessage = { role: 'user' as const, content: userMessage };
        setChatHistory(prev => [...prev, newUserMessage]);

        try {
            // Prepare conversation history for the backend
            const conversationHistory = convertToTogetherFormat(chatHistory);
            
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userMessage,
                    conversationHistory: conversationHistory
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Parse the response to separate thinking from actual content
                const parsed = parseResponse(data.response);
                setChatHistory(prev => [...prev, { 
                    role: 'assistant', 
                    content: parsed.content,
                    thinking: parsed.thinking
                }]);
            } else {
                // Handle specific error responses from backend
                const errorMessage = data.error === 'Authentication failed' 
                    ? 'Authentication issue with AI service. Please contact support.'
                    : data.error === 'Rate limit exceeded'
                    ? 'AI service is busy. Please try again in a moment.'
                    : data.response || 'Sorry, I encountered an error. Please try again.';
                
                setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setChatHistory(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I\'m having trouble connecting to the server. Please check your connection and try again.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
        setIsExpanded(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6">
            {/* Main Heading */}
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black mb-6 sm:mb-8 leading-tight px-2">
                    Answers at your
                    <br />
                    fingertips
                </h1>
            </div>

            {/* Chat History - Only show when expanded */}
            {isExpanded && chatHistory.length > 0 && (
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 max-h-80 sm:max-h-96 overflow-y-auto relative shadow-lg">
                    <button
                        onClick={clearChat}
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-700 text-xs sm:text-sm bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-gray-200 transition-colors shadow-sm hover:shadow-md z-10"
                    >
                        Clear
                    </button>
                    <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-2">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-md' 
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                                }`}>
                                    <div className="text-xs sm:text-sm font-medium mb-1 opacity-70">
                                        {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                    </div>
                                    
                                    {/* Show thinking section if available */}
                                    {msg.thinking && (
                                        <details className="mb-2 sm:mb-3 group">
                                            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 py-1">
                                                <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                View AI reasoning
                                            </summary>
                                            <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg border text-xs text-gray-600 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                                                {msg.thinking}
                                            </div>
                                        </details>
                                    )}
                                    
                                    <div className="leading-relaxed text-sm sm:text-base">
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 px-3 sm:px-5 py-3 sm:py-4 rounded-xl border border-blue-200 shadow-lg rounded-bl-md relative overflow-hidden max-w-[90%] sm:max-w-[85%]">
                                    {/* Animated background shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                <svg className="w-2 sm:w-3 h-2 sm:h-3 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-700">AI Assistant</span>
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <div className="text-xs sm:text-sm text-gray-600 font-medium">Analyzing your request...</div>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <div className="flex space-x-1">
                                                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce"></div>
                                                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                                <span className="hidden sm:inline">Powered by Qwen 235B</span>
                                                <span className="sm:hidden">Qwen 235B</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Chat Input - Main search-like interface */}
            <div className="w-full max-w-2xl">
                <form onSubmit={handleChatSubmit} className="relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What can AI do for my business?, I want to host my own AI? I want to automate my company..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-full bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent shadow-sm transition-all duration-200 pr-14 sm:pr-16"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !message.trim()}
                        className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-8 sm:h-10 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <svg 
                                className="w-4 sm:w-5 h-4 sm:h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                                />
                            </svg>
                        )}
                    </button>
                </form>
                
                {/* Subtle helper text */}
                <div className="text-center mt-4">
                </div>
            </div>
        </div>
    );
};

export default ChatBox; 