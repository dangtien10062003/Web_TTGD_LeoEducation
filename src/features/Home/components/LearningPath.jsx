import React from 'react';
import { motion } from 'framer-motion';
import { Award, ClipboardCheck, Map, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InfiniteMenu from '../../../components/InfiniteMenu';

const createStepImage = ({ index, title, palette }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${palette[0]}"/>
          <stop offset="1" stop-color="${palette[1]}"/>
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="20%" r="65%">
          <stop offset="0" stop-color="#fff8dc" stop-opacity=".95"/>
          <stop offset=".48" stop-color="#f5b842" stop-opacity=".34"/>
          <stop offset="1" stop-color="#f5b842" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="900" height="900" rx="96" fill="url(#bg)"/>
      <rect x="56" y="56" width="788" height="788" rx="72" fill="none" stroke="#fff6d4" stroke-opacity=".32" stroke-width="4"/>
      <circle cx="704" cy="178" r="232" fill="url(#glow)"/>
      <path d="M168 610 C 286 492, 386 686, 510 552 S 685 411, 756 485" fill="none" stroke="#fff8df" stroke-width="24" stroke-linecap="round" stroke-opacity=".42"/>
      <path d="M164 668 H736" stroke="#fff8df" stroke-width="8" stroke-linecap="round" stroke-opacity=".25"/>
      <text x="110" y="210" fill="#fff8df" font-family="Trebuchet MS, Segoe UI, Verdana, sans-serif" font-size="58" font-weight="900" letter-spacing="3">BƯỚC ${index}</text>
      <text x="110" y="405" fill="#ffffff" font-family="Trebuchet MS, Segoe UI, Verdana, sans-serif" font-size="92" font-weight="900">${title}</text>
      <text x="110" y="756" fill="#fff8df" font-family="Trebuchet MS, Segoe UI, Verdana, sans-serif" font-size="34" font-weight="800" letter-spacing="4">LEO EDUCATION</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const LearningPath = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: ClipboardCheck,
      title: t('learningPath.step1Title'),
      desc: t('learningPath.step1Desc'),
      tint: 'bg-[#fff7d8]',
      label: 'Đánh giá',
      palette: ['#0b1f3a', '#244d7a']
    },
    {
      icon: Map,
      title: t('learningPath.step2Title'),
      desc: t('learningPath.step2Desc'),
      tint: 'bg-[#eefaf6]',
      label: 'Lộ trình',
      palette: ['#123d56', '#237d74']
    },
    {
      icon: TrendingUp,
      title: t('learningPath.step3Title'),
      desc: t('learningPath.step3Desc'),
      tint: 'bg-[#fff4ee]',
      label: 'Kèm cặp',
      palette: ['#5b3415', '#c47528']
    },
    {
      icon: Award,
      title: t('learningPath.step4Title'),
      desc: t('learningPath.step4Desc'),
      tint: 'bg-[#eef4ff]',
      label: 'Báo cáo',
      palette: ['#1e3268', '#6454b9']
    }
  ];

  const menuItems = steps.map((step, index) => ({
    image: createStepImage({ index: index + 1, title: step.label, palette: step.palette }),
    link: '#contact-form',
    title: step.label
  }));

  return (
    <section className="kid-section kid-section-soft kid-cloud-top kid-cloud-divider dark:bg-navy-950">
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
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-navy-600 md:text-lg dark:text-gold-50/80">
            LEO Education đánh giá năng lực đầu vào, xây dựng lộ trình riêng, theo dõi liên tục và báo cáo định kỳ để phụ huynh nắm rõ tiến bộ của con.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative min-h-[440px] lg:min-h-[560px]"
          >
            <InfiniteMenu items={menuItems} scale={0.92} />
          </motion.div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="lux-reveal-card kid-activity-row flex gap-4 p-5 md:items-center"
              >
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${step.tint} text-gold-700 shadow-sm`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div>
                  <div className="mb-2 inline-flex rounded-full bg-gold-100 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-gold-700">
                    Bước {index + 1}
                  </div>
                  <h3 className="text-xl font-black text-navy-950 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700 dark:text-gold-50/80">{step.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
