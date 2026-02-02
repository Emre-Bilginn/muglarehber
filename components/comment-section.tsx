'use client';

import { useState, useEffect } from 'react';
import { User, Send, Loader2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?articleId=${articleId ?? ''}`);
        const data = await res?.json?.();
        setComments(data?.comments ?? []);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, name, email, content }),
      });

      if (res?.ok) {
        const data = await res?.json?.();
        setComments((prev) => [data?.comment, ...(prev ?? [])]);
        setName('');
        setEmail('');
        setContent('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Yorum gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-sky-500" />
        Yorumlar ({comments?.length ?? 0})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
            <input
              type="text"
              value={name ?? ''}
              onChange={(e) => setName(e?.target?.value ?? '')}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="Adınızı girin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              value={email ?? ''}
              onChange={(e) => setEmail(e?.target?.value ?? '')}
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
              placeholder="E-posta adresiniz"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Yorumunuz</label>
          <textarea
            value={content ?? ''}
            onChange={(e) => setContent(e?.target?.value ?? '')}
            required
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Yorumunuzu yazın..."
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">E-posta adresiniz yayınlanmayacaktır.</p>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-medium rounded-lg transition-colors"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</>
            ) : (
              <><Send className="w-4 h-4" /> Yorum Gönder</>
            )}
          </button>
        </div>

        <AnimatePresence>
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-600 text-sm font-medium"
            >
              Yorumunuz başarıyla eklendi!
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-600 text-sm font-medium"
            >
              {error ?? ''}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
          </div>
        ) : (comments?.length ?? 0) === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Henüz yorum yok. İlk yorumu siz yapın!
          </p>
        ) : (
          comments?.map?.((comment) => (
            <motion.div
              key={comment?.id ?? ''}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{comment?.name ?? ''}</p>
                  <p className="text-xs text-gray-400">
                    {comment?.createdAt
                      ? new Date(comment?.createdAt)?.toLocaleDateString?.('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : ''}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed pl-13">{comment?.content ?? ''}</p>
            </motion.div>
          )) ?? null
        )}
      </div>
    </div>
  );
}
