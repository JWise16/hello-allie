"use client";

import { useVoiceAgent } from "../hooks/useVoiceAgent";
import TypewriterText from "./TypewriterText";
import AudioWaves from "./AudioWaves";
import VoiceMenu from "./VoiceMenu";

export default function VoiceAgent() {
  const { 
    connected, 
    isAISpeaking, 
    currentVoice, 
    currentInstructions,
    toggleConnection, 
    changeVoice,
    changeInstructions 
  } = useVoiceAgent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-500 to-red-600 p-4 sm:p-8 relative">
      <VoiceMenu 
        currentVoice={currentVoice}
        onVoiceChange={changeVoice}
        currentInstructions={currentInstructions}
        onInstructionsChange={changeInstructions}
      />
      
      <div className="text-center mb-8 sm:mb-12 pt-20 sm:pt-8">
        <TypewriterText 
          text="Hello my name is Allie" 
          speed={80}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white mb-4 sm:mb-6"
        />
        <p className="text-white/80 text-lg sm:text-xl">click the mic & say hello</p>
      </div>
      
      <div className="flex justify-center items-center min-h-[40vh] sm:min-h-[50vh] relative">
        <AudioWaves isActive={isAISpeaking} />
        <button
          onClick={toggleConnection}
          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 relative z-10 active:scale-95 ${
            connected 
              ? 'bg-white text-red-500 border-white' 
              : 'bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30'
          }`}
          aria-label={connected ? "Disconnect microphone" : "Connect microphone"}
        >
          <svg 
            className="w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-300"
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2a1 1 0 0 1 2 0v2a5 5 0 0 0 10 0v-2a1 1 0 0 1 2 0z"/>
            <path d="M12 18.5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1z"/>
          </svg>
        </button>
      </div>
    </div>
  );
} 