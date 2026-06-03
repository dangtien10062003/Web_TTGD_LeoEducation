import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Map, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LearningPath = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      icon: ClipboardCheck,
      title: t('learningPath.step1Title'),
      desc: t('learningPath.step1Desc'),
      color: 'from-teal-500 to-teal-600'
    },
    {
      number: '02',
      icon: Map,
      title: t('learningPath.step2Title'),
      desc: t('learningPath.step2Desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '03',
      icon: TrendingUp,
      title: t('learningPath.step3Title'),
      desc: t('learningPath.step3Desc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '04',
      icon: Award,
      title: t('learningPath.step4Title'),
      desc: t('learningPath.step4Desc'),
      color: 'from-gold-500 to-gold-600'
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-200">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gold-100/40 dark:bg-gold-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-6"
          >
            <Map className="w-4 h-4" />
            {t('learningPath.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('learningPath.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('learningPath.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-300 via-blue-300 via-purple-300 to-gold-300 dark:from-teal-700 dark:via-blue-700 dark:via-purple-700 dark:to-gold-700 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              className="relative z-10"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 transition-all shadow-sm hover:shadow-xl text-center group">
                {/* Number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {step.number}
                </div>

                {/* Icon */}
                <step.icon className="w-8 h-8 text-teal-500 dark:text-teal-400 mx-auto mb-3" />

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow between steps (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4 lg:hidden">
                  <ArrowRight className="w-6 h-6 text-teal-400 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Scaffolded method description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-3xl p-8 md:p-10 border border-teal-100 dark:border-teal-800">
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-4 text-center">
              {t('learningPath.methodTitle')}
            </h3>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-center mb-6">
              {t('learningPath.methodDesc')}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[0, 1, 2].map(i => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg shadow-lg">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold text-navy-700 dark:text-white text-sm mb-1">
                    {t(`learningPath.methodStep${i + 1}Title`)}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    {t(`learningPath.methodStep${i + 1}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
