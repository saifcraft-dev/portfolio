import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { geminiChat, ChatMessage, buildChatbotPrompt } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Format message content with better readability
function MessageFormatter({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <span>{content}</span>;
  }

  // Split by bullet points and sections
  const parts = content.split(/(\*[^*]+\*|\*\*[^*]+\*\*|###\s+.+|##\s+.+)/);
  
  return (
    <div className="space-y-2">
      {parts.map((part, idx) => {
        if (!part.trim()) return null;

        // Bold text (**text** or *text*)
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <div key={idx} className="ml-4 flex gap-2">
              <span className="text-primary shrink-0 mt-0.5">•</span>
              <span>{part.slice(1, -1)}</span>
            </div>
          );
        }

        // Headers
        if (part.startsWith("###")) {
          return (
            <h4 key={idx} className="font-semibold text-sm mt-2 mb-1">
              {part.replace(/###\s+/, "")}
            </h4>
          );
        }

        if (part.startsWith("##")) {
          return (
            <h3 key={idx} className="font-bold text-base mt-3 mb-2">
              {part.replace(/##\s+/, "")}
            </h3>
          );
        }

        // Regular text - clean up and format
        const cleaned = part
          .trim()
          .replace(/^\*\s+/, "") // Remove leading asterisks from bullet formatting
          .replace(/\s+/g, " "); // Normalize whitespace

        if (cleaned) {
          return (
            <p key={idx} className="text-sm">
              {cleaned}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Saif's AI assistant 👋 I can answer questions about his services, pricing, skills, or help you decide if he's the right fit for your project. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Manage body overflow when chat opens
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => textareaRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function getFriendlyError(raw: string): string {
    if (raw.includes("quota") || raw.includes("429") || raw.includes("rate") || raw.includes("limit")) {
      return "I'm temporarily unavailable due to high demand. Please reach out directly — Saif replies within 24 hours!\n\n📧 contact@saifcraft.com\n💬 WhatsApp: +92 318 8055850";
    }
    if (raw.includes("API key") || raw.includes("403") || raw.includes("401")) {
      return "I'm having a configuration issue right now. Please contact Saif directly:\n\n📧 contact@saifcraft.com\n💬 WhatsApp: +92 318 8055850";
    }
    return "Something went wrong on my end. You can reach Saif directly:\n\n📧 contact@saifcraft.com\n💬 WhatsApp: +92 318 8055850";
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history: ChatMessage[] = messages
        .slice(1)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

      const reply = await geminiChat(history, text, buildChatbotPrompt());
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setError(null);
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : "Something went wrong.";
      const friendly = getFriendlyError(raw);
      setMessages((prev) => [...prev, { role: "assistant", content: friendly }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-testid="button-chatbot-toggle"
        className="fixed bottom-4 right-4 sm:bottom-[5.5rem] lg:bottom-6 lg:right-6 z-[60] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto z-[60] sm:bottom-[5.5rem] sm:right-4 lg:bottom-6 lg:right-6 h-[100dvh] sm:h-[480px] w-screen sm:w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-none sm:rounded-2xl border-0 sm:border border-border bg-background shadow-none sm:shadow-2xl overflow-hidden"
          >
            {/* Header with safe area insets */}
            <div 
              className="flex items-center justify-between gap-3 px-4 py-3 bg-primary/10 border-b border-border shrink-0"
              style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))", paddingBottom: "0.75rem" }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight truncate">
                    Saif's AI Assistant
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Ask anything about services
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="button-close-chat"
                className="w-8 h-8 rounded-lg hover:bg-primary/20 active:bg-primary/30 transition-colors flex items-center justify-center shrink-0"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  data-testid={`message-${msg.role}-${i}`}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-primary/20"
                        : "bg-primary/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-border text-foreground rounded-tl-sm"
                    }`}
                  >
                    <MessageFormatter content={msg.content} isUser={msg.role === "user"} />
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 flex-row animate-in fade-in duration-200">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking…</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input with safe area insets */}
            <div 
              className="px-4 py-3 border-t border-border bg-card/30 flex items-end gap-2 shrink-0"
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <textarea
                ref={textareaRef}
                data-testid="input-chat-message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 transition-all resize-none overflow-hidden max-h-[120px]"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                data-testid="button-send-message"
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
