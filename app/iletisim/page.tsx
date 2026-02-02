'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import AdPlaceholder from '@/components/ad-placeholder';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData ?? {}),
      });

      if (res?.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res?.json?.();
        setError(data?.error ?? 'Mesaj gönderilemedi.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...(prev ?? {}),
      [e?.target?.name ?? '']: e?.target?.value ?? '',
    }));
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
            <Mail className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdPlaceholder size="banner" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-semibold text-gray-900">E-posta</h3>
              </div>
              <p className="text-gray-600 text-sm">info@kesfetmugla.com</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Telefon</h3>
              </div>
              <p className="text-gray-600 text-sm">+90 252 123 4567</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Adres</h3>
              </div>
              <p className="text-gray-600 text-sm">Muğla, Türkiye</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajınız Gönderildi!</h3>
                  <p className="text-gray-600">En kısa sürede size dönüş yapacağız.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adınız *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData?.name ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                        placeholder="Adınızı girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData?.email ?? ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                        placeholder="E-posta adresiniz"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konu *</label>
                    <select
                      name="subject"
                      value={formData?.subject ?? ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Konu seçin</option>
                      <option value="Genel Soru">Genel Soru</option>
                      <option value="Öneri">Site Önerisi</option>
                      <option value="Hata Bildirimi">Hata Bildirimi</option>
                      <option value="Reklam">Reklam / İşbirliği</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız *</label>
                    <textarea
                      name="message"
                      value={formData?.message ?? ''}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Mesajınızı yazın..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error ?? ''}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">* zorunlu alanlar</p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-medium rounded-lg transition-colors"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Gönder</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <AdPlaceholder size="footer" className="mt-8" />
      </div>
    </div>
  );
}
