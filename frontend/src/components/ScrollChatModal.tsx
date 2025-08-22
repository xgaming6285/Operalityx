import { useState } from 'react';
import { X, ArrowUp } from 'lucide-react';

type UiState = 'hidden' | 'expanded' | 'collapsed';

interface ScrollChatModalProps {
  uiState?: UiState;
  isVisible?: boolean;
  onClose: () => void;
  onActiveChange?: (isActive: boolean) => void;
  logo?: React.ReactNode;
}

const ScrollChatModal = ({
  uiState,
  isVisible,
  onClose,
  onActiveChange,
  logo
}: ScrollChatModalProps) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const mode: UiState = uiState ?? (isVisible ? 'expanded' : 'hidden');

  const parseResponse = (response: string): { content: string; thinking?: string } => {
    const thinkingMatch = response.match(/<think>(.*?)<\/think>/s);
    if (thinkingMatch) {
      const thinking = thinkingMatch[1].trim();
      const content = response.replace(/<think>.*?<\/think>/s, '').trim();
      return { content, thinking };
    }
    return { content: response };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setIsLoading(true);
    setShowResponse(true);

    try {
      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, conversationHistory: [] }),
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        const parsed = parseResponse(data.response);
        setResponse(parsed.content);
      } else {
        const errorMessage =
          data.error === 'Authentication failed'
            ? 'Authentication issue with AI service. Please contact support.'
            : data.error === 'Rate limit exceeded'
            ? 'AI service is busy. Please try again in a moment.'
            : data.response || 'Sorry, I encountered an error. Please try again.';
        setResponse(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse("Sorry, I'm having trouble connecting to the server. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessage('');
    setResponse('');
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

  const handleBackdropClick = () => {
    if (showResponse) {
      handleResponseClose();
    } else {
      onClose();
    }
  };

  // ---------- UI ----------
  const containerVisibility =
    mode === 'hidden'
      ? 'opacity-0 translate-y-4 pointer-events-none'
      : 'opacity-100 translate-y-0 pointer-events-auto';

  const bubbleWidth = mode === 'collapsed' ? 'w-16' : 'w-full';
  const bubblePadding = mode === 'collapsed' ? 'px-0 py-0' : 'px-4 py-3';

  return (
    <>
      {/* Backdrop when the response panel is open */}
      <div
        className={[
          'fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-200',
          showResponse ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={handleBackdropClick}
        aria-hidden={!showResponse}
      />

      {/* Docked container */}
      <div
        className={[
          'fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-fit max-w-md',
          'transition-all duration-300',
          containerVisibility,
        ].join(' ')}
        aria-hidden={mode === 'hidden'}
      >
        <div className="relative">

          {/* Response Card (normal, not transparent) */}
          <div
            className={[
              'mb-3 bg-white rounded-xl shadow-xl border border-gray-200 p-4',
              'transition-all duration-200',
              showResponse ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none',
            ].join(' ')}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-800 text-sm">Operalytix Response</h3>
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
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-gray-600 text-sm">Operalytix is thinking...</span>
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
          </div>

          {/* COLLAPSED (logo button) & EXPANDED (search) */}
          <div
            className={[
              'rounded-full flex items-center gap-3 transition-all duration-300',
              bubbleWidth,
              bubblePadding,
              mode === 'collapsed'
                ? 'bg-white/55 supports-[backdrop-filter]:bg-white/35 backdrop-blur-xl border border-white/30 ring-1 ring-black/5 shadow-2xl dark:bg-gray-900/45 dark:supports-[backdrop-filter]:bg-gray-900/30 dark:border-white/10'
                : 'bg-white shadow-xl border border-gray-200 hover:shadow-2xl',
            ].join(' ')}
          >
            {mode === 'collapsed' ? (
              <button
                type="button"
                onClick={() => onActiveChange?.(true)}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-[1.03]"
                aria-label="Open Operalytix search"
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {logo ?? (
                    <img
                      src="/logo.svg"
                      alt="Operalytix"
                      className="w-8 h-8 object-contain drop-shadow"
                    />
                  )}
                </div>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex-1 flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Ask Operalytix"
                  className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-sm"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed group flex-shrink-0"
                >
                  {isLoading ? (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowUp className="w-3 h-3 group-hover:translate-y-[-1px] transition-transform" />
                  )}
                </button>
              </form>
            )}
          </div>

          {mode === 'expanded' && (
            <p className="text-center text-xs text-gray-500 mt-2">
              Ask me about Operalytix solutions, automation, or business transformation
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ScrollChatModal;
