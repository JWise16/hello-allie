import VoiceAgent from "../components/VoiceAgent";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <VoiceAgent />
    </ErrorBoundary>
  );
}
