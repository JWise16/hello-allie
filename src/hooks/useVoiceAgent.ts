"use client";

import { useRef, useState } from "react";
import {
  RealtimeAgent,
  RealtimeItem,
  RealtimeSession,
} from "@openai/agents/realtime";
import { getSessionToken } from "../app/server/token";
import { AGENT_CONFIG } from "../lib/constants";

const agent = new RealtimeAgent({
  name: AGENT_CONFIG.name,
  instructions: AGENT_CONFIG.instructions,
  voice: AGENT_CONFIG.voice,
});

export function useVoiceAgent() {
  const session = useRef<RealtimeSession | null>(null);
  const [connected, setConnected] = useState(false);
  const [history, setHistory] = useState<RealtimeItem[]>([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const connect = async () => {
    const token = await getSessionToken();
    session.current = new RealtimeSession(agent, {
      model: AGENT_CONFIG.model,
    });
    
    session.current.on("transport_event", (event) => {
      console.log(event);
    });
    
    session.current.on("history_updated", (history) => {
      setHistory(history);
    });
    
    // Track AI speaking state based on history updates
    session.current.on("history_updated", (history) => {
      setHistory(history);
      
      // Check if the last message is from assistant and is currently being spoken
      const lastMessage = history[history.length - 1];
      if (lastMessage && lastMessage.type === "message" && 'role' in lastMessage && lastMessage.role === "assistant") {
        // Simple heuristic: if the message is recent and from assistant, AI is speaking
        setIsAISpeaking(true);
        
        // Stop speaking after a delay (you can adjust this timing)
        setTimeout(() => {
          setIsAISpeaking(false);
        }, 3000); // 3 seconds delay
      }
    });
    
    session.current.on(
      "tool_approval_requested",
      async (context, agent, approvalRequest) => {
        const response = prompt("Approve or deny the tool call?");
        console.log(response);
        session.current?.approve(approvalRequest.approvalItem);
      }
    );
    
    await session.current.connect({
      apiKey: token,
    });
    setConnected(true);
  };

  const disconnect = async () => {
    await session.current?.close();
    setConnected(false);
  };

  const toggleConnection = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  return {
    connected,
    history,
    isAISpeaking,
    toggleConnection,
  };
} 