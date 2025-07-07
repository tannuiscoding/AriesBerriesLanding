"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, X, Loader2, MessageCircle, ChevronDown, AlertCircle, RefreshCw } from "lucide-react";
import { useChat } from '@ai-sdk/react';

// Custom toast implementation without external dependencies
const useToast = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-lg shadow-lg text-white text-sm animate-fade-in ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
};

const AIMessageBar = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast, ToastContainer } = useToast();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    setMessages,
    stop,
    status
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
      showToast('Something went wrong. Please try again.', 'error');
    },
    onFinish: (message) => {
      // Optional: Analytics or logging
      if (process.env.NODE_ENV === 'development') {
        console.log('Message completed:', message.id);
      }
    },
    // Enable message throttling for better performance with heavy usage
    experimental_throttle: 100,
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key and keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (isLoading) {
          stop();
        }
      }
      
      // Ctrl/Cmd + K to open chat
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, stop]);

  // Enhanced clear chat with confirmation for non-empty conversations
  const clearChat = useCallback(() => {
    if (messages.length > 0) {
      if (window.confirm('Are you sure you want to clear the conversation?')) {
        setMessages([]);
        showToast('Conversation cleared');
      }
    } else {
      setMessages([]);
    }
  }, [messages.length, setMessages, showToast]);

  // Retry last message on error
  const handleRetry = useCallback(async () => {
    if (error && status !== 'streaming') {
      setIsRetrying(true);
      try {
        await reload();
        showToast('Retrying...');
      } catch (err) {
        showToast('Retry failed. Please try again.', 'error');
      } finally {
        setIsRetrying(false);
      }
    }
  }, [error, status, reload, showToast]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom with smooth behavior and performance optimization
  useEffect(() => {
    if (messagesEndRef.current) {
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "end" 
        });
      };
      
      // Use requestAnimationFrame for better performance
      const frame = requestAnimationFrame(scrollToBottom);
      return () => cancelAnimationFrame(frame);
    }
  }, [messages, isLoading]);

  // Enhanced submit handler with comprehensive validation
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || status === 'streaming') return;
    
    // Check for message length limits
    if (input.trim().length > 4000) {
      showToast('Message too long. Please keep it under 4000 characters.', 'error');
      return;
    }

    // Simple client-side rate limiting
    const now = Date.now();
    const lastSubmit = localStorage.getItem('lastChatSubmit');
    if (lastSubmit && now - parseInt(lastSubmit) < 1000) {
      showToast('Please wait a moment before sending another message.', 'error');
      return;
    }
    
    localStorage.setItem('lastChatSubmit', now.toString());
    
    // Check for conversation length
    if (messages.length >= 50) {
      showToast('Conversation is too long. Please start a new chat.', 'error');
      return;
    }
    
    handleSubmit(e);
  }, [input, status, handleSubmit, messages.length, showToast]);

  // Format message content to handle line breaks properly
  const formatMessageContent = useCallback((content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }, []);

  return (
    <>
      <ToastContainer />
      <div ref={dropdownRef} className="fixed bottom-6 right-4 sm:right-6 z-50">
        {/* Chat Interface */}
        <div
          className={`
            absolute bottom-16 right-0 mb-2 w-[calc(100vw-2rem)] max-w-xl sm:w-96 md:w-[28rem] h-[600px] 
            bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl overflow-hidden shadow-2xl border border-indigo-500/20
            transform transition-all duration-300 ease-out origin-bottom-right
            ${isOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
            }
          `}
        >
          {/* Header */}
          <div className="bg-indigo-600/30 backdrop-blur-sm p-4 border-b border-indigo-500/30 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-indigo-300 h-5 w-5" />
              <h2 className="text-white font-medium">AI Assistant</h2>
              {status === 'streaming' && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <button 
              onClick={clearChat}
              className="text-indigo-200 hover:text-white transition-colors"
              title="Clear conversation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Messages container */}
          <div className="p-4 h-[calc(100%-132px)] overflow-y-auto bg-slate-900/50 scroll-smooth">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Sparkles className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="text-indigo-200 text-xl mb-2">How can I help you today?</h3>
                <p className="text-slate-400 text-sm max-w-xs mb-4">
                  Ask me anything about AriesBerriesCompany and our innovations!
                </p>
                <div className="text-xs text-slate-500">
                  💡 Tip: Press <kbd className="px-1 py-0.5 bg-slate-700 rounded text-slate-300">Ctrl+K</kbd> to open chat
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? "bg-indigo-600 text-white rounded-tr-none shadow-lg"
                          : "bg-slate-700/60 text-slate-100 rounded-tl-none border border-slate-600/50 shadow-sm"
                      } animate-fade-in break-words`}
                    >
                      <div className="text-sm leading-relaxed">
                        {formatMessageContent(message.content)}
                      </div>
                      {/* Message timestamp for debugging in development */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="text-xs opacity-50 mt-1">
                          {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {status === 'streaming' && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] p-3 rounded-2xl bg-slate-700/60 text-slate-100 rounded-tl-none border border-slate-600/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-150"></div>
                        <span className="text-xs text-slate-400 ml-2">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error state with retry option */}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 max-w-[85%]">
                      <div className="flex items-center space-x-2 text-red-300">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">Failed to get response</span>
                      </div>
                      <button
                        onClick={handleRetry}
                        disabled={isRetrying || status === 'streaming'}
                        className="mt-2 flex items-center space-x-1 text-xs text-red-200 hover:text-white transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${isRetrying ? 'animate-spin' : ''}`} />
                        <span>{isRetrying ? 'Retrying...' : 'Try again'}</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input form */}
          <form 
            onSubmit={onSubmit}
            className={`p-4 border-t ${isFocused ? 'border-indigo-500/70 bg-slate-800/80' : 'border-slate-700/50 bg-slate-800/30'} transition-colors duration-200`}
          >
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={status === 'streaming' ? "AI is responding..." : "Type your message..."}
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-full py-3 pl-4 pr-20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 transition-all duration-200"
                disabled={status === 'streaming'}
                maxLength={4000}
                autoComplete="off"
              />
              
              {/* Character counter for long messages */}
              {input.length > 3500 && (
                <div className={`absolute right-16 text-xs ${input.length > 3900 ? 'text-red-400' : 'text-slate-400'}`}>
                  {input.length}/4000
                </div>
              )}

              {/* Stop button when streaming */}
              {status === 'streaming' && (
                <button
                  type="button"
                  onClick={stop}
                  className="absolute right-12 rounded-full p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Stop generation"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                disabled={input.trim() === "" || status === 'streaming'}
                className={`absolute right-1 rounded-full p-2 transition-all duration-200 ${
                  input.trim() === "" || status === 'streaming'
                    ? "text-slate-500 bg-slate-700/50 cursor-not-allowed"
                    : "text-white bg-indigo-600 hover:bg-indigo-500 hover:scale-105 active:scale-95"
                }`}
                title={status === 'streaming' ? "AI is responding..." : "Send message (Enter)"}
              >
                {status === 'streaming' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Helpful tips and status */}
            <div className="mt-2 flex justify-between items-center text-xs text-slate-400">
              {messages.length === 0 ? (
                <span>Ask about our projects, innovations, or company philosophy</span>
              ) : (
                <span>{messages.length}/50 messages</span>
              )}
              {status === 'ready' && <span>Ready</span>}
              {status === 'submitted' && <span>Sending...</span>}
            </div>
          </form>
        </div>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 backdrop-blur-md border border-indigo-500/20 shadow-xl
            flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95
            ${isOpen ? 'rotate-180' : 'rotate-0'}
            ${status === 'streaming' ? 'ring-2 ring-green-400 ring-opacity-75' : ''}
          `}
          aria-label="Toggle AI Assistant"
          title="AI Assistant (Ctrl+K)"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
        
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          
          .delay-75 {
            animation-delay: 0.2s;
          }
          
          .delay-150 {
            animation-delay: 0.4s;
          }

          kbd {
            display: inline-block;
            padding: 2px 4px;
            font-size: 10px;
            line-height: 1;
            background-color: #374151;
            border-radius: 3px;
            color: #d1d5db;
            font-family: ui-monospace, monospace;
          }
        `}</style>
      </div>
    </>
  );
};

export default AIMessageBar;
