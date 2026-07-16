import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Star, CheckCircle, Phone, GraduationCap, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Footer } from '../components/Footer';
import { publicApi } from '../../../services/api';


export const CourseDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [apiCourse, setApiCourse] = useState(null);
  const [apiChecked, setApiChecked] = useState(false);
  const course = apiCourse;

  useEffect(() => {
    let mounted = true;

    publicApi
      .course(id)
      .then((res) => {
        if (mounted) setApiCourse(res.data);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setApiChecked(true);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!course && !apiChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center text-slate-600 dark:text-gray-300">Đang tải khóa học...</div>
      </div>
    );
  }

  if (!course && apiChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Không tìm thấy khóa học</h2>
          <Link to="/courses">
            <Button variant="gradientTeal">Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Back bar */}
      <div className="pt-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-gray-700">
        <div className="container mx-auto px-4 pb-4">
          <Link to="/courses" className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-700 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách khóa học
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/80 to-gold-900/70" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                {course.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5 text-gold-400" />
                  <span className="text-sm">{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-gold-400" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <GraduationCap className="w-5 h-5 text-gold-400" />
                  <span className="text-sm">{course.teacher}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 transition-shadow"
                  >
                    Đăng ký học thử miễn phí
                  </motion.button>
                </a>
                <a href="tel:0866123170" className="px-6 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  0866.123.170
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-gray-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{course.level}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Cấp độ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Điểm nổi bật
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Những ưu đãi và tính năng đặc biệt của khóa học
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(course.highlights || []).map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 dark:from-gold-900/50 dark:to-gold-800/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                </div>
                <p className="text-slate-700 dark:text-gray-300 font-medium leading-relaxed">{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                  Lộ trình học tập
                </h2>
                <p className="text-slate-600 dark:text-gray-400 mb-10">
                  Chương trình học được thiết kế theo phương pháp Scaffolded Learning, đảm bảo học sinh tiến bộ từng bước
                </p>
              </motion.div>
              <div className="space-y-4">
                {(course.curriculum || []).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-slate-700 dark:text-gray-300 font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24 bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 text-white shadow-xl"
              >
                <h3 className="text-xl font-bold mb-6">Thông tin khóa học</h3>
                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs text-gray-400">Môn học</p>
                      <p className="font-semibold">{course.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs text-gray-400">Cấp độ</p>
                      <p className="font-semibold">{course.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs text-gray-400">Thời lượng</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs text-gray-400">Giáo viên</p>
                      <p className="font-semibold">{course.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs text-gray-400">Lịch học</p>
                      <p className="font-semibold text-sm">{course.schedule}</p>
                    </div>
                  </div>
                </div>
                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-lg shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 transition-shadow"
                  >
                    Đăng ký học thử miễn phí
                  </motion.button>
                </a>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Hotline: 0866.123.170
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section id="contact" className="py-16 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Bắt đầu học ngay hôm nay
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8">
              Đăng ký học thử miễn phí để trải nghiệm phương pháp giảng dạy 1-1 chất lượng cao
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:0866123170"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-lg shadow-gold-500/20 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: 0866.123.170
              </motion.a>
              <a
                href="https://zalo.me/0866123170"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-colors inline-flex items-center gap-2"
              >
                Chat Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
