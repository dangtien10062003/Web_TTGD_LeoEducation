import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question4'), answer: t('faq.answer4') },
    { question: t('faq.question5'), answer: t('faq.answer5') },
  ];

  return (
    <section className="kid-section kid-section-soft kid-cloud-top dark:bg-navy-950">
      <div className="absolute right-[-90px] top-28 h-72 w-72 rounded-full border-[18px] border-gold-400/70" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="kid-soft-card bg-[#fff8df] p-8 dark:bg-navy-900"
          >
            <span className="kid-pill">
              <HelpCircle className="h-4 w-4" />
              {t('faq.badge')}
            </span>
            <h2 className="kid-title lux-underline mt-5 text-4xl md:text-5xl dark:text-gold-50">{t('faq.title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600 dark:text-gold-100/75">{t('faq.subtitle')}</p>
            <div className="mt-7 grid gap-3 text-sm font-bold text-navy-700 dark:text-gold-100/80">
              <div className="rounded-2xl border border-gold-100 bg-gold-50/80 px-4 py-3 dark:border-gold-800/60 dark:bg-gold-900/20">Tư vấn lộ trình học phù hợp từng học sinh</div>
              <div className="rounded-2xl border border-gold-100 bg-white px-4 py-3 dark:border-gold-800/60 dark:bg-navy-800">Phản hồi rõ ràng cho phụ huynh sau mỗi giai đoạn</div>
            </div>
            <a
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-200 to-gold-400 px-6 py-3 text-sm font-black uppercase text-navy-900 shadow-lg shadow-gold-700/10 ring-1 ring-gold-300 transition hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-500 dark:shadow-black/20"
            >
              <MessageCircle className="h-5 w-5" />
              {t('faq.contactUs')}
            </a>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={`lux-reveal-card kid-soft-card overflow-hidden bg-white shadow-md shadow-navy-900/5 transition-all dark:bg-navy-900/90 dark:shadow-black/20 ${isOpen ? 'border-gold-400 dark:border-gold-500' : 'border-gold-100 dark:border-gold-800/60'}`}
                >
                  <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff6e8] text-sm font-black text-gold-600 ring-1 ring-gold-200 dark:bg-gold-900/40 dark:text-gold-200 dark:ring-gold-800">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-base font-black text-navy-900 md:text-lg dark:text-gold-50">{faq.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gold-600 dark:text-gold-300">
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gold-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-navy-600 md:pl-20 dark:border-gold-800/60 dark:text-gold-100/75">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

