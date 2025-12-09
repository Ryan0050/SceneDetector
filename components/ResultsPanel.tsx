import React, { useMemo } from 'react';
import { PredictionResult, SceneLabel } from '../types';
import { BarChart3, Mountain, Building2, Trees, Snowflake, Waves, Car } from 'lucide-react';

interface ResultsPanelProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, isLoading }) => {
  const sortedProbabilities = useMemo(() => {
    if (!result) return [];
    return [...result.allProbabilities].sort((a, b) => b.probability - a.probability);
  }, [result]);

  const getIconForLabel = (label: SceneLabel) => {
    switch (label) {
      case 'Buildings': return <Building2 className="w-5 h-5" />;
      case 'Forest': return <Trees className="w-5 h-5" />;
      case 'Glacier': return <Snowflake className="w-5 h-5" />;
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Sea': return <Waves className="w-5 h-5" />;
      case 'Street': return <Car className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getColorForProbability = (prob: number) => {
    if (prob > 0.8) return 'bg-emerald-500';
    if (prob > 0.5) return 'bg-blue-500';
    if (prob > 0.2) return 'bg-yellow-500';
    return 'bg-slate-300';
  };

  const getTextColorForProbability = (prob: number) => {
    if (prob > 0.8) return 'text-emerald-700';
    if (prob > 0.5) return 'text-blue-700';
    if (prob > 0.2) return 'text-yellow-700';
    return 'text-slate-500';
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
         <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          Analysis Results
        </h2>
        <div className="flex-grow flex flex-col gap-6 animate-pulse">
          <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          Analysis Results
        </h2>
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3 className="text-slate-900 font-medium mb-1">No Analysis Yet</h3>
          <p className="text-slate-500 text-sm max-w-xs">
            Upload an image and click "Analyze Scene" to see the ResNet18 classification results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-indigo-500" />
        Analysis Results
      </h2>

      {/* Top Prediction Card */}
      <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-xl shadow-indigo-100/50 mb-6 flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-full opacity-50 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Primary Prediction</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-bold text-slate-900">{result.topLabel}</h3>
            {getIconForLabel(result.topLabel)}
          </div>
        </div>
        
        <div className="text-right z-10">
          <div className="text-3xl font-bold text-indigo-600">
            {(result.confidence * 100).toFixed(1)}%
          </div>
          <p className="text-sm font-medium text-indigo-400">Confidence</p>
        </div>
      </div>

      {/* Probability Bars */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-grow">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Class Probabilities</h4>
        <div className="space-y-5">
          {sortedProbabilities.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{getIconForLabel(item.label)}</span>
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <span className={`font-bold text-sm ${getTextColorForProbability(item.probability)}`}>
                  {(item.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getColorForProbability(item.probability)}`}
                  style={{ width: `${item.probability * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;