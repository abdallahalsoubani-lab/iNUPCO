# 🚀 دليل النشر - NUPCO Chat Widget

دليل شامل لنشر التطبيق على منصات مختلفة.

---

## 📋 جدول المحتويات

1. [Vercel (الأسهل والأسرع)](#vercel)
2. [Docker](#docker)
3. [VPS/Cloud Server](#vpscloud-server)
4. [Netlify](#netlify)
5. [AWS/Azure/GCP](#cloud-platforms)

---

## 1. Vercel (مُوصى بها) 🌟

Vercel هي أفضل منصة لنشر Next.js apps.

### الطريقة الأولى: عبر Dashboard

1. **رفع المشروع إلى GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/nupco-chat-widget.git
   git push -u origin main
   ```

2. **الربط مع Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط "Import Project"
   - اختر repository الخاص بك
   - اضغط "Deploy"

3. **إضافة Environment Variables**
   - اذهب إلى Project Settings → Environment Variables
   - أضف:
     - `OPENAI_API_KEY` = `sk-your-key-here`
     - `SYSTEM_PROMPT` = (النص التوجيهي)

4. **Deploy!**
   - الموقع سيكون جاهز على: `https://your-project.vercel.app`

### الطريقة الثانية: عبر CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إضافة environment variables
vercel env add OPENAI_API_KEY
vercel env add SYSTEM_PROMPT

# إعادة النشر مع المتغيرات الجديدة
vercel --prod
```

---

## 2. Docker 🐳

### Build & Run محلياً

```bash
# 1. Build Docker image
docker build -t nupco-chat-widget .

# 2. Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e SYSTEM_PROMPT="أنت مساعد NUPCO..." \
  nupco-chat-widget
```

### استخدام Docker Compose

```bash
# 1. إنشاء .env file
cat > .env << EOF
OPENAI_API_KEY=sk-your-key
SYSTEM_PROMPT=أنت مساعد NUPCO...
EOF

# 2. تشغيل
docker-compose up -d

# 3. الوصول
# http://localhost:3000

# 4. إيقاف
docker-compose down
```

### النشر على Docker Hub

```bash
# 1. Tag image
docker tag nupco-chat-widget username/nupco-chat-widget:latest

# 2. Push to Docker Hub
docker push username/nupco-chat-widget:latest

# 3. على السيرفر
docker pull username/nupco-chat-widget:latest
docker run -d -p 3000:3000 \
  -e OPENAI_API_KEY=sk-key \
  --name nupco \
  username/nupco-chat-widget:latest
```

---

## 3. VPS/Cloud Server (Ubuntu) ☁️

### المتطلبات

- Ubuntu 20.04+ أو Debian 11+
- Node.js 18+
- Nginx (للـ reverse proxy)
- SSL Certificate (Let's Encrypt)

### خطوات النشر

#### 1. إعداد السيرفر

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# تثبيت PM2 (Process Manager)
sudo npm install -g pm2

# تثبيت Nginx
sudo apt install -y nginx

# تثبيت Certbot (للـ SSL)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. رفع المشروع

```bash
# على جهازك المحلي
scp -r . user@server:/var/www/nupco-chat-widget

# أو استخدم Git
ssh user@server
cd /var/www
git clone https://github.com/username/nupco-chat-widget.git
cd nupco-chat-widget
```

#### 3. تثبيت وبناء

```bash
# على السيرفر
cd /var/www/nupco-chat-widget

# تثبيت المكتبات
npm install

# إنشاء .env.local
cat > .env.local << EOF
OPENAI_API_KEY=sk-your-key
SYSTEM_PROMPT=أنت مساعد NUPCO...
EOF

# بناء المشروع
npm run build
```

#### 4. تشغيل مع PM2

```bash
# بدء التطبيق
pm2 start npm --name "nupco" -- start

# حفظ الحالة
pm2 save

# تشغيل تلقائي عند إعادة التشغيل
pm2 startup
```

#### 5. إعداد Nginx

```bash
# إنشاء ملف إعداد
sudo nano /etc/nginx/sites-available/nupco
```

أضف:

```nginx
server {
    server_name nupco.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# تفعيل الإعداد
sudo ln -s /etc/nginx/sites-available/nupco /etc/nginx/sites-enabled/

# اختبار الإعداد
sudo nginx -t

# إعادة تشغيل Nginx
sudo systemctl restart nginx
```

#### 6. إضافة SSL

```bash
sudo certbot --nginx -d nupco.yourdomain.com
```

✅ **جاهز!** افتح: https://nupco.yourdomain.com

---

## 4. Netlify

Netlify تدعم Next.js لكن ليست الأفضل للـ API routes.

```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod

# إضافة environment variables
netlify env:set OPENAI_API_KEY sk-your-key
```

⚠️ **ملاحظة**: قد تحتاج إلى استخدام Netlify Functions بدلاً من Next.js API routes.

---

## 5. Cloud Platforms

### AWS (Elastic Beanstalk)

```bash
# تثبيت EB CLI
pip install awsebcli

# تهيئة
eb init

# إنشاء environment
eb create nupco-prod

# نشر
eb deploy

# إضافة environment variables
eb setenv OPENAI_API_KEY=sk-key
```

### Azure (App Service)

```bash
# تثبيت Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# تسجيل الدخول
az login

# إنشاء resource group
az group create --name nupco-rg --location eastus

# إنشاء App Service plan
az appservice plan create --name nupco-plan --resource-group nupco-rg --sku B1

# إنشاء Web App
az webapp create --name nupco-chat --resource-group nupco-rg --plan nupco-plan --runtime "NODE|18-lts"

# نشر
az webapp deployment source config-local-git --name nupco-chat --resource-group nupco-rg
git remote add azure <git-url>
git push azure main

# إضافة environment variables
az webapp config appsettings set --name nupco-chat --resource-group nupco-rg --settings OPENAI_API_KEY=sk-key
```

### Google Cloud Platform (Cloud Run)

```bash
# Build Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/nupco-chat

# Deploy to Cloud Run
gcloud run deploy nupco-chat \
  --image gcr.io/PROJECT_ID/nupco-chat \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=sk-key
```

---

## 🔒 Security Checklist

قبل النشر، تأكد من:

- [ ] OPENAI_API_KEY في environment variables فقط
- [ ] `.env.local` مُضاف إلى `.gitignore`
- [ ] SSL/HTTPS مُفعّل
- [ ] Rate limiting مُفعّل (للإنتاج)
- [ ] Error logging مُعدّ
- [ ] Monitoring مُفعّل

---

## 📊 Monitoring

### تتبع الأخطاء

استخدم خدمات مثل:
- **Sentry**: https://sentry.io
- **LogRocket**: https://logrocket.com
- **Datadog**: https://datadoghq.com

### تتبع الأداء

- **Vercel Analytics**: مُدمج تلقائياً في Vercel
- **Google Analytics**: أضف script في `layout.tsx`
- **Plausible**: خيار خصوصية-أولاً

---

## 🔄 CI/CD

### GitHub Actions

إنشاء `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 💰 التكلفة المتوقعة

### Vercel
- **Hobby**: مجاني (محدود)
- **Pro**: $20/شهر

### OpenAI API
- **GPT-4o-mini**: ~$0.15 لكل 1M tokens
- متوسط: $5-50/شهر (حسب الاستخدام)

### VPS
- **DigitalOcean Droplet**: $5-20/شهر
- **Linode**: $5-20/شهر
- **Hetzner**: €4-20/شهر

---

## 🆘 استكشاف الأخطاء

### خطأ: "Port already in use"

```bash
# إيقاف العملية على Port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### خطأ: "Module not found"

```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### خطأ: "OPENAI_API_KEY missing"

تأكد من:
1. وجود `.env.local` (محلياً)
2. إضافة المتغيرات في dashboard (في Production)
3. إعادة build بعد إضافة المتغيرات

---

**جاهز للنشر؟ اختر المنصة المناسبة وابدأ! 🚀**
