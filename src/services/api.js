const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const fallbackImages = [
  'https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=700',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700',
];

const buildUrl = (path, params) => {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  });
  const queryString = query.toString();
  return `${API_BASE}${path}${queryString ? `?${queryString}` : ''}`;
};

export async function apiRequest(path, options = {}) {
  const res = await fetch(buildUrl(path, options.params), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || `HTTP ${res.status}`);
  }

  if (payload && payload.success === false) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

const body = (data) => JSON.stringify(data);

export const mapCourse = (course, index = 0) => ({
  ...course,
  id: course.courseId ?? course.id,
  title: course.courseName ?? course.title,
  subjectId: course.subjectId ?? course.subject?.subjectId,
  subjectName: course.subject?.subjectName ?? course.subjectName,
  category: course.subject?.subjectName ?? course.subjectName ?? course.category ?? 'Khóa học',
  image: course.imageUrl ?? course.image ?? fallbackImages[index % fallbackImages.length],
  duration: course.duration ?? 'Linh hoạt',
  level: course.level ?? 'Lớp 1-12',
  price: course.price ? `${Number(course.price).toLocaleString('vi-VN')}đ` : 'Liên hệ',
  features: course.features ?? ['Lộ trình cá nhân', 'Giáo viên kèm sát', 'Theo dõi tiến độ'],
  schedule: course.schedule ?? '2-3 buổi/tuần, 90 phút/buổi',
  teacher: course.instructor?.fullName ?? course.teacher ?? 'Giáo viên LeoEducation',
  highlights: course.highlights ?? [
    'Lộ trình học tập cá nhân hóa',
    'Theo dõi tiến độ thường xuyên',
    'Giáo viên hỗ trợ sát từng học viên',
  ],
  curriculum: course.curriculum ?? [
    'Đánh giá trình độ đầu vào',
    'Xây dựng lộ trình học phù hợp',
    'Củng cố kiến thức nền tảng',
    'Luyện tập theo mục tiêu',
    'Đánh giá tiến độ và điều chỉnh',
  ],
});

export const mapInstructor = (teacher, index = 0) => ({
  ...teacher,
  id: teacher.instructorId ?? teacher.id ?? index,
  name: teacher.fullName ?? teacher.name,
  subject: teacher.role ?? teacher.subject ?? 'Giáo viên',
  school: teacher.bio ?? teacher.school ?? 'LeoEducation',
  color: teacher.color ?? ['from-pink-500 to-rose-500', 'from-blue-500 to-indigo-500', 'from-teal-500 to-cyan-500', 'from-orange-500 to-amber-500'][index % 4],
  emoji: teacher.avatarUrl ? null : teacher.emoji ?? '👩‍🏫',
  avatarUrl: teacher.avatarUrl,
  experience: teacher.experience ?? teacher.experienceText ?? 'Nhiều năm kinh nghiệm',
  rating: teacher.rating ?? 5,
});

export const mapTestimonial = (item, index = 0) => ({
  ...item,
  id: item.testimonialId ?? item.id ?? index,
  name: item.studentName ?? item.name,
  role: item.jobTitle ?? item.role ?? 'Học viên LeoEducation',
  content: item.content,
  rating: item.rating ?? 5,
});

export const mapBlog = (item, index = 0) => ({
  ...item,
  id: item.blogId ?? item.id ?? index,
  title: item.title,
  excerpt: item.summary ?? item.excerpt ?? item.content ?? '',
  date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : item.date,
  category: item.category ?? 'Tin tức',
  emoji: item.emoji ?? ['📚', '🎓', '📝'][index % 3],
  color: item.color ?? ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500'][index % 3],
  imageUrl: item.imageUrl,
});

export const mapSubject = (subject) => ({
  ...subject,
  id: subject.subjectId ?? subject.id,
  name: subject.subjectName ?? subject.name,
  title: subject.subjectName ?? subject.name,
  courseCount: subject.courseCount ?? 0,
});

export const publicApi = {
  subjects: () => apiRequest('/subjects').then((res) => ({
    ...res,
    data: (res.data || []).map(mapSubject),
  })),
  courses: (params = {}) => apiRequest('/courses', { params }).then((res) => ({
    ...res,
    data: (res.data || []).map(mapCourse),
  })),
  course: (id) => apiRequest(`/courses/${id}`).then((res) => ({ ...res, data: mapCourse(res.data) })),
  instructors: () => apiRequest('/instructors').then((res) => ({
    ...res,
    data: (res.data || []).map(mapInstructor),
  })),
  testimonials: () => apiRequest('/testimonials').then((res) => ({
    ...res,
    data: (res.data || []).map(mapTestimonial),
  })),
  blogs: () => apiRequest('/blogs').then((res) => ({
    ...res,
    data: (res.data || []).map(mapBlog),
  })),
  contact: (data) => apiRequest('/contact', { method: 'POST', body: body(data) }),
  registerCourse: (data) => apiRequest('/registrations', { method: 'POST', body: body(data) }),
};
