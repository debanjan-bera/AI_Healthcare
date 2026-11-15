import { Globe, Loader2, LocateFixed, MapPin } from "lucide-react"
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import type { RegisterFormForPateint } from "../../../../types/Patient.interface";
import { GEOAPIFY_KEY } from "../../../../config/config";


export const AddressForm = () => {
    const methods =
        useFormContext<RegisterFormForPateint>();

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

            <div className="space-y-5">

                <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Address
                    </label>

                    <textarea
                        rows={3}
                        placeholder="House No, Street, Landmark"
                        className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        {...register("address")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            City
                        </label>

                        <input
                            type="text"
                            placeholder="Kolkata"
                            className="w-full h-12 rounded-2xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                            {...register("city")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Pincode
                        </label>

                        <input
                            type="text"
                            placeholder="700073"
                            className="w-full h-12 rounded-2xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                            {...register("pincode")}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            State
                        </label>

                        <input
                            type="text"
                            placeholder="West Bengal"
                            className="w-full h-12 rounded-2xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
                            {...register("state")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Country
                        </label>

                        <div className="relative">

                            <input
                                type="text"
                                placeholder="India"
                                className="w-full h-12 rounded-2xl border border-zinc-200 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-green-500"
                                {...register("country")}
                            />

                            <Globe className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />

                        </div>
                    </div>

                </div>

            </div>
            <button
                type="button"
                onClick={handleGetLocation}
                disabled={isFetchingLocation}
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
            >
                {isFetchingLocation ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        Detecting...
                    </>
                ) : (
                    <>
                        <LocateFixed className="size-4" />
                        Auto Fill
                    </>
                )}
            </button>
        </div>
    )
}