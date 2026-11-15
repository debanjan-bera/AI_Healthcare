import { MessagesZodState } from "@langchain/langgraph";
import z from "zod/v3";

export const HealthAgentState = MessagesZodState.extend({
    intent: z.enum([
        "health_query",
        "emergency",
        "medicine_information",
        "general",
        "response_agent"
    ]).default("response_agent"),
    is_emergency: z.boolean().default(false),
    requiresAmbulance: z.boolean().default(false),
    final_response: z.string().default(""),
});

export type HealthAgentStateType = z.infer<typeof HealthAgentState>;



// export const HealthContextSchema= z.object({
//     summary: z.string().default(""),
//     explanation: z.string().default(""),
//     suggestions: z.array(z.string()).default([]),
//     follow_up_questions: z.array(z.string()).default([]),
// });

// export const EmergencyContextSchema = z.object({
//     summary: z.string().default(""),
//     emergency_level: z.enum([
//         "low",
//         "moderate",
//         "high",
//         "critical"
//     ]).default("moderate"),
//     suspected_emergency: z.boolean().default(false),
//     reasoning_summary: z.string().default(""),
//     immediate_actions: z.array(z.string()).default([]),
//     seek_emergency_care: z.boolean().default(false),
//     requires_ambulance: z.boolean().default(false),
//     follow_up_questions: z.array(z.string()).default([]),
// });