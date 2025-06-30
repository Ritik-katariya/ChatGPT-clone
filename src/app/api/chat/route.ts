import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🛡️ Safely filter out malformed or incomplete messages
    const messages = (body.messages ?? []).flatMap((msg: any) => {
      if (!msg?.role || !msg?.content) return [];
      const content = Array.isArray(msg.content) ? msg.content : [msg.content];

      // 🧹 Clean out empty text or invalid part
      const validContent = content.filter(
        (part: any) => part && part.type && (part.text || part.data)
      );

      return validContent.length > 0
        ? [{ role: msg.role, content: validContent }]
        : [];
    });

    if (messages.length === 0) {
      return new Response('No valid messages provided', { status: 400 });
    }

    const result = await streamText({
      model: openai('gpt-4o'), // or 'gpt-4-turbo'
      system:
        'You are a helpful, intelligent, and friendly AI assistant. Format code correctly.',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('[CHAT_API_ERROR]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
