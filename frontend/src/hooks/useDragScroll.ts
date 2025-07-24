import { useRef, useState, useCallback } from "react";

export const useDragScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 400;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollStart(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    
    // Mark as dragged if mouse moved more than 5px
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    
    // Use smooth scrolling during drag to reduce jankiness
    const targetScrollLeft = scrollStart - walk;
    scrollContainerRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: 'auto'
    });
  }, [isDragging, startX, scrollStart]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
    // Reset hasDragged after a short delay to allow click prevention
    setTimeout(() => setHasDragged(false), 100);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
    // Reset hasDragged after a short delay to allow click prevention
    setTimeout(() => setHasDragged(false), 100);
  }, []);

  const getDragProps = useCallback(() => ({
    ref: scrollContainerRef,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    className: `cursor-grab select-none`,
    style: {
      scrollbarWidth: "none" as const,
      msOverflowStyle: "none" as const,
    }
  }), [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  const preventClickAfterDrag = useCallback((e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return true; // Indicates click should be prevented
    }
    return false; // Click is allowed
  }, [hasDragged]);

  return {
    // Refs and state
    scrollContainerRef,
    isDragging,
    hasDragged,
    
    // Scroll functions
    scrollLeft,
    scrollRight,
    
    // Event handlers
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    
    // Utility functions
    getDragProps,
    preventClickAfterDrag,
  };
}; 