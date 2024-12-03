import { memo, useRef, useEffect, useCallback, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowUp, Paperclip, StopCircleIcon } from "lucide-react";
import { useChat } from "ai/react";
import { useMessageStore } from "@/stores/messageStore";
import { debounce } from "lodash";

export const ChatInput = memo(function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    messages,
    // handleInputChange,
    handleSubmit: aiSubmit,
    isLoading,
    input,
    stop,
    handleInputChange: onInputChange,
    setMessages: setAIMessages,
  } = useChat({
    maxSteps: 4,
    body: {
      todaysDate: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    experimental_throttle: 50,
  });
  const [initialized, setInitialized] = useState(false);

  const { setMessages, messages: prev } = useMessageStore();

  useEffect(() => {
    if (!initialized && prev.length === 2) {
      setAIMessages((prevv) => [...prevv, ...prev]);
      setInitialized(true);
      console.log("Initialized");
    }
  }, [prev, setAIMessages, initialized]);

  useEffect(() => {
    const debouncedSetMessages = debounce(() => {
      if (messages.length > 0) {
        setMessages(messages);
      }
    }, 50); // Adjust the debounce delay as needed

    debouncedSetMessages();

    return () => {
      debouncedSetMessages.cancel();
    };
  }, [messages, setMessages, prev]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        aiSubmit(e);
      }
    },
    [aiSubmit]
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-border p-2 sm:p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={aiSubmit} className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message convomate... (Shift+Enter for new line)"
            className="w-full py-2 pr-20 pl-3 sm:py-3 sm:pr-24 sm:pl-4 bg-muted/50 border-border resize-none overflow-hidden text-sm sm:text-base"
            rows={1}
          />
          <div className="absolute right-1 bottom-1 sm:right-2 sm:bottom-2 flex gap-1 sm:gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={() => {}}
            />
            {isLoading ? (
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                onClick={stop}
                className="h-7 w-7 sm:h-8 sm:w-8"
                // disabled={!input.trim()}
              >
                <StopCircleIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-7 w-7 sm:h-8 sm:w-8"
                disabled={!input.trim()}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
});
