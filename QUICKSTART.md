# 🚀 دليل البدء السريع - NUPCO Chat Widget

## الطريقة الأسرع للتشغيل (3 خطوات فقط!)

### 1️⃣ تثبيت المكتبات

```bash
./run.sh install
```

أو:

```bash
npm install
```

### 2️⃣ إعداد ملف البيئة

```bash
# نسخ ملف البيئة النموذجي
cp .env.example .env.local
```

**ثم افتح `.env.local` وأضف API Key الخاص بك:**

```env
OPENAI_API_KEY=sk-your-api-key-here
```

> 💡 احصل على API Key من: https://platform.openai.com/api-keys

### 3️⃣ تشغيل التطبيق

```bash
./run.sh dev
```

أو:

```bash
npm run dev
```

✅ **افتح المتصفح على:** http://localhost:3000

---

## 📋 قائمة التحقق

- [ ] تثبيت Node.js (v18+)
- [ ] تشغيل `./run.sh install` أو `npm install`
- [ ] نسخ `.env.example` إلى `.env.local`
- [ ] إضافة `OPENAI_API_KEY` في `.env.local`
- [ ] تشغيل `./run.sh dev` أو `npm run dev`
- [ ] فتح http://localhost:3000
- [ ] اختبار Chat Widget!

---

## 🎯 اختبار سريع

1. افتح التطبيق في المتصفح
2. اضغط على زر المساعد أسفل اليمين
3. جرّب أحد الأسئلة السريعة:
   - "كيف أسجل كمورد؟"
   - "وين المنافسات المطروحة؟"
   - "كيف أتواصل مع الدعم الفني؟"

---

## 🐛 مشاكل شائعة

### ❌ "Missing OPENAI_API_KEY"

**الحل:**
```bash
# تأكد من وجود .env.local
ls -la .env.local

# إذا لم يكن موجود:
cp .env.example .env.local

# ثم أضف API Key داخل الملف
```

### ❌ "Cannot find module..."

**الحل:**
```bash
# أعد تثبيت المكتبات
./run.sh clean
./run.sh install
```

### ❌ "Port 3000 already in use"

**الحل:**
```bash
# استخدم بورت مختلف
PORT=3001 npm run dev
```

---

## 📞 هل تحتاج مساعدة؟

راجع [README.md](./README.md) للمزيد من التفاصيل.

---

**استمتع بالتطوير! 🎉**
