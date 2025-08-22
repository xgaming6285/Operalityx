import { useEffect, useRef, useState } from 'react';

interface UseScrollTriggerOptions {
  hideDelay?: number; // Hide after ms of no scrolling
  isActive?: boolean; // Keep visible while interacting
}

export const useScrollTrigger = ({
  hideDelay = 3000,
  isActive = false,
}: UseScrollTriggerOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Refs to avoid stale closures and to persist between renders
  const hideTimeoutRef = useRef<number | null>(null);
  const lastYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const rafRef = useRef<number | null>(null);

  // Tunables (kept internal to preserve your public API)
  const TOP_OFFSET = 8;       // px within which we still consider "top"
  const DIR_THRESHOLD = 4;    // px delta before we consider it a direction change

  const clearHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const scheduleHide = () => {
    if (isActive) return; // don't auto-hide while active
    clearHideTimer();
    hideTimeoutRef.current = window.setTimeout(() => setIsVisible(false), hideDelay);
  };

  useEffect(() => {
    // Initialize on mount
    const y0 = window.scrollY;
    lastYRef.current = y0;
    setIsVisible(y0 > TOP_OFFSET); // hidden at top, visible if already scrolled
    scheduleHide();

    const onScroll = () => {
      // Use rAF to coalesce events and avoid layout thrash
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastYRef.current;

        // Hide when at the very top
        if (y <= TOP_OFFSET) {
          setIsVisible(false);
        } else if (dy > DIR_THRESHOLD) {
          // Show when scrolling DOWN (ignore tiny jiggles)
          setIsVisible(true);
        }
        // (Intentionally NOT hiding on scroll up per your requirement)

        lastYRef.current = y;

        // Any scroll activity resets the inactivity timer
        clearHideTimer();
        scheduleHide();
      });
    };

    // Passive for perf; also capture touchmove for mobile
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearHideTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideDelay, isActive]);

  // Keep visible while active (e.g., typing)
  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      // Also pause the hide timer while active
      // (timer is already skipped in scheduleHide)
    } else {
      // When activity ends, schedule a hide after the delay, unless at top
      scheduleHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, hideDelay]);

  const hideModal = () => {
    clearHideTimer();
    setIsVisible(false);
  };

  const showModal = () => {
    clearHideTimer();
    setIsVisible(true);
    scheduleHide();
  };

  return { isVisible, hideModal, showModal };
};
