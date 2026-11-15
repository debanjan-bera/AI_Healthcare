import { HumanMessage } from "@langchain/core/messages";
import { graph } from "../../utils/graphs/graph.js";

export const healthCareAgentServices = async (input: string, threadId: string) => {
    // Invoke the graph using the dynamic threadId passed from the controller
    const res = await graph.invoke(
        { messages: [new HumanMessage({ content: input })] },
        {
            configurable: {
                thread_id: threadId
            }
        }
    );

    // Standardize the return so the frontend always knows what to expect
    if (res.is_emergency) {
        return {
            emergency: true,
            requiresAmbulance: res.requiresAmbulance,
            final_response: res.final_response
        };
    }

    return {
        final_response: res.final_response
    };
}