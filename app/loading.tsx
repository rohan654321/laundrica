import { Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">

                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-emerald-100 "></div>

                    {/* Spinning Ring */}
                    <div className="absolute inset-0 border-4 border-t-emerald-600 animate-spin"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-emerald-600 animate-pulse" />
                    </div>

                </div>

                <p className="text-gray-700 font-semibold">
                    Loading...
                </p>
            </div>
        </div>
    );
}