import { useState } from 'react';
import { X, ArrowUp } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
}

interface TogetherMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ScrollChatModalProps {
  isVisible: boolean;
  onClose: () => void;
  onActiveChange?: (isActive: boolean) => void;
}

const ScrollChatModal = ({ isVisible, onClose, onActiveChange }: ScrollChatModalProps) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const [response, setResponse] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = message.trim();
        setIsLoading(true);
        setShowResponse(true);

        try {
            const apiResponse = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userMessage,
                    conversationHistory: []
                }),
            });
            
            const data = await apiResponse.json();
            
            if (apiResponse.ok) {
                const parsed = parseResponse(data.response);
                setResponse(parsed.content);
            } else {
                const errorMessage = data.error === 'Authentication failed' 
                    ? 'Authentication issue with AI service. Please contact support.'
                    : data.error === 'Rate limit exceeded'
                    ? 'AI service is busy. Please try again in a moment.'
                    : data.response || 'Sorry, I encountered an error. Please try again.';
                
                setResponse(errorMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setResponse('Sorry, I\'m having trouble connecting to the server. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetChat = () => {
        setMessage('');
        setResponse('');
        setShowResponse(false);
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
        onActiveChange?.(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
        // Only set inactive if not showing response and not loading
        if (!showResponse && !isLoading) {
            onActiveChange?.(false);
        }
    };

    const handleResponseClose = () => {
        setShowResponse(false);
        // Set inactive when closing response if input is not focused
        if (!isInputFocused) {
            onActiveChange?.(false);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop overlay */}
            {showResponse && (
                <div 
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={handleResponseClose}
                />
            )}

            {/* Bottom Chat Bubble */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                <div className="relative">
                    
                    {/* Response Card (appears above input when there's a response) */}
                    {showResponse && (
                        <div className="mb-3 bg-white rounded-xl shadow-xl border border-gray-200 p-4 animate-in slide-in-from-bottom-4 duration-300">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-medium text-gray-800 text-sm">Operalytix Response</h3>
                                <button
                                    onClick={handleResponseClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {isLoading ? (
                                <div className="flex items-center gap-2 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <span className="text-gray-600 text-sm">Operalytix is thinking...</span>
                                </div>
                            ) : (
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                                    {response}
                                </div>
                            )}
                            
                            {!isLoading && response && (
                                <button
                                    onClick={resetChat}
                                    className="mt-3 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Ask another question
                                </button>
                            )}
                        </div>
                    )}

                    {/* Main input bubble */}
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="bg-white rounded-full shadow-xl border border-gray-200 px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:shadow-2xl focus-within:shadow-2xl focus-within:border-blue-300">
                            
                            {/* Input */}
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Ask Operalytix"
                                className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-sm"
                                disabled={isLoading}
                                autoFocus
                            />
                            
                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="w-8 h-8 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed group flex-shrink-0"
                            >
                                {isLoading ? (
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <ArrowUp className="w-3 h-3 group-hover:translate-y-[-1px] transition-transform" />
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Suggestion text */}
                    <p className="text-center text-xs text-gray-500 mt-2">
                        Ask me about Operalytix solutions, automation, or business transformation
                    </p>
                </div>
            </div>
        </>
    );
};

export default ScrollChatModal; 