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
        <>
            {/* Backdrop Overlay */}
            {isExpanded && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ease-out"
                    onClick={() => setIsExpanded(false)}
                />
            )}
            
            <div className={`transition-all duration-500 ease-out ${
                isExpanded 
                    ? 'fixed inset-[10%] z-50 transform scale-100 opacity-100' 
                    : 'w-full max-w-5xl mx-auto flex flex-col items-center px-4 sm:px-6 transform scale-100 opacity-100'
            }`}>
                {/* Main Heading - Hide when expanded */}
                {!isExpanded && (
                    <div className="text-center mb-8 sm:mb-12 transition-all duration-300 ease-out">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 mb-6 sm:mb-8 leading-tight px-2 font-light tracking-tight">
                            Answers at your
                            <br />
                            fingertips
                        </h1>
                    </div>
                )}

                {/* Chat History - Modal when expanded */}
                {isExpanded && chatHistory.length > 0 && (
                    <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-500 ease-out">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <h3 className="text-lg font-semibold text-slate-800">Conversation</h3>
                                <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                    {chatHistory.length} {chatHistory.length === 1 ? 'message' : 'messages'}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-slate-500 hover:text-slate-700 text-sm px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200 hover:shadow-sm"
                                >
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Minimize
                                </button>
                                <button
                                    onClick={clearChat}
                                    className="text-slate-500 hover:text-red-600 text-sm px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 transition-all duration-200 hover:shadow-sm"
                                >
                                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent bg-gradient-to-b from-gray-50 to-white">
                        <div className="p-1">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-6 px-5`}>
                                    <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                                        {/* Message Header */}
                                        <div className={`flex items-center gap-3 mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`flex items-center gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    msg.role === 'user' 
                                                        ? 'bg-slate-900 text-white' 
                                                        : 'bg-blue-600 text-white'
                                                }`}>
                                                    {msg.role === 'user' ? (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">
                                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div className={`${msg.role === 'user' ? 'bg-slate-900' : 'bg-slate-50'} rounded-2xl px-6 py-4 ${
                                            msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                                        }`}>
                                            {/* Show thinking section if available */}
                                            {msg.thinking && (
                                                <details className="mb-4">
                                                    <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-700 flex items-center gap-2 py-2 px-3 bg-white rounded-lg border border-slate-200 transition-colors duration-200">
                                                        <svg className="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                        <span className="font-medium">View reasoning</span>
                                                    </summary>
                                                    <div className="mt-3 p-4 bg-white rounded-lg border border-slate-200 text-xs leading-relaxed text-slate-600 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                                                        {msg.thinking}
                                                    </div>
                                                </details>
                                            )}
                                            
                                            <div className={`text-sm leading-relaxed ${
                                                msg.role === 'user' ? 'text-white' : 'text-slate-800'
                                            }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Loading Message */}
                            {isLoading && (
                                <div className="flex justify-start mb-6 px-5">
                                    <div className="max-w-[75%]">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">AI Assistant</span>
                                                <span className="text-xs text-slate-400">typing...</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-2xl rounded-bl-md px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                                </div>
                                                <span className="text-sm text-slate-600">Thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                        {/* Input Area for Full Page Mode */}
                        <div className="border-t border-slate-200 bg-gradient-to-r from-white to-slate-50 p-6">
                            <form onSubmit={handleChatSubmit} className="relative max-w-4xl mx-auto">
                                <div className="relative bg-white border border-slate-200 rounded-2xl shadow-lg focus-within:border-slate-400 focus-within:shadow-xl transition-all duration-300 hover:shadow-lg">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Continue the conversation..."
                                        className="w-full px-6 py-4 text-base rounded-2xl bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none resize-none min-h-[3.5rem] max-h-32 overflow-y-auto leading-relaxed pr-16"
                                        disabled={isLoading}
                                        rows={1}
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                                        }}
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
                                        className="absolute right-3 bottom-3 w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group hover:shadow-lg"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <svg 
                                                className="w-5 h-5 transition-transform group-hover:translate-x-0.5" 
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
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Chat Input - Initial State */}
                {!isExpanded && (
                    <div className="w-full max-w-3xl transition-all duration-300 ease-out">
                        <form onSubmit={handleChatSubmit} className="relative">
                            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-slate-300 focus-within:shadow-md transition-all duration-200">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ask about AI solutions, automation, hosting, or business transformation..."
                                    className="w-full px-6 py-4 text-base rounded-2xl bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none resize-none min-h-[3.5rem] max-h-32 overflow-y-auto leading-relaxed pr-16"
                                    disabled={isLoading}
                                    rows={1}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                                    }}
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
                                    className="absolute right-3 bottom-3 w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <svg 
                                            className="w-5 h-5 transition-transform group-hover:translate-x-0.5" 
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
                            </div>
                            
                            {/* Input Helper */}
                            <div className="flex items-center justify-between mt-3 px-2">
                                <p className="text-xs text-slate-500">Press Enter to send, Shift+Enter for new line</p>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span>Powered by</span>
                                    <span className="font-semibold text-slate-600">Qwen 2.5 Turbo</span>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatBox; 