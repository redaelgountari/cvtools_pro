import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

interface RequestBody {
  userData: string;
  provider?: 'openrouter' | 'gemini';
}

interface APIResponse {
  text: string;
  provider: string;
  model: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { userData, provider } = body;

    if (!userData || typeof userData !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing userData' },
        { status: 400 }
      );
    }

    // Try OpenRouter first (or if explicitly requested)
    // if (!provider || provider === 'openrouter') {
    //   const openRouterResult = await tryOpenRouter(userData);
    //   if (openRouterResult) {
    //     return NextResponse.json(openRouterResult);
    //   }
    // }

    // Fallback to Gemini (or if explicitly requested)
    if (!provider || provider === 'gemini') {
      const geminiResult = await tryGemini(userData);
      if (geminiResult) {
        return NextResponse.json(geminiResult);
      }
    }

    // If both failed
    return NextResponse.json(
      { error: 'All API providers failed' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function tryOpenRouter(userData: string): Promise<APIResponse | null> {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.warn('OPENROUTER_API_KEY not configured');
      return null;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.OPENROUTER_REFERER || 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_TITLE || 'My App',
      },
    });

    const modelName = 'mistralai/mistral-7b-instruct:free';

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: userData,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const text = response.choices[0]?.message?.content;

    if (!text) {
      console.error('OpenRouter returned empty response');
      return null;
    }

    return {
      text,
      provider: 'openrouter',
      model: modelName,
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}

async function tryGemini(userData: string): Promise<APIResponse | null> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not configured');
      return null;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = 'gemini-2.0-flash-exp';
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(userData);
    const response = result.response;
    const text = response.text();

    if (!text) {
      console.error('Gemini returned empty response');
      return null;
    }

    return {
      text,
      provider: 'gemini',
      model: modelName,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}