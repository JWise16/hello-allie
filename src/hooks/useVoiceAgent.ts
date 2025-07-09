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
    toggleConnection,
  };
} 