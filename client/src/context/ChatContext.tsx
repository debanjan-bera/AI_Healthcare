import { createContext } from 'react';
import type { ChatMessages, getSessions } from '../types/Chat.interface';

type ChatContextType = {
  isMultiline: boolean;
  setIsMultiline: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  messages: ChatMessages[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessages[]>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  startConversation: () => Promise<void>;
  handleSend: () => void;
  handleFileUpload: (file: File) => Promise<void>;
  chatLoading : boolean;
  sessions: getSessions[];
  createNewSession: () => void;
  currentSession: getSessions | null;
};


export const ChatContext = createContext<ChatContextType | null>(null);

