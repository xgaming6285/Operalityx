import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  User,
  FileText,
  Send,
  Bot,
  Shield,
  Zap,
  Users,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SupportFormData {
  name: string;
  email: string;
  company: string;
  category: string;
  priority: string;
  subject: string;
  message: string;
}

interface SupportFormErrors {
  name?: string;
  email?: string;
  category?: string;
  subject?: string;
  message?: string;
}

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const [formData, setFormData] = useState<SupportFormData>({
    name: '',
    email: '',
    company: '',
    category: '',
    priority: 'medium',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<SupportFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const supportStats = [
    { label: "Average Response Time", value: "< 2 hours", icon: Clock },
    { label: "Customer Satisfaction", value: "98%", icon: CheckCircle },
    { label: "Issues Resolved", value: "10K+", icon: Shield },
    { label: "Support Agents", value: "24/7", icon: Users }
  ];

  const supportCategories = [
    { value: 'technical', label: 'Technical Support', icon: Zap },
    { value: 'billing', label: 'Billing & Accounts', icon: FileText },
    { value: 'sales', label: 'Sales Inquiry', icon: Users },
    { value: 'general', label: 'General Question', icon: HelpCircle }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'medium', label: 'Medium - Business impact' },
    { value: 'high', label: 'High - Service disruption' },
    { value: 'urgent', label: 'Urgent - Critical issue' }
  ];

  const validateForm = (): boolean => {
    const newErrors: SupportFormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name as keyof SupportFormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Support form submitted:', formData);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '', email: '', company: '', category: '', 
          priority: 'medium', subject: '', message: ''
        });
        setIsSubmitted(false);
      }, 4000);

    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage.trim();
    setChatMessage('');
    setIsChatLoading(true);
    
    const newUserMessage = { role: 'user' as const, content: userMessage };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const botMessage = { role: 'assistant' as const, content: data.response };
        setChatHistory(prev => [...prev, botMessage]);
      } else {
        const errorMessage = { 
          role: 'assistant' as const, 
          content: 'I apologize, but I\'m having trouble connecting right now. Please try again or use the support form above.' 
        };
        setChatHistory(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        role: 'assistant' as const, 
        content: 'I\'m experiencing connection issues. Please try the support form or contact us directly.' 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.03)_50%,transparent_75%,transparent_100%)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <img 
                src="/images/smaller-logo-hd.png" 
                alt="Operalytix Support" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How can we help you today?
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get expert support for your AI automation needs. Our team is here to help you succeed with personalized assistance and comprehensive solutions.
          </motion.p>

          {/* Support Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {supportStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Support Interface */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-xl p-1 flex">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'form' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                Support Form
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === 'chat' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bot className="w-4 h-4" />
                AI Assistant
              </button>
            </div>
          </div>

          {/* Support Form */}
          {activeTab === 'form' && (
            <motion.div 
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you within 2 hours.</p>
                  <p className="text-sm text-gray-500">Ticket ID: #SP-{Date.now().toString().slice(-6)}</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Submit a Support Request</h2>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Your full name"
                        />
                        {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="your.email@company.com"
                        />
                        {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                          placeholder="Your company name"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            formErrors.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select a category</option>
                          {supportCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                        {formErrors.category && <p className="text-red-600 text-sm mt-1">{formErrors.category}</p>}
                      </div>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        {priorityLevels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          formErrors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Brief description of your issue"
                      />
                      {formErrors.subject && <p className="text-red-600 text-sm mt-1">{formErrors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                          formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Please provide as much detail as possible about your issue or question..."
                      />
                      {formErrors.message && <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Support Request
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          )}

          {/* AI Chat Assistant */}
          {activeTab === 'chat' && (
            <motion.div 
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <img 
                      src="/images/smaller-logo-hd.png" 
                      alt="AI Assistant" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Operalytix AI Assistant</h3>
                    <p className="text-gray-600 text-sm">Get instant answers to your questions</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                {chatHistory.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-gray-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Hi! I'm here to help</h4>
                    <p className="text-gray-600 text-sm">Ask me about our services, technical questions, or anything else I can help with.</p>
                  </div>
                )}

                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-100'
                        }`}>
                          {msg.role === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <img src="/images/smaller-logo-hd.png" alt="AI" className="w-5 h-5 object-contain" />
                          )}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-gray-900 text-white rounded-br-md' 
                            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src="/images/smaller-logo-hd.png" alt="AI" className="w-5 h-5 object-contain animate-pulse" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                          <span className="text-xs text-gray-500">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-6 bg-white">
                <form onSubmit={handleChatSubmit} className="relative">
                  <div className="relative bg-gray-50 border border-gray-200 rounded-xl focus-within:border-gray-400 focus-within:bg-white transition-all duration-200">
                    <textarea
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask me anything about Operalytix services, technical support, or general questions..."
                      className="w-full px-4 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none resize-none min-h-[3rem] max-h-32 overflow-y-auto rounded-xl pr-16"
                      disabled={isChatLoading}
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
                      disabled={isChatLoading || !chatMessage.trim()}
                      className="absolute right-3 bottom-3 w-10 h-10 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isChatLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ArrowUp className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Other Ways to Reach Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-3">Monday - Friday, 9AM - 6PM EST</p>
              <a href="tel:+1-555-OPERA" className="text-blue-600 hover:text-blue-700 font-medium">
                +1 (555) OPERA-AI
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-3">We respond within 2 hours</p>
              <a href="mailto:support@operalytix.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@operalytix.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Available 24/7 with AI assistance</p>
              <button 
                onClick={() => setActiveTab('chat')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Start Chat Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupportPage; 