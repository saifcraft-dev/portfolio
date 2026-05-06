import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { geminiChat, ChatMessage, buildChatbotPrompt } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does a web app cost?",
  "How do I get started?",
  "Can I see your portfolio?",
];

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    // Linkify /page-paths
    const linkParts = part.split(/(\/[\w\-\/]+)/g);
    return linkParts.map((lp, j) => {
      if (/^\/[\w\-]/.test(lp)) {
        return (
          <a
            key={`${i}-${j}`}
            href={lp}
            className="text-primary underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
          >
            {lp}
          </a>
        );
      }
      return lp;
    });
  });
}

function MessageFormatter({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="space-y-1 my-1">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary shrink-0 mt-0.5 font-bold">•</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Bullet lines: - item, * item, • item, or ✅/📧/💬 prefix
    if (/^[-•*]\s/.test(trimmed) || /^[✅📧💬📞🔥⭐]\s/.test(trimmed)) {
      const text = trimmed.replace(/^[-•*✅📧💬📞🔥⭐]\s+/, "");
      listItems.push(text);
      continue;
    }

    // Numbered list: 1. item
    if (/^\d+[.)]\s/.test(trimmed)) {
      const text = trimmed.replace(/^\d+[.)]\s+/, "");
      listItems.push(text);
      continue;
    }

    // Emoji-prefixed lines that aren't bullets (standalone emoji items)
    if (/^[✅📧💬📞🔥⭐✓→]/.test(trimmed) && trimmed.length > 2) {
      flushList();
      blocks.push(
        <p key={`p-${i}`} className="text-sm leading-relaxed">
          {parseInline(trimmed)}
        </p>
      );
      continue;
    }

    // Heading: ### or ##
    if (trimmed.startsWith("###")) {
      flushList();
      blocks.push(
        <h4 key={`h4-${i}`} className="font-semibold text-sm mt-2 mb-0.5">
          {trimmed.replace(/^###\s*/, "")}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith("##")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${i}`} className="font-bold text-base mt-3 mb-1">
          {trimmed.replace(/^##\s*/, "")}
        </h3>
      );
      continue;
    }

    flushList();
    blocks.push(
      <p key={`p-${i}`} className="text-sm leading-relaxed">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1.5">{blocks}</div>;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1 px-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60 block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Saif's AI assistant. I can tell you about his services, pricing, portfolio, or anything else on this site. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showQuickReplies = messages.length === 1 && !loading;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => textareaRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function getFriendlyError(raw: string): string {
    if (raw.includes("quota") || raw.includes("429") || raw.includes("rate") || raw.includes("limit")) {
      return "I'm temporarily unavailable due to high demand. You can reach Saif directly:\n\n📧 contact@saifcraft.com\n💬 WhatsApp: +92 318 8055850";
    }
    return "Something went wrong. You can reach Saif directly:\n\n📧 contact@saifcraft.com\n💬 WhatsApp: +92 318 8055850";
  }

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    setInput("");
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
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: getFriendlyError(raw) }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-testid="button-chatbot-toggle"
        className="fixed bottom-4 right-4 sm:bottom-[5.5rem] lg:bottom-6 lg:right-6 z-[60] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center"
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
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
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
            className="fixed inset-0 sm:inset-auto z-[60] sm:bottom-[5.5rem] sm:right-4 lg:bottom-6 lg:right-6 h-[100dvh] sm:h-[520px] w-screen sm:w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-none sm:rounded-2xl border-0 sm:border border-border bg-background shadow-none sm:shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0"
              style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight text-white">Saif's AI Assistant</p>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online · Usually replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="button-close-chat"
                className="w-8 h-8 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors flex items-center justify-center shrink-0"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 bg-muted/20">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  data-testid={`message-${msg.role}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user" ? "bg-primary/20" : "bg-primary"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-primary" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <MessageFormatter content={msg.content} isUser={msg.role === "user"} />
                  </div>
                </motion.div>
              ))}

              {/* Quick reply chips */}
              <AnimatePresence>
                {showQuickReplies && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex flex-wrap gap-2 pl-9"
                  >
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 active:scale-95 transition-all font-medium"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 flex-row"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2 shadow-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 border-t border-border bg-card flex items-end gap-2 shrink-0"
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
                className="flex-1 bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-60 transition-all resize-none overflow-hidden max-h-[120px]"
                rows={1}
              />
              <motion.button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                data-testid="button-send-message"
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
