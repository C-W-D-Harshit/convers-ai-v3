import { memo } from "react";
import { Bot } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { MarkdownContent } from "./markdown-content";
import { Message } from "ai";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = memo(function MessageItem({
  message,
}: MessageItemProps) {
  return (
    <motion.div
      className={`flex gap-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {message.role === "assistant" && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <Bot className="w-5 h-5" />
        </Avatar>
      )}
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted prose dark:prose-invert max-w-[90%]"
        }`}
      >
        <MarkdownContent content={message.content} />
      </div>
    </motion.div>
  );
});
