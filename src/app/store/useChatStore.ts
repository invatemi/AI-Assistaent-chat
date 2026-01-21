import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  isGenerating: boolean;

  createNewChat: () => void;
  setActiveChat: (id: string) => void;
  deleteChat: (id: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;

  addMessageToActiveChat: (message: Message) => void;
  appendToLastMessageInActiveChat: (chunk: string) => void;
  updateLastMessageInActiveChat: (content: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,
      isGenerating: false,

      createNewChat: () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: 'Новый чат',
          createdAt: Date.now(),
          messages: [],
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
        }));
      },

      setActiveChat: (id) => set({ activeChatId: id }),

      deleteChat: (id) => {
        set((state) => {
          const updatedChats = state.chats.filter((chat) => chat.id !== id);
          let newActiveId = state.activeChatId;
          if (state.activeChatId === id) {
            newActiveId = updatedChats.length > 0 ? updatedChats[0].id : null;
          }
          return {
            chats: updatedChats,
            activeChatId: newActiveId,
          };
        });
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },

      addMessageToActiveChat: (message) => {
        set((state) => {
          if (!state.activeChatId) return state;
          const updatedChats = state.chats.map((chat) => {
            if (chat.id !== state.activeChatId) return chat;
            const newMessages = [...chat.messages, message];

            let newTitle = chat.title;
            if (
              chat.title === 'Новый чат' &&
              message.role === 'user' &&
              newMessages.filter((m) => m.role === 'user').length === 1
            ) {
              newTitle = message.content.trim().substring(0, 30) + (message.content.length > 30 ? '...' : '');
            }

            return { ...chat, messages: newMessages, title: newTitle };
          });
          return { chats: updatedChats };
        });
      },

      appendToLastMessageInActiveChat: (chunk) => {
        set((state) => {
          if (!state.activeChatId) return state;
          return {
            chats: state.chats.map((chat) => {
              if (chat.id !== state.activeChatId || chat.messages.length === 0) return chat;
              const lastIdx = chat.messages.length - 1;
              const updatedMessages = [...chat.messages];
              updatedMessages[lastIdx] = {
                ...updatedMessages[lastIdx],
                content: updatedMessages[lastIdx].content + chunk,
              };
              return { ...chat, messages: updatedMessages };
            }),
          };
        });
      },

      updateLastMessageInActiveChat: (content) => {
        set((state) => {
          if (!state.activeChatId) return state;
          return {
            chats: state.chats.map((chat) => {
              if (chat.id !== state.activeChatId || chat.messages.length === 0) return chat;
              const lastIdx = chat.messages.length - 1;
              const updatedMessages = [...chat.messages];
              updatedMessages[lastIdx] = { ...updatedMessages[lastIdx], content };
              return { ...chat, messages: updatedMessages };
            }),
          };
        });
      },

      setIsGenerating: (isGenerating) => set({ isGenerating }),
    }),
    {
      name: 'ai-chat-storage',
      partialize: (state) => ({
        chats: state.chats,
        activeChatId: state.activeChatId,
      }),
    }
  )
);