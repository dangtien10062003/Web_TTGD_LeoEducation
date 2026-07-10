import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Gift, GraduationCap, Laptop, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const learningForms = [
  { icon: Laptop, title: 'Học online 1-1', text: 'Giáo viên kèm sát từng học sinh, linh hoạt lịch học và mục tiêu.' },
  { icon: Users, title: 'Nhóm nhỏ 1-3 / 1-5', text: 'Tương tác tốt, chi phí tối ưu, vẫn giữ được sự theo sát.' },
  { icon: GraduationCap, title: 'Lộ trình cá nhân hóa', text: 'Đánh giá đầu vào và điều chỉnh bài học theo năng lực thực tế.' },
];

const courseOffers = [
  'Toán, Văn, Anh theo chương trình phổ thông',
  'Luyện thi vào lớp 10, thi học kỳ, thi chuyển cấp',
  'Vật lý, Hóa học và các môn cần củng cố nền tảng',
  'Học thử miễn phí, ưu đãi học phí và tặng môn học theo chương trình',
];

export const HeroInfo = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 transition-colors duration-200 dark:bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent dark:via-gold-800" />
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl dark:bg-gold-900/20" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold-50 blur-3xl dark:bg-gold-700/10" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-gold-700 dark:border-gold-800 dark:bg-gold-900/25 dark:text-gold-200">
              Giới thiệu LeoEducation
            </span>
            <h2 className="mt-5 text-4xl font-black leading-tight text-gold-500 md:text-5xl dark:text-gold-300">
              Trung tâm học trực tuyến hiện đại cho từng mục tiêu của học sinh
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-gold-100/75">
              LeoEducation kết hợp giáo viên chất lượng, lộ trình cá nhân hóa và báo cáo tiến độ rõ ràng để phụ huynh luôn nắm được con đang học gì, tiến bộ ra sao.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-200 to-gold-400 px-7 py-3.5 text-sm font-black uppercase text-navy-900 shadow-xl shadow-gold-700/10 ring-1 ring-gold-300 transition hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-500">
                Xem khóa học
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-7 py-3.5 text-sm font-black uppercase text-gold-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50 dark:border-gold-800 dark:bg-navy-900 dark:text-gold-200">
                Nhận ưu đãi
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-3">
              {learningForms.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-gold-100 bg-white p-5 shadow-lg shadow-gold-900/5 dark:border-gold-800/60 dark:bg-navy-900"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-200 to-gold-400 text-navy-900 ring-1 ring-gold-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-black text-navy-900 dark:text-gold-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-gold-100/65">{item.text}</p>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-gold-100 bg-gold-50 p-6 shadow-xl shadow-gold-900/5 dark:border-gold-800/60 dark:bg-navy-900"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gold-700 shadow-sm dark:bg-navy-800 dark:text-gold-200">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-gold-700 dark:text-gold-300">Khóa học & ưu đãi</p>
                  <h3 className="text-2xl font-black text-navy-900 dark:text-gold-50">Nhiều lựa chọn học phù hợp</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {courseOffers.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-relaxed text-navy-700 shadow-sm dark:bg-navy-800 dark:text-gold-100/75">
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-gold-600 dark:text-gold-300" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
