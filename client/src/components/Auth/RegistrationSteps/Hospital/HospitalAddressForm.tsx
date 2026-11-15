import { Globe, Loader2, LocateFixed, MapPin } from "lucide-react"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import type { RegisterFormForHospital } from "../../../../types/Hospital.interface";
import { GEOAPIFY_KEY } from "../../../../config/config";

export default function HospitalAddressForm() {
    const methods = useFormContext<RegisterFormForHospital>();

    const {
        register,
        setValue,
    } = methods;
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_KEY}`);

                    if (!res.ok) throw new Error("Failed to fetch location");
                    const data = await res.json();
                    const addr = data.features[0].properties || {};
                    if (latitude && longitude) {
                        setValue("latitude", latitude, { shouldValidate: true, shouldDirty: true });
                        setValue("longitude", longitude, { shouldValidate: true, shouldDirty: true });
                    }
                    if (addr.formatted) setValue("address", addr.formatted, { shouldValidate: true, shouldDirty: true });
                    if (addr.postcode) setValue("pincode", addr.postcode, { shouldValidate: true, shouldDirty: true });
                    if (addr.city) setValue("city", addr.city, { shouldValidate: true, shouldDirty: true });
                    if (addr.state) setValue("state", addr.state, { shouldValidate: true, shouldDirty: true });
                    if (addr.country) setValue("country", addr.country, { shouldValidate: true, shouldDirty: true });
                    toast.success("Location auto-filled successfully!");
                }
                catch (err) {
                    toast.error(`Could not resolve address from coordinates. ${err}`);
                } finally {
                    setIsFetchingLocation(false);
                }
            },
            (error) => {
                setIsFetchingLocation(false);
                if (error.code === 1) toast.error("Location permission denied.");
                else toast.error("Failed to get location.");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="bg-[#f0fdf4] border border-[#00c950]/30 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="size-11 bg-[#00c950]/10 rounded-xl flex items-center justify-center shrink-0">
                        <LocateFixed className="size-5 text-[#00c950]" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                        <h4 className="font-semibold text-sm text-zinc-950 mb-1">Use Current Location</h4>
                        <p className="text-xs text-zinc-600 leading-relaxed">Recommended for the most accurate positioning of your hospital facility.</p>
                    </div>
                </div>
                <button
                    type="button"
                    disabled={isFetchingLocation}
                    onClick={handleGetLocation}
                    className="bg-[#007b33] hover:bg-[#00662a] disabled:opacity-75 disabled:cursor-not-allowed text-white h-[42px] rounded-xl text-[13px] font-semibold transition-colors w-full flex items-center justify-center gap-2 shadow-sm"
                >
                    {isFetchingLocation ? (
                        <><Loader2 className="size-4 animate-spin" /> Fetching location...</>
                    ) : (
                        <><MapPin className="size-4" /> Allow Location Access</>
                    )}
                </button>
            </div>

            <div className="flex items-center gap-4 my-2">
                <div className="bg-zinc-200 flex-1 h-[1px]" />
                <span className="text-zinc-400 text-[10px] font-bold tracking-[0.15em] uppercase">OR ENTER MANUALLY</span>
                <div className="bg-zinc-200 flex-1 h-[1px]" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-zinc-950 text-sm font-semibold">Address</label>
                <input
                    type="text"
                    placeholder="123 Health Ave"
                    className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                    {...register("address", { required: "Address is required" })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-zinc-950 text-sm font-semibold">Pincode</label>
                    <input
                        type="text"
                        placeholder="700073"
                        className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                        {...register("pincode", { required: "Pincode is required" })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-zinc-950 text-sm font-semibold">City</label>
                    <input
                        type="text"
                        placeholder="Kolkata"
                        className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                        {...register("city", { required: "City is required" })}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-zinc-950 text-sm font-semibold">State / Province</label>
                    <input
                        type="text"
                        placeholder="West Bengal"
                        className="bg-white border border-zinc-200 h-12 px-4 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                        {...register("state", { required: "State is required" })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-zinc-950 text-sm font-semibold">Country</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="India"
                            className="bg-white border border-zinc-200 h-12 px-4 pr-10 rounded-xl w-full focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition-all text-sm placeholder:text-zinc-400"
                            {...register("country", { required: "Country is required" })}
                        />
                        <Globe className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                    </div>
                </div>
            </div>
        </div>
    )
}
