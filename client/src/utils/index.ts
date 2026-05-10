
import { login, logout, me } from "./auth/auth.api";
import { createSession, getAllSessions, getChatMessages, sendMessages, uploadPdf } from "./chat/chat.api";

export const api = {
    auth: {
        login,
        me,
        logout

    },
    chat:{
        createSession,
        sendMessages,
        getChatMessages,
        getAllSessions,
        uploadPdf

    }

};
