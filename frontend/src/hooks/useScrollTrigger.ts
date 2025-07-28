import { useState, useEffect } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number; // Scroll distance in pixels before triggering
  delay?: number; // Delay in milliseconds before showing
}

export const useScrollTrigger = ({ 
  threshold = 300, 
  delay = 1000 
}: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > threshold && !hasScrolledEnough) {
        setHasScrolledEnough(true);
        // Add delay before showing the modal
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, delay, hasScrolledEnough]);

  const hideModal = () => {
    setIsVisible(false);
  };

  const showModal = () => {
    setIsVisible(true);
  };

  return {
    isVisible,
    hideModal,
    showModal,
    hasScrolledEnough
  };
}; 