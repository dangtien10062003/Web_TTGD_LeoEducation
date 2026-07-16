import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Loader2, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/Card';
import { Modal } from '../../../components/Modal';
import { publicApi } from '../../../services/api';

export const Testimonials = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let mounted = true;

    publicApi
      .testimonials()
      .then((res) => {
        if (!mounted) return;
        setItems(res.data || []);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setItems([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [t]);

  if (loading) return (
    <section className="kid-section kid-section-cream dark:bg-navy-950">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-gold-600 dark:text-gold-400" />
      </div>
    </section>
  );

  if (!loading && items.length === 0) return null;

  return (
    <section className="kid-section kid-section-soft kid-cloud-top kid-cloud-divider dark:bg-navy-950">
      <div className="kid-dots absolute right-[7%] top-28 h-44 w-44 opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="kid-pill mb-5"
          >
            <MessageSquare className="w-4 h-4" />
            {t('tutors.badge')}
          </motion.span>
          <h2 className="kid-title lux-underline text-4xl md:text-5xl">
            {t('tutors.title')}
          </h2>
          <p className="mt-5 text-lg text-navy-600 dark:text-gold-100/70">{t('tutors.subtitle')}</p>
        </motion.div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 items-start">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              initial={{ opacity: 0, y: 60, rotate: index === 0 ? -2 : index === 2 ? 2 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 80 }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{ marginTop: index === 1 ? '2rem' : 0 }}
              className="cursor-pointer"
            >
              <Card variant="flat" className="lux-reveal-card kid-soft-card h-full bg-white shadow-lg shadow-navy-900/5" hover={false}>
                <div className="p-6">
                  <motion.div initial={{ rotate: -20, scale: 0 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}>
                    <Quote className="mb-4 h-10 w-10 text-gold-600" />
                  </motion.div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating || 0)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.4 + i * 0.05, type: 'spring' }}>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.5 }} className="text-navy-600 dark:text-gold-100/70 mb-6 leading-relaxed text-[15px]">
                    &ldquo;{item.content}&rdquo;
                  </motion.p>

                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.6 }} className="flex items-center gap-4 pt-4 border-t border-gold-100 dark:border-gold-800/60">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-white">
                        {item.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold-500 dark:bg-gold-600 rounded-full flex items-center justify-center border-2 border-white dark:border-navy-900">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 dark:text-gold-50">{item.name}</h4>
                      <p className="text-sm text-navy-500 dark:text-gold-100/60">{item.role}</p>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                onClick={() => setSelectedItem(items[active])}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="cursor-pointer"
              >
              <Card variant="flat" className="lux-reveal-card kid-soft-card bg-white shadow-lg shadow-navy-900/5" hover={false}>
                  <div className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-gold-600" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(items[active]?.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-navy-600 dark:text-gold-100/70 mb-6">&ldquo;{items[active]?.content}&rdquo;</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gold-100 dark:border-gold-800/60">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-white font-bold text-lg">
                        {items[active]?.name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-gold-50">{items[active]?.name}</h4>
                        <p className="text-sm text-navy-500 dark:text-gold-100/60">{items[active]?.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setActive(p => p === 0 ? items.length - 1 : p - 1)}
                className="p-2 rounded-full bg-gold-50 dark:bg-navy-800 border border-gold-100 dark:border-gold-800/60 hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-navy-600 dark:text-gold-100/70" />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-gold-500 dark:bg-gold-400 w-6' : 'bg-gold-200 dark:bg-gold-900'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActive(p => p === items.length - 1 ? 0 : p + 1)}
                className="p-2 rounded-full bg-gold-50 dark:bg-navy-800 border border-gold-100 dark:border-gold-800/60 hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-navy-600 dark:text-gold-100/70" />
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.name || 'Chi tiết đánh giá'}
        >
          {selectedItem && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-white font-bold text-xl">
                  {selectedItem.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{selectedItem.name}</p>
                  <p className="text-sm text-slate-500">{selectedItem.role}</p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(selectedItem.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-slate-600">&ldquo;{selectedItem.content}&rdquo;</p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

