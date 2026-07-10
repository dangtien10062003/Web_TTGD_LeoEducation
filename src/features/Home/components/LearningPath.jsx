import React from 'react';
import { motion } from 'framer-motion';
import { Award, ClipboardCheck, Map, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LearningPath = () => {
  const { t } = useTranslation();

  const steps = [
    { number: '01', icon: ClipboardCheck, title: t('learningPath.step1Title'), desc: t('learningPath.step1Desc'), position: 'lg:left-0 lg:top-0' },
    { number: '02', icon: Map, title: t('learningPath.step2Title'), desc: t('learningPath.step2Desc'), position: 'lg:right-0 lg:top-0' },
    { number: '03', icon: TrendingUp, title: t('learningPath.step3Title'), desc: t('learningPath.step3Desc'), position: 'lg:left-0 lg:bottom-0' },
    { number: '04', icon: Award, title: t('learningPath.step4Title'), desc: t('learningPath.step4Desc'), position: 'lg:right-0 lg:bottom-0' },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 transition-colors duration-200 dark:bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent dark:via-gold-800" />
      <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold-100/50 blur-3xl dark:bg-gold-900/10" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-bold text-gold-700 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-300">
            <Map className="h-4 w-4" />
            {t('learningPath.badge')}
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            <span className="text-gradient">{t('learningPath.title')}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy-600 dark:text-gold-100/70">{t('learningPath.subtitle')}</p>
        </motion.div>

        <div className="relative mx-auto min-h-[720px] max-w-6xl lg:min-h-[560px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-300 lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-200 bg-white/70 shadow-2xl shadow-gold-900/10 lg:block dark:border-gold-800 dark:bg-navy-900/70" />

          <div className="relative z-10 mx-auto mb-8 h-64 w-64 lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:h-72 lg:w-72 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex h-full w-full flex-col items-center justify-center rounded-full border border-gold-200 bg-gradient-to-br from-white via-gold-50 to-gold-100 p-8 text-center shadow-2xl shadow-gold-900/10 dark:border-gold-800 dark:from-navy-900 dark:via-navy-900 dark:to-gold-950/50"
            >
              <span className="text-sm font-black uppercase tracking-[0.22em] text-gold-600">{t('learningPath.methodTitle')}</span>
              <p className="mt-4 text-sm leading-relaxed text-navy-600 dark:text-gold-100/75">{t('learningPath.methodDesc')}</p>
            </motion.div>
          </div>

          <div className="grid gap-5 lg:block">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className={`rounded-2xl border border-gold-100 bg-white p-5 shadow-lg shadow-gold-900/5 dark:border-gold-800/60 dark:bg-navy-900 lg:absolute lg:w-[330px] ${step.position}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-400 text-navy-900 shadow-md ring-1 ring-gold-300">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-gold-600">{step.number}</div>
                    <h3 className="text-lg font-black text-navy-800 dark:text-gold-50">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-gold-100/65">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
