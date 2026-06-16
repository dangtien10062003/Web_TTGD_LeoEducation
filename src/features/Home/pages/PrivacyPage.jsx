import React from 'react';
import { Footer } from '../components/Footer';

export const PrivacyPage = () => {
  return (
    <div className="pt-24">
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold-600">LeoEducation</p>
          <h1 className="mb-6 text-4xl font-bold text-navy-800 dark:text-white">Chính sách bảo mật</h1>
          <div className="space-y-6 text-slate-600 dark:text-gray-300">
            <p>
              LeoEducation chỉ thu thập thông tin cần thiết để tư vấn lộ trình học online, bao gồm họ tên,
              số điện thoại, email, môn học quan tâm và nội dung phụ huynh/học viên gửi qua form.
            </p>
            <p>
              Thông tin này được dùng cho mục đích liên hệ tư vấn, chăm sóc học viên, xác nhận đăng ký học thử
              và cải thiện chất lượng dịch vụ. LeoEducation không bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba
              nếu không có sự đồng ý của người dùng, trừ trường hợp pháp luật yêu cầu.
            </p>
            <p>
              Người dùng có thể yêu cầu chỉnh sửa hoặc xóa thông tin đã gửi bằng cách liên hệ qua email
              leoeducation.vn@gmail.com hoặc hotline 0866.123.170.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
