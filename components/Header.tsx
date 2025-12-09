import React from 'react';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-200 mb-8 gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            SceneDetect
          </h1>
        </div>
        <p className="text-slate-500 font-medium pl-1">
          Intel Image Classification &middot; ResNet18
        </p>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 shadow-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-wide">Model Ready</span>
      </div>
    </header>
  );
};

export default Header;