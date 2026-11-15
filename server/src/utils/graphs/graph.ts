import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { OrchestrationLayer } from "../agents/orchestration_layer.js";
import { Patient_Assessment_Agent } from "../agents/Patient_Assessment_Agent.js";
// import { medicineQueryNode, responseNode } from "../../../utils/graphs/HealthAgents.graph.js";
import { HealthAgentState } from "./state.js";

const workflow = new StateGraph(HealthAgentState)
    .addNode("supervisor", OrchestrationLayer.supervisorAgent)
    .addNode("healthAgent", Patient_Assessment_Agent.healthQueryAgent)
    .addNode("emergencyAgent", Patient_Assessment_Agent.emergencyQueryAgent)
    .addNode("qnaAgent", Patient_Assessment_Agent.generalQueryAgent)
    // .addNode("medicineInfoAgent",medicineQueryNode)
    // .addNode("response_agent",responseNode)

    .addEdge(START, "supervisor")
    .addConditionalEdges("supervisor", OrchestrationLayer.routingAgent)
    .addEdge("healthAgent", END)
    .addEdge("emergencyAgent", END)
    .addEdge("qnaAgent", END)


const checkpointer = new MemorySaver();
export const graph = workflow.compile({ checkpointer });