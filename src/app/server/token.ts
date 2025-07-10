"use server";

import OpenAI from "openai";

export async function getSessionToken() {
  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY environment variable is not set");
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  // Log API key length for debugging (without exposing the actual key)
  console.log("API Key length:", process.env.OPENAI_API_KEY?.length);
  console.log("API Key starts with:", process.env.OPENAI_API_KEY?.substring(0, 7));

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("Creating OpenAI session...");
    const session = await openai.beta.realtime.sessions.create({
      model: "gpt-4o-realtime-preview",
    });

    console.log("Session created successfully");
    return session.client_secret.value;
  } catch (error) {
    console.error("Error creating OpenAI session:", error);
    
    // Create a more detailed error message for debugging
    let errorMessage = "Failed to create OpenAI session";
    
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
      
      // Add additional context based on error type
      if (error.message.includes("401")) {
        errorMessage += " - Invalid API key";
      } else if (error.message.includes("429")) {
        errorMessage += " - Rate limit exceeded";
      } else if (error.message.includes("500")) {
        errorMessage += " - OpenAI server error";
      }
    }
    
    // In development, we can expose more details
    if (process.env.NODE_ENV === "development") {
      throw error;
    } else {
      // In production, throw a sanitized error but log the full details
      console.error("Full error details:", error);
      throw new Error(errorMessage);
    }
  }
}
