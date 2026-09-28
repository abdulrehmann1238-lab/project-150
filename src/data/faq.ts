export interface FAQItem {
  id: string
  questionEn: string
  questionAr: string
  answerEn: string
  answerAr: string
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    questionEn: 'How does Razer Gold payment work?',
    questionAr: 'كيف تعمل طريقة الدفع بواسطة Razer Gold؟',
    answerEn: 'You can pay using your direct Razer Gold wallet balance via a secure hosted approval window, or redeem a 16-character Razer Gold PIN purchased from any authorized retailer across the Gulf region. Your 30-day Premium pass unlocks instantly when our webhook receives confirmation.',
    answerAr: 'يمكنك الدفع مباشرة باستخدام رصيد محفظة Razer Gold الخاصة بك عبر نافذة سداد آمنة، أو إدخال رمز PIN المكون من 16 حرفاً المتاح لدى المتاجر المعتمدة في دول الخليج. يتم تفعيل اشتراكك فور وصول تأكيد الويب هوك لخوادمنا.',
  },
  {
    id: 'faq-2',
    questionEn: 'Where can I purchase a Razer Gold PIN?',
    questionAr: 'من أين يمكنني شراء بطاقة أو رمز Razer Gold PIN؟',
    answerEn: 'Razer Gold PINs are widely available online and at hypermarkets, gaming stores, and digital kiosks across Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. You can also purchase digital codes directly through banking apps and telecom billing portals.',
    answerAr: 'تتوفر بطاقات Razer Gold في المتاجر الكبرى، محلات الألعاب، وأجهزة الدفع الرقمية في المملكة العربية السعودية، الإمارات، الكويت، قطر، البحرين، وعُمان، بالإضافة إلى إمكانية الشراء المباشر عبر التطبيقات البنكية وشركات الاتصالات.',
  },
  {
    id: 'faq-3',
    questionEn: 'Can I combine multiple PINs if one has insufficient balance?',
    questionAr: 'هل يمكنني دمج أكثر من بطاقة إذا كان رصيد البطاقة الأولى أقل من المطلوب؟',
    answerEn: 'Yes! If you enter a PIN worth RG 5, our payment interface will automatically give you the option to add a second PIN so you can combine values to meet the RG 10 total.',
    answerAr: 'نعم بالتأكيد! إذا أدخلت رمزاً بقيمة 5 RG، ستتيح لك واجهة الدفع تلقائياً إضافة رمز ثانٍ لدمج الرصيد واستكمال مبلغ 10 RG المطلوب للاشتراك.',
  },
  {
    id: 'faq-4',
    questionEn: 'Do games require app downloads or installations?',
    questionAr: 'هل تتطلب الألعاب تحميل تطبيقات أو تثبيت أي ملفات؟',
    answerEn: 'No downloads required. All titles run on lightweight HTML5 technology directly inside your mobile or desktop browser (Safari, Chrome, Samsung Internet). Simply tap and play in seconds.',
    answerAr: 'لا حاجة لأي تحميل. تعمل كافة الألعاب بتقنية HTML5 الخفيفة مباشرة داخل متصفح هاتفك أو حاسوبك (سفاري، كروم، متصفح سامسونج). بنقرة واحدة تبدأ اللعب فوراً.',
  },
  {
    id: 'faq-5',
    questionEn: 'What happens when my 30-day Premium pass expires?',
    questionAr: 'ماذا يحدث بعد انتهاء مدة الـ 30 يوماً للاشتراك المميز؟',
    answerEn: 'When your pass expires, you retain unlimited access to all 14+ free catalog games. You can extend or renew your Premium access anytime with another Razer Gold payment.',
    answerAr: 'عند انتهاء المدة، يظل بإمكانك الاستمتاع بجميع الألعاب المجانية دون توقف. ويمكنك تمديد أو تجديد اشتراكك المميز في أي وقت بسهولة.',
  },
]
