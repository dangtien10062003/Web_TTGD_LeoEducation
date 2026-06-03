import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, FlaskConical, Atom, Languages, PenTool, ArrowRight, Trophy, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { t } = useTranslation();

  const categories = [
    {
      icon: Calculator,
      name: t('categories.math'),
      count: 12,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Atom,
      name: t('categories.physics'),
      count: 10,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: FlaskConical,
      name: t('categories.chemistry'),
      count: 8,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Languages,
      name: t('categories.english'),
      count: 15,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: PenTool,
      name: t('categories.literature'),
      count: 9,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      iconColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      icon: BookOpen,
      name: t('categories.biology'),
      count: 7,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      iconColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      icon: Trophy,
      name: t('categories.examPrep'),
      count: 6,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: FileText,
      name: t('categories.special'),
      count: 5,
      color: 'from-indigo-500 to-violet-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('categories.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link key={index} to="/courses">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700 hover:border-transparent transition-all shadow-sm hover:shadow-xl overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                      {category.name}
                    </h3>

                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-3">
                      {category.count} {t('categories.courses')}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-3 transition-all">
                      {t('categories.explore')}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
