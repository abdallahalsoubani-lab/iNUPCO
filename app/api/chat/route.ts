import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatRequest } from "@/types/chat";

// تهيئة OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // التحقق من وجود API Key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "Missing OPENAI_API_KEY. Please add it to your .env.local file.",
          message: "عذراً، لم يتم تكوين المفتاح السري للنظام. يرجى التواصل مع المسؤول."
        },
        { status: 500 }
      );
    }

    const body: ChatRequest = await req.json();
    const { message, systemPromptOverride } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // الحصول على System Prompt من البيئة أو override
    const systemPrompt = systemPromptOverride || process.env.SYSTEM_PROMPT || `أنت مساعد ذكي لموقع NUPCO (المركز الوطني للتوريد الطبي). مهمتك مساعدة الموردين والمستخدمين في الإجابة على استفساراتهم حول التسجيل، المنافسات، العقود، والإجراءات. كن دقيقًا ومحترفًا ومفيدًا. أجب بالعربية دائمًا.`;

    // إنشاء streaming response
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // إنشاء ReadableStream للرد التدريجي
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              const data = `data: ${JSON.stringify({ content })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          // إرسال رسالة النهاية
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        message: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى."
      },
      { status: 500 }
    );
  }
}
