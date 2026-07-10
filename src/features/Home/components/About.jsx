import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, CheckCircle2, Sparkles, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Target, title: t('about.feature1Title'), desc: t('about.feature1Desc'), color: 'from-gold-400 to-gold-500' },
    { icon: Users, title: t('about.feature2Title'), desc: t('about.feature2Desc'), color: 'from-gold-400 to-gold-500' },
    { icon: TrendingUp, title: t('about.feature3Title'), desc: t('about.feature3Desc'), color: 'from-gold-400 to-gold-500' },
    { icon: ClipboardCheck, title: t('about.feature4Title'), desc: t('about.feature4Desc'), color: 'from-gold-400 to-gold-500' }
  ];

  const benefits = [
    t('about.benefit1'),
    t('about.benefit2'),
    t('about.benefit3'),
    t('about.benefit4')
  ];

  const comparison = [
    { label: t('about.compare1'), bit: true, traditional: false },
    { label: t('about.compare2'), bit: true, traditional: false },
    { label: t('about.compare3'), bit: true, traditional: false },
    { label: t('about.compare4'), bit: true, traditional: false },
    { label: t('about.compare5'), bit: true, traditional: false }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold-100/40 dark:bg-gold-900/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 dark:bg-gold-900/30 border border-gold-200 dark:border-gold-700 text-gold-700 dark:text-gold-300 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {t('about.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* 4 Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 hover:border-gold-200 dark:hover:border-gold-700 transition-all shadow-sm hover:shadow-xl h-full">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Split: Image + Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-400 dark:from-gold-600 dark:to-gold-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600"
                alt="H?c t?p cùng LeoEducation"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white dark:border-gray-700"
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">{t('about.whyChoose')}</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 dark:bg-gold-900/50 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comparison table: LeoEducation vs Traditional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-8 text-center">
            {t('about.compareTitle')}
          </h3>
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 bg-slate-100 dark:bg-gray-800">
              <div className="p-4 font-semibold text-slate-700 dark:text-gray-300 text-sm">{t('about.compareFeature')}</div>
              <div className="p-4 font-semibold text-gold-700 dark:text-gold-400 text-sm text-center">{t('about.compareLeo')}</div>
              <div className="p-4 font-semibold text-slate-500 dark:text-gray-500 text-sm text-center">{t('about.compareTraditional')}</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-slate-50 dark:bg-gray-900/50'}`}>
                <div className="p-4 text-sm text-slate-700 dark:text-gray-300">{row.label}</div>
                <div className="p-4 text-center">
                  {row.bit ? (
                    <CheckCircle2 className="w-5 h-5 text-gold-500 mx-auto" />
                  ) : (
                    <span className="text-red-400">?</span>
                  )}
                </div>
                <div className="p-4 text-center">
                  {row.traditional ? (
                    <CheckCircle2 className="w-5 h-5 text-gold-500 mx-auto" />
                  ) : (
                    <span className="text-red-400">?</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
