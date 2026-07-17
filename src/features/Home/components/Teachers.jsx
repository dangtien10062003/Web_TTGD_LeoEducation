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
    <section className="kid-section kid-section-soft kid-cloud-top kid-cloud-divider dark:bg-navy-950">

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
            <GraduationCap className="w-4 h-4" />
            {t('teachers.badge')}
          </motion.span>
          <h2 className="kid-title lux-underline text-4xl md:text-5xl">
            {t('teachers.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-navy-600 dark:text-gold-100/70">
            {t('teachers.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <div className="lux-reveal-card kid-soft-card flex h-full flex-col bg-white p-6 text-center transition-all hover:border-gold-400/60 hover:shadow-xl dark:border-gold-800/60 dark:bg-navy-900">
                <div className="relative inline-block mb-4">
                  {teacher.avatarUrl ? (
                    <img
                      src={teacher.avatarUrl}
                      alt={teacher.name}
                      className="mx-auto h-24 w-24 rounded-full border-4 border-[#eefaf6] object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${teacher.color} text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      {teacher.emoji}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-1/2 translate-x-6 rounded-full border border-gold-100 bg-white p-1.5 shadow-lg dark:border-gold-800/60 dark:bg-navy-800">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-navy-900 dark:text-gold-50 mb-1">
                  {teacher.name}
                </h3>

                <span className="mb-3 inline-block rounded-full border border-gold-100 bg-[#fff7d8] px-3 py-1 text-xs font-bold text-gold-700 dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-300">
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
              <p className="text-sm leading-relaxed text-navy-600 dark:text-gold-100/70">{selectedTeacher.school || selectedTeacher.bio || 'Giáo viên LEO Education'}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

