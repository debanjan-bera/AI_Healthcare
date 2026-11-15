import mongoose from "mongoose";
import LocationModel from "../../model/Location.model.js";
import { HospitalModel } from "../../model/Hospitals/Hospital.model.js";
import userModel from "../../model/user.model.js";
import { UserRole } from "../../types/interface/user.type.js";
import { BedCapacityModel } from "../../model/Hospitals/BedAvailable.model.js";



export class hospitalService {
    static async registerHospital(userId: string, hospitalData: any) {
        const { hospitalName, hospitalType, registrationNumber, establishedYear, description, location, contact, departments, specialties, facilities, services, bedCapacity } = hospitalData;
        const session = await mongoose.startSession();

        try {
            await session.startTransaction();

            const location = new LocationModel(hospitalData.location);
            await location.save({ session });

            const hospital = new HospitalModel({
                userId,
                hospitalName,
                hospitalType,
                registrationNumber,
                establishedYear,
                description,
                contact,
                departments,
                specialties,
                facilities,
                services,
                pharmacyAvailable: hospitalData.pharmacyAvailable || false,
                bloodBankAvailable: hospitalData.bloodBankAvailable || false,
                location: location._id
            });

            await hospital.save({ session });
            const bedData = new BedCapacityModel({
                hospitalId: hospital._id,
                total: bedCapacity.total || 0,
                available: bedCapacity.available || 0,
                icuTotal: bedCapacity.icuTotal || 0,
                icuAvailable: bedCapacity.icuAvailable || 0,
                ventilatorTotal: bedCapacity.ventilatorTotal || 0,
                ventilatorAvailable: bedCapacity.ventilatorAvailable || 0,
            });
            await bedData.save({ session });

            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    role: UserRole.HOSPITAL_ADMIN,
                    profileCompleted: true
                },
                { new: true, session }
            );

            await session.commitTransaction();

            return {
                hospitalData: hospital,
                updatedUser,
                bedData

            };

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
        location: location._id
    }
};

