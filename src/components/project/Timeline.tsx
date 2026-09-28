import React from 'react'
import { Calendar, CheckCircle, Clock } from 'lucide-react'
import { useLang } from '../../i18n'

export const Timeline: React.FC = () => {
  const { lang, t } = useLang()

  const weeks = [
    {
      week: 'Week 1',
      titleEn: 'Foundation, Theme & RTL Parity',
      titleAr: 'التأسيس، تطوير القالب والتوافق مع العربية',
      duration: 'Days 1–7',
      itemsEn: [
        'WordPress core install, hardening, and database optimization',
        'Custom gaming theme build with Gulf evening aesthetic (CSS logical properties)',
        'Polylang / WPML bidirectional language switcher and native typography setup',
        'HTML5 game player sandboxing architecture and mobile test harness',
      ],
      itemsAr: [
        'تثبيت ووردبريس الأساسي، ضبط الأمان وقواعد البيانات',
        'بناء القالب المخصص بهوية المساء الخليجي الهادئة مع خواص CSS المنطقية',
        'إعداد التوافق اللغوي والانعكاس الكامل (RTL) مع خطوط القراءة المناسبة',
        'بناء مشغل ألعاب HTML5 الآمن وإطار عمل التوافق مع الهواتف',
      ],
    },
    {
      week: 'Week 2',
      titleEn: 'Catalog Automation & Razer Gold Sandbox',
      titleAr: 'أتمتة دليل الألعاب وتكامل بيئة Razer Gold التجريبية',
      duration: 'Days 8–14',
      itemsEn: [
        'Custom cron-based catalog ingestion plugin for third-party JSON feeds',
        'Razer Gold partner API credentials setup and secure mutual TLS client',
        'Real-time PIN validation REST endpoint with anti-bruteforce rate limiting',
        'Hosted wallet approval checkout session workflow implementation',
      ],
      itemsAr: [
        'تطوير إضافة مزامنة الألعاب التلقائية عبر مهام Cron لجلب ملفات JSON',
        'ربط بيانات اعتماد Razer Gold وتأسيس الاتصال المشفر الآمن',
        'برمجة نقطة فحص رموز PIN المباشرة مع نظام الحماية ضد التخمين المتكرر',
        'تنفيذ تدفق الدفع عبر المحفظة بنافذة السداد الآمنة',
      ],
    },
    {
      week: 'Week 3',
      titleEn: 'Webhook Unlock, QA Test Report & Production Launch',
      titleAr: 'تأكيد الويب هوك، تقرير الاختبارات وإطلاق بيئة الإنتاج',
      duration: 'Days 15–21',
      itemsEn: [
        'Idempotent webhook listener with HMAC signature verification and logging',
        'Staggered catalog unlocking and receipt generation',
        'Comprehensive 48-case sandbox test report execution across iOS & Android',
        'Production domain binding, SSL grade A+ audit, and handover documentation',
      ],
      itemsAr: [
        'برمجة مستقبل الويب هوك مع فحص التوقيع الرقمي ومنع التكرار نهائياً',
        'تفعيل فتح المحتوى الفوري وتوليد إيصالات السداد المؤكدة',
        'تنفيذ مصفوفة اختبارات بيئة Sandbox المكونة من 48 حالة فحص على مختلف الأجهزة',
        'ربط النطاق النهائي، فحص أمان شهادة SSL، وتسليم التوثيق الكامل للعميل',
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weeks.map((w, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[var(--sand-50)] border border-[var(--sand-200)] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--ink-900)] text-[var(--saffron-500)] font-mono font-bold">
                  {w.week}
                </span>
                <span className="text-[var(--text-3)] font-mono">{w.duration}</span>
              </div>
              <h4 className="text-base font-bold text-[var(--ink-900)] mb-3">
                {lang === 'ar' ? w.titleAr : w.titleEn}
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-[var(--text-2)] leading-relaxed">
                {(lang === 'ar' ? w.itemsAr : w.itemsEn).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-[var(--success)] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
