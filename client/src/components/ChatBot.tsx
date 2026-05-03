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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

      console.log("[ChatBot] Sending message to Gemini...");
      const reply = await geminiChat(history, text, buildChatbotPrompt());
      console.log("[ChatBot] Got response!");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      console.error("[ChatBot] Error:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
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
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 left-3 sm:left-auto z-50 w-auto sm:w-[380px] max-h-[calc(100vh-100px)] sm:max-h-[580px] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-primary/10 border-b border-border">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight truncate">
                  Saif's AI Assistant
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  Ask anything about services
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-2.5 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  data-testid={`message-${msg.role}-${i}`}
                  className={`flex gap-1.5 sm:gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-primary/20"
                        : "bg-primary/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                    ) : (
                      <Bot className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
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
                <div className="flex gap-1.5 sm:gap-2 flex-row">
                  <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
                    <Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary animate-spin" />
                    <span className="text-xs text-muted-foreground">Thinking…</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2">
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-2.5 sm:px-3 py-2.5 sm:py-3 border-t border-border bg-card/30 flex items-center gap-1.5 sm:gap-2">
              <input
                ref={inputRef}
                data-testid="input-chat-message"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-lg sm:rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                data-testid="button-send-message"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg sm:rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
