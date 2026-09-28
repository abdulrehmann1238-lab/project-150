import React, { useState } from 'react'
import { Server, Code, ShieldCheck, Database, Layers, ArrowUpRight } from 'lucide-react'
import { useLang } from '../../i18n'

interface Hotspot {
  id: number
  labelEn: string
  labelAr: string
  wpComponent: string
  techDetailEn: string
  techDetailAr: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    labelEn: 'Header & Language Switch',
    labelAr: 'الترويسة ومفتاح تبديل اللغة',
    wpComponent: 'header.php + Polylang / WPML API',
    techDetailEn: 'Dynamic navigation loaded from WordPress nav menus; Polylang string translation cookies switch `dir="rtl"` and inject appropriate Arabic typography styles.',
    techDetailAr: 'قوائم ووردبريس ديناميكية مع تكامل Polylang لحفظ الكوكيز وتطبيق خاصية dir="rtl" واستدعاء خطوط القراءة المناسبة.',
  },
  {
    id: 2,
    labelEn: 'Living Shelf & Theme Templates',
    labelAr: 'الرف المتحرك وقوالب السمات',
    wpComponent: 'front-page.php & Custom Post Type `game`',
    techDetailEn: 'Games stored as a custom post type `game` with custom fields (category, tier, plays, rating). Cached in transients for ultra-fast TTFB.',
    techDetailAr: 'حفظ الألعاب كنوع منشورات مخصص (game CPT) مع حقول ACF مخصصة، وتخزين مؤقت عالي السرعة (Transients Cache).',
  },
  {
    id: 3,
    labelEn: 'Catalogue Feed & Cron Automation',
    labelAr: 'تغذية الألعاب ومزامنة Cron الدورية',
    wpComponent: 'wp-cron.php + Custom Ingestion Plugin',
    techDetailEn: 'Scheduled hourly WP-Cron job calls the third-party game catalog API, parses JSON feeds, and syncs thumbnails and metadata into the WordPress media library.',
    techDetailAr: 'مهمة مجدولة دورية في WP-Cron تتصل بواجهات تغذية ألعاب HTML5 وتستورد الصور والبيانات تلقائياً لمكتبة ووردبريس.',
  },
  {
    id: 4,
    labelEn: 'Real-time PIN Validation Endpoint',
    labelAr: 'واجهة فحص الرموز البرمجية المباشرة',
    wpComponent: 'REST Endpoint `/wp-json/layali/v1/pin/validate`',
    techDetailEn: 'Lightweight WordPress REST API route communicates with Razer Gold merchant API over mutual TLS. Implements rate limiting and IP hashing to prevent brute-force attacks.',
    techDetailAr: 'نقطة اتصال REST API مخصصة تتصل بخوادم Razer Gold بتشفير متبادل TLS مع حماية ضد التخمين المتكرر (Rate Limiting).',
  },
  {
    id: 5,
    labelEn: 'Authoritative Webhook Handler',
    labelAr: 'خادم استقبال إشعارات الويب هوك الآمنة',
    wpComponent: 'REST Endpoint `/wp-json/layali/v1/webhook`',
    techDetailEn: 'Webhook listener validates HMAC-SHA256 signature, matches the unique `idempotency-key` in a dedicated `wp_layali_orders` database table, and logs every payload.',
    techDetailAr: 'مستقبل ويب هوك يتحقق من التوقيع الرقمي HMAC-SHA256 ويطابق مفتاح عدم التكرار في جدول بيانات مخصص لضمان الدقة.',
  },
  {
    id: 6,
    labelEn: 'Entitlement & Access Guard',
    labelAr: 'إدارة الصلاحيات وقفل المحتوى المميز',
    wpComponent: 'single-game.php + `layali_check_access()` filter',
    techDetailEn: 'PHP template filter intercepts single game queries. If `tier === "premium"` and entitlement timestamp expired, renders the PaywallDrawer and prevents asset downloads.',
    techDetailAr: 'فلتر حماية في قالب single-game.php يمنع تحميل ملفات ألعاب الـ Premium في حال عدم وجود اشتراك مؤكد وسارٍ.',
  },
  {
    id: 7,
    labelEn: 'HTML5 Game Sandboxing Player',
    labelAr: 'مشغل ألعاب HTML5 في إطار آمن',
    wpComponent: 'page-play.php + Iframe Sandboxing',
    techDetailEn: 'Renders games within a hardened `sandbox="allow-scripts allow-same-origin"` container, preventing third-party script escaping or parent cookie access.',
    techDetailAr: 'عرض اللعبة داخل إطار محمي بسياسات أمان صارمة لمنع التسلل لبيانات الجلسة مع تشغيل كامل الشاشة.',
  },
  {
    id: 8,
    labelEn: 'Production Security & SSL/HSTS',
    labelAr: 'شهادة الأمان وإعدادات خادم الإنتاج',
    wpComponent: '.htaccess / nginx.conf + Let’s Encrypt SSL',
    techDetailEn: 'Enforces HTTPS redirect, HSTS header `max-age=31536000`, strict Content-Security-Policy (CSP), and disables XML-RPC for total hardening.',
    techDetailAr: 'فرض بروتوكول HTTPS وحماية HSTS لمدة عام كامل مع جدار حماية لسياسات المحتوى (CSP) وإغلاق ثغرات XML-RPC.',
  },
]

export const AnnotatedMap: React.FC = () => {
  const { lang, t } = useLang()
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[3])

  return (
    <div className="flex flex-col gap-6">
      {/* Introduction */}
      <div className="p-4 rounded-2xl bg-[var(--sand-100)] border border-[var(--sand-200)] flex items-start gap-3">
        <Server className="text-[var(--ink-700)] mt-0.5 flex-shrink-0" size={20} />
        <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
          {t('archIntro')}
        </p>
      </div>

      {/* Interactive Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hotspots List (Left) */}
        <div className="lg:col-span-6 flex flex-col gap-2.5">
          {HOTSPOTS.map((h) => {
            const isSelected = selectedHotspot.id === h.id
            const label = lang === 'ar' ? h.labelAr : h.labelEn
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                className={`w-full p-3.5 rounded-xl border text-start transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-[var(--ink-900)] text-white border-[var(--ink-900)] shadow-md'
                    : 'bg-[var(--sand-50)] text-[var(--text-1)] border-[var(--sand-200)] hover:border-[var(--sand-300)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected
                        ? 'bg-[var(--saffron-500)] text-[var(--night-900)]'
                        : 'bg-[var(--sand-200)] text-[var(--ink-900)]'
                    }`}
                  >
                    {h.id}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">{label}</span>
                </div>
                <span
                  className={`text-[11px] font-mono ${
                    isSelected ? 'text-[var(--saffron-500)]' : 'text-[var(--text-3)]'
                  }`}
                >
                  {h.wpComponent.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Selected Blueprint Detail Card (Right) */}
        <div className="lg:col-span-6 sticky top-24">
          <div className="p-6 rounded-2xl bg-[var(--night-900)] text-[var(--sand-50)] border border-[var(--ink-700)] shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--ink-700)]">
              <span className="text-xs font-mono text-[var(--saffron-500)] uppercase font-semibold">
                Hotspot Blueprint #{selectedHotspot.id}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--ink-800)] text-[var(--sand-200)] border border-[var(--ink-700)]">
                WordPress 6.x Production Spec
              </span>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-[var(--sand-50)] mb-1">
                {lang === 'ar' ? selectedHotspot.labelAr : selectedHotspot.labelEn}
              </h3>
              <div className="inline-block px-2.5 py-1 rounded bg-[var(--ink-800)] text-[var(--saffron-500)] font-mono text-xs mb-3 border border-[var(--ink-700)]">
                {selectedHotspot.wpComponent}
              </div>
              <p className="text-xs sm:text-sm text-[var(--sand-200)] leading-relaxed">
                {lang === 'ar' ? selectedHotspot.techDetailAr : selectedHotspot.techDetailEn}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--ink-700)] text-xs text-[var(--sand-300)] flex items-center justify-between">
              <span>Security level: Hardened</span>
              <span className="text-[var(--success)] font-mono font-medium">✓ Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
