import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Star, BookOpen, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { publicApi } from '../../../services/api';

export const Teachers = () => {
  const { t } = useTranslation();

  const fallbackTeachers = [
    { name: 'Cô Đinh Xuân Minh', subject: t('teachers.teacher1Subject'), experience: t('teachers.teacher1Exp'), school: t('teachers.teacher1School'), color: 'from-pink-500 to-rose-500', emoji: '👩‍🏫' },
    { name: 'Thầy Nguyễn Xuân Hòa', subject: t('teachers.teacher2Subject'), experience: t('teachers.teacher2Exp'), school: t('teachers.teacher2School'), color: 'from-blue-500 to-indigo-500', emoji: '👨‍🔬' },
    { name: 'Thầy Phạm Việt Dũng', subject: t('teachers.teacher3Subject'), experience: t('teachers.teacher3Exp'), school: t('teachers.teacher3School'), color: 'from-purple-500 to-violet-500', emoji: '👨‍🏫' },
    { name: 'Cô Trần Thị Thùy Linh', subject: t('teachers.teacher4Subject'), experience: t('teachers.teacher4Exp'), school: t('teachers.teacher4School'), color: 'from-green-500 to-emerald-500', emoji: '👩‍🔬' },
    { name: 'Cô Dương Thị Phương', subject: t('teachers.teacher5Subject'), experience: t('teachers.teacher5Exp'), school: t('teachers.teacher5School'), color: 'from-orange-500 to-amber-500', emoji: '👩‍🏫' },
    { name: 'Cô Lê Ngọc Hồng', subject: t('teachers.teacher6Subject'), experience: t('teachers.teacher6Exp'), school: t('teachers.teacher6School'), color: 'from-teal-500 to-cyan-500', emoji: '👩‍🏫' },
    { name: 'Thầy Lê Văn Quang', subject: t('teachers.teacher7Subject'), experience: t('teachers.teacher7Exp'), school: t('teachers.teacher7School'), color: 'from-yellow-500 to-orange-500', emoji: '👨‍🏫' },
    { name: 'Thầy Lê Anh Tùng', subject: t('teachers.teacher8Subject'), experience: t('teachers.teacher8Exp'), school: t('teachers.teacher8School'), color: 'from-red-500 to-pink-500', emoji: '👨‍🔬' },
  ];

  const [teachers, setTeachers] = useState(fallbackTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    let mounted = true;

    publicApi
      .instructors()
      .then((res) => {
        if (mounted && res.data?.length) setTeachers(res.data);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent" />
      <div className="absolute top-20 left-0 w-96 h-96 bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-3xl" />
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
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
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
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-700 transition-all shadow-sm hover:shadow-xl text-center h-full flex flex-col">
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
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg border border-slate-100 dark:border-gray-700">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                  {teacher.name}
                </h3>

                <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold mb-3 border border-teal-100 dark:border-teal-700">
                  {teacher.subject}
                </span>

                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-gold-500" />
                    <span>{teacher.experience}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-center line-clamp-2">{teacher.school}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full mt-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
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
          <p className="text-slate-500 dark:text-gray-400 text-sm">
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
                <p className="text-sm text-teal-600 font-semibold">{selectedTeacher.subject}</p>
                <p className="text-sm text-slate-500">{selectedTeacher.experience}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">Đánh giá</p>
                <p className="font-semibold text-slate-800">{selectedTeacher.rating || 5}/5</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">Kinh nghiệm</p>
                <p className="font-semibold text-slate-800">{selectedTeacher.experience}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800 mb-2">Thông tin giảng dạy</p>
              <p className="text-sm leading-relaxed text-slate-600">{selectedTeacher.school || selectedTeacher.bio || 'Giáo viên LeoEducation'}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
