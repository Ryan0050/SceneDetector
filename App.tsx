import React, { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ResultsPanel from './components/ResultsPanel';
import { PredictionResult } from './types';
import { classifyImage } from './services/api';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const prediction = await classifyImage(selectedFile);
      setResult(prediction);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again or check your connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        <Header />

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <section className="lg:col-span-5 h-[500px] lg:h-[600px]">
            <ImageUpload 
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              onImageSelected={handleImageSelected}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
            />
          </section>

          <section className="lg:col-span-7 h-auto min-h-[500px] lg:h-[600px]">
             {error ? (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 flex items-center justify-center h-full">
                  <p className="font-medium text-lg">{error}</p>
                </div>
             ) : (
               <ResultsPanel 
                 result={result}
                 isLoading={isAnalyzing}
               />
             )}
          </section>

        </main>
        
        <footer className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SceneDetector Project. Powered by PyTorch & React.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;