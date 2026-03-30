import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingScreen from './components/LoadingScreen';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'loading' | 'results'
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async ({ businessDescription, eventName }) => {
    setView('loading');
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_description: businessDescription,
          event_name: eventName,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Analysis failed');
      }
      const data = await response.json();
      setAnalysisData(data);
      setView('results');
    } catch (e) {
      setError(e.message);
      setView('landing');
    }
  };

  const handleReset = () => {
    setView('landing');
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white font-ibm">
      {view === 'landing' && (
        <LandingPage onAnalyze={handleAnalyze} error={error} />
      )}
      {view === 'loading' && <LoadingScreen />}
      {view === 'results' && analysisData && (
        <ResultsDashboard data={analysisData} onReset={handleReset} />
      )}
    </div>
  );
}
