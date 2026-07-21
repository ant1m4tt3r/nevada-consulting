'use client';

import { useState, useEffect } from 'react';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useLanguage } from '../../providers/LanguageContext.jsx';

const toDateString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDateLabel = (date, lang) =>
  date.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

const formatTimeSlot = (isoString, lang) =>
  new Date(isoString).toLocaleTimeString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });

const MONTH_NAMES = {
  pt: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const DAY_NAMES = {
  pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

const i18n = {
  pt: {
    chooseDate: 'Escolha uma data',
    chooseTime: 'Escolha um horário',
    goToPayment: 'Ir para pagamento',
    noSlots: 'Nenhum horário disponível neste dia.',
    errorSlots: 'Erro ao buscar horários.',
    back: '← Voltar',
    loading: 'Aguarde...',
  },
  en: {
    chooseDate: 'Choose a date',
    chooseTime: 'Choose a time',
    goToPayment: 'Go to payment',
    noSlots: 'No slots available on this day.',
    errorSlots: 'Error fetching slots.',
    back: '← Back',
    loading: 'Please wait...',
  },
};

export default function SchedulingModal({
  isOpen,
  onClose,
  slug,
  serviceName,
}) {
  const { currentLanguage: lang } = useLanguage();
  const t = i18n[lang] ?? i18n.pt;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      setStep(1);
      setSelectedDate(null);
      setCalYear(now.getFullYear());
      setCalMonth(now.getMonth());
      setSlots([]);
      setSelectedSlot(null);
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!selectedDate || !slug) return;
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    setError('');

    fetch(`/api/availability?date=${toDateString(selectedDate)}&slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        if ((data.slots ?? []).length === 0) setError(t.noSlots);
      })
      .catch(() => setError(t.errorSlots))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate, slug, t]);

  const handlePayment = async () => {
    setRedirecting(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          startTime: selectedSlot,
          serviceName,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao iniciar pagamento');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setRedirecting(false);
    }
  };

  // Calendar helpers
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const calMonthStart = new Date(calYear, calMonth, 1);

  const canGoPrev = calMonthStart > currentMonthStart;
  const canGoNext = true;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (calMonth === 0) {
      setCalYear(calYear - 1);
      setCalMonth(11);
    } else setCalMonth(calMonth - 1);
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    if (calMonth === 11) {
      setCalYear(calYear + 1);
      setCalMonth(0);
    } else setCalMonth(calMonth + 1);
  };

  const handleDayClick = (day) => {
    const date = new Date(calYear, calMonth, day);
    const dow = date.getDay();
    if (date <= today || dow === 0 || dow === 6) return;
    setSelectedDate(date);
    setStep(2);
  };

  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-brand-ink/60 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative z-10 mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-brand-line bg-brand-paper p-8 text-brand-ink shadow-[0_24px_80px_rgba(23,19,27,0.2)]'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 cursor-pointer text-brand-muted transition-colors hover:text-brand-ink'
        >
          <IoClose size={24} />
        </button>

        {/* Progress bar */}
        {step < 3 && (
          <div className='flex items-center gap-2 mb-6'>
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  step >= s ? 'bg-purple-primary' : 'bg-brand-line'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1 — Calendar picker */}
        {step === 1 && (
          <>
            <h2 className='mb-1 text-xl font-bold text-brand-ink'>
              {t.chooseDate}
            </h2>
            <p className='mb-6 text-sm text-brand-muted'>{serviceName}</p>

            {/* Month navigation */}
            <div className='flex items-center justify-between mb-4'>
              <button
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                className='rounded-lg p-1.5 text-brand-muted hover:bg-brand-cream hover:text-brand-ink
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'
              >
                <IoChevronBack size={18} />
              </button>

              <span className='text-sm font-semibold text-brand-ink'>
                {MONTH_NAMES[lang]?.[calMonth] ?? MONTH_NAMES.pt[calMonth]}{' '}
                {calYear}
              </span>

              <button
                onClick={handleNextMonth}
                disabled={!canGoNext}
                className='rounded-lg p-1.5 text-brand-muted hover:bg-brand-cream hover:text-brand-ink
                  disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer'
              >
                <IoChevronForward size={18} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className='grid grid-cols-7 mb-1'>
              {(DAY_NAMES[lang] ?? DAY_NAMES.pt).map((name) => (
                <div
                  key={name}
                  className='py-1 text-center text-xs font-medium text-brand-muted'
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className='grid grid-cols-7 gap-y-1'>
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} />;

                const date = new Date(calYear, calMonth, day);
                const dow = date.getDay();
                const isWeekend = dow === 0 || dow === 6;
                const isPast = date <= today;
                const isDisabled = isWeekend || isPast;
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    disabled={isDisabled}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                      transition-colors duration-200
                      ${
                        isDisabled
                          ? 'text-brand-muted/40 cursor-not-allowed'
                          : isSelected
                            ? 'bg-purple-primary text-white'
                            : 'text-brand-muted hover:bg-purple-primary/15 hover:text-brand-violet cursor-pointer'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 2 — Time slots */}
        {step === 2 && (
          <>
            <button
              onClick={() => {
                setStep(1);
                setError('');
              }}
              className='mb-4 flex cursor-pointer items-center gap-1 text-sm text-brand-muted hover:text-brand-ink'
            >
              {t.back}
            </button>
            <h2 className='mb-1 text-xl font-bold text-brand-ink'>
              {t.chooseTime}
            </h2>
            <p className='mb-6 text-sm capitalize text-brand-muted'>
              {selectedDate && formatDateLabel(selectedDate, lang)}
            </p>

            {slotsLoading && (
              <div className='flex justify-center py-8'>
                <div className='w-8 h-8 border-2 border-purple-primary border-t-transparent rounded-full animate-spin' />
              </div>
            )}

            {!slotsLoading && error && (
              <p className='text-red-400 text-sm text-center py-4'>{error}</p>
            )}

            {!slotsLoading && !error && slots.length > 0 && (
              <>
                <div className='grid grid-cols-3 gap-2 mb-6'>
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-3 rounded-xl border text-sm font-medium transition-colors duration-200 cursor-pointer
                        ${
                          selectedSlot === slot
                            ? 'border-purple-primary bg-purple-primary text-white'
                            : 'border-brand-line text-brand-muted hover:border-purple-primary hover:text-brand-violet hover:bg-purple-primary/10'
                        }`}
                    >
                      {formatTimeSlot(slot, lang)}
                    </button>
                  ))}
                </div>

                {error && <p className='text-red-400 text-sm mb-4'>{error}</p>}

                <button
                  onClick={handlePayment}
                  disabled={!selectedSlot || redirecting}
                  className='w-full bg-purple-primary hover:bg-purple-700 text-white font-semibold
                    py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 cursor-pointer'
                >
                  {redirecting ? t.loading : t.goToPayment}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
