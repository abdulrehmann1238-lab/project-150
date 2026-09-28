export interface LegalSection {
  id: string
  titleEn: string
  titleAr: string
  contentEn: string[]
  contentAr: string[]
}

export interface LegalDocument {
  titleEn: string
  titleAr: string
  lastUpdated: string
  sections: LegalSection[]
}

export const LEGAL_DOCS: Record<'terms' | 'privacy' | 'refunds' | 'cookies', LegalDocument> = {
  terms: {
    titleEn: 'Terms of Service',
    titleAr: 'شروط الخدمة',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'acceptance',
        titleEn: '1. Acceptance of Terms',
        titleAr: '1. قبول الشروط',
        contentEn: [
          'By accessing or playing games on Layali Games, you agree to abide by these Terms of Service and all applicable regional laws and regulations.',
          'If you do not agree with any part of these terms, you should refrain from using our web application or purchasing premium passes.',
        ],
        contentAr: [
          'بالوصول إلى منصة ألعاب ليالي أو تشغيل أي من ألعابها، فإنك توافق على الالتزام بهذه الشروط والأنظمة المحلية المعمول بها.',
          'إذا كنت لا توافق على أي بند من هذه الشروط، يرجى التوقف عن استخدام المنصة أو شراء الاشتراكات.',
        ],
      },
      {
        id: 'eligibility',
        titleEn: '2. Eligibility and Access',
        titleAr: '2. الأهلية والاستخدام',
        contentEn: [
          'Layali Games is a casual HTML5 gaming portal designed for players across the Gulf region and international audiences.',
          'No user account is required to enjoy free public games. Premium catalog access requires valid digital entitlement through Razer Gold payments.',
        ],
        contentAr: [
          'منصة ليالي هي بوابة لألعاب HTML5 الخفيفة مخصصة لجمهور الخليج ومحبي الألعاب الترفيهية.',
          'لا يُشترط إنشاء حساب للاستمتاع بالألعاب المجانية العامة. يتطلب الوصول للمكتبة المميزة تفعيل اشتراك رقمي عبر Razer Gold.',
        ],
      },
      {
        id: 'payments',
        titleEn: '3. Premium Access & Razer Gold Payments',
        titleAr: '3. الاشتراكات المميزة ومدفوعات Razer Gold',
        contentEn: [
          'Premium subscriptions provide unlimited access to exclusive games for a 30-day term at RG 10 (or promotional rates as displayed).',
          'Payments may be completed using a direct Razer Gold wallet balance or by redeeming an authorized 16-character Razer Gold PIN.',
          'Access is granted immediately upon authoritative webhook confirmation from the Razer Gold processing gateway.',
        ],
        contentAr: [
          'تمنح الاشتراكات المميزة وصولاً غير محدود للألعاب الحصرية لمدة 30 يوماً مقابل 10 RG (أو حسب العروض المعلنة).',
          'يمكن سداد الدفعات إما عبر رصيد محفظة Razer Gold المباشر أو عبر استرداد رمز PIN رسمي مكوّن من 16 حرفاً.',
          'يتم تفعيل الاشتراك فوراً بعد تأكيد العملية من خادم الدفع (Webhook) لضمان موثوقية السداد.',
        ],
      },
      {
        id: 'fair-play',
        titleEn: '4. Fair Play & Acceptable Use',
        titleAr: '4. اللعب النظيف والاستخدام المقبول',
        contentEn: [
          'Players must not exploit bugs, deploy automated gameplay bots, or attempt to reverse-engineer server endpoints.',
          'Any attempt to brute-force payment PINs or spoof webhook callbacks will result in permanent device-level blacklisting.',
        ],
        contentAr: [
          'يُحظر استغلال أي ثغرات برمجية أو استخدام برامج تشغيل آلية غير مصرح بها.',
          'أي محاولات لتخمين رموز الدفع أو تزوير إشعارات السداد ستؤدي لحظر الجهاز بصورة نهائية.',
        ],
      },
      {
        id: 'intellectual-property',
        titleEn: '5. Intellectual Property',
        titleAr: '5. الملكية الفكرية',
        contentEn: [
          'All game titles, artwork, audio assets, trademarks, and codebases displayed on Layali Games are the property of their respective creators and licensors.',
          'Razer Gold is a registered trademark of Razer Inc. References are purely descriptive to indicate compatible payment methods.',
        ],
        contentAr: [
          'جميع الألعاب والرسومات والمؤثرات الصوتية والعلامات التجارية المعروضة محفوظة لأصحابها ومرخصيها.',
          'تُعد Razer Gold علامة تجارية مسجلة لشركة Razer Inc.، وتستخدم الإشارة إليها هنا بشكل وصفي لتوضيح وسائل الدفع المتوافقة.',
        ],
      },
      {
        id: 'governing-law',
        titleEn: '6. Governing Law & Jurisdiction',
        titleAr: '6. القانون الحاكم وفض النزاعات',
        contentEn: [
          'These terms shall be governed by and construed in accordance with commercial laws applicable in the client’s designated jurisdiction.',
          'Any dispute arising from or related to the service will be resolved via amicable mediation before formal arbitration.',
        ],
        contentAr: [
          'تخضع هذه الشروط وتُفسر وفقاً للأنظمة التجارية المعمول بها في النطاق القضائي المحدد للمشروع.',
          'يتم حل أي نزاع ينشأ عن الخدمة عبر التسوية الودية قبل اللجوء للتحكيم النظامي.',
        ],
      },
    ],
  },
  privacy: {
    titleEn: 'Privacy Policy',
    titleAr: 'سياسة الخصوصية',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'collection',
        titleEn: '1. Information We Collect',
        titleAr: '1. البيانات التي نجمعها',
        contentEn: [
          'We believe in radical data privacy. To play free games, we collect zero personal identifiers, names, phone numbers, or email addresses.',
          'When processing Razer Gold payments, we only receive transaction tokens, order identifiers, and masked PIN references. We never store full PINs or card details on our servers.',
        ],
        contentAr: [
          'نؤمن بأعلى معايير الخصوصية. لتشغيل الألعاب المجانية، لا نطلب أي بيانات شخصية أو أرقام هواتف أو بريد إلكتروني.',
          'عند إتمام الدفع عبر Razer Gold، نستلم فقط معرّف العملية والرمز المشفر المشطوب. لا نقوم بتخزين رموز PIN الكاملة في خوادمنا مطلقاً.',
        ],
      },
      {
        id: 'usage',
        titleEn: '2. How Data is Used',
        titleAr: '2. كيفية استخدام البيانات',
        contentEn: [
          'Anonymous session tokens and entitlement timestamps are maintained locally in your browser storage to keep your Premium games unlocked.',
          'Aggregated analytics (such as popular game play counts) are computed without attaching personal identities.',
        ],
        contentAr: [
          'يتم حفظ تصريح الاشتراك المميز وتاريخ الانتهاء محلياً في متصفحك لإبقاء ألعابك مفتوحة بسلاسة.',
          'تُستخدم الإحصاءات العامة (مثل عدد مرات لعب كل لعبة) بشكل مجهول الهوية لتحسين تجربة المنصة.',
        ],
      },
      {
        id: 'cookies',
        titleEn: '3. Local Storage & Preferences',
        titleAr: '3. التخزين المحلي وتفضيلات المستخدم',
        contentEn: [
          'We use lightweight browser storage strictly for essential preferences: your chosen language (Arabic/English) and your active pass entitlement.',
          'You may reset this data at any moment using the "Reset demo" option in the page footer.',
        ],
        contentAr: [
          'نستخدم ذاكرة المتصفح المحلية فقط لحفظ تفضيلاتك الأساسية: لغة العرض وتاريخ صلاحية الاشتراك.',
          'يمكنك مسح هذه البيانات بالكامل في أي وقت عبر خيار "إعادة تعيين المنصة" في أسفل الصفحة.',
        ],
      },
      {
        id: 'third-parties',
        titleEn: '4. Third-Party Services',
        titleAr: '4. الأطراف الثالثة وخدمات الدفع',
        contentEn: [
          'Payment interactions are routed directly to Razer Gold secure APIs. Their privacy policy governs the processing of wallet credentials.',
        ],
        contentAr: [
          'تتم معالجة المدفوعات عبر بوابات Razer Gold الآمنة مباشرة، وتخضع بيانات المحفظة لسياسة الخصوصية الخاصة بمزود الخدمة.',
        ],
      },
    ],
  },
  refunds: {
    titleEn: 'Refund Policy',
    titleAr: 'سياسة الاسترجاع',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'digital-nature',
        titleEn: '1. Nature of Digital Goods',
        titleAr: '1. طبيعة الخدمات والمحتوى الرقمي',
        contentEn: [
          'Layali Games provides instant digital access to its premium HTML5 gaming library immediately upon payment confirmation.',
          'Because the service is fully delivered the moment the webhook confirms your payment, purchases are generally final and non-refundable.',
        ],
        contentAr: [
          'توفر منصة ليالي وصولاً رقمياً فورياً لمكتبة الألعاب المميزة بمجرد تأكيد عملية السداد بنجاح.',
          'نظراً لتقديم الخدمة وتسليم المحتوى الرقمي فورياً، تُعتبر عمليات الشراء نهائية وغير قابلة للإلغاء كقاعدة عامة.',
        ],
      },
      {
        id: 'pin-redemptions',
        titleEn: '2. Razer Gold PIN Redemptions',
        titleAr: '2. استرداد رموز Razer Gold PIN',
        contentEn: [
          'Razer Gold PINs represent one-time digital vouchers. Once redeemed and authorized by the payment gateway, the PIN value is consumed and cannot be reversed or returned to your retail voucher.',
          'If you encounter an issue where a valid PIN was deducted without unlocking access, our support team can verify the webhook log and manually restore your entitlement.',
        ],
        contentAr: [
          'تُعتبر قسائم Razer Gold PIN رموزاً رقمية تستخدم لمرة واحدة. بمجرد تأكيد استرداد الرمز في النظام، لا يمكن التراجع عن العملية أو إعادة شحن القسيمة.',
          'إذا واجهت أي خلل فني تم فيه خصم الرمز دون فتح المحتوى، يمكن لفريق الدعم التحقق من سجل المعاملة وتفعيل اشتراكك يدوياً.',
        ],
      },
      {
        id: 'technical-failures',
        titleEn: '3. Technical Failures & Compensation',
        titleAr: '3. الأعطال الفنية والتعويض',
        contentEn: [
          'If severe platform downtime prevents access to Premium games for more than 48 continuous hours, affected users may receive a complimentary 7-day extension to their active pass.',
        ],
        contentAr: [
          'في حال حدوث انقطاع فني شامل يمنع تشغيل الألعاب المميزة لأكثر من 48 ساعة متواصلة، يتم تعويض المشتركين بتمديد مجاني لمدة 7 أيام.',
        ],
      },
      {
        id: 'contact-support',
        titleEn: '4. Submitting a Support Claim',
        titleAr: '4. تقديم طلب مساعدة أو مراجعة',
        contentEn: [
          'To request a payment investigation, contact our helpdesk with your Order Reference (e.g., LYL-8F3K29) and the date of transaction.',
        ],
        contentAr: [
          'لتقديم طلب مراجعة معاملة دفع، يرجى التواصل مع فريق الدعم متضمناً رقم المرجع (مثل LYL-8F3K29) وتاريخ المعاملة.',
        ],
      },
    ],
  },
  cookies: {
    titleEn: 'Cookie & Storage Policy',
    titleAr: 'سياسة ملفات الارتباط والتخزين',
    lastUpdated: 'September 2026',
    sections: [
      {
        id: 'what-we-use',
        titleEn: '1. What Storage We Use',
        titleAr: '1. ما نستخدمه من تقنيات التخزين',
        contentEn: [
          'Layali Games does not use intrusive marketing cookies or cross-site tracking beacons.',
          'We exclusively use browser LocalStorage for strictly necessary functionality: maintaining your chosen language and active Premium access duration.',
        ],
        contentAr: [
          'لا تستخدم منصة ليالي أي ملفات تتبع إعلانية أو أدوات مراقبة خارجية متطفلة.',
          'نعتمد حصرياً على الذاكرة المحلية للمتصفح لتخزين البيانات الأساسية فقط: تفضيل اللغة وحالة الاشتراك المميز.',
        ],
      },
      {
        id: 'management',
        titleEn: '2. Managing Your Preferences',
        titleAr: '2. إدارة وتعديل تفضيلاتك',
        contentEn: [
          'You may clear your stored preferences at any time by wiping your browser history or by clicking "Reset demo" located in the platform footer.',
        ],
        contentAr: [
          'يمكنك مسح التفضيلات في أي لحظة عبر مسح ذاكرة المتصفح أو بالنقر على خيار "إعادة تعيين المنصة" في أسفل الموقع.',
        ],
      },
    ],
  },
}
