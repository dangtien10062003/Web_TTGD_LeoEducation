import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Star, CheckCircle, Phone, GraduationCap, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Footer } from '../components/Footer';
import { publicApi } from '../../../services/api';


// Course data (same as CoursesList)
const COURSES = [
  {
    id: 1,
    title: 'Gia Sư Tiếng Anh',
    category: 'Tiếng Anh',
    level: 'Lớp 1-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=500',
    description: 'Công cụ phát âm và từ vựng, nâng cao khả năng giao tiếp thực tế. Nắm vững ngữ pháp và luyện nghe - nói, thạo trong thi cử. Phương pháp Scaffolded Learning giúp học sinh tiến bộ nhanh chóng với lộ trình cá nhân hóa.',
    features: ['Phát âm chuẩn', 'Ngữ pháp vững chắc', 'Luyện đề 9+', 'Giao tiếp thực tế'],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Anh Ngữ',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      '100% giáo viên có chứng chỉ IELTS 7.0+',
      'Lộ trình học tập cá nhân hóa theo Scaffolded Learning',
      'Đánh giá kiến thức đầu vào miễn phí bài test chuẩn',
      'Theo dõi tiến độ hàng tuần với báo cáo chi tiết',
      'Bài tập bổ sung và hỏi đáp ngoài giờ học'
    ],
    curriculum: [
      'Đánh giá trình độ đầu vào',
      'Phát âm & ngữ âm cơ bản',
      'Từ vựng theo chủ đề',
      'Ngữ pháp nâng cao',
      'Luyện nghe - nói thực hành',
      'Luyện đề thi HK & THPTQG',
      'Đánh giá tiến độ & điều chỉnh lộ trình'
    ]
  },
  {
    id: 2,
    title: 'Gia Sư Toán',
    category: 'Toán',
    level: 'Lớp 1-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
    description: 'Nâng cao kiến thức Toán từ cơ bản đến nâng cao, phát triển tư duy logic. Luyện giải đề nhanh và hiệu quả. Phương pháp bám sát SGK kết hợp bài tập nâng cao.',
    features: ['Tư duy logic', 'Giải đề nhanh', 'Đạt 9+', 'Bài tập bổ sung'],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Toán',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên tốt nghiệp các trường ĐH chuyên Toán hàng đầu',
      'Phương pháp dạy trực quan, dễ hiểu, không nhàm chán',
      'Bài tập đa dạng từ cơ bản đến nâng cao',
      'Hỗ trợ giải đề 24/7 qua Zalo/Messenger',
      'Cam kết đầu ra: cải thiện ít nhất 3 điểm sau 1 học kỳ'
    ],
    curriculum: [
      'Đánh giá kiến thức nền tảng',
      'Ôn tập & bổ sung kiến thức cơ bản',
      'Bài tập nâng cao theo chương trình',
      'Phương pháp giải nhanh & thủ thuật',
      'Luyện đề thi định kỳ',
      'Chấm thi thử & nhận xét',
      'Ôn tập tổng kết & thi thử'
    ]
  },
  {
    id: 3,
    title: 'Gia Sư Hóa Học',
    category: 'Hóa học',
    level: 'Lớp 8-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500',
    description: 'Bổ sung kiến thức Hóa học nâng cao bám sát chương trình SGK. Áp dụng sơ đồ tư duy để hiểu rõ các khái niệm. Thực hành số lượng phong phú.',
    features: ['Ghi nhớ tuần hoàn', 'Cân bằng phương trình', 'Bài tập khó', 'Sơ đồ tư duy'],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Hóa',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên có kinh nghiệm giảng dạy Hóa năm năm+',
      'Phương pháp sơ đồ tư duy dễ nhớ, dễ hiểu',
      'Hệ thống bài tập 3 cấp độ: cơ bản - nâng cao - khó',
      'Hỗ trợ làm thí nghiệm ảo qua video minh họa',
      'Đề thi thử bám sát cấu trúc Bộ GD&ĐT'
    ],
    curriculum: [
      'Kiểm tra kiến thức đầu vào',
      'Hóa học vô cơ & cơ bản hữu cơ',
      'Cân bằng phương trình & bài tập tổng hợp',
      'Hóa học hữu cơ nâng cao',
      'Thí nghiệm & thực hành',
      'Ôn thi HK & THPTQG',
      'Đánh giá & định hướng'
    ]
  },
  {
    id: 4,
    title: 'Gia Sư Vật Lý',
    category: 'Vật lý',
    level: 'Lớp 6-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500',
    description: 'Phát triển tư duy và ghi nhớ quy tắc, giải quyết các bài toán phức tạp. Luyện giải đề khó và quản lý thời gian hiệu quả.',
    features: ['', '', '', ''],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Vật lý',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên tốt nghiệp các trường ĐH Khoa học Tự nhiên, Bách Khoa',
      'Phương pháp giảng dạy trực quan với video minh họa thí nghiệm',
      'Bộ bài tập phân loại theo độ khó & dạng bài',
      'Chấm bài chi tiết từng bước giải',
      'Đề thi thử hàng tháng đánh giá tiến độ'
    ],
    curriculum: [
      'Đánh giá nền tảng kiến thức',
      'Cơ học & Nhiệt học',
      'Điện học & Từ trường',
      'Quang học & Vật lý nguyên tử',
      'Bài tập tổng hợp & đề thi',
      'Thi thử & rút kinh nghiệm',
      'Tổng kết & củng cố'
    ]
  },
  {
    id: 5,
    title: 'Gia Sư Ngữ Văn',
    category: 'Ngữ văn',
    level: 'Lớp 1-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
    description: 'Công cụ kiến thức ngữ phác và văn học, nắm vững tác phẩm trọng điểm. Phát triển kỹ năng lập luận và phân tích văn bản.',
    features: ['Tác phẩm trọng điểm', 'Lập luận', 'Nghị luận', 'Phân tích văn bản'],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Ngữ văn',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên có kinh nghiệm chấm thi THPTQG',
      'Phương pháp lập dàn ý nhanh & viết đoạn văn hay',
      'Kho tác phẩm trọng điểm đầy đủ từ lớp 1-12',
      'Nhận xét chi tiết từng bài viết của học sinh',
      'Luyện kỹ năng đọc hiểu & nghị luận xã hội'
    ],
    curriculum: [
      'Đánh giá trình độ đọc viết',
      'Tác phẩm trọng điểm từng lớp',
      'Kỹ năng lập dàn ý & viết đoạn',
      'Nghị luận văn học & xã hội',
      'Ôn tập & luyện đề',
      'Chấm thi thử',
      'Tổng kết & phương pháp thi'
    ]
  },
  {
    id: 6,
    title: 'Gia Sư Sinh Học',
    category: 'Sinh học',
    level: 'Lớp 6-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500',
    description: 'Sinh học tế bào, di truyền học, sinh thái học, sinh học phân tử. Phương pháp giảng dạy trực quan, bài tập thực hành phong phú.',
    features: ['Sơ đồ tư duy', 'Thí nghiệm đo', 'Ôn thi HK', 'Trực quan'],
    schedule: '2-3 buổi/tuần, 90 phút/buổi',
    teacher: 'Sinh viên/ Giảng viên chuyên ngành Sinh học',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên chuyên ngành Sinh học từ các trường ĐH Y Dược, KHTN',
      'Sơ đồ tư duy sinh động, dễ nhớ kiến thức phức tạp',
      'Video minh họa thí nghiệm sinh học',
      'Bài tập phân loại theo chương & độ khó',
      'Hỗ trợ ôn thi ĐH chuyên ngành Y, Sinh'
    ],
    curriculum: [
      'Đánh giá kiến thức nền',
      'Sinh học tế bào & vi sinh vật',
      'Di truyền học & tiến hóa',
      'Sinh thái học & môi trường',
      'Cơ thể con người & sức khỏe',
      'Ôn tập & luyện đề',
      'Đánh giá & tư vấn'
    ]
  },
  {
    id: 7,
    title: 'Ôn Thi Đại Học/THPTQG',
    category: 'Toán',
    level: 'Lớp 12',
    duration: '3-6 tháng',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500',
    description: 'Bổ sung kiến thức còn thiếu, tập trung phương pháp giải đề nhanh. Luyện giải đề nâng cao, rèn kỹ năng phân xử. Đội ngũ giáo viên giàu kinh nghiệm chấm thi.',
    features: ['Giải đề nhanh', 'Chiến lược thi cử', '20+ đề thi', 'Phân tích đề'],
    schedule: '3-5 buổi/tuần, 90 phút/buổi',
    teacher: 'Giảng viên/ Cựu học sinh top ĐH',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên là cựu thủ khoa, top đầu các trường ĐH top',
      'Phân tích xu hướng ra đề 5 năm gần đây',
      'Phương pháp làm bài & quản lý thời gian trong phòng thi',
      'Đề thi thử hàng tuần với chấm chi tiết',
      'Tư vấn chọn trường, chọn ngành phù hợp'
    ],
    curriculum: [
      'Đánh giá đầu vào & xác định mục tiêu',
      'Ôn tập toàn diện kiến thức cốt lõi',
      'Thực hành giải đề theo dạng',
      'Phương pháp loại trừ & thủ thuật',
      'Thi thử định kỳ hàng tuần',
      'Chấm chi tiết & rút kinh nghiệm',
      'Tổng ôn & chiến lược thi'
    ]
  },
  {
    id: 8,
    title: 'Lấy Gốc/Kèm Học Sinh Yếu',
    category: 'Toán',
    level: 'Lớp 1-12',
    duration: 'Linh hoạt',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    description: 'Đánh giá tình trạng mất gốc và bổ sung kiến thức nền tảng theo SGK. Xây dựng lộ trình cá nhân hóa. Phù hợp cho HS yếu mất gốc cần bắt kịp.',
    features: ['Đánh giá mất gốc', 'Lộ trình cá nhân', 'Từ cơ bản lên', 'Kiên nhẫn'],
    schedule: '2-4 buổi/tuần, 90 phút/buổi',
    teacher: 'Giáo viên chuyên kèm yếu',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Phù hợp đặc biệt với học sinh yếu kiến thức nền tảng',
      'Bắt đầu hoàn toàn từ cơ bản, không vội vàng',
      'Giáo viên kiên nhẫn, hiểu tâm lý học sinh',
      'Học 1-1 tối đa, chú ý điểm yếu cụ thể',
      'Phụ huynh được cập nhật tiến độ hàng tuần'
    ],
    curriculum: [
      'Đánh giá toàn diện kiến thức nền',
      'Xác định các điểm mất gốc',
      'Bổ sung kiến thức từ lớp 1-3 lên',
      'Ôn tập & củng cố theo SGK',
      'Bài tập từ dễ đến khó',
      'Kiểm tra định kỳ & điều chỉnh',
      'Đánh giá kết quả & lộ trình tiếp'
    ]
  },
  {
    id: 9,
    title: 'Luyện Thi Vào Lớp 6',
    category: 'Toán',
    level: 'Lớp 5',
    duration: '3-6 tháng',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500',
    description: 'Bồi dưỡng kiến thức nâng cao, sẵn sàng cho kỳ thi vào lớp 6. Luyện đề thi thử bám sát. Chuẩn bị kiến thức cả 3 môn: Toán, Tiếng Việt, Anh văn.',
    features: ['Toán nâng cao', 'Tiếng Việt', 'Anh văn cơ bản', 'Đề thi thử'],
    schedule: '3-4 buổi/tuần, 90 phút/buổi',
    teacher: 'Giáo viên chuyên ôn lớp 6',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên có kinh nghiệm dạy lớp 5, hiểu tâm lý em nhỏ',
      'Bồi dưỡng song song 3 môn thi: Toán, TV, Anh',
      'Đề thi thử bám sát các trường top Hà Nội & TPHCM',
      'Phương pháp giảng dạy nhẹ nhàng, không gây áp lực',
      'Tư vấn chọn trường phù hợp cho con'
    ],
    curriculum: [
      'Đánh giá trình độ 3 môn',
      'Toán: Tư duy logic, giải toán nâng cao',
      'Tiếng Việt: Đọc hiểu, làm văn',
      'Anh văn: Phát âm & giao tiếp cơ bản',
      'Luyện thi thử định kỳ',
      'Chấm chi tiết & nhận xét',
      'Tổng ôn & bí kíp thi'
    ]
  },
  {
    id: 10,
    title: 'Luyện Thi Vào Lớp 10',
    category: 'Toán',
    level: 'Lớp 9',
    duration: '6-12 tháng',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500',
    description: 'Bổi dưỡng kiến thức nâng cao, sẵn sàng cho kỳ thi vào lớp 10. Luyện đề thi thử bám sát. Chuẩn bị đầy đủ các môn thi.',
    features: ['Toán - Lý - Hóa', 'Ngữ Văn', 'Tiếng Anh'],
    schedule: '3-5 buổi/tuần, 90 phút/buổi',
    teacher: 'Giáo viên chuyên ôn lớp 10',
    price: 'Liên hệ để được tư vấn',
    highlights: [
      'Giáo viên là cựu học sinh ưu tú các trường chuyên',
      'Lộ trình học rõ ràng theo từng giai đoạn',
      'Đề thi thử mô phỏng 100% đề thật',
      'Cam kết đầu ra: vào trường công lập/ chuyên mục tiêu',
      'Hỗ trợ đăng ký tuyển sinh & tư vấn chọn trường'
    ],
    curriculum: [
      'Đánh giá trình độ đầu vào',
      'Ôn tập kiến thức lớp 9 toàn diện',
      'Bổ sung kiến thức nâng cao lớp 9',
      'Luyện đề các trường top hàng tuần',
      'Thi thử & chấm chi tiết',
      'Chênh lệch kiến thức & bổ sung',
      'Tổng ôn & bí kíp thi'
    ]
  }
];

export const CourseDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [apiCourse, setApiCourse] = useState(null);
  const [apiChecked, setApiChecked] = useState(false);
  const fallbackCourse = COURSES.find(c => c.id === parseInt(id));
  const course = apiCourse || fallbackCourse;

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
          <Link to="/courses" className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách khóa học
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/80 to-teal-900/70" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 rounded-full text-sm font-semibold mb-6">
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
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-sm">{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5 text-teal-400" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <span className="text-sm">{course.teacher}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-shadow"
                  >
                    Đăng ký học thử miễn phí
                  </motion.button>
                </a>
                <a href="tel:0703428300" className="px-6 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  0703.428.300
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
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
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
            {course.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/50 dark:to-teal-800/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
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
                {course.curriculum.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gray-900 rounded-xl border border-slate-200 dark:border-gray-700"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
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
                    <BookOpen className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-xs text-gray-400">Môn học</p>
                      <p className="font-semibold">{course.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-xs text-gray-400">Cấp độ</p>
                      <p className="font-semibold">{course.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-xs text-gray-400">Thời lượng</p>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-xs text-gray-400">Giáo viên</p>
                      <p className="font-semibold">{course.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400" />
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
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-shadow"
                  >
                    🎓 Đăng ký học thử miễn phí
                  </motion.button>
                </a>
                <p className="text-center text-xs text-gray-400 mt-4">
                  📞 Hotline: 0703.428.300
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
                href="tel:0703428300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold shadow-lg shadow-teal-500/20 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: 0703.428.300
              </motion.a>
              <a
                href="https://zalo.me/0703428300"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl border-2 border-teal-500 text-teal-600 dark:text-teal-400 font-bold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors inline-flex items-center gap-2"
              >
                💬 Chat Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
