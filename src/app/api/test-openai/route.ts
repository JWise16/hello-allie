import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    // Log API key info for debugging
    console.log("API Key length:", process.env.OPENAI_API_KEY?.length);
    console.log("API Key starts with:", process.env.OPENAI_API_KEY?.substring(0, 7));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Test a simple API call
    const response = await openai.models.list();
    
    return NextResponse.json({
      success: true,
      message: "OpenAI connection successful",
      modelsCount: response.data.length,
      apiKeyLength: process.env.OPENAI_API_KEY?.length,
      apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7)
    });

  } catch (error) {
    console.error("OpenAI test error:", error);
    
    let errorMessage = "Failed to connect to OpenAI";
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
      
      if (error.message.includes("401")) {
        statusCode = 401;
        errorMessage += " - Invalid API key";
      } else if (error.message.includes("429")) {
        statusCode = 429;
        errorMessage += " - Rate limit exceeded";
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined
      },
      { status: statusCode }
    );
  }
} 