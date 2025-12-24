import { NextRequest, NextResponse } from 'next/server';
import { getSystemPrompt, ChatMessage } from '@/lib/prompts';

// Groq API endpoint
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface GroqRequest {
    model: string;
    messages: GroqMessage[];
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    stream?: boolean;
}

interface GroqResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();
        const { messages } = body as { messages: Array<{ role: 'user' | 'assistant'; content: string }> };

        // Validate input
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Check for API key
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'GROQ_API_KEY is not configured' },
                { status: 500 }
            );
        }

        // Get model from environment or use default
        const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

        // Prepare messages with system prompt
        const groqMessages: ChatMessage[] = [
            { role: 'system', content: getSystemPrompt() },
            ...messages
        ];

        // Prepare the request to Groq
        const groqRequest: GroqRequest = {
            model: model,
            messages: groqMessages,
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 0.9,
            stream: false
        };

        // Call Groq API
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(groqRequest)
        });

        // Handle API errors
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Groq API error:', response.status, errorData);

            if (response.status === 401) {
                return NextResponse.json(
                    { error: 'Invalid API key' },
                    { status: 401 }
                );
            }

            if (response.status === 429) {
                return NextResponse.json(
                    { error: 'Rate limit exceeded. Please try again later.' },
                    { status: 429 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to get response from AI' },
                { status: response.status }
            );
        }

        // Parse the response
        const data: GroqResponse = await response.json();

        // Extract the assistant's message
        const assistantMessage = data.choices[0]?.message?.content;

        if (!assistantMessage) {
            return NextResponse.json(
                { error: 'No response from AI' },
                { status: 500 }
            );
        }

        // Return the response
        return NextResponse.json({
            message: assistantMessage,
            model: data.model,
            usage: data.usage
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
