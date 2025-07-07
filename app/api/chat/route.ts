import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextRequest } from 'next/server';

// Enhanced system prompt for AriesBerriesCompany
const systemPrompt = `You are a helpful assistant for AriesBerriesCompany, an innovation lab building a portfolio of intelligent applications designed to redefine what's possible. Your role is to assist users with inquiries about our projects, philosophy, and upcoming innovations.

Key information about AriesBerriesCompany:
- We are an innovation lab focused on building intelligent applications
- Our mission is to redefine what's possible through technology
- We work on cutting-edge AI and software solutions
- We value innovation, creativity, and pushing boundaries
- We're building a portfolio of next-generation applications

Please provide helpful, informative responses while maintaining a professional yet friendly tone. Focus on our innovative approach and the transformative potential of our work. Keep responses concise but informative.`;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Cleanup old rate limit entries during each request
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanupRateLimitMap(); // Ensure stale entries are removed
  const now = Date.now();
  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  current.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  // Try various headers to get the real client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

function validateMessages(messages: any[]): string | null {
  if (!Array.isArray(messages)) {
    return 'Invalid messages format';
  }
  
  if (messages.length === 0) {
    return 'No messages provided';
  }
  
  if (messages.length > 50) {
    return 'Too many messages in conversation';
  }
  
  for (const message of messages) {
    if (!message.role || !message.content) {
      return 'Invalid message format';
    }
    
    if (typeof message.content !== 'string') {
      return 'Message content must be a string';
    }
    
    if (message.content.length > 4000) {
      return 'Message too long (max 4000 characters)';
    }
    
    if (!['user', 'assistant', 'system'].includes(message.role)) {
      return 'Invalid message role';
    }
  }
  
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    
    // Apply rate limiting
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }), 
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages } = body;

    // Validate messages
    const validationError = validateMessages(messages);
    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check for API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('GOOGLE_GENERATIVE_AI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }), 
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate streaming response
    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: systemPrompt,
      messages,
      maxTokens: 1000,
      temperature: 0.7,
      // Add additional safety and performance settings
    });

    return result.toDataStreamResponse({
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      getErrorMessage: (error) => {
        // Log error for debugging but return generic message to user
        console.error('Stream error:', error);
        return 'Sorry, I encountered an error. Please try again.';
      }
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle specific error types
    if (error?.message?.includes('API key')) {
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }), 
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }), 
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (error?.message?.includes('timeout')) {
      return new Response(
        JSON.stringify({ error: 'Request timeout. Please try again.' }), 
        { 
          status: 504,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Set maximum duration for the function
export const maxDuration = 30;