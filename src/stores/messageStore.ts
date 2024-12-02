import { Message } from "ai";
import { create } from "zustand";

type Store = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

const messageStore = create<Store>()((set) => ({
  messages: [],
  setMessages: (messages: Message[]) =>
    set({
      messages,
    }),
}));

export const useMessageStore = messageStore;

export default messageStore;
