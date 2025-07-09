"use client";

import { useVoiceAgent } from "../hooks/useVoiceAgent";
import ConversationHistory from "./ConversationHistory";

export default function VoiceAgent() {
  const { connected, history, toggleConnection } = useVoiceAgent();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Voice Agent Demo</h1>
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