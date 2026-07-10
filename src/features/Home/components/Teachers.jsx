import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Star, BookOpen, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { publicApi } from '../../../services/api';

export const Teachers = () => {
  const { t } = useTranslation();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    let mounted = true;

    publicApi
      .instructors()
      .then((res) => {
        if (mounted) setTeachers(res.data || []);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && teachers.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-200 dark:via-gold-800 to-transparent" />
      <div className="absolute top-20 left-0 w-96 h-96 bg-gold-100/40 dark:bg-gold-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gold-100/40 dark:bg-gold-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
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
            <GraduationCap className="w-4 h-4" />
            {t('teachers.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('teachers.title')}</span>
          </h2>
          <p className="text-lg text-navy-600 dark:text-gold-100/70 max-w-2xl mx-auto">
            {t('teachers.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id || teacher.name || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 border border-gold-100 dark:border-gold-800/60 hover:border-gold-200 dark:hover:border-gold-600 transition-all shadow-sm hover:shadow-xl hover:shadow-gold-900/10 text-center h-full flex flex-col">
                <div className="relative inline-block mb-4">
                  {teacher.avatarUrl ? (
                    <img
                      src={teacher.avatarUrl}
                      alt={teacher.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {teacher.emoji}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-navy-800 rounded-full p-1.5 shadow-lg border border-gold-100 dark:border-gold-800/60">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-navy-900 dark:text-gold-50 mb-1">
                  {teacher.name}
                </h3>

                <span className="inline-block px-3 py-1 bg-gold-50 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 rounded-full text-xs font-semibold mb-3 border border-gold-100 dark:border-gold-700">
                  {teacher.subject}
                </span>

                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center justify-center gap-2 text-sm text-navy-600 dark:text-gold-100/70">
                    <Star className="w-4 h-4 text-gold-500" />
                    <span>{teacher.experience}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-navy-500 dark:text-gold-100/60">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-center line-clamp-2">{teacher.school}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full mt-auto dark:border-gold-700 dark:text-gold-100 dark:hover:bg-gold-900/30"
                >
                  {t('teachers.viewProfile')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-navy-500 dark:text-gold-100/60 text-sm">
            {t('teachers.moreTeachers')}
          </p>
        </motion.div>
      </div>

      <Modal
        isOpen={Boolean(selectedTeacher)}
        onClose={() => setSelectedTeacher(null)}
        title={selectedTeacher?.name || 'Chi tiết giáo viên'}
      >
        {selectedTeacher && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              {selectedTeacher.avatarUrl ? (
                <img src={selectedTeacher.avatarUrl} alt={selectedTeacher.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedTeacher.color} flex items-center justify-center text-3xl`}>
                  {selectedTeacher.emoji}
                </div>
              )}
              <div>
                <p className="text-sm text-gold-600 font-semibold">{selectedTeacher.subject}</p>
                <p className="text-sm text-navy-500 dark:text-gold-100/60">{selectedTeacher.experience}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gold-50 p-4 dark:bg-navy-800">
                <p className="text-xs text-navy-500 dark:text-gold-100/60 mb-1">Đánh giá</p>
                <p className="font-semibold text-navy-900 dark:text-gold-50">{selectedTeacher.rating ?? 'Chưa có'}</p>
              </div>
              <div className="rounded-xl bg-gold-50 p-4 dark:bg-navy-800">
                <p className="text-xs text-navy-500 dark:text-gold-100/60 mb-1">Kinh nghiệm</p>
                <p className="font-semibold text-navy-900 dark:text-gold-50">{selectedTeacher.experience}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-navy-900 dark:text-gold-50 mb-2">Thông tin giảng dạy</p>
              <p className="text-sm leading-relaxed text-navy-600 dark:text-gold-100/70">{selectedTeacher.school || selectedTeacher.bio || 'Giáo viên LeoEducation'}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
