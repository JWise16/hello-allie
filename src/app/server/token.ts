"use server";

import OpenAI from "openai";

export async function getSessionToken() {
  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const session = await openai.beta.realtime.sessions.create({
      model: "gpt-4o-realtime-preview",
    });

    return session.client_secret.value;
  } catch (error) {
    console.error("Error creating OpenAI session:", error);
    throw new Error(`Failed to create OpenAI session: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
