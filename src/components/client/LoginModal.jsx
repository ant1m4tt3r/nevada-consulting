'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const inputClassName =
  'w-full rounded-xl border border-brand-line bg-brand-cream px-4 py-3 text-brand-ink placeholder:text-brand-muted/60 focus:border-purple-primary focus:outline-none focus:ring-2 focus:ring-purple-primary/15';

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
    setEmailSent(false);
  };

  const switchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t('login.invalidCredentials'));
    } else {
      onClose();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError(t('login.passwordMismatch'));
      setLoading(false);
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setEmailSent(true);
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-brand-ink/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative z-10 mx-4 w-full max-w-md rounded-3xl border border-brand-line bg-brand-paper p-8 text-brand-ink shadow-[0_24px_80px_rgba(23,19,27,0.2)]'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-brand-muted transition-colors hover:text-brand-ink'
        >
          <IoClose size={24} />
        </button>

        {/* Email sent screen */}
        {emailSent ? (
          <div className='flex flex-col items-center text-center py-4'>
            <div className='text-5xl mb-4'>📧</div>
            <h2 className='mb-3 text-xl font-bold text-brand-ink'>
              {t('login.checkEmailTitle')}
            </h2>
            <p className='mb-2 text-sm leading-relaxed text-brand-muted'>
              {t('login.checkEmailBody')}{' '}
              <strong className='text-brand-ink'>{email}</strong>.
            </p>
            <p className='mb-6 text-xs text-brand-muted/80'>
              {t('login.checkEmailSpam')}
            </p>
            <button
              onClick={() => switchMode('login')}
              className='text-purple-primary hover:underline text-sm cursor-pointer'
            >
              {t('login.backToLogin')}
            </button>
          </div>
        ) : (
          <>
            {/* Title */}
            <h2 className='mb-2 text-2xl font-bold text-brand-ink'>
              {mode === 'login' ? t('login.title') : t('login.registerTitle')}
            </h2>

            {/* Mode toggle */}
            <p className='mb-6 text-sm text-brand-muted'>
              {mode === 'login' ? t('login.noAccount') : t('login.hasAccount')}{' '}
              <button
                onClick={() =>
                  switchMode(mode === 'login' ? 'register' : 'login')
                }
                className='text-purple-primary hover:underline font-medium cursor-pointer'
              >
                {mode === 'login'
                  ? t('login.register')
                  : t('login.backToLogin')}
              </button>
            </p>

            {/* Login form */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className='space-y-4'>
                <input
                  type='email'
                  placeholder={t('login.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClassName}
                />
                <input
                  type='password'
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={inputClassName}
                />

                {error && <p className='text-red-400 text-sm'>{error}</p>}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-purple-primary hover:bg-purple-primary/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
                >
                  {loading ? t('login.loading') : t('login.signIn')}
                </button>
              </form>
            )}

            {/* Register form */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className='space-y-4'>
                <input
                  type='text'
                  placeholder={t('login.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClassName}
                />
                <input
                  type='email'
                  placeholder={t('login.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClassName}
                />
                <input
                  type='password'
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={inputClassName}
                />
                <input
                  type='password'
                  placeholder={t('login.confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={inputClassName}
                />

                {error && <p className='text-red-400 text-sm'>{error}</p>}

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-purple-primary hover:bg-purple-primary/80 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
                >
                  {loading ? t('login.loading') : t('login.registerButton')}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t border-brand-line' />
              <span className='px-4 text-sm text-brand-muted'>
                {t('login.or')}
              </span>
              <div className='flex-1 border-t border-brand-line' />
            </div>

            {/* OAuth buttons */}
            <div className='space-y-3'>
              <button
                onClick={() => signIn('google')}
                className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-brand-line bg-white py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-cream'
              >
                <FcGoogle size={22} />
                {t('login.google')}
              </button>

              {/* <button
                onClick={() => signIn('facebook')}
                className='w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer'
              >
                <FaFacebook size={22} />
                {t('login.facebook')}
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
