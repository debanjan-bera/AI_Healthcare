
import { login, logout, me, createAccount } from "./auth/auth.api";
import { createPatient } from "./auth/patient.api";

export const api = {
    auth: {
        login,
        me,
        logout,
        createAccount

    },
    patient: {
        createPatient
    }

};
