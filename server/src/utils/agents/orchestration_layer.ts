import { SystemMessage } from "@langchain/core/messages";
import { llm } from "../../config/ai.model.js";
import { HealthAgentStateType } from "../graphs/state.js";
import z from "zod";
import { supervisorPrompt } from "../prompts/supervisorPrompt.js";

export class OrchestrationLayer {
    static supervisorAgent = async (state: HealthAgentStateType) => {
        console.log("supervisor_work");
        const response = await llm.invoke([
            new SystemMessage({ content: supervisorPrompt }),
            ...state.messages
        ]);

        const result: HealthAgentStateType = JSON.parse(response.content as string);
        return {
            intent: result.intent
        };
    }
    static routingAgent = (state: HealthAgentStateType) => {
        console.log(state.intent)
        switch (state.intent) {
            case "health_query":
                return "healthAgent";

            case "emergency":
                return "emergencyAgent";

            case "medicine_information":
                return "medicineInfoAgent";

            case "general":
                return "qnaAgent";

            default:
                return "healthAgent";
        }
    }
    static invokeAssessmentAgent = async (state: HealthAgentStateType, prompts: string) => {
        const response = await llm.invoke([
            new SystemMessage({ content: prompts }),
            ...state.messages
        ]);
        return {
            final_response: response.content,
        }
    }

}
export const EmergencySchema = z.object({
    isEmergency: z.boolean(),
    requiresAmbulance: z.boolean(),
    content: z.string(),
});