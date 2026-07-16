import React from 'react';
import { motion } from 'framer-motion';
import { Award, ClipboardCheck, Map, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LearningPath = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: ClipboardCheck, title: t('learningPath.step1Title'), desc: t('learningPath.step1Desc'), tint: 'bg-[#fff7d8]' },
    { icon: Map, title: t('learningPath.step2Title'), desc: t('learningPath.step2Desc'), tint: 'bg-[#eefaf6]' },
    { icon: TrendingUp, title: t('learningPath.step3Title'), desc: t('learningPath.step3Desc'), tint: 'bg-[#fff4ee]' },
    { icon: Award, title: t('learningPath.step4Title'), desc: t('learningPath.step4Desc'), tint: 'bg-[#eef4ff]' },
  ];

  return (
    <section className="kid-section kid-section-soft kid-cloud-top kid-cloud-divider dark:bg-navy-950">
      <div className="kid-dots absolute right-[7%] top-24 h-44 w-44 opacity-60" />
      <div className="absolute -left-24 top-32 h-72 w-72 rounded-full border-[18px] border-gold-300/60" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <span className="kid-pill">
            <Map className="h-5 w-5" />
            {t('learningPath.badge')}
          </span>
          <h2 className="kid-title lux-underline mt-5 text-4xl md:text-5xl">
            Lộ trình học cá nhân hóa theo phương pháp Scaffolded
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-navy-600 md:text-lg">
            LeoEducation đánh giá năng lực đầu vào, xây dựng lộ trình riêng, theo dõi liên tục và báo cáo định kỳ để phụ huynh nắm rõ tiến bộ của con.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="lux-reveal-card kid-activity-row flex flex-col gap-5 p-6 md:flex-row md:items-center md:p-7"
            >
              <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] ${step.tint} text-gold-700 shadow-sm`}>
                <step.icon className="h-11 w-11" />
              </div>
              <div>
                <div className="mb-2 inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-black text-gold-700">
                  Bước {index + 1}
                </div>
                <h3 className="text-2xl font-black text-navy-950">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy-700">{step.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
