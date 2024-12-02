import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "1s"),
});

export async function POST(req: NextRequest) {
  // call rate limit with request ip
  const ip = req.headers.get("x-forwarded-for") ?? "ip";
  const { success } = await ratelimit.limit(ip);

  // block the request if unsuccessful
  if (!success) {
    return new Response("Rate Limited!", { status: 429 });
  }
  const { messages, todaysDate, time } = await req.json();

  const system = `${
    process.env.SYSTEM_MESSAGE ?? "Hello! How can I help you today?"
  }. FYI: Todays date is ${todaysDate}. Always greet user according to time. Time: ${time}.`;

  const result = streamText({
    temperature: 0.85, // Balance between creativity and accuracy
    topP: 0.95, // Nucleus sampling for randomness but controlled
    system,
    model: openai("gpt-4o-mini"),
    messages,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    maxSteps: 4,
  });

  return result.toDataStreamResponse();
}
