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
    <section className="kid-section kid-section-cream kid-cloud-top kid-cloud-divider dark:bg-navy-950">

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="kid-pill mb-5">
            <Gift className="h-4 w-4" />
            {t('pricing.badge')}
          </span>
          <h2 className="kid-title lux-underline text-4xl md:text-5xl">
            {t('pricing.title')}
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
              className="lux-reveal-card kid-soft-card group h-full bg-[#fff7d8] p-6 text-center transition hover:-translate-y-2 hover:shadow-xl dark:bg-navy-900"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gold-600 shadow-sm transition group-hover:scale-105">
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
                <p className="text-sm text-gold-700 dark:text-gold-100/75">Đăng ký tư vấn để LEO Education kiểm tra trình độ và đề xuất lộ trình phù hợp.</p>
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
          <div className="kid-soft-card bg-[#fff6e8] p-8 text-center md:p-10 dark:bg-navy-900">
            <h3 className="text-2xl font-black text-navy-900 md:text-3xl dark:text-gold-50">{t('pricing.registerTitle')}</h3>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600 dark:text-gold-100/75">{t('pricing.registerDesc')}</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#contact-form" className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 transition hover:-translate-y-1 hover:bg-gold-600">
                {t('pricing.registerCta')}
              </a>
              <a href="tel:0866123170" className="inline-flex items-center justify-center rounded-lg border border-navy-600 bg-navy-800 px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:border-gold-500/60">
                {t('pricing.callNow')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

