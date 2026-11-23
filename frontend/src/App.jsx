import { useState, useEffect } from 'react';
import './index.css';

/* ---------- Icons ---------- */
const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    {children}
  </svg>
);

const HashIcon = () => (
  <Icon>
    <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
  </Icon>
);
const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </Icon>
);
const CheckIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </Icon>
);
const AlertIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </Icon>
);
const Spinner = () => (
  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ---------- Reusable input field ---------- */
function Field({ id, label, icon, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
      >
        {label}
      </label>
      <div className="group relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400">
          {icon}
        </span>
        <input
          id={id}
          {...props}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400/70 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
        />
      </div>
    </div>
  );
}

/* ---------- Main App ---------- */
function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }

  // 4 सेकंदांनी message आपोआप गायब होईल
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(t);
  }, [status]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const userData = { id, name, age: Number(age) };

    try {
      const response = await fetch('http://localhost:8081/path/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setStatus({ type: 'success', text: 'Data saved to MongoDB successfully!' });
        setId('');
        setName('');
        setAge('');
      } else {
        setStatus({ type: 'error', text: 'Failed to save data. Please try again.' });
      }
    } catch (error) {
      console.error('error connect to backend', error);
      setStatus({ type: 'error', text: 'Cannot connect to backend server.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-96 w-96 animate-blob rounded-full bg-indigo-600/40 blur-3xl" />
        <div
          className="absolute -right-20 top-1/3 h-96 w-96 animate-blob rounded-full bg-fuchsia-600/30 blur-3xl"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-sky-600/30 blur-3xl"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14" />
            </svg>
          </div>
          <h1 className="bg-linear-to-r from-white to-indigo-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            React & Spring Boot
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your details to save to MongoDB
          </p>
        </div>

        {/* Status message */}
        {status && (
          <div
            className={`mb-6 flex animate-pop items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
            }`}
          >
            {status.type === 'success' ? <CheckIcon /> : <AlertIcon />}
            <span>{status.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <Field
            id="id"
            label="User ID"
            icon={<HashIcon />}
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. 101"
            required
          />
          <Field
            id="name"
            label="Full Name"
            icon={<UserIcon />}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Shrikant"
            required
          />
          <Field
            id="age"
            label="Age"
            icon={<CalendarIcon />}
            type="number"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g. 25"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Spinner /> Saving...
              </>
            ) : (
              'Submit Data'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Data is securely stored in MongoDB
        </p>
      </div>
    </div>
  );
}

export default App;