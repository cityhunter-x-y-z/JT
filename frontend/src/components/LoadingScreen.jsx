import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { text: 'Fetching live currency rates...', delay: 0 },
  { text: 'Retrieving recent news context...', delay: 1400 },
  { text: 'Running AI analysis...', delay: 3000 },
];

export default function LoadingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.slice(1).map((step, i) =>
      setTimeout(() => setActiveStep(i + 1), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-start justify-center px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md"
      >
        {/* Spinner */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full flex-shrink-0"
          />
          <span className="font-barlow text-xl font-semibold text-slate-700 uppercase tracking-wide">
            Analysing
          </span>
        </div>

        {/* Step list */}
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <AnimatePresence key={i}>
              {activeStep >= i && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  {activeStep > i ? (
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 flex-shrink-0 animate-pulse" />
                  )}
                  <span
                    className={`text-sm font-ibm ${
                      activeStep > i
                        ? 'text-slate-400 line-through'
                        : activeStep === i
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-8 text-xs text-slate-400 font-mono"
        >
          This may take 15–30 seconds
        </motion.p>
      </motion.div>
    </div>
  );
}
