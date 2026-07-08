const fs = require('fs');

// Testimonials
const testimonials = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/Card';

export const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { fetchTestimonials(); fetchStats(); }, []);

  const fetchTestimonials = async () => {
    setLoading(true); setError(null);
    try {
      const API_URL = (import.meta.env.VITE_API_BASE_URL || '/api') + '/testimonials';
      const response = await fetch(API_URL + '/random/3');
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Loi');
      setTestimonials(result.data.map(item => ({
        id: item.testimonialId, name: item.studentName, role: item.jobTitle || 'Hoc vien',
        content: item.content, rating: item.rating,
        avatar: item.avatarURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.studentName) + '&background=14B8A6&color=fff'
      })));
    } catch (err) { setError(err.message); loadFallbackData(); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const API_URL = (import.meta.env.VITE_API_BASE_URL || '/api') + '/testimonials';
      const response = await fetch(API_URL + '/stats/average');
      const result = await response.json();
      if (response.ok && result.success) setStats(result.data);
    } catch (err) { console.error(err); }
  };

  const loadFallbackData = () => setTestimonials([
    { id: 1, name: 'Nguyen Van A', role: 'Frontend Developer', content: 'Khoa hoc rat bo ich, giang vien nhiet tinh.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=14B8A6&color=fff' },
    { id: 2, name: 'Tran Thi B', role: 'UI/UX Designer', content: 'Chuong trinh hoc duoc thiet ke rat khoa hoc.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=D4AF37&color=fff' },
    { id: 3, name: 'Le Van C', role: 'Full-stack Developer', content: 'Sau khoa hoc toi da tu tin hon rat nhieu.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=1E3A5F&color=fff' }
  ]);

  if (loading) return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
        </div>
    </section>
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-gold-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 text-gold-700 rounded-full text-sm font-semibold mb-6">
            <Quote className="w-4 h-4" /> Danh gia
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">{t('testimonials.title')}</span>
          </h2>
          <p className="text-lg text-slate-500">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 items-start">
          {testimonials.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} style={{ marginTop: index === 1 ? '2rem' : 0 }}>
              <Card variant="glass" className="h-full" hover={false}>
                <div className="p-6">
                  <Quote className="w-10 h-10 text-teal-200 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed text-[15px]">&ldquo;{item.content}&rdquo;</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="relative">
                      <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{item.name}</h4>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card variant="glass" hover={false}>
                <div className="p-6">
                  <Quote className="w-8 h-8 text-teal-200 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 mb-6">&ldquo;{testimonials[activeIndex]?.content}&rdquo;</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <img src={testimonials[activeIndex]?.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100" />
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonials[activeIndex]?.name}</h4>
                      <p className="text-sm text-slate-500">{testimonials[activeIndex]?.role}</p>
                    </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setActiveIndex(p => p === 0 ? testimonials.length - 1 : p - 1)} className="p-2 rounded-full bg-slate-50 border border-slate-200">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)} className={"w-2 h-2 rounded-full transition-all " + (i === activeIndex ? "bg-teal-500 w-6" : "bg-slate-300")} />
              ))}
            </div>
            <button onClick={() => setActiveIndex(p => p === testimonials.length - 1 ? 0 : p + 1)} className="p-2 rounded-full bg-slate-50 border border-slate-200">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
      </div>
    </section>
  );
};`;

fs.writeFileSync('src/features/Home/components/Testimonials.jsx', testimonials);

// Footer
const footer = `import { Mail, Phone, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url(\"data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")'}} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-navy-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">EduPlatform</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Nen tang giao duc truc tuyen hang dau Viet Nam, cam ket mang den nhung khoa hoc chat luong cao.
            </p>
            <div className="flex gap-3">
              {['facebook','twitter','instagram','youtube'].map(social => (
                <a key={social} href={'https://' + social + '.com'} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-teal-500">
                  <span className="capitalize text-xs font-medium text-white">{social[0]}</span>
                </a>
              ))}
            </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Lien ket nhanh</h4>
            <ul className="space-y-3">
              {[{l:'Trang chu',h:'#home'},{l:'Khoa hoc',h:'#courses'},{l:'Gioi thieu',h:'#about'},{l:'Lien he',h:'#contact-form'}].map(link => (
                <li key={link.l}>
                  <a href={link.h} className="text-slate-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-1 group">
                    {link.l}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Khoa hoc</h4>
            <ul className="space-y-3">
              {['Lap trinh Web','Digital Marketing','UI/UX Design','Data Science'].map(c => (
                <li key={c}>
                  <a href="#courses" className="text-slate-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-1 group">
                    {c}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Lien he</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">contact@eduplatform.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">1900 xxxx</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">123 Duong ABC, Quan 1, TP.HCM</span>
              </li>
            </ul>
          </div>

        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-1">Dang ky nhan tin</h4>
              <p className="text-sm text-slate-400">Nhan thong tin ve khoa hoc va uu dai moi nhat</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Nhap email cua ban"
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors flex-1 md:w-64" />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold hover:shadow-lg hover:shadow-teal-500/20 transition-all whitespace-nowrap">
                Dang ky
              </button>
            </div>
        </div>

        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">{t('footer.copyright')}</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Chinh sach bao mat</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Dieu khoan</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
      </div>
    </footer>
  );
};`;

fs.writeFileSync('src/features/Home/components/Footer.jsx', footer);

// ContactForm
const contact = `import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, User, Mail, Phone, MessageSquare, Baby, Clock, Gift, GraduationCap, Heart, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';

const schema = z.object({
  parentName: z.string().min(1, 'Vui long nhap ho ten').min(2, 'Toi thieu 2 ky tu'),
  childName: z.string().min(1, 'Vui long nhap ten con').min(2, 'Toi thieu 2 ky tu'),
  email: z.string().min(1, 'Vui long nhap email').email('Email khong hop le'),
  phone: z.string().min(1, 'Vui long nhap SDT').regex(/^[0-9]{10}$/, 'SDT phai co 10 chu so'),
  message: z.string().min(1, 'Vui long nhap noi dung').min(10, 'Toi thieu 10 ky tu')
});

export const ContactForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { parentName: '', childName: '', email: '', phone: '', message: '' }
  });

  const onSubmit = async (data) => {
    setIsLoading(true); setError(null);
    try {
      const API_URL = (import.meta.env.VITE_API_BASE_URL || '/api') + '/contact';
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Loi');
      setIsSuccess(true); reset(); setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Backend chua duoc deploy.' : (err.message || 'Loi'));
    } finally { setIsLoading(false); }
  };

  const benefits = [
    { icon: Target, title: 'Tu van mien phi', desc: 'Doi ngu chuyen gia tu van nhiet tinh', color: 'from-teal-400 to-teal-500' },
    { icon: Clock, title: 'Phan hoi nhanh', desc: 'Lien he trong vong 24h', color: 'from-blue-400 to-blue-500' },
    { icon: GraduationCap, title: 'Chuong trinh phu hop', desc: 'Thiet ke rieng cho tung do tuoi', color: 'from-violet-400 to-violet-500' },
    { icon: Gift, title: 'Uu dai dac biet', desc: 'Giam gia cho khach dang ky som', color: 'from-gold-400 to-gold-500' }
  ];

  const inputClass = (hasError) => "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none placeholder:text-slate-400 " +
    (hasError ? "border-coral-300 focus:border-coral-500 focus:ring-4 focus:ring-coral-500/10 bg-coral-50/30" : "border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 hover:border-slate-300");

  return (
    <section id="contact-form" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gold-100/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Lien He Tu Van
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-gradient">Dang Ky Tu Van Mien Phi</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">De lai thong tin, chung toi se lien he tu van chi tiet</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {benefits.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all">
                  <div className={"w-12 h-12 rounded-xl bg-gradient-to-br " + item.color + " flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform"}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="rounded-2xl p-6 bg-gradient-to-br from-navy-600 to-navy-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                    <Gift className="w-6 h-6 text-gold-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Uu dai dac biet</h4>
                    <p className="text-white/80 text-sm">Giam ngay 20% hoc phi cho 50 khach hang dau tien!</p>
                  </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                        <CheckCircle2 className="w-20 h-20 text-teal-500 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Gui thanh cong!</h3>
                      <p className="text-slate-500 mb-6">Cam on ban da quan tam. Chung toi se lien he som.</p>
                      <Button onClick={() => setIsSuccess(false)} variant="secondary">Gui yeu cau khac</Button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5"><User className="w-4 h-4 inline mr-1 text-slate-400" /> Ho ten phu huynh</label>
                          <input {...register('parentName')} placeholder="Nguyen Van A" className={inputClass(errors.parentName)} />
                          {errors.parentName && <p className="mt-1 text-sm text-coral-600">{errors.parentName.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5"><Baby className="w-4 h-4 inline mr-1 text-slate-400" /> Ten con</label>
                          <input {...register('childName')} placeholder="Be Minh" className={inputClass(errors.childName)} />
                          {errors.childName && <p className="mt-1 text-sm text-coral-600">{errors.childName.message}</p>}
                        </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5"><Mail className="w-4 h-4 inline mr-1 text-slate-400" /> Email</label>
                        <input {...register('email')} type="email" placeholder="example@email.com" className={inputClass(errors.email)} />
                        {errors.email && <p className="mt-1 text-sm text-coral-600">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5"><Phone className="w-4 h-4 inline mr-1 text-slate-400" /> So dien thoai</label>
                        <input {...register('phone')} type="tel" placeholder="0123456789" className={inputClass(errors.phone)} />
                        {errors.phone && <p className="mt-1 text-sm text-coral-600">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5"><MessageSquare className="w-4 h-4 inline mr-1 text-slate-400" /> Noi dung tu van</label>
                        <textarea {...register('message')} rows="4" placeholder="Do tuoi cua con va khoa hoc ban quan tam..." className={inputClass(errors.message) + " resize-none"} />
                        {errors.message && <p className="mt-1 text-sm text-coral-600">{errors.message.message}</p>}
                      </div>
                      {error && <div className="bg-coral-50 border border-coral-200 text-coral-700 px-4 py-3 rounded-xl text-sm">{error}</div>}
                      <Button type="submit" disabled={isLoading} className="w-full" variant="gradientTeal" size="lg">
                        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Dang gui...</> : <><Send className="w-5 h-5" /> Gui yeu cau tu van</>}
                      </Button>
                      <p className="text-xs text-slate-400 text-center">Bang cach gui form, ban dong y voi chinh sach bao mat</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
      </div>
    </section>
  );
};`;

fs.writeFileSync('src/features/Home/components/ContactForm.jsx', contact);

// RegistrationForm
const reg = `import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

const schema = z.object({
  fullName: z.string().min(1, 'Vui long nhap ho ten').min(2, 'Toi thieu 2 ky tu'),
  email: z.string().optional().refine(val => !val || /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val), { message: 'Email khong hop le' }),
  phone: z.string().min(1, 'Vui long nhap SDT').regex(/^[0-9]{10}$/, 'SDT phai co 10 chu so')
});

export const RegistrationForm = ({ selectedCourse, onSuccess }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '' }
  });

  const onSubmit = async (data) => {
    setIsLoading(true); setError(null);
    try {
      const API_URL = (import.meta.env.VITE_API_BASE_URL || '/api') + '/registrations';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: data.fullName, email: data.email || null, phone: data.phone.replace(/\\s/g, ''), courseId: selectedCourse?.courseId || selectedCourse?.id })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Loi');
      setIsSuccess(true); reset();
      setTimeout(() => { setIsSuccess(false); onSuccess?.(); }, 2000);
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Backend chua duoc deploy.' : (err.message || 'Loi'));
    } finally { setIsLoading(false); }
  };

  if (isSuccess) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
        <CheckCircle className="w-20 h-20 text-teal-500 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('registration.success')}</h3>
      <p className="text-slate-600">{t('registration.successMessage')}</p>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('registration.title')}</h3>
        <p className="text-slate-600">{t('registration.subtitle')}</p>
      </div>

      {selectedCourse && (
        <div className="bg-gradient-to-r from-teal-50 to-gold-50 rounded-xl p-4 border-2 border-teal-200">
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('registration.course')}</label>
          <div className="flex items-center gap-3">
            {selectedCourse.image && <img src={selectedCourse.image} alt={selectedCourse.title} className="w-16 h-16 rounded-lg object-cover"
