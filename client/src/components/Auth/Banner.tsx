import { Sparkles } from "lucide-react"
import RegisterIllustration from '../../assets/98ee2bdd-7497-4317-9bbb-8784c0a18dd1.png';

export const RegisterBanner = () => {
    return (
        <div className="hidden lg:flex w-1/2 bg-[#f4f7ff] relative overflow-hidden border-r border-gray-100 flex-col items-center">

            {/* The Illustration - Anchored to top so original logo/text is visible */}
            <img
                src={RegisterIllustration}
                alt="Healthcare Illustration"
                className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
            />

            {/* Bottom Gradient Mask - Properly goes from solid bottom to transparent top */}
            <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-[#E9EAFC] via-[#E9EAFC]/95 to-transparent z-10 pointer-events-none"></div>

            {/* Our Text Content - Anchored to bottom over the gradient */}
            <div className="absolute bottom-0 left-0 w-full z-20 pb-16 px-12 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 text-[#0066FF] text-xs font-bold mb-5 shadow-sm">
                    <Sparkles size={14} className="text-[#0066FF]" />
                    <span className="uppercase tracking-wider">Join us today</span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0a0c10] mb-4 leading-[1.2] tracking-tight">
                    Join the Future of Healthcare
                </h1>
                <p className="text-gray-600 text-[15px] max-w-sm leading-relaxed font-medium">
                    Create your patient profile to get personalized AI consultations, manage your health records, and connect with top doctors instantly.
                </p>
            </div>
        </div>
    )
}          