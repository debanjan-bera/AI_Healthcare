export interface CreateSessionPayload {
    userId: string
}
export interface CreateSessionResponse {
    successful: boolean,
    message: string,
    sessionId: string

}

export type ChatRole = "user" | "assistant"

export interface MetaChat {
    stage: string | null,
    riskLevel: string | null,
    followUpQuestion?: string | null
    advice?: string | null
    nextAction: {
        actionType: string | null,
        reason?: string,
    },
    fileName?: string,
    medicines?: string[]
}

export interface ChatMessages {
    m_id: string | number | bigint,
    role: ChatRole,
    content: string,
    langCode: string
    meta?: MetaChat
}
export interface ChatHistoryResponse {
    successful: boolean,
    history: ChatMessages[]
}

export interface SendMessagesResponse {
    successful: boolean,
    reply: string,
    m_id: string,
    meta: MetaChat
}

export interface getSessions {
    sessionId: string,
    chatName: string,
}
export interface GetSessionResponse {
    successful: boolean,
    sessions: getSessions[]
}