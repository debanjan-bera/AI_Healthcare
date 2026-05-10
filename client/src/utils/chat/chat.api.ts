import type { ChatHistoryResponse,CreateSessionResponse, GetSessionResponse, SendMessagesResponse } from "../../types/Chat.interface";
import { get, post } from "../apiMethod";

const ROUTE = 'chat';

export const createSession = async (message: string): Promise<CreateSessionResponse> => {
    return await post(`${ROUTE}`, {message}) as CreateSessionResponse;
};

export const sendMessages = async (sessionId: string, message: string, message_id: string): Promise<SendMessagesResponse> => {
    return await post(`${ROUTE}/${sessionId}`, { message, message_id }) as SendMessagesResponse;
}
export const getChatMessages = async (sessionId: string): Promise<ChatHistoryResponse> => {
    return await get(`${ROUTE}/${sessionId}`) as ChatHistoryResponse;
}

export const getAllSessions = async(): Promise<GetSessionResponse> =>{
    return await get(`${ROUTE}/user/sessions`) as GetSessionResponse
}

export const uploadPdf = async (sessionId: string, file: File): Promise<SendMessagesResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    return await post(`${ROUTE}/upload/${sessionId}`, formData) as SendMessagesResponse;
}

