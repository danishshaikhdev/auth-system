import { AlertTriangle } from "lucide-react";

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="relative overflow-hidden flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-md p-4 shadow-lg shadow-red-100 animate-in fade-in slide-in-from-top-2 duration-300">

      {/* Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-red-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="flex items-center justify-center min-w-10 h-10 rounded-xl bg-red-500 shadow-md">
        <AlertTriangle className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      <div className="text-center">

        <p className="text-md text-red-500 font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};