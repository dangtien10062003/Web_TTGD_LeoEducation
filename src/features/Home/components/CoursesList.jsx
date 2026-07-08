import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Star, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { publicApi } from '../../../services/api';

export const CoursesList = ({ onRegisterClick }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      publicApi.subjects(),
      publicApi.courses({ limit: 100 }),
    ])
      .then(([subjectsResult, coursesResult]) => {
        if (!mounted) return;

        if (subjectsResult.status === 'fulfilled') {
          setSubjects(subjectsResult.value.data || []);
        }

        if (coursesResult.status === 'fulfilled' && coursesResult.value.data?.length) {
          setCourses(coursesResult.value.data);
        } else {
          if (coursesResult.status === 'rejected') {
            console.error(coursesResult.reason);
            setError(coursesResult.reason.message);
          }
          setCourses([]);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filterItems = [{ id: 'all', name: 'T?t c?' }, ...subjects];

  const activeSubject = subjects.find((subject) => subject.id === activeCategory);
  const filteredCourses = activeCategory === 'Tất cả' || activeCategory === 'all'
    ? courses
    : activeSubject
      ? courses.filter(c => c.subjectId === activeSubject.id)
      : courses.filter(c => c.category === activeCategory);

  const handleFilterClick = (cat) => {
    const nextCategory = cat.id === 'all' ? 'Tất cả' : cat.id;
    setActiveCategory(nextCategory);

    if (!subjects.length) return;

    setLoading(true);
    publicApi
      .courses({ limit: 100, ...(cat.id !== 'all' ? { subjectId: cat.id } : {}) })
      .then((res) => setCourses(res.data?.length ? res.data : []))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) {
    return (
      <section id="courses" className="py-24 bg-slate-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 dark:text-teal-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-gray-400">Đang tải khóa học...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-gray-950 relative transition-colors duration-200">
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-4 sm:mb-6">
            <BookOpen className="w-4 h-4" />
            {t('courses.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
            <span className="text-gradient">{t('categories.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">{t('categories.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          {/* Subject Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-16 z-20 -mx-4 sm:mx-0 rounded-none sm:rounded-lg border-y sm:border border-slate-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur p-3 shadow-sm lg:top-28"
          >
            <div className="flex items-center justify-between gap-3 px-1 sm:px-2 pb-3 mb-3 border-b border-slate-100 dark:border-gray-700">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-600 dark:text-gold-400">Môn học</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Chọn nhanh</p>
            </div>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 snap-x">
              {filterItems.map((cat) => {
                const isActive = activeCategory === cat.id || (activeCategory === 'Tất cả' && cat.id === 'all');

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterClick(cat)}
                    className={`shrink-0 snap-start whitespace-nowrap lg:whitespace-normal lg:w-full px-4 py-2.5 sm:py-3 rounded-md text-sm font-semibold text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-navy-700 text-white border-navy-700 shadow-md shadow-navy-700/15'
                        : 'bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-gray-700 hover:bg-gold-50 hover:border-gold-300 hover:text-navy-700'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {cat.name}
                      {isActive && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.aside>

          {/* Course Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 min-w-0"
            >
              {filteredCourses.length === 0 && (
                <div className="sm:col-span-2 xl:col-span-3 rounded-lg border border-dashed border-slate-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 p-8 text-center text-slate-500 dark:text-gray-400">
                  Ch?a c? kh?a h?c trong c? s? d? li?u.
                </div>
              )}
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                <Card variant="gradient" className="h-full flex flex-col group bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-lg">
                  {/* Image */}
                  <Link to={`/courses/${course.id}`} className="block relative overflow-hidden">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full aspect-[16/11] sm:aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full aspect-[16/11] sm:aspect-[16/10] bg-slate-100 dark:bg-gray-800" />
                    )}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-slate-700 dark:text-gray-300 font-semibold text-sm">{course.level}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(course.features || []).map((f, i) => (
                        <span key={i} className="px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-md text-xs font-medium border border-teal-100 dark:border-teal-700">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400 mb-5">
                      <BookOpen className="w-4 h-4" />
                      <span>Thời lượng: {course.duration}</span>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button
                        onClick={() => onRegisterClick(course)}
                        className="w-full"
                        variant="gradientTeal"
                        size="md"
                      >
                        {t('courses.register')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
