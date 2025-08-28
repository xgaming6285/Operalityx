import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

const ChatBubble: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m here to help you learn more about Operalytix. What would you like to know?',
      timestamp: new Date()
    }
  ]);

  // Handle chat message send
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(chatMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Simple bot responses
  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost')) {
      return 'Our pricing is tailored to your specific needs. I\'d be happy to connect you with our sales team for a personalized quote. Would you like to schedule a demo?';
    } else if (lowerMessage.includes('demo') || lowerMessage.includes('trial')) {
      return 'Great! We offer personalized demos to show how Operalytix can transform your business. You can schedule one by contacting our sales team.';
    } else if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
      return 'Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, and zero-trust architecture to keep your data safe.';
    } else if (lowerMessage.includes('research') || lowerMessage.includes('ai')) {
      return 'Our research focuses on Multi-Agent Systems, Adaptive Automation, Low-Power Intelligence, and Dynamic Task Alignment. We\'ve published 25+ papers and developed 15+ AI models.';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! Welcome to Operalytix. I\'m here to help you understand how our AI solutions can transform your business. What would you like to know?';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return 'You can reach our team through the contact forms on our website, or I can help answer questions about our AI solutions right here. What can I help you with?';
    } else {
      return 'That\'s a great question! Our AI solutions help businesses automate processes, gain insights, and scale efficiently. Is there a specific area you\'d like to know more about?';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showChat ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 mb-4"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Operalytix Assistant</h4>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowChat(false)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-3 h-3 text-gray-600" />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.type === 'user'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about our AI solutions..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!chatMessage.trim()}
                  className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            className="w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBubble;
