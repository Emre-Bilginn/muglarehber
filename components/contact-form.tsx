'use client';

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Mesaj şu anda alınamadı.");
        return;
      }

      setSuccess("Mesajınız editör ekibine iletildi. Genellikle 2 iş günü içinde dönüş yapılır.");
      setFormData(initialState);
    } catch {
      setError("Mesaj gönderimi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(name: string, value: string) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-800">Ad soyad</span>
          <input
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400"
            placeholder="Adınızı ve soyadınızı yazın"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-800">E-posta</span>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-sky-400"
            placeholder="ornek@alanadi.com"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-800">Konu</span>
        <select
          required
          value={formData.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
        >
          <option value="">Konu seçin</option>
          <option value="İçerik önerisi">İçerik önerisi</option>
          <option value="Hata bildirimi">Hata bildirimi</option>
          <option value="İş birliği">İş birliği</option>
          <option value="Genel soru">Genel soru</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-800">Mesaj</span>
        <textarea
          required
          rows={7}
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition focus:border-sky-400"
          placeholder="Sorunuzu, önerinizi veya düzeltme talebinizi mümkün olduğunca açık yazın."
        />
      </label>

      {success ? (
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-800">
          <CheckCircle2 className="mt-1 h-5 w-5 flex-none" />
          <p>{success}</p>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-start gap-3 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-800">
          <AlertCircle className="mt-1 h-5 w-5 flex-none" />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-7 text-slate-500">
          Ticari iş birlikleri, düzeltme talepleri ve editöryel öneriler için bu formu kullanabilirsiniz.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Mesajı gönder
        </button>
      </div>
    </form>
  );
}
