import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, User, Mail, Phone, MessageSquare, Baby, Sparkles, Clock, Shield, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Toast } from '../../../components/Toast';
import { publicApi } from '../../../services/api';
import { trackEvent } from '../../../utils/analytics';

const createSchema = (t) => z.object({
  parentName: z.string()
    .min(1, t('contact.parentNameRequired') || 'Vui lòng nhập họ tên phụ huynh')
    .min(2, t('contact.parentNameMin') || 'Họ tên phải có ít nhất 2 ký tự'),
  childName: z.string()
    .min(1, t('contact.childNameRequired') || 'Vui lòng nhập tên con')
    .min(2, t('contact.childNameMin') || 'Tên con phải có ít nhất 2 ký tự'),
  email: z.string()
    .min(1, t('contact.emailRequired') || 'Vui lòng nhập email')
    .email(t('contact.emailInvalid') || 'Email không hợp lệ'),
  phone: z.string()
    .min(1, t('contact.phoneRequired') || 'Vui lòng nhập số điện thoại')
    .regex(/^[0-9]{10}$/, t('contact.phoneInvalid') || 'Số điện thoại phải có 10 chữ số'),
  message: z.string()
    .min(1, t('contact.messageRequired') || 'Vui lòng nhập nội dung')
    .min(10, t('contact.messageMin') || 'Nội dung phải có ít nhất 10 ký tự')
});

export const ContactForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(createSchema(t)),
    defaultValues: { parentName: '', childName: '', email: '', phone: '', message: '' }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await publicApi.contact({
        fullName: data.parentName,
        email: data.email,
        phone: data.phone,
        message: `Tên con: ${data.childName}\n${data.message}`,
      });
      setIsSuccess(true);
      setToast({
        type: 'success',
        title: 'Đã gửi thông tin tư vấn',
        message: 'LeoEducation sẽ liên hệ lại trong thời gian sớm nhất.',
      });
      trackEvent('lead_submit_success', {
        form_name: 'contact_consultation',
        course_interest: data.message,
      });
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      const nextError = err.message === 'Failed to fetch'
        ? (t('contact.backendError') || 'Backend chưa được deploy. Vui lòng liên hệ: hotline 0866.123.170')
        : err.message;

      setToast({
        type: 'error',
        title: 'Chưa gửi được thông tin',
        message: nextError,
      });
      trackEvent('lead_submit_error', {
        form_name: 'contact_consultation',
        error_message: nextError,
      });

      if (err.message === 'Failed to fetch') {
        setError(nextError);
      } else {
        setError(nextError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Sparkles, title: t('contact.benefit1Title') || 'Tư vấn miễn phí', desc: t('contact.benefit1Desc') || 'Đội ngũ chuyên gia tư vấn nhiệt tình' },
    { icon: Clock, title: t('contact.benefit2Title') || 'Phản hồi nhanh', desc: t('contact.benefit2Desc') || 'Liên hệ trong vòng 24h' },
    { icon: GraduationCap, title: t('contact.benefit3Title') || 'Chương trình phù hợp', desc: t('contact.benefit3Desc') || 'Khóa học được thiết kế riêng cho từng độ tuổi' },
    { icon: Shield, title: t('contact.benefit4Title') || 'Ưu đãi đặc biệt', desc: t('contact.benefit4Desc') || 'Giảm giá cho khách hàng đăng ký sớm' }
  ];

  return (
    <section id="contact-form" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-200">
      <Toast
        open={Boolean(toast)}
        type={toast?.type}
        title={toast?.title}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 dark:bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-200/20 dark:bg-gold-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-gold-50 to-gold-50 dark:from-gold-900/30 dark:to-gold-900/30 border border-gold-200 dark:border-gold-700 text-gold-700 dark:text-gold-300 rounded-full text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('contact.badge') || 'Liên hệ tư vấn'}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{t('contact.title') || 'Đăng ký tư vấn miễn phí'}</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.subtitle') || 'Để lại thông tin, chúng tôi sẽ liên hệ tư vấn chi tiết về khóa học phù hợp cho con bạn'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-slate-50 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-6">
                  {t('contact.whyChoose') || 'Tại sao chọn LeoEducation?'}
                </h3>
                <div className="space-y-4">
                  {benefits.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-3xl">{item.icon === Sparkles ? '✦' : item.icon === Clock ? '●' : item.icon === GraduationCap ? '🎓' : '✓'}</span>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Promotion banner */}
              <div className="bg-gradient-to-br from-gold-500 to-navy-600 rounded-2xl p-6 text-white shadow-lg">
                <h4 className="font-bold text-lg mb-2">{t('contact.promoTitle') || 'Ưu đãi đặc biệt'}</h4>
                <p className="text-gold-100">
                  {t('contact.promoDesc') || 'Giảm ngay 20% học phí cho 50 học viên đăng ký đầu tiên trong tháng này!'}
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-gray-800">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                      <CheckCircle2 className="w-20 h-20 text-gold-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('contact.successTitle') || 'Gửi thành công!'}</h3>
                    <p className="text-slate-600 dark:text-gray-400 mb-4">{t('contact.successMsg') || 'Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.'}</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">{t('contact.sendAnother') || 'Gửi yêu cầu khác'}</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          {t('contact.parentName') || 'Họ tên phụ huynh'}
                        </label>
                        <input {...register('parentName')} placeholder="Nguyễn Văn A"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none bg-white dark:bg-gray-800 text-slate-800 dark:text-white ${errors.parentName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-gray-600 focus:border-gold-500'} focus:ring-2 focus:ring-gold-200`}
                        />
                        {errors.parentName && <p className="mt-1 text-sm text-red-500">{errors.parentName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                          <Baby className="w-4 h-4 inline mr-1" />
                          {t('contact.childName') || 'Tên con'}
                        </label>
                        <input {...register('childName')} placeholder="Bé Minh"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none bg-white dark:bg-gray-800 text-slate-800 dark:text-white ${errors.childName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-gray-600 focus:border-gold-500'} focus:ring-2 focus:ring-gold-200`}
                        />
                        {errors.childName && <p className="mt-1 text-sm text-red-500">{errors.childName.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        {t('contact.email') || 'Email'}
                      </label>
                      <input {...register('email')} type="email" placeholder="example@email.com"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none bg-white dark:bg-gray-800 text-slate-800 dark:text-white ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-gray-600 focus:border-gold-500'} focus:ring-2 focus:ring-gold-200`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {t('contact.phone') || 'Số điện thoại'}
                      </label>
                      <input {...register('phone')} type="tel" placeholder="0123456789"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none bg-white dark:bg-gray-800 text-slate-800 dark:text-white ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-gray-600 focus:border-gold-500'} focus:ring-2 focus:ring-gold-200`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        {t('contact.message') || 'Nội dung tư vấn'}
                      </label>
                      <textarea {...register('message')} rows="4" placeholder={t('contact.messagePlaceholder') || 'Vui lòng cho biết độ tuổi của con và môn học bạn quan tâm...'}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 resize-none outline-none bg-white dark:bg-gray-800 text-slate-800 dark:text-white ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-slate-200 dark:border-gray-600 focus:border-gold-500'} focus:ring-2 focus:ring-gold-200`}
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                        {error}
                      </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                      {isLoading ? (
                        <><Loader2 className="w-5 h-5 animate-spin mr-2" /> {t('contact.submitting') || 'Đang gửi...'}</>
                      ) : (
                        <><Send className="w-5 h-5 mr-2" /> {t('contact.submit') || 'Gửi yêu cầu tư vấn'}</>
                      )}
                    </Button>

                    <p className="text-xs text-slate-500 dark:text-gray-500 text-center">
                      {t('contact.privacy') || 'Bằng cách gửi form, bạn đồng ý với chính sách bảo mật của chúng tôi'}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

