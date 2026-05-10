import { useEffect, useRef, useState } from "react";
import { api } from "../utils";
import { ChatContext } from "./ChatContext";
import { useNavigate, useParams } from "react-router-dom";
import type { ChatMessages, getSessions } from "../types/Chat.interface";
import { generateId } from "../utils/genereateId";


export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<ChatMessages[]>([]);
    const [isMultiline, setIsMultiline] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [chatLoading, setChatLoading] = useState(true);
    const [sessions, setSessions] = useState<getSessions[]>([]);
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // ---------------- FETCH HISTORY ----------------
    const fetchMessages = async (sessionId: string): Promise<ChatMessages[]> => {
        const res = await api.chat.getChatMessages(sessionId);
        return res.history;
    };

    useEffect(() => {
        if (!sessionId) return;

        let isMounted = true;

        const initChat = async () => {
            try {
                const data = await fetchMessages(sessionId);
                if (isMounted) setMessages(data);
            } catch (err) {
                console.error("Failed to load chat history", err);
                if (isMounted) setMessages([]);
            } finally {
                if (isMounted) setChatLoading(false);
            }
        };

        initChat();

        return () => {
            isMounted = false;
        };
    }, [sessionId]); // ✅ only sessionId

    const processMessage = async (sessionId: string, message: string) => {
        const message_id = generateId()
        const userMessage: ChatMessages = {
            m_id: message_id,
            role: "user",
            content: message,
            langCode: "en",
            meta: {
                nextAction: { actionType: "none" },
                stage: null,
                riskLevel: null,
            },
        };
        // optimistic update
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);
        console.log(message_id);
        try {
            const res = await api.chat.sendMessages(sessionId, message, message_id);

            const aiMessage: ChatMessages = {
                m_id: res.m_id,
                role: "assistant",
                content: res.reply,
                langCode: "en",
                meta: {
                    nextAction: {
                        actionType: res.meta?.nextAction?.actionType || "none",
                        reason: res.meta?.nextAction?.reason,
                    },
                    stage: res.meta?.stage || null,
                    riskLevel: res.meta?.riskLevel || null,
                },
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error("Message send failed:", err);

            // fallback UI message
            setMessages((prev) => [
                ...prev,
                {
                    m_id: message_id,
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                    langCode: "en",
                    meta: {
                        nextAction: { actionType: "none" },
                        stage: null,
                        riskLevel: null,
                    },
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const startConversation = async () => {
        if (!inputValue.trim()) return;
        try {
            const session = await api.chat.createSession(inputValue);
            if (!session.sessionId) return;
            const newSessionId = session.sessionId;
            console.log(inputValue);
            await processMessage(newSessionId, inputValue);
            navigate(`/chat/c/${newSessionId}`);
        } catch (err) {
            console.error("Failed to start conversation:", err);
        } finally {
            setInputValue("");

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                setIsMultiline(false);
            }
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim() || !sessionId) return;

        await processMessage(sessionId, inputValue);

        setInputValue("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            setIsMultiline(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        let currentSessionId = sessionId;

        if (!currentSessionId) {
            // Create a session first
            try {
                const session = await api.chat.createSession(`Uploaded lab report: ${file.name}`);
                if (!session.sessionId) return;
                currentSessionId = session.sessionId;
                navigate(`/chat/c/${currentSessionId}`);
            } catch (err) {
                console.error("Failed to create session for file upload:", err);
                return;
            }
        }

        const userMessage: ChatMessages = {
            m_id: generateId(),
            role: "user",
            content: `Uploaded a lab report: ${file.name}`,
            langCode: "en",
            meta: {
                nextAction: { actionType: "none" },
                stage: null,
                riskLevel: null,
            },
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const res = await api.chat.uploadPdf(currentSessionId, file);

            const aiMessage: ChatMessages = {
                m_id: res.m_id,
                role: "assistant",
                content: res.reply,
                langCode: "en",
                meta: {
                    nextAction: {
                        actionType: res.meta?.nextAction?.actionType || "none",
                        reason: res.meta?.nextAction?.reason,
                    },
                    stage: res.meta?.stage || null,
                    riskLevel: res.meta?.riskLevel || null,
                },
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error("PDF upload failed:", err);
            setMessages((prev) => [
                ...prev,
                {
                    m_id: generateId(),
                    role: "assistant",
                    content: "Failed to process the PDF. Please try again.",
                    langCode: "en",
                    meta: {
                        nextAction: { actionType: "none" },
                        stage: null,
                        riskLevel: null,
                    },
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };


    useEffect(() => {
        const fetchAllSession = async () => {
            const res = await api.chat.getAllSessions()
            setSessions(res.sessions);
        }
        fetchAllSession()
    }, [])

    return (
        <ChatContext.Provider value={{ isMultiline, setIsMultiline, inputValue, setInputValue, messages, setMessages, isTyping, setIsTyping, textareaRef, startConversation, handleSend, handleFileUpload, chatLoading, sessions }}>
            {children}
        </ChatContext.Provider>
    );
};
