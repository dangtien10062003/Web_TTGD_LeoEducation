import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=88',
    title: 'Bám sát chương trình giáo dục',
    desc: 'Học đúng năng lực, vững nền tảng, tiến bộ từng buổi cùng LeoEducation.',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&auto=format&fit=crop&q=88',
    title: 'Lộ trình cá nhân hóa',
    desc: 'Giáo viên theo sát, điều chỉnh nội dung theo điểm mạnh và phần còn yếu của học sinh.',
  },
  {
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&auto=format&fit=crop&q=88',
    title: 'Học thử miễn phí',
    desc: 'Trải nghiệm lớp học online hiện đại và nhận tư vấn lộ trình phù hợp.',
  },
];

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <section id="home" className="relative overflow-hidden bg-white pt-[112px] transition-colors duration-200 dark:bg-navy-950">
      <div className="container mx-auto px-4">
        <div className="relative min-h-[500px] overflow-hidden rounded-[28px] border border-gold-200 bg-gold-100 shadow-2xl shadow-gold-900/10 dark:border-gold-800 dark:bg-navy-900 dark:shadow-black/25">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -70 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img src={slide.image} alt={slide.title} className="h-full min-h-[500px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900/76 via-navy-900/30 to-gold-300/20" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-900/35 to-transparent" />

              <div className="relative z-10 flex min-h-[500px] items-end px-6 pb-16 md:px-12">
                <div className="max-w-3xl">
                  <span className="inline-flex rounded-full border border-white/40 bg-white/90 px-5 py-2 text-sm font-black uppercase tracking-wide text-gold-700 shadow">
                    Nấc thang tri thức - Vững bước tương lai!
                  </span>
                  <h1 className="mt-5 font-display text-4xl font-black uppercase leading-tight text-white drop-shadow-[0_3px_0_rgba(68,42,7,0.45)] sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-white md:text-2xl">{slide.desc}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button type="button" onClick={() => goToSlide(activeSlide - 1)} className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-lg transition hover:bg-gold-100" aria-label="Previous banner">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-lg transition hover:bg-gold-100" aria-label="Next banner">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full border border-white transition-all ${activeSlide === index ? 'w-8 bg-white' : 'w-3 bg-gold-300'}`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
