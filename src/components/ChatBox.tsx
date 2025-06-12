import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface TogetherMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>([]);

    const convertToTogetherFormat = (messages: Message[]): TogetherMessage[] => {
        return messages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }));
    };

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = message.trim();
        setMessage('');
        setIsLoading(true);
        
        // Add user message to chat history
        const newUserMessage = { role: 'user' as const, content: userMessage };
        setChatHistory(prev => [...prev, newUserMessage]);

        try {
            // Prepare conversation history for the backend
            const conversationHistory = convertToTogetherFormat(chatHistory);
            
            const response = await fetch('/api/chat', {
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
                // Add AI response to chat history
                setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
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
    };

    return (
        <div className="w-full max-w-2xl mt-8">
            {/* Chat History */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 h-64 overflow-y-auto relative">
                {chatHistory.length === 0 ? (
                    <div className="text-white/60 text-center py-8">
                        Start a conversation with our AI assistant!
                        <br />
                        <span className="text-sm text-white/40">Powered by Together AI & Qwen 235B</span>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={clearChat}
                            className="absolute top-2 right-2 text-white/60 hover:text-white/80 text-sm"
                        >
                            Clear
                        </button>
                        <div className="space-y-3">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
                                        msg.role === 'user' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-white/20 text-white'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/20 text-white px-3 py-2 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about business automation, AI solutions..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default ChatBox; 