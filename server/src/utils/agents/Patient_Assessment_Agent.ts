import { SystemMessage } from "@langchain/core/messages";
import { llm } from "../../config/ai.model.js";
import { HealthAgentStateType } from "../graphs/state.js";
import { emergencyQueryPrompt, generalQueryPrompt, healthQueryPrompt } from "../prompts/health-agent-prompt.js";
import { EmergencySchema, OrchestrationLayer } from "./orchestration_layer.js";

export class Patient_Assessment_Agent {
    static async healthQueryAgent(state: HealthAgentStateType) {
        console.log('HealthQueryAgent');
        return OrchestrationLayer.invokeAssessmentAgent(state, healthQueryPrompt);
    }
    static async emergencyQueryAgent(state: HealthAgentStateType) {
        console.log('EmergencyQueryAgent');
        const emergencyLLM = llm.withStructuredOutput(EmergencySchema);
        const res = await emergencyLLM.invoke([
            new SystemMessage({ content: emergencyQueryPrompt }),
            ...state.messages
        ])
        return {
            is_emergency: true,
            final_response: res.content,
            requiresAmbulance: res.requiresAmbulance
        }
    }
    static async generalQueryAgent(state: HealthAgentStateType) {
        console.log('GeneralQueryAgent');
        return OrchestrationLayer.invokeAssessmentAgent(state, generalQueryPrompt);
    }
}