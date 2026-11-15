import { post } from "../apiMethod";
import type { CreatePatientPayload, CreatePatientResponse } from "../../types/Patient.interface";


const ROUTE = "patient"

export const createPatient = async (payload: CreatePatientPayload): Promise<CreatePatientResponse> => {
    return await post(`${ROUTE}`, payload) as CreatePatientResponse;
};