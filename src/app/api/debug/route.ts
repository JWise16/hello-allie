import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test setting a simple environment variable
    const testVar = process.env.TEST_VAR || 'NOT_SET';
    
    return NextResponse.json({
      success: true,
      message: "Debug information",
      testVar,
      nodeEnv: process.env.NODE_ENV,
      platform: process.env.VERCEL ? 'Vercel' : 
                process.env.NETLIFY ? 'Netlify' : 
                process.env.RENDER ? 'Render' : 
                process.env.RAILWAY ? 'Railway' : 
                process.env.HEROKU ? 'Heroku' : 
                'Unknown/Amplify',
      timestamp: new Date().toISOString(),
      // Check if we're in a serverless environment
      isServerless: typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined',
      lambdaFunction: process.env.AWS_LAMBDA_FUNCTION_NAME || 'N/A',
      region: process.env.AWS_REGION || 'N/A',
      // Check Amplify specific variables
      amplifyEnv: process.env.AMPLIFY_ENV || 'N/A',
      amplifyAppId: process.env.AMPLIFY_APP_ID || 'N/A',
      amplifyBranch: process.env.AMPLIFY_BRANCH || 'N/A',
      amplifyJobId: process.env.AMPLIFY_JOB_ID || 'N/A',
      amplifyBuildId: process.env.AMPLIFY_BUILD_ID || 'N/A',
    });

  } catch (error) {
    console.error("Debug route error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to get debug information",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 