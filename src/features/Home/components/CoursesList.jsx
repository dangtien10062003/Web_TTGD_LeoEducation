import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Star, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';

const CATEGORIES = ['Tất cả', 'Lập trình', 'Marketing', 'Thiết kế', 'Data Science'];

export const CoursesList = ({ onRegisterClick }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchCourses();
  }, [pagination.currentPage]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://your-backend-url.com/api/courses'
        : 'http://localhost:5000/api/courses';

      const response = await fetch(`${API_URL}?page=${pagination.currentPage}&limit=${pagination.limit}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Không thể tải danh sách khóa học');
      }

      const mappedCourses = result.data.map(course => ({
        id: course.courseId,
        courseId: course.courseId,
        title: course.courseName,
        description: course.description,
        image: course.imageURL || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
        price: `${course.price.toLocaleString('vi-VN')}đ`,
        duration: course.duration,
        students: Math.floor(Math.random() * 1000) + 100,
        lessons: parseInt((course.duration || '').match(/\d+/)?.[0]) || 24,
        instructor: 'Giảng viên',
        rating: 4.8,
        category: course.category || 'Lập trình'
      }));

      setCourses(mappedCourses);
      setPagination(prev => ({
        ...prev,
        total: result.pagination?.total ?? 0,
        totalPages: result.pagination?.totalPages ?? 0
      }));

    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackData = () => {
    const fallbackCourses = [
      {
        id: 1, courseId: 1,
        title: 'Lập trình Web Frontend',
        description: 'Học HTML, CSS, JavaScript và React từ cơ bản đến nâng cao',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
        price: '2.999.000đ', duration: '3 tháng', students: 1250, lessons: 45,
        instructor: 'Nguyễn Văn A', rating: 4.8, category: 'Lập trình'
      },
      {
        id: 2, courseId: 2,
        title: 'Digital Marketing',
        description: 'Chiến lược Marketing Online hiệu quả cho doanh nghiệp',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        price: '1.999.000đ', duration: '2 tháng', students: 890, lessons: 32,
        instructor: 'Trần Thị B', rating: 4.7, category: 'Marketing'
      },
      {
        id: 3, courseId: 3,
        title: 'UI/UX Design',
        description: 'Thiết kế giao diện người dùng chuyên nghiệp với Figma',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
        price: '2.499.000đ', duration: '2.5 tháng', students: 670, lessons: 38,
        instructor: 'Lê Văn C', rating: 4.9, category: 'Thiết kế'
      }
    ];
    setCourses(fallbackCourses);
  };

  const filteredCourses = activeCategory === 'Tất cả'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) {
    return (
<section id="courses" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 dark:text-teal-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-gray-400">Đang tải khóa học...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
<section id="courses" className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-200">
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" />
            Khóa học
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('courses.title')}</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-gray-400">{t('courses.subtitle')}</p>
          {error && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 bg-amber-50 dark:bg-amber-900/20 inline-block px-4 py-2 rounded-full">
              ⚠️ Đang hiển thị dữ liệu mẫu (Backend chưa kết nối)
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-navy-700 dark:bg-teal-600 text-white shadow-lg shadow-navy-500/20 dark:shadow-teal-500/20'
                  : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card variant="gradient" className="h-full flex flex-col group">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-navy-700 dark:text-teal-400 font-bold text-sm">{course.price}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold border border-teal-100 dark:border-teal-700">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-gray-300">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-navy-700 dark:group-hover:text-teal-400 transition-colors">{course.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

                    <div className="flex items-center gap-5 text-sm text-slate-500 dark:text-gray-400 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                        <span>{course.students} {t('courses.students')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                        <span>{course.lessons} {t('courses.lessons')}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <Button
                        onClick={() => onRegisterClick(course)}
                        className="w-full"
                        variant="gradientTeal"
                        size="md"
                      >
                        {t('courses.register')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
              disabled={pagination.currentPage === 1}
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Trang trước
            </Button>
            <span className="text-slate-600 dark:text-gray-300 font-medium">
              Trang {pagination.currentPage} / {pagination.totalPages}
            </span>
            <Button
              onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
              disabled={pagination.currentPage === pagination.totalPages}
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Trang sau
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
