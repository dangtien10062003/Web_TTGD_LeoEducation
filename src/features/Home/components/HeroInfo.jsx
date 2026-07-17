import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2, Headphones, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const introImage = 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=900&auto=format&fit=crop&q=88';

export const HeroInfo = () => {
  const benefits = ['Cam kết lộ trình rõ ràng', 'Báo cáo tiến độ liên tục', 'Hỗ trợ ngoài giờ học'];

  return (
    <section className="kid-section kid-section-cream kid-cloud-divider dark:bg-navy-950">

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="kid-pill">
            <BookOpen className="h-5 w-5" />
            Về LEO Education
          </span>
          <h2 className="kid-title lux-underline mt-5 text-4xl md:text-5xl">
            Nền tảng gia sư tương tác trực tuyến cho từng học sinh
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="kid-blob-photo relative">
              <img src={introImage} alt="Lớp học LEO Education" className="h-[520px] w-full object-cover" />
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lux-reveal-card kid-soft-card bg-[#eefaf6] p-8"
            >
              <h3 className="text-2xl font-black text-navy-950">Phương pháp học</h3>
              <p className="mt-4 leading-relaxed text-navy-700">
                LEO Education xây dựng lớp học online 1-1 và nhóm nhỏ theo phương pháp Scaffolded Learning, tập trung vào phần kiến thức học sinh còn yếu trước khi tiến tới nội dung mới.
              </p>
              <div className="mt-7 space-y-3">
                {benefits.map((item) => (
                  <div key={item} className="flex items-center gap-3 font-semibold text-navy-800">
                    <CheckCircle2 className="h-5 w-5 fill-gold-200 text-gold-600" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="lux-reveal-card kid-soft-card bg-[#fff4ee] p-8"
            >
              <p className="text-6xl font-black text-gold-600">Top 1%</p>
              <p className="mt-3 max-w-sm text-lg font-semibold leading-relaxed text-navy-800">
                Giáo viên, gia sư được tuyển chọn kỹ từ các trường chất lượng trên toàn quốc.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-400 text-gold-600">
                  <Headphones className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-semibold text-navy-700">Liên hệ LEO Education ngay</p>
                  <a href="tel:0866123170" className="text-2xl font-black text-navy-950">0866 123 170</a>
                </div>
              </div>
            </motion.article>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link to="/teachers" className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-7 py-4 text-sm font-semibold uppercase text-navy-950 transition hover:-translate-y-1 hover:bg-gold-600">
            <Users className="h-5 w-5" />
            Đội ngũ giáo viên
          </Link>
          <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-7 py-4 text-sm font-black uppercase text-navy-900 shadow-sm transition hover:-translate-y-1">
            Xem thêm
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
