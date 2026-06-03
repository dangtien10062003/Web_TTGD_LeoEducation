import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question4'), answer: t('faq.answer4') },
    { question: t('faq.question5'), answer: t('faq.answer5') }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            {t('faq.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('faq.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-800 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-gray-400 mb-4">
            {t('faq.stillHaveQuestions')}
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all"
          >
            {t('faq.contactUs')}
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
