import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    stream: true,
    messages
  });

  // Manually create a stream
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      while (true) {
        const { done, value } = await reader!.read();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
      }
    }
  });

  return new Response(stream);
}