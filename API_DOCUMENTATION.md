# 📚 API Documentation - NUPCO Chat Widget

## Chat API Endpoint

### POST `/api/chat`

يرسل رسالة للذكاء الاصطناعي ويحصل على رد streaming.

#### Request Body

```typescript
{
  message: string;              // الرسالة من المستخدم (مطلوب)
  conversationId?: string;      // معرّف المحادثة (اختياري)
  systemPromptOverride?: string; // تجاوز System Prompt (اختياري)
}
```

#### Response

**Success Response:**

- **Content-Type**: `text/event-stream`
- **Format**: Server-Sent Events (SSE)

```
data: {"content":"مرحبا"}
data: {"content":" بك"}
data: {"content":"!"}
data: [DONE]
```

**Error Response:**

- **Status Code**: `400 | 500`
- **Content-Type**: `application/json`

```json
{
  "error": "Error description",
  "message": "رسالة الخطأ بالعربية"
}
```

#### Examples

##### Frontend Usage (Fetch API)

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "كيف أسجل كمورد؟",
    conversationId: "conv_123456",
  }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split("\n");

  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const data = line.slice(6);
      if (data === "[DONE]") continue;

      const parsed = JSON.parse(data);
      console.log(parsed.content); // عرض الرد تدريجياً
    }
  }
}
```

##### cURL Example

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "كيف أسجل كمورد؟",
    "conversationId": "conv_test"
  }'
```

#### Error Codes

| Status Code | Description | Arabic Message |
|------------|-------------|----------------|
| 400 | Message is missing or empty | "الرسالة مطلوبة" |
| 500 | Missing OPENAI_API_KEY | "عذراً، لم يتم تكوين المفتاح السري للنظام" |
| 500 | OpenAI API error | "عذراً، حدث خطأ أثناء معالجة طلبك" |

## Environment Variables

### OPENAI_API_KEY

**Type**: `string` (required)

**Description**: OpenAI API key للوصول إلى GPT models

**Example**:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
```

**How to get**:
1. اذهب إلى https://platform.openai.com/api-keys
2. أنشئ API Key جديد
3. انسخه إلى `.env.local`

### SYSTEM_PROMPT

**Type**: `string` (optional)

**Description**: النص التوجيهي الذي يحدد سلوك المساعد الذكي

**Default**:
```
أنت مساعد ذكي لموقع NUPCO (المركز الوطني للتوريد الطبي).
مهمتك مساعدة الموردين والمستخدمين في الإجابة على استفساراتهم
حول التسجيل، المنافسات، العقود، والإجراءات.
كن دقيقًا ومحترفًا ومفيدًا. أجب بالعربية دائمًا.
```

**Example**:
```env
SYSTEM_PROMPT=أنت مساعد NUPCO متخصص في المنافسات الحكومية...
```

## OpenAI Configuration

### Model

**Current**: `gpt-4o-mini`

**Why**: سريع، فعّال من حيث التكلفة، ويدعم العربية بشكل ممتاز

**To change**: عدّل في `app/api/chat/route.ts:39`

```typescript
const stream = await openai.chat.completions.create({
  model: "gpt-4o-mini", // غيّر هنا
  // ...
});
```

**Available models**:
- `gpt-4o-mini` - الأسرع والأرخص (مُوصى به)
- `gpt-4o` - أكثر ذكاءً لكن أغلى
- `gpt-4-turbo` - نسخة قديمة لكن جيدة

### Parameters

```typescript
{
  model: "gpt-4o-mini",
  stream: true,           // Streaming enabled
  temperature: 0.7,       // Creativity (0-2)
  max_tokens: 1000,       // Maximum response length
}
```

#### temperature

**Range**: `0` to `2`

- `0` - دقيق ومحدد (للإجابات الرسمية)
- `0.7` - متوازن (الافتراضي)
- `1.5+` - إبداعي (للمحادثات غير الرسمية)

#### max_tokens

**Range**: `1` to `128000` (حسب الموديل)

- `500` - إجابات قصيرة
- `1000` - إجابات متوسطة (الافتراضي)
- `2000+` - إجابات طويلة ومفصّلة

## Security Best Practices

### ✅ DO

- احفظ `OPENAI_API_KEY` في `.env.local` فقط
- لا ترفع `.env.local` إلى Git
- استخدم `process.env.OPENAI_API_KEY` في السيرفر فقط
- أضف rate limiting في الإنتاج
- راقب استخدام API عبر OpenAI Dashboard

### ❌ DON'T

- لا تضع API Key في Frontend code
- لا تشارك API Key في أي مكان عام
- لا تستخدم API Key في Client-side code
- لا تحفظ API Key في localStorage/sessionStorage

## Rate Limiting (للإنتاج)

لحماية API من الاستخدام المفرط، أضف rate limiting:

```typescript
// app/api/chat/route.ts

import { RateLimiter } from "@/lib/rate-limiter";

const limiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب كحد أقصى
});

export async function POST(req: NextRequest) {
  // Check rate limit
  const identifier = req.headers.get("x-forwarded-for") || "anonymous";
  if (!limiter.check(identifier)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // ... rest of the code
}
```

## Monitoring & Logging

### تتبع الاستخدام

راقب استخدامك في OpenAI Dashboard:
https://platform.openai.com/usage

### Logging

أضف logging للطلبات:

```typescript
console.log("Chat request:", {
  timestamp: new Date().toISOString(),
  message: message.substring(0, 50), // أول 50 حرف
  conversationId,
});
```

---

## 🔗 روابط مفيدة

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

---

تم التوثيق بـ ❤️
