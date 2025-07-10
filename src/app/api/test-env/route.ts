import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Log all environment variables (be careful not to expose sensitive ones)
    const envVars: Record<string, string | undefined> = {};
    
    // Check for common environment variables
    const keysToCheck = [
      'OPENAI_API_KEY',
      'NODE_ENV',
      'NEXT_PUBLIC_ANYTHING',
      'AMPLIFY_ENV',
      'AWS_REGION',
      'VERCEL',
      'NETLIFY',
      'RENDER',
      'RAILWAY',
      'HEROKU'
    ];
    
    keysToCheck.forEach(key => {
      envVars[key] = process.env[key];
    });
    
    // Also check if any env vars start with OPENAI
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('OPENAI')) {
        envVars[key] = process.env[key] ? `SET (length: ${process.env[key]?.length})` : 'NOT SET';
      }
    });
    
    // Check if any env vars start with AMPLIFY
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('AMPLIFY')) {
        envVars[key] = process.env[key] ? `SET (length: ${process.env[key]?.length})` : 'NOT SET';
      }
    });
    
    // Check if any env vars start with AWS
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('AWS')) {
        envVars[key] = process.env[key] ? `SET (length: ${process.env[key]?.length})` : 'NOT SET';
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Environment variables check",
      nodeEnv: process.env.NODE_ENV,
      totalEnvVars: Object.keys(process.env).length,
      checkedVars: envVars,
      allEnvVarKeys: Object.keys(process.env).filter(key => 
        !key.includes('SECRET') && 
        !key.includes('PASSWORD') && 
        !key.includes('KEY') && 
        !key.includes('TOKEN')
      ).slice(0, 20) // Only show first 20 to avoid overwhelming response
    });

  } catch (error) {
    console.error("Environment test error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to check environment variables",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 