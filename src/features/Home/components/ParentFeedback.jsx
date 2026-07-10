import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Sparkles, Star, TrendingUp } from 'lucide-react';

const feedbacks = [
  {
    name: 'Chị Minh Anh',
    role: 'Phụ huynh học sinh lớp 8',
    content:
      'Trung tâm theo sát con rất kỹ. Sau mỗi buổi học tôi đều nhận được nhận xét rõ ràng, biết con đang yếu phần nào để cùng hỗ trợ thêm.',
    result: 'Theo sát từng buổi',
  },
  {
    name: 'Anh Hoàng Nam',
    role: 'Phụ huynh học sinh lớp 10',
    content:
      'Giáo viên dạy dễ hiểu, lịch học linh hoạt và đội ngũ tư vấn phản hồi nhanh. Con tôi chủ động học hơn sau vài tuần.',
    result: '+1.5 điểm',
  },
  {
    name: 'Chị Thu Hương',
    role: 'Phụ huynh luyện thi chuyển cấp',
    content:
      'Điểm tôi thích nhất là lộ trình cá nhân hóa. Trung tâm không dạy đại trà mà điều chỉnh theo năng lực thật của con.',
    result: 'Rõ lộ trình',
  },
  {
    name: 'Chị Lan Phương',
    role: 'Phụ huynh học sinh lớp 6',
    content:
      'Con học online nhưng vẫn có cảm giác được kèm sát. Sau mỗi tuần trung tâm đều nhắc lại mục tiêu và phần cần luyện thêm.',
    result: 'Tiến bộ đều',
  },
];

const feedbackTrack = [...feedbacks, ...feedbacks];

export const ParentFeedback = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 transition-colors duration-200 dark:bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent dark:via-gold-800" />
      <div className="absolute left-0 top-12 h-96 w-96 rounded-full bg-gold-100/70 blur-3xl dark:bg-gold-900/20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-50 blur-3xl dark:bg-gold-700/10" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-gold-100 bg-gradient-to-br from-white via-gold-50 to-gold-100 p-8 shadow-2xl shadow-gold-900/10 dark:border-gold-800/70 dark:from-navy-900 dark:via-navy-900 dark:to-gold-950/40 dark:shadow-black/25"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-wide text-gold-700 shadow-sm dark:border-gold-800 dark:bg-navy-800 dark:text-gold-200">
              <Sparkles className="h-4 w-4" />
              Ý kiến phụ huynh
            </span>
            <h2 className="mt-5 text-4xl font-black leading-tight text-gold-500 md:text-5xl dark:text-gold-300">
              Phụ huynh nói gì về trung tâm?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600 dark:text-gold-100/75">
              LeoEducation ưu tiên kết quả rõ ràng: học sinh hiểu bài hơn, phụ huynh nắm tiến độ tốt hơn và lộ trình học được điều chỉnh theo từng mục tiêu.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Star, value: '5/5', label: 'Mức hài lòng' },
                { icon: TrendingUp, value: '+1.5', label: 'Điểm cải thiện' },
                { icon: ShieldCheck, value: '24h', label: 'Phản hồi tư vấn' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gold-100 bg-white p-4 shadow-sm dark:border-gold-800/60 dark:bg-navy-800">
                  <item.icon className="mb-3 h-5 w-5 text-gold-600 dark:text-gold-300" />
                  <p className="text-2xl font-black text-navy-900 dark:text-gold-50">{item.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-navy-500 dark:text-gold-100/60">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[560px] overflow-hidden rounded-[32px] border border-gold-100 bg-white/75 p-4 shadow-2xl shadow-gold-900/10 dark:border-gold-800/60 dark:bg-navy-900/70 dark:shadow-black/25">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white via-white/85 to-transparent dark:from-navy-900 dark:via-navy-900/85" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-navy-900 dark:via-navy-900/85" />

            <motion.div
              className="flex flex-col gap-5"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {feedbackTrack.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="rounded-[28px] border border-gold-100 bg-white p-6 shadow-lg shadow-gold-900/5 dark:border-gold-800/60 dark:bg-navy-900"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 ring-1 ring-gold-200 dark:bg-gold-900/40 dark:text-gold-200 dark:ring-gold-800">
                      <Quote className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-gold-700 ring-1 ring-gold-100 dark:bg-gold-900/30 dark:text-gold-200 dark:ring-gold-800">
                      {item.result}
                    </span>
                  </div>
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-navy-700 dark:text-gold-100/80">&ldquo;{item.content}&rdquo;</p>
                  <div className="mt-5 border-t border-gold-100 pt-4 dark:border-gold-800/60">
                    <h3 className="font-black text-navy-900 dark:text-gold-50">{item.name}</h3>
                    <p className="mt-1 text-sm text-navy-500 dark:text-gold-100/60">{item.role}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
