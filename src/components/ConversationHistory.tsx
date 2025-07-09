import { RealtimeItem } from "@openai/agents/realtime";

interface ConversationHistoryProps {
  history: RealtimeItem[];
}

export default function ConversationHistory({ history }: ConversationHistoryProps) {
  const messages = history.filter((item) => item.type === "message");

  if (messages.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-gray-500 text-center">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Conversation History</h2>
      <ul className="space-y-2">
        {messages.map((item) => (
          <li key={item.itemId} className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-blue-600">{item.role}:</span>{" "}
            <span className="text-gray-700">
              {typeof item.content === "string" 
                ? item.content 
                : JSON.stringify(item.content)
              }
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 