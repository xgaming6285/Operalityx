import { useState, useEffect } from 'react';

interface UseScrollTriggerOptions {
  hideDelay?: number; // Delay in milliseconds before hiding when scrolling stops
  isActive?: boolean; // Whether the modal is actively being used
}

export const useScrollTrigger = ({ 
  hideDelay = 3000, // Hide after 3 seconds of no scrolling
  isActive = false
}: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimeoutId: number;

    const handleScroll = () => {
      // Show modal immediately when scrolling
      setIsVisible(true);
      
      // Clear existing timeout
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }
      
      // Only set timeout to hide if not actively being used
      if (!isActive) {
        hideTimeoutId = setTimeout(() => {
          setIsVisible(false);
        }, hideDelay);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }
    };
  }, [hideDelay, isActive]);

  // Effect to handle when active state changes
  useEffect(() => {
    if (isActive) {
      // Keep visible when active
      setIsVisible(true);
    }
  }, [isActive]);

  const hideModal = () => {
    setIsVisible(false);
  };

  const showModal = () => {
    setIsVisible(true);
  };

  return {
    isVisible,
    hideModal,
    showModal
  };
}; 