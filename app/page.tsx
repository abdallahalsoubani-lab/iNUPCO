"use client";

import { useState, useEffect } from "react";
import ChatWidget from "@/components/ChatWidget";

const NUPCO_URL = "https://nupco.ammartillo.com/ar/";

export default function Home() {
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاولة اكتشاف حظر iframe
    const checkIframe = setTimeout(() => {
      const iframe = document.getElementById("nupco-iframe") as HTMLIFrameElement;
      if (iframe) {
        try {
          // محاولة الوصول للـ iframe content (سيفشل إذا كان محظور)
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc) {
            setIframeBlocked(true);
          }
        } catch (e) {
          // إذا حصل exception، غالباً الـ iframe محظور
          setIframeBlocked(true);
        }
      }
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(checkIframe);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIframeBlocked(true);
    setIsLoading(false);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-nupco-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">جاري تحميل موقع NUPCO...</p>
          </div>
        </div>
      )}

      {/* Iframe أو Placeholder */}
      {!iframeBlocked ? (
        <iframe
          id="nupco-iframe"
          src={NUPCO_URL}
          className="w-full h-full border-0"
          title="موقع NUPCO"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      ) : (
        /* Placeholder إذا تم حظر الـ iframe */
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nupco-primary to-nupco-secondary p-8">
          <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-nupco-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              NUPCO - المركز الوطني للتوريد الطبي
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              عذراً، لا يمكن عرض الموقع مباشرة هنا بسبب إعدادات الأمان في الموقع الأصلي.
              <br />
              لكن يمكنك فتح الموقع في تبويب جديد واستخدام المساعد الذكي هنا للإجابة على أسئلتك!
            </p>

            <div className="space-y-4">
              <a
                href={NUPCO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-nupco-primary hover:bg-nupco-secondary text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <span>فتح موقع NUPCO</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">
                  💡 جرّب الأسئلة الشائعة مع المساعد الذكي:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                    كيف أسجل كمورد؟
                  </span>
                  <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                    وين المنافسات المطروحة؟
                  </span>
                  <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                    كيف أتواصل مع الدعم الفني؟
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                استخدم زر المساعد الذكي <span className="font-semibold">أسفل اليسار ⬋</span> للحصول على مساعدة فورية
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  );
}
