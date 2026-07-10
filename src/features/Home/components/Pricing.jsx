import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, Gift, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal';

export const Pricing = () => {
  const { t } = useTranslation();
  const [selectedPromo, setSelectedPromo] = React.useState(null);

  const promotions = [
    {
      icon: BookOpen,
      title: t('pricing.trialTitle'),
      desc: t('pricing.trialDesc'),
    },
    {
      icon: Gift,
      title: t('pricing.giftTitle'),
      desc: t('pricing.giftDesc'),
    },
    {
      icon: Sparkles,
      title: t('pricing.discountTitle'),
      desc: t('pricing.discountDesc'),
    },
    {
      icon: Check,
      title: t('pricing.pathTitle'),
      desc: t('pricing.pathDesc'),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 transition-colors duration-200 dark:bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent dark:via-gold-800" />
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-gold-100/60 blur-3xl dark:bg-gold-900/20" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-gold-50 blur-3xl dark:bg-gold-900/10" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-bold text-gold-700 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-300">
            <Gift className="h-4 w-4" />
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            <span className="text-gradient">{t('pricing.title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-600 dark:text-gold-100/70">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {promotions.map((promo, index) => (
            <motion.button
              key={promo.title}
              type="button"
              onClick={() => setSelectedPromo(promo)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group h-full rounded-2xl border border-gold-100 bg-white p-6 text-center shadow-lg shadow-gold-900/5 transition hover:border-gold-300 hover:shadow-xl hover:shadow-gold-900/10 dark:border-gold-800/60 dark:bg-navy-900"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-200 to-gold-400 text-navy-900 shadow-lg ring-1 ring-gold-300 transition group-hover:scale-105">
                <promo.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-gold-50">{promo.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-gold-100/65">{promo.desc}</p>
            </motion.button>
          ))}
        </div>

        <Modal
          isOpen={Boolean(selectedPromo)}
          onClose={() => setSelectedPromo(null)}
          title={selectedPromo?.title || 'Chi tiết ưu đãi'}
        >
          {selectedPromo && (
            <div className="space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-200 to-gold-400 text-navy-900 shadow-lg">
                <selectedPromo.icon className="h-8 w-8" />
              </div>
              <p className="text-sm leading-relaxed text-navy-600 dark:text-gold-100/70">{selectedPromo.desc}</p>
              <div className="rounded-2xl border border-gold-100 bg-gold-50 p-4 dark:border-gold-800/60 dark:bg-gold-900/25">
                <p className="mb-1 text-sm font-semibold text-gold-800 dark:text-gold-200">Gợi ý tiếp theo</p>
                <p className="text-sm text-gold-700 dark:text-gold-100/75">Đăng ký tư vấn để LeoEducation kiểm tra trình độ và đề xuất lộ trình phù hợp.</p>
              </div>
            </div>
          )}
        </Modal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-[28px] border border-gold-200 bg-gold-50 p-8 text-center shadow-2xl shadow-gold-900/10 md:p-10 dark:border-gold-800/70 dark:bg-navy-900">
            <h3 className="text-2xl font-black text-navy-900 md:text-3xl dark:text-gold-50">{t('pricing.registerTitle')}</h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600 dark:text-gold-100/75">{t('pricing.registerDesc')}</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#contact-form" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-200 to-gold-400 px-8 py-4 text-base font-black text-navy-900 shadow-lg shadow-gold-700/10 ring-1 ring-gold-300 transition hover:-translate-y-1 hover:from-gold-300 hover:to-gold-500">
                {t('pricing.registerCta')}
              </a>
              <a href="tel:0866123170" className="inline-flex items-center justify-center rounded-full border border-gold-300 bg-white px-8 py-4 text-base font-black text-gold-700 shadow-sm transition hover:-translate-y-1 hover:bg-gold-50 dark:border-gold-800 dark:bg-navy-950 dark:text-gold-200">
                {t('pricing.callNow')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
