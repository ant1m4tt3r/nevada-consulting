'use client';

import { useState } from 'react';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';

const initialForm = { name: '', email: '', message: '' };

export default function HomeContactForm({ copy }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Contact request failed');

      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClassName =
    'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-white/60 focus:bg-white/15 focus:ring-2 focus:ring-white/10';

  return (
    <form
      className='rounded-3xl border border-white/15 bg-brand-ink/25 p-5 shadow-[0_20px_60px_rgba(23,19,27,0.16)] md:p-7'
      onSubmit={submitForm}
    >
      <div className='grid gap-3 sm:grid-cols-2'>
        <label className='sr-only' htmlFor='contact-name'>
          {copy.name}
        </label>
        <input
          className={inputClassName}
          id='contact-name'
          name='name'
          type='text'
          autoComplete='name'
          maxLength={100}
          placeholder={copy.name}
          value={form.name}
          onChange={updateField}
          required
        />
        <label className='sr-only' htmlFor='contact-email'>
          {copy.email}
        </label>
        <input
          className={inputClassName}
          id='contact-email'
          name='email'
          type='email'
          autoComplete='email'
          maxLength={160}
          placeholder={copy.email}
          value={form.email}
          onChange={updateField}
          required
        />
      </div>
      <label className='sr-only' htmlFor='contact-message'>
        {copy.message}
      </label>
      <textarea
        className={`${inputClassName} mt-3 min-h-32 resize-y`}
        id='contact-message'
        name='message'
        maxLength={4000}
        placeholder={copy.message}
        value={form.message}
        onChange={updateField}
        required
      />

      <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <button
          className='inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-bold text-brand-violet transition hover:-translate-y-0.5 hover:bg-brand-lilac disabled:cursor-wait disabled:opacity-65'
          type='submit'
          disabled={status === 'loading'}
        >
          {status === 'loading' ? copy.sending : copy.send}
          <FiArrowUpRight />
        </button>

        <div className='min-h-5 text-xs text-white/80' aria-live='polite'>
          {status === 'success' ? (
            <span className='flex items-center gap-2 text-brand-mint'>
              <FiCheckCircle />
              {copy.success}
            </span>
          ) : null}
          {status === 'error' ? copy.error : null}
        </div>
      </div>
    </form>
  );
}
