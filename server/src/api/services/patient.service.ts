import mongoose from "mongoose";
import { PatientModel } from "../../model/Patient.model.js";
import userModel from "../../model/user.model.js";
import { UserRole } from "../../types/interface/user.type.js";
import LocationModel from "../../model/Location.model.js";

export const checkExistingPatient = async (userId: string) => {
    return await PatientModel.findOne({ userId: userId });
}

export const registerPatientService = async (
    userId: string,
    patientData: any
) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const location = new LocationModel(patientData.location);
        await location.save({ session });
        const patient = new PatientModel({
            userId,
            ...patientData,
            location: location._id
        });

        await patient.save({ session });

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                role: UserRole.PATIENT,
                profileCompleted: true
            },
            { new: true, session }
        );

        await session.commitTransaction();

        return {
            patientData: patient,
            updatedUser,
            locationData: location
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};