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
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                                <div className={`max-w-[90%] sm:max-w-[85%] px-5 sm:px-6 py-4 sm:py-5 rounded-3xl transition-all duration-300 hover:shadow-xl ${
                                    msg.role === 'user' 
                                        ? 'bg-gray-900 text-white rounded-br-lg transform hover:scale-[1.02] shadow-lg shadow-gray-900/25 border border-gray-800' 
                                        : 'bg-white text-gray-900 border-2 border-gray-100 rounded-bl-lg transform hover:scale-[1.01] shadow-lg shadow-gray-200/50 hover:border-gray-200'
                                }`}>
                                    <div className={`text-xs sm:text-sm font-bold mb-3 flex items-center gap-3 tracking-wide uppercase ${
                                        msg.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                        {msg.role === 'user' ? (
                                            <>
                                                <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                    </svg>
                                                </div>
                                                <span className="font-mono">You</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                                                    </svg>
                                                </div>
                                                <span className="font-mono">AI Assistant</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* Show thinking section if available */}
                                    {msg.thinking && (
                                        <details className="mb-4 group/details">
                                            <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 transition-all hover:bg-gray-100 hover:shadow-md">
                                                <svg className="w-4 h-4 transition-transform group-open/details:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span className="font-semibold tracking-wide">VIEW AI REASONING</span>
                                                <div className="ml-auto flex space-x-1">
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                                </div>
                                            </summary>
                                            <div className="mt-4 p-4 sm:p-5 bg-gray-50 rounded-2xl border-2 border-gray-100 text-xs leading-relaxed text-gray-700 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto shadow-inner">
                                                {msg.thinking}
                                            </div>
                                        </details>
                                    )}
                                    
                                    <div className={`leading-relaxed text-sm sm:text-base font-medium ${
                                        msg.role === 'user' ? 'text-white/95' : 'text-gray-800'
                                    }`}>
                                        {msg.content}
                                    </div>
                                    
                                    {/* Timestamp */}
                                    <div className={`text-xs mt-4 font-mono tracking-wider ${
                                        msg.role === 'user' ? 'text-gray-400' : 'text-gray-400'
                                    }`}>
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 px-5 sm:px-7 py-5 sm:py-6 rounded-3xl border-2 border-gray-200 shadow-xl rounded-bl-lg relative overflow-hidden max-w-[90%] sm:max-w-[85%] transform hover:scale-[1.01] transition-all duration-300">
                                    {/* Animated background shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent animate-pulse"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-7 sm:w-8 h-7 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <span className="text-sm sm:text-base font-bold text-gray-700 tracking-wide uppercase font-mono">AI Assistant</span>
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
                                                <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                                                <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="text-base sm:text-lg text-gray-800 font-semibold">Analyzing your request...</div>
                                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                                <div className="flex space-x-2">
                                                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-700 rounded-full animate-bounce"></div>
                                                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-700 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                </div>
                                                <span className="hidden sm:inline font-bold tracking-wide font-mono">POWERED BY QWEN 235B</span>
                                                <span className="sm:hidden font-bold tracking-wide font-mono">QWEN 235B</span>
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
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What can AI do for my business?, I want to host my own AI? I want to automate my company..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-full bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent shadow-sm transition-all duration-200 pr-14 sm:pr-16 resize-none min-h-[3.5rem] sm:min-h-[4rem] max-h-24 sm:max-h-28 overflow-y-auto font-['Montserrat',sans-serif] font-thin"
                        disabled={isLoading}
                        rows={2}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleChatSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !message.trim()}
                        className="absolute right-1.5 sm:right-2 top-3 sm:top-4 w-10 sm:w-12 h-8 sm:h-10 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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