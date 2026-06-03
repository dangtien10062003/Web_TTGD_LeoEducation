import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, CheckCircle, Play, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';

export const Hero = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const highlights = [
    { text: t('hero.highlight1') },
    { text: t('hero.highlight2') },
    { text: t('hero.highlight3') }
  ];

  const stats = [
    { icon: Users, label: t('hero.students'), value: '10,000+' },
    { icon: BookOpen, label: t('hero.courses'), value: '50+' },
    { icon: CheckCircle, label: t('hero.teachers'), value: '50+' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-200">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-gold-200/30 dark:bg-gold-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-navy-200/20 dark:bg-navy-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Text content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-gold-50 dark:from-teal-900/30 dark:to-gold-900/30 border border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              {t('hero.badge')}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              <span className="text-gradient">{t('hero.title')}</span>
              <br />
              <span className="text-navy-700 dark:text-white">{t('hero.subtitle')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="space-y-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 dark:text-gray-300 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button variant="gradientTeal" size="lg" className="group">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="group dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                <Play className="w-5 h-5" />
                {t('hero.joinTrial')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/50 dark:to-teal-800/50 mb-2 shadow-sm">
                    <stat.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold text-navy-700 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-gold-400 dark:from-teal-600 dark:to-gold-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
                alt="Học sinh LeoEducation"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white dark:border-gray-700"
              />

              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-slate-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white">{t('hero.floatingCard1Title')}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">{t('hero.floatingCard1Desc')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-slate-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-white">{t('hero.floatingCard2Title')}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">{t('hero.floatingCard2Desc')}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
