# NUPCO Chat Widget 🤖

تطبيق ويب كامل (production-ready) يحتوي على Chat Widget ذكي لموقع NUPCO باستخدام OpenAI API.

## 🎯 المميزات

- ✅ عرض موقع NUPCO في iframe (أو placeholder إذا تم حظره)
- ✅ Chat Widget ثابت أسفل اليمين مع تصميم احترافي
- ✅ تكامل مع OpenAI API مع Streaming للردود التدريجية
- ✅ تخزين المحادثات في localStorage
- ✅ أسئلة جاهزة (Quick Questions)
- ✅ تصميم متجاوب (Responsive) للموبايل والديسكتوب
- ✅ أمان عالي: API Key في السيرفر فقط
- ✅ System Prompt قابل للتعديل عبر متغيرات البيئة

## 🛠️ التقنيات المستخدمة

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **OpenAI Node SDK**
- **Server-Sent Events** للـ Streaming

## 📦 التثبيت والتشغيل

### الطريقة 1: باستخدام run.sh (مُوصى بها)

```bash
# 1. تثبيت المكتبات
./run.sh install

# 2. نسخ ملف البيئة
cp .env.example .env.local

# 3. إضافة API Key في .env.local
# افتح .env.local وأضف:
# OPENAI_API_KEY=sk-your-api-key-here

# 4. تشغيل السيرفر
./run.sh dev
```

### الطريقة 2: باستخدام npm مباشرة

```bash
# 1. تثبيت المكتبات
npm install

# 2. نسخ ملف البيئة
cp .env.example .env.local

# 3. إضافة API Key في .env.local
# OPENAI_API_KEY=sk-your-api-key-here

# 4. تشغيل السيرفر
npm run dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

## 🔐 متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```env
# OpenAI API Key - احصل عليه من https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here

# System Prompt - النص التوجيهي للذكاء الاصطناعي (اختياري)
SYSTEM_PROMPT=أنت مساعد ذكي لموقع NUPCO...
```

## 📝 الأوامر المتاحة

### باستخدام run.sh:

```bash
./run.sh install    # تثبيت المكتبات
./run.sh dev        # تشغيل سيرفر التطوير
./run.sh build      # بناء للإنتاج
./run.sh start      # تشغيل سيرفر الإنتاج
./run.sh clean      # حذف الملفات المؤقتة
./run.sh help       # عرض المساعدة
```

### باستخدام npm:

```bash
npm install         # تثبيت المكتبات
npm run dev         # تشغيل سيرفر التطوير
npm run build       # بناء للإنتاج
npm start          # تشغيل سيرفر الإنتاج
```

## 🏗️ هيكل المشروع

```
nupco-chat-widget/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint للشات
│   ├── layout.tsx                # Layout رئيسي
│   ├── page.tsx                  # الصفحة الرئيسية (iframe + widget)
│   └── globals.css               # ملف الأنماط العام
├── components/
│   └── ChatWidget.tsx            # مكون الشات
├── types/
│   └── chat.ts                   # TypeScript types
├── .env.example                  # ملف البيئة النموذجي
├── run.sh                        # سكريبت التشغيل
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎨 المميزات التفصيلية

### Chat Widget

- **تصميم احترافي**: واجهة مستخدم جميلة ومتجاوبة
- **Streaming Responses**: الردود تظهر تدريجياً كما في ChatGPT
- **localStorage**: حفظ المحادثات محلياً
- **Quick Questions**: أسئلة جاهزة للبدء السريع
- **مسح المحادثة**: زر لحذف المحادثة الحالية
- **تفاعلي**: Animations سلسة و UX محسّن

### API Backend

- **آمن**: API Key في السيرفر فقط (process.env)
- **Streaming**: Server-Sent Events للردود التدريجية
- **Error Handling**: معالجة الأخطاء بشكل احترافي
- **Customizable**: System Prompt قابل للتعديل

### الأمان

- ✅ لا توجد أسرار في الكود Frontend
- ✅ API Key في متغيرات البيئة فقط
- ✅ فحص وجود API Key قبل البدء
- ✅ رسائل خطأ واضحة للمستخدم

## 🚀 النشر (Production)

### Vercel (مُوصى بها)

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. النشر
vercel

# 3. إضافة المتغيرات في Vercel Dashboard:
# OPENAI_API_KEY
# SYSTEM_PROMPT (اختياري)
```

### Docker

```bash
# 1. Build
docker build -t nupco-chat-widget .

# 2. Run
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  nupco-chat-widget
```

## 💡 نصائح الاستخدام

1. **iframe محظور؟** إذا لم يعمل iframe بسبب X-Frame-Options، سيظهر placeholder جميل مع رابط لفتح الموقع
2. **تخصيص System Prompt**: عدّل في `.env.local` لتغيير سلوك المساعد
3. **تطوير محلي**: استخدم `./run.sh dev` لتشغيل سريع
4. **Production**: استخدم `./run.sh build && ./run.sh start`

## 🐛 استكشاف الأخطاء

### مشكلة: "Missing OPENAI_API_KEY"

**الحل**: تأكد من وجود `.env.local` ووجود API Key فيه

```bash
cp .env.example .env.local
# ثم أضف API Key في .env.local
```

### مشكلة: iframe لا يعرض الموقع

**السبب**: موقع NUPCO يمنع العرض في iframe (X-Frame-Options)

**الحل**: التطبيق سيعرض placeholder تلقائياً مع رابط لفتح الموقع

### مشكلة: الردود لا تظهر تدريجياً

**السبب**: مشكلة في الـ streaming

**الحل**: تحقق من Console في المتصفح، وتأكد من أن API endpoint يعمل بشكل صحيح

## 📄 الترخيص

هذا المشروع للاستخدام التعليمي والشخصي.

## 🤝 المساهمة

المساهمات مرحب بها! افتح Pull Request أو Issue.

## 📞 الدعم

إذا واجهت مشكلة، افتح Issue في GitHub.

---

صُنع بـ ❤️ لموقع NUPCO
