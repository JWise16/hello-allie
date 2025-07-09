"use client";

import { useVoiceAgent } from "../hooks/useVoiceAgent";
import ConversationHistory from "./ConversationHistory";
import TypewriterText from "./TypewriterText";

export default function VoiceAgent() {
  const { connected, history, toggleConnection } = useVoiceAgent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-500 to-red-600 p-8">
      <div className="text-center mb-8">
        <TypewriterText 
          text="Hello my name is Allie" 
          speed={80}
          className="text-4xl font-serif italic text-white mb-2"
        />
        <p className="text-white/80 text-lg">Your AI Voice Assistant</p>
      </div>
      <button
        onClick={toggleConnection}
        className="bg-black text-white p-2 rounded-md hover:bg-gray-800 cursor-pointer"
      >
        {connected ? "Disconnect" : "Connect"}
      </button>
      <ConversationHistory history={history} />
    </div>
  );
} 