"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InitialInput } from "./initial-input";
import { MessageItem } from "./message-item";
import { ChatInput } from "./chat-input";
import { useMessageStore } from "@/stores/messageStore";
import { cn } from "@/lib/utils";

export default function ChatInterface() {
  // const [showInitialView, setShowInitialView] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages } = useMessageStore();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  console.log(messages);

  return (
    <div className="flex flex-col h-dvh bg-background text-foreground">
      {/* Header */}
      <motion.header
        className="flex justify-between items-center p-4 border-b border-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-2 flex-grow">
          <Bot className="w-6 h-6" />
          <span className="font-semibold">Convers-AI</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <motion.div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-4",
            {
              hidden: messages.length > 0,
            }
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-full max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              What can I help with?
            </h1>
            <InitialInput />
          </div>
        </motion.div>
        <div
          className={cn("flex flex-col h-full", {
            hidden: messages.length === 0,
          })}
        >
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="mt-auto">
            <ChatInput />

            <div className="p-2 sm:p-4 text-center text-[10px] sm:text-xs text-muted-foreground">
              <p className="mb-1 sm:mb-2">
                By messaging Convers-AI, you agree to our{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-[10px] sm:text-xs"
                >
                  Terms
                </Button>{" "}
                and{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-[10px] sm:text-xs"
                >
                  Privacy Policy
                </Button>
                .
              </p>
              <p className="mb-1 sm:mb-2">
                Don&apos;t share sensitive information. Chats may be reviewed
                for safety and abuse prevention.{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-[10px] sm:text-xs"
                >
                  Learn more
                </Button>
              </p>
              <p>Convers-AI can make mistakes. Check important info.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
