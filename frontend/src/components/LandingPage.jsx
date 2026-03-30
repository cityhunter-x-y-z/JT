import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';

const EVENT_CARDS = [
  {
    name: 'France Economic Transition 2025',
    short: 'France 2025',
    badge: null,
    gradient: 'from-blue-50 to-indigo-100',
    accent: '#4f46e5',
    description: 'Budget reforms & fiscal realignment',
    svg: 'france',
  },
  {
    name: 'Eastern Europe Conflict',
    short: 'Eastern Europe',
    badge: null,
    gradient: 'from-slate-50 to-slate-100',
    accent: '#475569',
    description: 'Regional instability & supply shifts',
    svg: 'eastern_europe',
  },
  {
    name: 'Middle East Tensions 2026',
    short: 'Mid-East Tensions',
    badge: 'ONGOING',
    gradient: 'from-amber-50 to-orange-100',
    accent: '#d97706',
    description: 'Geopolitical pressure on energy flows',
    svg: 'middle_east',
  },
  {
    name: 'US-China Trade Relations',
    short: 'US–China Trade',
    badge: null,
    gradient: 'from-cyan-50 to-sky-100',
    accent: '#0369a1',
    description: 'Tariffs, supply chains & tech access',
    svg: 'us_china',
  },
  {
    name: 'Middle East Energy Shifts',
    short: 'Energy Shifts',
    badge: null,
    gradient: 'from-green-50 to-emerald-100',
    accent: '#059669',
    description: 'OPEC strategy & oil pricing outlook',
    svg: 'energy',
  },
];

function EventSVG({ type }) {
  const svgs = {
    france: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fr1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#fr1)" />
        <rect x="10" y="50" width="8" height="25" fill="#4f46e5" opacity="0.6" rx="1" />
        <rect x="22" y="38" width="8" height="37" fill="#6366f1" opacity="0.5" rx="1" />
        <rect x="34" y="44" width="8" height="31" fill="#4f46e5" opacity="0.6" rx="1" />
        <rect x="46" y="30" width="8" height="45" fill="#818cf8" opacity="0.5" rx="1" />
        <rect x="58" y="35" width="8" height="40" fill="#4f46e5" opacity="0.7" rx="1" />
        <rect x="70" y="42" width="8" height="33" fill="#6366f1" opacity="0.5" rx="1" />
        <rect x="82" y="26" width="8" height="49" fill="#4f46e5" opacity="0.6" rx="1" />
        <rect x="94" y="38" width="8" height="37" fill="#818cf8" opacity="0.4" rx="1" />
        <polyline points="14,50 26,38 38,44 50,30 62,35 74,42 86,26 98,38" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8" />
        <circle cx="86" cy="26" r="3" fill="#4f46e5" opacity="0.9" />
      </svg>
    ),
    eastern_europe: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ee1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#ee1)" />
        <path d="M20,60 Q35,20 60,40 Q80,55 100,15" fill="none" stroke="#475569" strokeWidth="2" opacity="0.6" />
        <path d="M15,65 Q40,30 65,45 Q85,60 105,20" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3" />
        <circle cx="60" cy="40" r="5" fill="#475569" opacity="0.7" />
        <circle cx="35" cy="20" r="3" fill="#94a3b8" opacity="0.6" />
        <circle cx="85" cy="30" r="4" fill="#475569" opacity="0.5" />
        <line x1="35" y1="20" x2="60" y2="40" stroke="#475569" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <line x1="60" y1="40" x2="85" y2="30" stroke="#475569" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <rect x="5" y="5" width="25" height="12" rx="2" fill="#e2e8f0" opacity="0.8" />
        <text x="17" y="14" textAnchor="middle" fontSize="5" fill="#475569" fontFamily="sans-serif">REGION</text>
      </svg>
    ),
    middle_east: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="me1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#me1)" />
        <ellipse cx="60" cy="50" rx="45" ry="20" fill="#d97706" opacity="0.1" />
        <circle cx="60" cy="35" r="18" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
        <circle cx="60" cy="35" r="10" fill="#f59e0b" opacity="0.2" />
        <circle cx="60" cy="35" r="4" fill="#d97706" opacity="0.7" />
        <line x1="60" y1="10" x2="60" y2="17" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        <line x1="60" y1="53" x2="60" y2="60" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        <line x1="35" y1="35" x2="42" y2="35" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        <line x1="78" y1="35" x2="85" y2="35" stroke="#d97706" strokeWidth="1.5" opacity="0.6" />
        <path d="M30,65 Q45,55 60,60 Q75,65 90,58" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    us_china: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="uc1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#uc1)" />
        <rect x="5" y="25" width="35" height="8" rx="2" fill="#0369a1" opacity="0.5" />
        <rect x="5" y="36" width="28" height="8" rx="2" fill="#0369a1" opacity="0.35" />
        <rect x="5" y="47" width="32" height="8" rx="2" fill="#0369a1" opacity="0.45" />
        <rect x="80" y="25" width="35" height="8" rx="2" fill="#0ea5e9" opacity="0.5" />
        <rect x="87" y="36" width="28" height="8" rx="2" fill="#0ea5e9" opacity="0.35" />
        <rect x="83" y="47" width="32" height="8" rx="2" fill="#0ea5e9" opacity="0.45" />
        <path d="M42,29 Q60,15 78,29" fill="none" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6" />
        <path d="M42,40 Q60,50 78,40" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.4" />
        <circle cx="60" cy="22" r="3" fill="#0369a1" opacity="0.6" />
        <circle cx="60" cy="48" r="2" fill="#0ea5e9" opacity="0.5" />
        <text x="17" y="68" textAnchor="middle" fontSize="6" fill="#0369a1" fontFamily="monospace" opacity="0.7">US</text>
        <text x="97" y="68" textAnchor="middle" fontSize="6" fill="#0ea5e9" fontFamily="monospace" opacity="0.7">CN</text>
      </svg>
    ),
    energy: (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="en1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#en1)" />
        <path d="M10,70 Q20,30 30,50 Q40,65 50,35 Q60,10 70,40 Q80,60 90,30 Q100,5 110,25" fill="none" stroke="#059669" strokeWidth="2" opacity="0.7" />
        <path d="M10,72 Q20,45 30,58 Q40,70 50,48 Q60,28 70,50 Q80,66 90,42 Q100,20 110,38" fill="#059669" fillOpacity="0.08" />
        <circle cx="110" cy="25" r="4" fill="#059669" opacity="0.8" />
        <line x1="105" y1="25" x2="95" y2="25" stroke="#059669" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="20" x2="110" y2="12" stroke="#059669" strokeWidth="1" opacity="0.5" />
        <text x="55" y="15" textAnchor="middle" fontSize="5.5" fill="#059669" fontFamily="monospace" opacity="0.6">OPEC ▲</text>
      </svg>
    ),
  };
  return svgs[type] || svgs['france'];
}

export default function LandingPage({ onAnalyze, error }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [businessText, setBusinessText] = useState('');
  const textareaRef = useRef(null);

  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    const newH = Math.min(el.scrollHeight, 80);
    el.style.height = newH + 'px';
    setBusinessText(el.value);
  };

  const handleAnalyze = () => {
    if (!businessText.trim() || !selectedEvent) return;
    onAnalyze({ businessDescription: businessText.trim(), eventName: selectedEvent });
  };

  const canAnalyze = businessText.trim().length > 0 && selectedEvent !== null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-barlow text-sm font-semibold tracking-widest text-slate-400 uppercase">
              GIA
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">v2.0 · Live Data</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-3xl"
        >
          {/* Hero Text */}
          <div className="mb-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-barlow text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-3 leading-none uppercase"
            >
              Global Event
              <br />
              <span className="text-blue-600">Impact Analyser</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-slate-500 text-base font-ibm"
            >
              Understanding how global macro shifts affect your business
            </motion.p>
          </div>

          {/* Gradient Input */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="mb-8"
          >
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Describe your business
            </label>
            <div className="gradient-border-wrap">
              <div className="gradient-border-inner">
                <textarea
                  ref={textareaRef}
                  className="gradient-textarea"
                  placeholder="e.g. We are a mid-size IT services firm in Pune, exporting software solutions to European clients..."
                  value={businessText}
                  onInput={handleTextareaInput}
                  onChange={(e) => setBusinessText(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </motion.div>

          {/* Event Cards */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="mb-8"
          >
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 ml-1">
              Select a global event
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {EVENT_CARDS.map((event, i) => (
                <motion.button
                  key={event.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 + i * 0.06, duration: 0.35 }}
                  onClick={() => setSelectedEvent(event.name)}
                  className={`
                    relative rounded-xl overflow-hidden aspect-square flex flex-col
                    border-2 transition-all duration-200 text-left
                    ${selectedEvent === event.name
                      ? 'border-blue-500 shadow-md shadow-blue-100 ring-1 ring-blue-400'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }
                    bg-gradient-to-br ${event.gradient}
                  `}
                >
                  {/* Image area */}
                  <div className="flex-1 p-1">
                    <EventSVG type={event.svg} />
                  </div>
                  {/* Label */}
                  <div className="px-2 pb-2">
                    {event.badge && (
                      <span className="inline-block text-[9px] font-mono font-semibold bg-slate-200 text-slate-500 rounded px-1 py-0.5 mb-1">
                        {event.badge}
                      </span>
                    )}
                    <p className="text-[11px] font-semibold font-barlow text-slate-700 leading-tight">
                      {event.short}
                    </p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                      {event.description}
                    </p>
                  </div>
                  {selectedEvent === event.name && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm"
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
          >
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className={`
                group flex items-center gap-3 px-8 py-3.5 rounded-xl font-barlow font-semibold
                text-lg uppercase tracking-wider transition-all duration-200
                ${canAnalyze
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-blue-300'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              Analyze Impact
              <ArrowRight size={18} className={`transition-transform duration-200 ${canAnalyze ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </motion.div>

          {!canAnalyze && (
            <p className="text-center text-xs text-slate-400 mt-3">
              {!businessText.trim() && !selectedEvent
                ? 'Add your business description and select an event to begin'
                : !businessText.trim()
                ? 'Add your business description to continue'
                : 'Select a global event to continue'}
            </p>
          )}
        </motion.div>
      </main>

      <footer className="px-6 py-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Live data · Frankfurter · NewsData.io · Claude AI
          </p>
          <p className="text-xs text-slate-400 font-mono">
            Built for Indian businesses
          </p>
        </div>
      </footer>
    </div>
  );
}
