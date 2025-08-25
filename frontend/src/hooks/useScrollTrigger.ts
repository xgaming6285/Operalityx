import { useEffect, useRef, useState } from "react";

type UiState = "hidden" | "expanded" | "collapsed";

interface UseScrollTriggerOptions {
  hideDelay?: number; // collapse after ms of no scrolling
  isActive?: boolean; // keep expanded while interacting
  isHovered?: boolean; // expand when hovered
}

export const useScrollTrigger = ({
  hideDelay = 3000,
  isActive = false,
  isHovered = false,
}: UseScrollTriggerOptions = {}) => {
  const [state, setState] = useState<UiState>("collapsed"); // Start collapsed by default

  const hideTimeoutRef = useRef<number | null>(null);
  const lastYRef = useRef<number>(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const rafRef = useRef<number | null>(null);

  const TOP_OFFSET = 8; // px considered "at top"
  const DIR_THRESHOLD = 4; // px before we consider it a direction change

  const clearHideTimer = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const scheduleCollapse = () => {
    if (isActive || isHovered) return; // don't auto-collapse while active or hovered
    clearHideTimer();
    hideTimeoutRef.current = window.setTimeout(() => {
      setState((prev) => (prev === "hidden" ? "hidden" : "collapsed"));
    }, hideDelay);
  };

  useEffect(() => {
    const y0 = window.scrollY;
    lastYRef.current = y0;
    // Always start collapsed unless at the very top
    setState(y0 > TOP_OFFSET ? "collapsed" : "hidden");

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastYRef.current;

        if (y <= TOP_OFFSET) {
          setState("hidden");
        } else {
          // If we're past the top offset, show as collapsed (unless already expanded)
          setState((currentState) => {
            if (currentState === "hidden") {
              return "collapsed";
            }
            // If user scrolls while expanded, collapse it
            if (Math.abs(dy) > DIR_THRESHOLD && currentState === "expanded") {
              return "collapsed";
            }
            return currentState;
          });
        }

        lastYRef.current = y;
        clearHideTimer();
        scheduleCollapse();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearHideTimer();
    };
  }, [hideDelay, isActive, isHovered]);

  // Force expanded while interacting or hovered
  useEffect(() => {
    if (isActive) {
      setState((cur) => (cur === "hidden" ? "hidden" : "expanded"));
    } else if (isHovered) {
      setState((cur) => (cur === "hidden" ? "hidden" : "expanded"));
    } else {
      scheduleCollapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isHovered, hideDelay]);

  // Public helpers (optional)
  const hide = () => {
    clearHideTimer();
    setState("hidden");
  };
  const expand = () => {
    clearHideTimer();
    setState("expanded");
    scheduleCollapse();
  };
  const collapse = () => {
    clearHideTimer();
    setState("collapsed");
    scheduleCollapse();
  };

  return { state, hide, expand, collapse };
};
