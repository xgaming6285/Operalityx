import { useState } from "react";
import { X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, FormEvent } from "react";

type UiState = "hidden" | "expanded" | "collapsed";

interface ScrollChatModalProps {
  uiState?: UiState; // preferred
  isVisible?: boolean; // back-compat
  onClose: () => void;
  onActiveChange?: (isActive: boolean) => void;
  onHoverChange?: (isHovering: boolean) => void;
  logo?: ReactNode;
}

const SMOOTH_SPRING = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.8,
} as const;
const FADE = { duration: 0.2, ease: "easeOut" } as const;

const ScrollChatModal = ({
  uiState,
  isVisible,
  onClose,
  onActiveChange,
  onHoverChange,
  logo,
}: ScrollChatModalProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Resolve UI mode (support old isVisible prop)
  const mode: UiState = uiState ?? (isVisible ? "expanded" : "hidden");

  const parseResponse = (
    rawResponse: string
  ): { content: string; thinking?: string } => {
    const thinkingMatch = rawResponse.match(/<think>(.*?)<\/think>/s);
    if (thinkingMatch) {
      const thinking = thinkingMatch[1].trim();
      const content = rawResponse.replace(/<think>.*?<\/think>/s, "").trim();
      return { content, thinking };
    }
    return { content: rawResponse };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setIsLoading(true);
    setShowResponse(true);

    try {
      const apiResponse = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: [],
          }),
        }
      );

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        const parsed = parseResponse(data.response as string);
        setResponse(parsed.content);
      } else {
        const errorMessage =
          data.error === "Authentication failed"
            ? "Authentication issue with AI service. Please contact support."
            : data.error === "Rate limit exceeded"
            ? "AI service is busy. Please try again in a moment."
            : (data.response as string) ||
              "Sorry, I encountered an error. Please try again.";
        setResponse(errorMessage);
      }
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error("Error sending message:", err);
      setResponse(
        "Sorry, I'm having trouble connecting to the server. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessage("");
    setResponse("");
    setShowResponse(false);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    onActiveChange?.(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (!showResponse && !isLoading) onActiveChange?.(false);
  };

  const handleResponseClose = () => {
    setShowResponse(false);
    if (!isInputFocused) onActiveChange?.(false);
  };

  const handleMouseEnter = () => {
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    onHoverChange?.(false);
  };

  const handleBackdropClick = () => {
    if (showResponse) {
      handleResponseClose();
    } else {
      onClose();
    }
  };

  // glass style only for the logo orb
  const glassCollapsed =
    "bg-white/55 supports-[backdrop-filter]:bg-white/35 backdrop-blur-lg " +
    "border border-white/30 ring-1 ring-black/5 shadow-xl " +
    "dark:bg-gray-900/45 dark:supports-[backdrop-filter]:bg-gray-900/30 dark:border-white/10";

  return (
    <>
      {/* Backdrop when the response panel is open */}
      <AnimatePresence>
        {showResponse && (
          <motion.div
            key="opx-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={handleBackdropClick}
            aria-hidden={!showResponse}
          />
        )}
      </AnimatePresence>

      {/* Docked container - Fixed centering with consistent width */}
      <div
        className="fixed inset-x-0 bottom-6 z-30 flex justify-center pointer-events-none px-4"
        aria-hidden={mode === "hidden"}
      >
        <motion.div
          className={[
            "w-full max-w-md pointer-events-auto",
            mode === "hidden" ? "opacity-0" : "opacity-100",
          ].join(" ")}
          animate={{
            y: mode === "hidden" ? 16 : 0,
            opacity: mode === "hidden" ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.7,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative flex justify-center">
            {/* Response Card */}
            <AnimatePresence initial={false}>
              {showResponse && (
                <motion.div
                  key="opx-response"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={SMOOTH_SPRING}
                  className="absolute bottom-full mb-3 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800 text-sm">
                      Operalytix Response
                    </h3>
                    <button
                      onClick={handleResponseClose}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {isLoading ? (
                    <div className="flex items-center gap-2 py-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                        <div
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span className="text-gray-600 text-sm">
                        Operalytix is thinking...
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                      {response}
                    </div>
                  )}

                  {!isLoading && response && (
                    <button
                      onClick={resetChat}
                      className="mt-3 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Ask another question
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main bubble container - Fixed width for consistent centering */}
            <div
              className={[
                "relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 ease-out",
                mode === "collapsed" ? "w-16 h-16" : "w-full h-14",
                mode === "collapsed" ? "p-0" : "px-4 py-3",
                mode === "collapsed"
                  ? glassCollapsed
                  : "bg-white shadow-xl border border-gray-200",
              ].join(" ")}
            >
              <AnimatePresence initial={false} mode="wait">
                {mode === "collapsed" ? (
                  <motion.button
                    key="orb"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={SMOOTH_SPRING}
                    type="button"
                    onClick={() => onActiveChange?.(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-[1.03]"
                    aria-label="Open Operalytix search"
                  >
                    <motion.div className="flex items-center justify-center w-8 h-8">
                      {logo ?? (
                        <motion.img
                          src="/logo.svg"
                          alt="Operalytix"
                          className="w-8 h-8 object-contain drop-shadow"
                          initial={{ rotate: -6 }}
                          animate={{ rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        />
                      )}
                    </motion.div>
                  </motion.button>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative flex-1 flex items-center gap-3 w-full"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={SMOOTH_SPRING}
                  >
                    <motion.input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      placeholder="Ask Operalytix"
                      className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-sm"
                      disabled={isLoading}
                      autoFocus
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={FADE}
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading || !message.trim()}
                      className="w-8 h-8 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed group flex-shrink-0"
                      whileTap={{ scale: 0.96 }}
                    >
                      {isLoading ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowUp className="w-3 h-3 group-hover:translate-y-[-1px] transition-transform" />
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Hint text */}
            <AnimatePresence>
              {mode === "expanded" && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={FADE}
                  className="absolute top-full text-center text-xs text-gray-500 mt-2 w-full"
                ></motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ScrollChatModal;
