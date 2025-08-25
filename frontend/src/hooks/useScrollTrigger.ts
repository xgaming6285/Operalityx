import { useEffect, useRef, useState } from "react";

type UiState = "hidden" | "expanded" | "collapsed";

interface UseScrollTriggerOptions {
  hideDelay?: number; // collapse after ms of no scrolling
  isActive?: boolean; // keep expanded while interacting
  isHovering?: boolean; // keep expanded while hovering
}

export const useScrollTrigger = ({
  hideDelay = 3000,
  isActive = false,
  isHovering = false,
}: UseScrollTriggerOptions = {}) => {
  const [state, setState] = useState<UiState>("hidden");

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
    if (isActive || isHovering) return; // don't auto-collapse while active or hovering
    clearHideTimer();
    hideTimeoutRef.current = window.setTimeout(() => {
      setState((prev) => (prev === "hidden" ? "hidden" : "collapsed"));
    }, hideDelay);
  };

  useEffect(() => {
    const y0 = window.scrollY;
    lastYRef.current = y0;
    // If we load part-way down the page, show as collapsed initially
    setState(y0 > TOP_OFFSET ? "collapsed" : "hidden");
    scheduleCollapse();

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastYRef.current;

        if (y <= TOP_OFFSET) {
          setState("hidden");
        } else if (dy > DIR_THRESHOLD || dy < -DIR_THRESHOLD) {
          // Any meaningful scroll movement expands it
          setState("expanded");
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
  }, [hideDelay, isActive, isHovering]);

  // Force expanded while interacting or hovering
  useEffect(() => {
    if (isActive || isHovering) {
      setState((cur) => (cur === "hidden" ? "hidden" : "expanded"));
    } else {
      scheduleCollapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isHovering, hideDelay]);

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
