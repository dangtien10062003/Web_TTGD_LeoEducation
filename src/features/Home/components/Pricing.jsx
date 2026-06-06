import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Gift, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';

export const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPromo, setSelectedPromo] = React.useState(null);

  // Trial & promotion section (từ trang Bit)
  const promotions = [
    {
      icon: BookOpen,
      title: t('pricing.trialTitle'),
      desc: t('pricing.trialDesc'),
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Gift,
      title: t('pricing.giftTitle'),
      desc: t('pricing.giftDesc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Sparkles,
      title: t('pricing.discountTitle'),
      desc: t('pricing.discountDesc'),
      color: 'from-gold-500 to-gold-600'
    },
    {
      icon: Check,
      title: t('pricing.pathTitle'),
      desc: t('pricing.pathDesc'),
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const faq = [
    { q: t('pricing.faq1Q'), a: t('pricing.faq1A') },
    { q: t('pricing.faq2Q'), a: t('pricing.faq2A') },
    { q: t('pricing.faq3Q'), a: t('pricing.faq3A') },
    { q: t('pricing.faq4Q'), a: t('pricing.faq4A') }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4">
        {/* Trial registration section */}
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
            <Gift className="w-4 h-4" />
            {t('pricing.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('pricing.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* 4 Promotion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {promotions.map((promo, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedPromo(promo)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 hover:border-transparent transition-all shadow-sm hover:shadow-xl text-center h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${promo.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <promo.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{promo.title}</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">{promo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal
          isOpen={Boolean(selectedPromo)}
          onClose={() => setSelectedPromo(null)}
          title={selectedPromo?.title || 'Chi tiết ưu đãi'}
        >
          {selectedPromo && (
            <div className="space-y-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedPromo.color} flex items-center justify-center shadow-lg`}>
                <selectedPromo.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{selectedPromo.desc}</p>
              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4">
                <p className="text-sm font-semibold text-teal-800 mb-1">Gợi ý tiếp theo</p>
                <p className="text-sm text-teal-700">Đăng ký tư vấn để LeoEducation kiểm tra trình độ và đề xuất lộ trình phù hợp.</p>
              </div>
            </div>
          )}
        </Modal>

        {/* Registration form CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-teal-500 to-navy-600 rounded-3xl p-8 md:p-10 text-center text-white shadow-2xl shadow-teal-500/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('pricing.registerTitle')}</h3>
            <p className="text-teal-100 mb-8 text-lg">{t('pricing.registerDesc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                {t('pricing.registerCta')}
              </a>
              <a href="tel:0703428300" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                {t('pricing.callNow')}
              </a>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-8 text-center">{t('pricing.faqTitle')}</h3>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 shadow-sm"
              >
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-start gap-2">
                  <span className="text-teal-500 font-bold">Q:</span> {item.q}
                </h4>
                <p className="text-slate-600 dark:text-gray-400 pl-6">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
