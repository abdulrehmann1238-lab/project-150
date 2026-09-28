import React, { useState } from 'react'
import { Calculator, Edit3, Check, RotateCcw } from 'lucide-react'
import { useLang } from '../../i18n'

interface ScopeRow {
  id: number
  taskEn: string
  taskAr: string
  hours: string
  amount: string
}

// TODO(freelancer): fill these placeholder figures before submitting the final proposal to client
const INITIAL_SCOPE_ROWS: ScopeRow[] = [
  {
    id: 1,
    taskEn: 'WordPress Core Installation, Server Hardening & Database Configuration',
    taskAr: 'تثبيت ووردبريس الأساسي، تعزيز أمان الخادم، وضبط قواعد البيانات',
    hours: '—', // TODO(freelancer): fill hours
    amount: '—', // TODO(freelancer): fill amount
  },
  {
    id: 2,
    taskEn: 'Custom Gaming Theme Development (Desktop & Mobile Optimized with Safe Areas)',
    taskAr: 'تطوير قالب ألعاب مخصص متجاوب ومتوافق مع الهواتف والحواسيب',
    hours: '—',
    amount: '—',
  },
  {
    id: 3,
    taskEn: 'Full English & Arabic Localization with Native Typography & RTL Parity',
    taskAr: 'تعريب كامل وتوافق تام مع اتجاه الكتابة من اليمين لليسار (RTL) وخطوط مخصصة',
    hours: '—',
    amount: '—',
  },
  {
    id: 4,
    taskEn: 'HTML5 Game Catalog Ingestion Plugin with Automated Cron Feed Sync',
    taskAr: 'تطوير إضافة استيراد ألعاب HTML5 مع المزامنة المجدولة التلقائية',
    hours: '—',
    amount: '—',
  },
  {
    id: 5,
    taskEn: 'Free Public Gaming Section with Sandboxed In-Browser HTML5 Player',
    taskAr: 'قسم الألعاب المجانية المفتوحة للجمهور مع مشغل ألعاب معزول وآمن',
    hours: '—',
    amount: '—',
  },
  {
    id: 6,
    taskEn: 'Premium Gated Library with Real-Time Access Restriction & Expiry Logic',
    taskAr: 'بوابة المحتوى المميز مع نظام التحقق من الصلاحيات وتاريخ انتهاء الاشتراك',
    hours: '—',
    amount: '—',
  },
  {
    id: 7,
    taskEn: 'Razer Gold Hosted Wallet Button & Secure Popup Callback Workflow',
    taskAr: 'ربط زر محفظة Razer Gold ونافذة الموافقة الآمنة لمعالجة السداد',
    hours: '—',
    amount: '—',
  },
  {
    id: 8,
    taskEn: '16-Character Razer Gold PIN Real-Time Validation REST API Endpoint',
    taskAr: 'برمجة واجهة فحص رموز PIN الفورية مع الحماية ضد هجمات التخمين',
    hours: '—',
    amount: '—',
  },
  {
    id: 9,
    taskEn: 'Authoritative Webhook Callback with Signature Check, Idempotency & Auto-Unlock',
    taskAr: 'خادم استقبال إشعارات الويب هوك مع فحص التوقيع ومنع التكرار وتفعيل الاشتراك الفوري',
    hours: '—',
    amount: '—',
  },
  {
    id: 10,
    taskEn: 'Bilingual Legal Compliance Pages (Terms, Privacy, Digital Goods Refund, Cookies)',
    taskAr: 'صفحات السياسات والشروط القانونية ثنائية اللغة المتوافقة مع السلع الرقمية',
    hours: '—',
    amount: '—',
  },
]

export const EstimateTable: React.FC = () => {
  const { lang, t } = useLang()
  const [rows, setRows] = useState<ScopeRow[]>(INITIAL_SCOPE_ROWS)
  const [isEditing, setIsEditing] = useState(false)

  const handleCellChange = (id: number, field: 'hours' | 'amount', val: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    )
  }

  const handleReset = () => {
    setRows(INITIAL_SCOPE_ROWS)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Table Action Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-3)] font-mono">
          // 10 Scope Deliverables Matching RFP
        </span>
        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              onClick={handleReset}
              className="text-xs text-[var(--rose-500)] hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-lg border border-[var(--sand-300)] bg-[var(--sand-50)] text-xs font-semibold text-[var(--text-1)] hover:bg-[var(--sand-100)] transition flex items-center gap-1.5"
          >
            {isEditing ? (
              <>
                <Check size={14} className="text-[var(--success)]" />
                <span>Finish Editing</span>
              </>
            ) : (
              <>
                <Edit3 size={13} />
                <span>Edit Placeholders</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-[var(--sand-200)] bg-[var(--sand-50)] overflow-x-auto shadow-sm">
        <table className="w-full text-xs text-start border-collapse">
          <thead>
            <tr className="bg-[var(--sand-100)] border-b border-[var(--sand-200)] text-[var(--text-2)] font-semibold">
              <th className="py-3 px-4 text-start w-12 font-mono">#</th>
              <th className="py-3 px-4 text-start font-sans">Scope Task Deliverable</th>
              <th className="py-3 px-4 text-end w-28 font-mono">Hours (Est.)</th>
              <th className="py-3 px-4 text-end w-32 font-mono">Amount (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sand-200)]">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[var(--sand-100)]/60 transition-colors"
              >
                <td className="py-3 px-4 font-mono text-[var(--text-3)]">
                  {String(row.id).padStart(2, '0')}
                </td>
                <td className="py-3 px-4 font-medium text-[var(--text-1)] leading-relaxed">
                  {lang === 'ar' ? row.taskAr : row.taskEn}
                </td>
                <td className="py-3 px-4 text-end font-mono">
                  {isEditing ? (
                    <input
                      type="text"
                      value={row.hours}
                      onChange={(e) => handleCellChange(row.id, 'hours', e.target.value)}
                      className="w-16 px-1.5 py-1 text-end rounded border border-[var(--sand-300)] bg-white text-xs outline-none focus:border-[var(--ink-500)]"
                    />
                  ) : (
                    <span className="text-[var(--text-2)]">{row.hours}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-end font-mono font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={row.amount}
                      onChange={(e) => handleCellChange(row.id, 'amount', e.target.value)}
                      className="w-20 px-1.5 py-1 text-end rounded border border-[var(--sand-300)] bg-white text-xs outline-none focus:border-[var(--ink-500)]"
                    />
                  ) : (
                    <span className="text-[var(--ink-900)]">{row.amount}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Freelancer Advisory Note */}
      <div className="p-3.5 rounded-xl bg-[var(--sand-100)] border border-[var(--sand-200)] text-xs text-[var(--text-3)] flex items-center justify-between">
        <span>Figures left as editable placeholders per instructions. Do not invent real proposal quotes.</span>
        <span className="font-mono text-[11px] text-[var(--ink-700)]">100% Scope Coverage</span>
      </div>
    </div>
  )
}
