"use client";

interface AudioWavesProps {
  isActive: boolean;
}

export default function AudioWaves({ isActive }: AudioWavesProps) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Multiple pulsing circles */}
      <div className="absolute w-32 h-32 rounded-full border-2 border-white/30 animate-ping" />
      <div className="absolute w-40 h-40 rounded-full border-2 border-white/20 animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="absolute w-48 h-48 rounded-full border-2 border-white/10 animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute w-56 h-56 rounded-full border-2 border-white/5 animate-ping" style={{ animationDelay: '1.5s' }} />
    </div>
  );
} 