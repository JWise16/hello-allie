"use client";

interface AudioWavesProps {
  isActive: boolean;
}

export default function AudioWaves({ isActive }: AudioWavesProps) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Multiple pulsing circles - Mobile responsive */}
      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-white/30 animate-ping" />
      <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-white/20 animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-white/10 animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-white/5 animate-ping" style={{ animationDelay: '1.5s' }} />
    </div>
  );
} 