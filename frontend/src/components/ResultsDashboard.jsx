import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  RefreshCw,
  Check,
  TrendingDown,
  TrendingUp,
  Minus,
  Calendar,
  Newspaper,
  Shield,
  Zap,
  BarChart2,
} from 'lucide-react';

const TIMEFRAME_COLORS = {
  'Short-term': 'bg-slate-100 text-slate-600',
  'Medium-term': 'bg-blue-50 text-blue-600',
  'Long-term': 'bg-indigo-50 text-indigo-600',
};

const STATUS_CONFIG = {
  RISK: { color: 'text-slate-600', bg: 'bg-slate-100', icon: TrendingDown, bar: 'bg-slate-400' },
  OPP: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: TrendingUp, bar: 'bg-emerald-400' },
  NEU: { color: 'text-sky-600', bg: 'bg-sky-50', icon: Minus, bar: 'bg-sky-300' },
};

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={14} className="text-slate-400" />
      <h2 className="font-barlow text-sm font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </h2>
    </div>
  );
}

function ResilienceBar({ score }) {
  const pct = Math.min(100, Math.max(0, (score / 10) * 100));
  const color =
    score >= 7 ? 'from-emerald-400 to-emerald-500' :
    score >= 5 ? 'from-blue-400 to-blue-500' :
    'from-amber-400 to-amber-500';

  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  );
}

function generateReport(data) {
  const { business_description, event_name, currency, date, analysis, industry_map } = data;
  const a = analysis || {};

  let report = `GLOBAL EVENT IMPACT ANALYSIS REPORT\n`;
  report += `===================================\n\n`;
  report += `Business: ${business_description}\n`;
  report += `Global Event: ${event_name}\n`;
  report += `Date: ${date}\n`;
  report += `USD/INR: ₹${currency?.USD_INR} | EUR/INR: ₹${currency?.EUR_INR}\n\n`;

  if (a.summary_insight) {
    report += `CONTEXT\n-------\n${a.summary_insight}\n\n`;
  }
  if (a.risk_factors?.length) {
    report += `RISK FACTORS\n------------\n`;
    a.risk_factors.forEach((rf) => {
      report += `• [${rf.timeframe}] ${rf.title}: ${rf.description}\n`;
    });
    report += '\n';
  }
  if (a.headwinds?.length) {
    report += `HEADWINDS\n---------\n`;
    a.headwinds.forEach((h) => report += `• ${h.title}: ${h.description}\n`);
    report += '\n';
  }
  if (a.opportunities?.length) {
    report += `OPPORTUNITIES\n-------------\n`;
    a.opportunities.forEach((o) => report += `• ${o.title}: ${o.description}\n`);
    report += '\n';
  }
  if (a.actions?.length) {
    report += `RECOMMENDED ACTIONS\n-------------------\n`;
    a.actions.forEach((ac) => report += `${ac.number}. ${ac.title}: ${ac.description}\n`);
    report += '\n';
  }
  if (a.resilience_score !== undefined) {
    report += `RESILIENCE SCORE: ${a.resilience_score}/10\n`;
    if (a.resilience_rationale) report += `${a.resilience_rationale}\n\n`;
  }
  if (industry_map?.length) {
    report += `SECTOR OVERVIEW\n---------------\n`;
    industry_map.forEach((ind) => {
      report += `${ind.sector}: ${ind.status} (${ind.intensity}%) — ${ind.note}\n`;
    });
  }

  return report;
}

export default function ResultsDashboard({ data, onReset }) {
  const [copied, setCopied] = useState(false);

  const { business_description, event_name, currency, date, news_headlines, analysis, industry_map } = data;
  const a = analysis || {};
  const industries = industry_map || [];

  const handleCopy = () => {
    const text = generateReport(data);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-barlow text-sm font-semibold tracking-widest text-slate-400 uppercase">GIA</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:border-slate-300 text-slate-600 transition-all"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy Report'}
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              <RefreshCw size={12} />
              New Analysis
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">

          {/* 1 · Summary Bar */}
          <motion.div variants={fadeUp}>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[180px]">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Business</p>
                <p className="text-sm font-ibm text-slate-800 font-medium line-clamp-2">{business_description}</p>
              </div>
              <div className="flex-1 min-w-[140px]">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Global Event</p>
                <p className="text-sm font-ibm text-slate-800 font-medium">{event_name}</p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">USD/INR</p>
                  <p className="text-sm font-mono font-semibold text-slate-700">₹{currency?.USD_INR}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">EUR/INR</p>
                  <p className="text-sm font-mono font-semibold text-slate-700">₹{currency?.EUR_INR}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar size={12} />
                  <span className="text-[11px] font-mono">{date}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2 · Recent Context */}
          {(a.summary_insight || (news_headlines && news_headlines.length > 0)) && (
            <motion.div variants={fadeUp}>
              <SectionHeader icon={Newspaper} title="Recent Context" />
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                {a.summary_insight && (
                  <p className="text-sm font-ibm text-blue-900 leading-relaxed mb-3">{a.summary_insight}</p>
                )}
                {news_headlines && news_headlines.length > 0 && (
                  <div className="space-y-1.5">
                    {news_headlines.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[10px] font-mono text-blue-400 mt-0.5 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-xs text-blue-700 leading-snug">{h.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 3 · Risk Factors */}
          {a.risk_factors && a.risk_factors.length > 0 && (
            <motion.div variants={fadeUp}>
              <SectionHeader icon={Shield} title="Risk Factors" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {a.risk_factors.map((rf, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-3 bg-white hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-barlow font-semibold text-slate-800 leading-tight">{rf.title}</h3>
                      <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${TIMEFRAME_COLORS[rf.timeframe] || TIMEFRAME_COLORS['Short-term']}`}>
                        {rf.timeframe?.replace('-term', '') || 'Short'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{rf.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4 · Headwinds | Opportunities */}
          {(a.headwinds?.length || a.opportunities?.length) ? (
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {a.headwinds && a.headwinds.length > 0 && (
                <div>
                  <SectionHeader icon={TrendingDown} title="Headwinds" />
                  <div className="space-y-2">
                    {a.headwinds.map((h, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <h3 className="text-sm font-barlow font-semibold text-slate-700 mb-0.5">{h.title}</h3>
                        <p className="text-xs text-slate-500 leading-snug">{h.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {a.opportunities && a.opportunities.length > 0 && (
                <div>
                  <SectionHeader icon={TrendingUp} title="Opportunities" />
                  <div className="space-y-2">
                    {a.opportunities.map((o, i) => (
                      <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                        <h3 className="text-sm font-barlow font-semibold text-emerald-800 mb-0.5">{o.title}</h3>
                        <p className="text-xs text-emerald-700 leading-snug">{o.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : null}

          {/* 5 · Actions */}
          {a.actions && a.actions.length > 0 && (
            <motion.div variants={fadeUp}>
              <SectionHeader icon={Zap} title="Recommended Actions" />
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {a.actions.map((action, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white flex-shrink-0">
                          {action.number || i + 1}
                        </span>
                        <h3 className="text-sm font-barlow font-semibold text-white leading-tight">{action.title}</h3>
                      </div>
                      <p className="text-xs text-blue-100 leading-snug">{action.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 6 · Resilience Score */}
          {a.resilience_score !== undefined && (
            <motion.div variants={fadeUp}>
              <SectionHeader icon={Shield} title="Resilience Score" />
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex items-end gap-4 mb-3">
                  <div>
                    <span className="font-barlow text-5xl font-bold text-slate-900">{a.resilience_score}</span>
                    <span className="font-barlow text-2xl text-slate-400">/10</span>
                  </div>
                  <div className="flex-1 pb-1.5">
                    <ResilienceBar score={a.resilience_score} />
                  </div>
                </div>
                {a.resilience_rationale && (
                  <p className="text-xs text-slate-500 leading-relaxed">{a.resilience_rationale}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* 7 · Sector Overview */}
          {industries.length > 0 && (
            <motion.div variants={fadeUp}>
              <SectionHeader icon={BarChart2} title="Sector Overview" />
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {industries.map((ind, i) => {
                    const cfg = STATUS_CONFIG[ind.status] || STATUS_CONFIG['NEU'];
                    const Icon = cfg.icon;
                    const isLastRow = i >= industries.length - (industries.length % 2 === 0 ? 2 : 1);
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-2.5
                          ${!isLastRow ? 'border-b border-slate-100' : ''}
                          ${i % 2 === 0 ? 'sm:border-r sm:border-slate-100' : ''}
                        `}
                      >
                        <Icon size={13} className={cfg.color} />
                        <span className="text-xs font-ibm text-slate-700 flex-1 min-w-0 truncate">{ind.sector}</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} flex-shrink-0`}>
                          {ind.status}
                        </span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden flex-shrink-0">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ind.intensity}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + i * 0.04 }}
                            className={`h-full rounded-full ${cfg.bar}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div variants={fadeUp} className="flex gap-3 pt-2 pb-6">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:border-slate-300 text-slate-700 transition-all font-barlow uppercase tracking-wide"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Report'}
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition-all font-barlow uppercase tracking-wide"
            >
              <RefreshCw size={14} />
              New Analysis
            </button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
