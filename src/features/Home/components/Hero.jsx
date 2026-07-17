import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  NotebookPen,
  Play,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=88',
    title: 'Gia sư online 1-1',
    desc: 'LEO Education đồng hành cùng học sinh qua lộ trình cá nhân hóa, giáo trình bám chuẩn Bộ Giáo dục Việt Nam.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=88',
    title: 'Giáo viên top 1%',
    desc: 'Học cùng đội ngũ giáo viên, gia sư được tuyển chọn kỹ, giỏi chuyên môn và có phương pháp dễ hiểu.',
  },
  {
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=88',
    title: '1-1 đến nhóm nhỏ',
    desc: 'Đa dạng lớp học 1-1, 1-3, 1-5 theo nhu cầu học tập, mục tiêu điểm số và tài chính của gia đình.',
  },
];

export const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index) => setActive((index + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section id="home" className="relative overflow-hidden bg-[#fffdf6] pt-[74px] dark:bg-navy-950">
      <div className="kid-wave relative bg-[#fff0b8]">
        <div className="absolute -left-10 top-28 z-[2] hidden h-28 w-28 rotate-[-16deg] rounded-[30px] bg-white/70 shadow-xl md:block" />
        <div className="absolute right-8 top-20 z-[2] hidden h-20 w-20 rotate-12 rounded-3xl bg-white/75 shadow-xl md:block" />
        <div className="absolute bottom-32 left-14 z-[2] hidden h-20 w-20 rotate-[-18deg] items-center justify-center rounded-[22px] bg-[#d9ad4a] text-white shadow-xl md:flex">
          <NotebookPen className="h-10 w-10" />
        </div>
        <div className="leo-staircase z-[2] hidden lg:block" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="container relative z-10 mx-auto grid min-h-[650px] items-center gap-10 px-4 pb-32 pt-14 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${active}`}
              initial={{ opacity: 0, x: -26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 26 }}
              transition={{ duration: 0.45 }}
            >
              <span className="kid-pill">Nấc thang tri thức - Vững bước tương lai</span>
              <h1 className="kid-title mt-6 max-w-2xl text-5xl uppercase md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-navy-800 md:text-xl">
                {slide.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-7 py-4 text-sm font-semibold uppercase text-navy-950 transition hover:-translate-y-1 hover:bg-gold-600"
                >
                  Xem khóa học
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-navy-600 bg-navy-800 px-7 py-4 text-sm font-semibold uppercase text-white transition hover:-translate-y-1 hover:border-gold-500/60"
                >
                  <Play className="h-5 w-5 fill-gold-500 text-gold-500" />
                  Học thử miễn phí
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lux-float-soft relative mx-auto w-full max-w-[580px]"
          >
            <div className="absolute -inset-8 rounded-[56px] bg-white/35" />
            <div className="kid-photo relative rotate-1 p-3">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`image-${active}`}
                  src={slide.image}
                  alt={slide.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="h-[430px] w-full rounded-[30px] object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="lux-float-soft-delay absolute -left-5 top-10 flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-300 text-navy-950">
                <Star className="h-5 w-5 fill-navy-950" />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-navy-500">Theo sát</p>
                <p className="text-sm font-black text-navy-950">Từng buổi học</p>
              </div>
            </div>
            <div className="lux-float-soft-delay absolute -right-3 bottom-14 rounded-3xl bg-white px-5 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-7 w-7 text-gold-600" />
                <div>
                  <p className="text-xs font-black uppercase text-navy-500">Lịch học</p>
                  <p className="text-sm font-black text-navy-950">Linh hoạt</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <button
          type="button"
          onClick={() => goToSlide(active - 1)}
          className="absolute left-4 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-lg transition hover:bg-gold-50 md:flex"
          aria-label="Banner trước"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => goToSlide(active + 1)}
          className="absolute right-4 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-lg transition hover:bg-gold-50 md:flex"
          aria-label="Banner sau"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${active === index ? 'w-9 bg-navy-900' : 'w-2 bg-gold-500/70'}`}
              aria-label={`Chuyển banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
