import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { RegisterForm } from "../../types/Auth.interface";



const StepAddress: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<RegisterForm>();

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleFetchLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
          const data = await res.json();

          if (data && data.address) {
            const addr = data.address;
            const street = addr.road || addr.pedestrian || addr.suburb || addr.neighbourhood || addr.county || "";
            const city = addr.city || addr.town || addr.village || addr.state_district || "";
            const state = addr.state || "";
            const pincode = addr.postcode || "";
            const country = addr.country || "India";

            setValue("latitude", lat, { shouldValidate: true });
            setValue("longitude", lon, { shouldValidate: true });
            setValue("street", street, { shouldValidate: true });
            setValue("city", city, { shouldValidate: true });
            setValue("state", state, { shouldValidate: true });
            setValue("pincode", pincode, { shouldValidate: true });
            setValue("country", country, { shouldValidate: true });

            toast.success("Location fetched successfully!");
          } else {
            toast.error("Failed to parse address from location.");
          }
        } catch (err) {
          toast.error("Failed to fetch address details");
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        toast.error("Location access denied or failed.");
        setIsLoadingLocation(false);
      }
    );
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all";

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">

      {/* Location Fetch Button */}
      <div className="flex items-center justify-between p-4 bg-[#0066FF]/5 rounded-xl border border-[#0066FF]/10">
        <div>
          <h4 className="text-sm font-semibold text-[#0066FF]">Auto-detect Location</h4>
          <p className="text-xs text-[#0066FF]/70 mt-0.5">Allow location access to auto-fill details</p>
        </div>
        <button
          type="button"
          onClick={handleFetchLocation}
          disabled={isLoadingLocation}
          className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white text-sm font-medium rounded-lg hover:bg-[#0052cc] transition-colors disabled:opacity-70"
        >
          {isLoadingLocation ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MapPin size={16} />
          )}
          <span>{isLoadingLocation ? "Detecting..." : "Detect"}</span>
        </button>
      </div>

      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />

      {/* Street */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          placeholder="123 Main St"
          {...register("street", { required: "Street is required" })}
          className={inputClasses}
        />
        {errors.street && (
          <p className="text-red-500 text-xs">
            {errors.street.message as string}
          </p>
        )}
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            City
          </label>
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className={inputClasses}
          />
          {errors.city && (
            <p className="text-red-500 text-xs">
              {errors.city.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            State
          </label>
          <input
            type="text"
            placeholder="State"
            {...register("state", { required: "State is required" })}
            className={inputClasses}
          />
          {errors.state && (
            <p className="text-red-500 text-xs">
              {errors.state.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Pincode + Country */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            placeholder="e.g. 700001"
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9A-Za-z\s\-]{4,10}$/,
                message: "Enter valid pincode"
              }
            })}
            className={inputClasses}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs">
              {errors.pincode.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Country
          </label>
          <input
            type="text"
            placeholder="Country"
            {...register("country", { required: "Country is required" })}
            className={inputClasses}
          />
          {errors.country && (
            <p className="text-red-500 text-xs">
              {errors.country.message as string}
            </p>
          )}
        </div>
      </div>


    </div>
  );
};

export default StepAddress;