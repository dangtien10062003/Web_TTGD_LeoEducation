import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal';
import { publicApi } from '../../../services/api';

export const Blog = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let mounted = true;

    publicApi
      .blogs()
      .then((res) => {
        if (mounted) setPosts(res.data || []);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 dark:bg-gold-900/30 border border-gold-200 dark:border-gold-700 text-gold-700 dark:text-gold-300 rounded-full text-sm font-semibold mb-6"
          >
            <Newspaper className="w-4 h-4" />
            {t('blog.badge')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('blog.title')}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id || post.title || index}
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700 hover:border-transparent transition-all shadow-sm hover:shadow-xl">
                <div className={`relative h-48 bg-gradient-to-br ${post.color} flex items-center justify-center text-7xl overflow-hidden`}>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
                  ) : (
                    null
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${post.color} bg-opacity-10 rounded-full text-xs font-semibold text-slate-700 dark:text-gray-300`}>
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-gold-600 dark:text-gold-400 group-hover:gap-3 transition-all">
                    {t('blog.readMore')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Modal
          isOpen={Boolean(selectedPost)}
          onClose={() => setSelectedPost(null)}
          title={selectedPost?.title || 'Chi tiết bài viết'}
        >
          {selectedPost && (
            <div className="space-y-5">
              <div className={`relative h-44 rounded-2xl bg-gradient-to-br ${selectedPost.color} flex items-center justify-center text-6xl overflow-hidden`}>
                {selectedPost.imageUrl ? (
                  <img src={selectedPost.imageUrl} alt={selectedPost.title} className="h-full w-full object-cover" />
                ) : (
                  null
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                  <Tag className="w-3 h-3" />
                  {selectedPost.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {selectedPost.date}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                {selectedPost.content || selectedPost.excerpt}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};
