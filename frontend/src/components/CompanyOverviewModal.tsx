import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Brain,
  Database,
  Lock,
  TrendingUp,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CompanyOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompanyOverviewModal: React.FC<CompanyOverviewModalProps> = ({ isOpen, onClose }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Animation sequence when modal opens
  useEffect(() => {
    if (isOpen) {
      // Step 1: Show logo in center
      setShowLogo(true);
      
      // Step 2: After logo animation, show modal
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 600); // Wait for logo animation to complete
      
      return () => clearTimeout(timer);
    } else {
      // Reset states when closing
      setShowLogo(false);
      setShowModal(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);



  const capabilities = [
    {
      title: "Intelligent Automation",
      description: "Advanced AI systems that learn, adapt, and optimize your business processes in real-time.",
      icon: Brain,
      stats: "40% efficiency increase"
    },
    {
      title: "Data Intelligence",
      description: "Transform raw data into actionable insights with our proprietary machine learning algorithms.",
      icon: Database,
      stats: "3x faster decisions"
    },
    {
      title: "Secure Infrastructure",
      description: "Enterprise-grade security with end-to-end encryption and compliance frameworks.",
      icon: Lock,
      stats: "99.9% uptime"
    },
    {
      title: "Scalable Solutions",
      description: "Cloud-native architecture that grows with your business from startup to enterprise.",
      icon: TrendingUp,
      stats: "Unlimited scale"
    }
  ];

  const researchAreas = [
    "Multi-Agent Systems",
    "Adaptive Automation", 
    "Low-Power Intelligence",
    "Dynamic Task Alignment"
  ];

  const stats = [
    { label: "Research Projects", value: "50+" },
    { label: "Enterprise Clients", value: "100+" },
    { label: "AI Models", value: "15+" },
    { label: "Publications", value: "25+" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Center Logo Animation */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ 
                  scale: 0,
                  opacity: 0,
                  x: '-50%',
                  y: '-50%'
                }}
                animate={{ 
                  scale: showModal ? 0.8 : 1,
                  opacity: showModal ? 0 : 1,
                  x: '-50%',
                  y: '-50%'
                }}
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  x: '-50%',
                  y: '-50%'
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.6
                }}
                className="fixed left-1/2 top-1/2 z-60 w-32 h-32 rounded-3xl bg-white border border-gray-200 flex items-center justify-center shadow-2xl"
              >
                <img 
                  src="/images/smaller-logo-hd.png" 
                  alt="Operalytix" 
                  className="w-20 h-20 object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30
                }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/20 backdrop-blur-md"
                onClick={onClose}
              >
                <div 
                  className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                  style={{ maxHeight: '85vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
            {/* Header */}
            <div className="relative bg-white border-b border-gray-100">
              <div className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/smaller-logo-hd.png" 
                      alt="Operalytix" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Operalytix</h1>
                    <p className="text-sm text-gray-500 font-medium">AI-Powered Business Intelligence</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 88px)' }}>
              <div className="px-8 py-8">
                
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
                  >
                    Transforming Business with Intelligence
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  >
                    We build AI systems that understand your business, automate complex workflows, 
                    and deliver insights that drive measurable growth.
                  </motion.p>
                </div>

                {/* Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-4 gap-8 mb-16"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Capabilities Section */}
                <div className="mb-16">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-semibold text-gray-900 mb-8 text-center"
                  >
                    Core Capabilities
                  </motion.h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {capabilities.map((capability, index) => (
                      <motion.div
                        key={capability.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="group p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                            <capability.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {capability.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {capability.description}
                            </p>
                            <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                              {capability.stats}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Research Areas */}
                <div className="mb-16">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xl font-semibold text-gray-900 mb-8 text-center"
                  >
                    Research Focus
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    {researchAreas.map((area, index) => (
                      <motion.div
                        key={area}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-gray-700 font-medium">{area}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-center bg-gray-50 rounded-xl p-8 border border-gray-200"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Ready to Transform Your Business?
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Discover how our AI solutions can streamline your operations, 
                    reduce costs, and accelerate growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Schedule Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>View Research</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

              </div>
            </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompanyOverviewModal;
