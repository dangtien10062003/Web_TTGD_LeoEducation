import React from 'react';
import { Footer } from '../components/Footer';

export const TermsPage = () => {
  return (
    <div className="pt-24">
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold-600">LeoEducation</p>
          <h1 className="mb-6 text-4xl font-bold text-navy-800 dark:text-white">Điều khoản sử dụng</h1>
          <div className="space-y-6 text-slate-600 dark:text-gray-300">
            <p>
              Website LeoEducation cung cấp thông tin về các chương trình học online, giáo viên, học phí tham khảo
              và kênh đăng ký tư vấn. Nội dung trên website có thể được cập nhật theo từng thời điểm.
            </p>
            <p>
              Việc gửi form đăng ký không đồng nghĩa với xác nhận nhập học. LeoEducation sẽ liên hệ lại để tư vấn,
              xác nhận nhu cầu học tập, lịch học, giáo viên phù hợp và các điều kiện học cụ thể.
            </p>
            <p>
              Người dùng cần cung cấp thông tin chính xác khi đăng ký tư vấn. LeoEducation có quyền từ chối xử lý
              các yêu cầu có dấu hiệu spam, sai thông tin hoặc không phù hợp với mục đích tư vấn học tập.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
