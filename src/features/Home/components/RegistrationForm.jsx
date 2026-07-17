import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Toast } from '../../../components/Toast';
import { publicApi } from '../../../services/api';
import { trackEvent } from '../../../utils/analytics';

const createSchema = (t) => z.object({
  fullName: z.string()
    .min(1, t('registration.errors.fullNameRequired'))
    .min(2, t('registration.errors.fullNameMin')),
  email: z.string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: t('registration.errors.emailInvalid')
    }),
  phone: z.string()
    .min(1, t('registration.errors.phoneRequired'))
    .regex(/^[0-9]{10}$/, t('registration.errors.phoneInvalid'))
});

export const RegistrationForm = ({ selectedCourse, onSuccess }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(createSchema(t)),
    defaultValues: {
      fullName: '',
      email: '',
      phone: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dataToSend = {
        fullName: data.fullName,
        email: data.email || null,
        phone: data.phone.replace(/\s/g, ''),
        courseId: selectedCourse?.courseId || selectedCourse?.id
      };

      await publicApi.registerCourse(dataToSend);

      setIsSuccess(true);
      setToast({
        type: 'success',
        title: 'Đăng ký thành công',
        message: 'LEO Education đã nhận thông tin và sẽ liên hệ tư vấn.',
      });
      trackEvent('course_registration_success', {
        course_id: dataToSend.courseId,
        course_title: selectedCourse?.title,
      });
      reset();
      
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess?.();
      }, 2000);

    } catch (err) {
      const nextError = err.message === 'Failed to fetch'
        ? 'Backend chưa được deploy. Vui lòng liên hệ: leoeducation.vn@gmail.com hoặc 0866.123.170'
        : (err.message || 'Có lỗi xảy ra, vui lòng thử lại sau');

      setToast({
        type: 'error',
        title: 'Đăng ký chưa thành công',
        message: nextError,
      });
      trackEvent('course_registration_error', {
        course_id: selectedCourse?.courseId || selectedCourse?.id,
        course_title: selectedCourse?.title,
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

  if (isSuccess) {
    return (
      <>
        <Toast
          open={Boolean(toast)}
          type={toast?.type}
          title={toast?.title}
          message={toast?.message}
          onClose={() => setToast(null)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-gold-500 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {t('registration.success')}
          </h3>
          <p className="text-gray-600">
            {t('registration.successMessage')}
          </p>
        </motion.div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Toast
        open={Boolean(toast)}
        type={toast?.type}
        title={toast?.title}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {t('registration.title')}
        </h3>
        <p className="text-gray-600">{t('registration.subtitle')}</p>
      </div>

      {/* Hiển thị khóa học đã chọn */}
      {selectedCourse && (
        <div className="bg-gradient-to-r from-gold-50 to-gold-50 rounded-xl p-4 border-2 border-gold-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('registration.course')}
          </label>
          <div className="flex items-center gap-3">
            {selectedCourse.image && (
              <img 
                src={selectedCourse.image} 
                alt={selectedCourse.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{selectedCourse.title}</h4>
              <p className="text-sm text-gold-600 font-semibold">{selectedCourse.price}</p>
            </div>
          </div>
        </div>
      )}

      <Input
        label={t('registration.fullName')}
        placeholder="Nguyễn Văn A"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label={t('registration.email')}
        type="email"
        placeholder="example@email.com (không bắt buộc)"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label={t('registration.phone')}
        type="tel"
        placeholder="0123456789"
        {...register('phone')}
        error={errors.phone?.message}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            {t('registration.submitting')}
          </>
        ) : (
          t('registration.submit')
        )}
      </Button>
    </form>
  );
};
