import { memo, useRef, useEffect, useCallback } from "react";
import {
  Paperclip,
  ArrowUp,
  Image,
  FileText,
  Eye,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChat } from "ai/react";
import { debounce } from "lodash";
import { useMessageStore } from "@/stores/messageStore";

export const InitialInput = memo(function InitialInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    messages,
    // handleInputChange,
    handleSubmit: aiSubmit,
    input,
    setInput,
  } = useChat({
    maxSteps: 4,
    body: {
      todaysDate: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    experimental_throttle: 50,
  });

  const { setMessages } = useMessageStore();

  useEffect(() => {
    const debouncedSetMessages = debounce(() => {
      if (messages.length > 0) {
        setMessages(messages);
      }
    }, 150); // Adjust the debounce delay as needed

    debouncedSetMessages();

    return () => {
      debouncedSetMessages.cancel();
    };
  }, [messages, setMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        aiSubmit(e);
      }
    },
    [aiSubmit]
  );

  return (
    <div className="space-y-4">
      <form onSubmit={aiSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Convers-AI... (Shift+Enter for new line)"
            className="w-full py-3 px-4 pr-24 bg-muted/50 border-border resize-none overflow-hidden"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex gap-2">
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <ActionButton
            icon={<Image className="w-4 h-4" />}
            label="Create image"
            className="hidden sm:flex"
          />
          <ActionButton
            icon={<FileText className="w-4 h-4" />}
            label="Summarize text"
            className="hidden sm:flex"
          />
          <ActionButton
            icon={<Eye className="w-4 h-4" />}
            label="Analyze images"
            className="hidden sm:flex"
          />
          <ActionButton
            icon={<Sparkles className="w-4 h-4" />}
            label="Surprise me"
            className="hidden sm:flex"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                More
                <MoreHorizontal className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="sm:hidden">
                Create image
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                Summarize text
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                Analyze images
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                Surprise me
              </DropdownMenuItem>
              <DropdownMenuItem>Clear chat</DropdownMenuItem>
              <DropdownMenuItem>Export chat</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </div>
  );
});

function ActionButton({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-muted-foreground ${className}`}
    >
      {icon}
      <span className="ml-2 text-sm">{label}</span>
    </Button>
  );
}
