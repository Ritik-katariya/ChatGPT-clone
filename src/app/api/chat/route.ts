import { streamText, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messages = (body.messages ?? []).flatMap((msg: any) => {
      if (!msg?.role || !msg?.content) return [];

      const content = Array.isArray(msg.content) ? msg.content : [msg.content];

      const validContent = content
        .map((part: any) => {
          if (!part || !part.type) return null;

          if (part.type === 'text') {
            return {
              type: 'text',
              text: part.text,
            };
          }

          if (part.type === 'image') {
            return {
              type: 'image',
              image: part.image,
              providerOptions: part.providerOptions || {
                openai: { imageDetail: 'low' },
              },
            };
          }

          if (part.type === 'file') {
            const binary =
              part.data instanceof Array
                ? new Uint8Array(part.data).buffer
                : part.data;

            return {
              type: 'file',
              data: binary,
              mimeType: part.mimeType,
              filename: part.filename || 'file',
            };
          }

          return null;
        })
        .filter(Boolean);

      return validContent.length > 0
        ? [{ role: msg.role, content: validContent }]
        : [];
    });

    if (messages.length === 0) {
      return new Response('No valid messages provided', { status: 400 });
    }

    const hasFile = messages.some((msg: { content?: any[] }) =>
      msg.content?.some((c: { type?: string }) => c.type === 'file')
    );

    if (hasFile) {
      const result = await generateText({
        model: openai('gpt-4o'),
        messages,
      });
      return new Response(JSON.stringify({ text: result.text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      system:
      'You are a helpful, intelligent, and friendly AI assistant. Format code correctly. Explain images and PDFs clearly.',
      messages,
    });

    // To get messages from the result, you need to iterate over the stream.
    // Example: 
    // for await (const chunk of result) {
    //   // process chunk
    // }
    // Remove the incorrect usage of result.value.messages.

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('[CHAT_API_ERROR]', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
