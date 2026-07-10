const API_BASE = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.PROD ? 'https://be-leoeducation.onrender.com/api' : '/api');

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
const asArray = (value) => (Array.isArray(value) ? value : []);
const withPaging = (params = {}) => {
  const { limit, page, ...rest } = params;
  return {
    ...rest,
    ...(limit !== undefined ? { pageSize: limit } : {}),
    ...(page !== undefined ? { pageIndex: page } : {}),
  };
};

export const mapCourse = (course) => ({
  ...course,
  id: course.courseId ?? course.id,
  title: course.courseName ?? course.title ?? '',
  subjectId: course.subjectId ?? course.subject?.subjectId,
  subjectName: course.subject?.subjectName ?? course.subjectName ?? '',
  category: course.subject?.subjectName ?? course.subjectName ?? course.category ?? '',
  image: course.imageUrl ?? course.image ?? '',
  duration: course.duration ?? '',
  level: course.level ?? '',
  price: course.price ? `${Number(course.price).toLocaleString('vi-VN')}đ` : '',
  features: asArray(course.features),
  schedule: course.schedule ?? '',
  teacher: course.instructor?.fullName ?? course.teacher ?? '',
  highlights: asArray(course.highlights),
  curriculum: asArray(course.curriculum),
});

export const mapInstructor = (teacher) => ({
  ...teacher,
  id: teacher.instructorId ?? teacher.id,
  name: teacher.fullName ?? teacher.name ?? '',
  subject: teacher.role ?? teacher.subject ?? '',
  school: teacher.bio ?? teacher.school ?? '',
  color: teacher.color ?? 'from-gold-500 to-gold-500',
  emoji: teacher.emoji ?? '',
  avatarUrl: teacher.avatarUrl ?? '',
  experience: teacher.experience ?? teacher.experienceText ?? '',
  rating: teacher.rating ?? null,
});

export const mapTestimonial = (item) => ({
  ...item,
  id: item.testimonialId ?? item.id,
  name: item.studentName ?? item.name ?? '',
  role: item.jobTitle ?? item.role ?? '',
  content: item.content ?? '',
  rating: item.rating ?? 0,
});

export const mapBlog = (item) => ({
  ...item,
  id: item.blogId ?? item.id,
  title: item.title ?? '',
  excerpt: item.summary ?? item.excerpt ?? item.content ?? '',
  date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : '',
  category: item.category ?? '',
  emoji: item.emoji ?? '',
  color: item.color ?? 'from-gold-500 to-gold-500',
  imageUrl: item.imageUrl ?? '',
});

export const mapSubject = (subject) => ({
  ...subject,
  id: subject.subjectId ?? subject.id,
  name: subject.subjectName ?? subject.name ?? '',
  title: subject.subjectName ?? subject.name ?? '',
  courseCount: subject.courseCount ?? 0,
});

export const publicApi = {
  subjects: () => apiRequest('/subjects').then((res) => ({
    ...res,
    data: (res.data || []).map(mapSubject),
  })),
  courses: (params = {}) => apiRequest('/courses', { params: withPaging(params) }).then((res) => ({
    ...res,
    data: (res.data || []).map(mapCourse),
  })),
  course: (id) => apiRequest(`/courses/${id}`).then((res) => ({
    ...res,
    data: res.data ? mapCourse(res.data) : null,
  })),
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
