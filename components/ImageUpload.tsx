import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon, ScanEye } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  onAnalyze: () => void;
  selectedFile: File | null;
  previewUrl: string | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelected, 
  onAnalyze, 
  selectedFile, 
  previewUrl, 
  onClear,
  isAnalyzing
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      }
    }
  }, [onImageSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-indigo-500" />
        Input Image
      </h2>

      {!selectedFile ? (
        <div 
          className={`
            flex-grow border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' 
              : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-white'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
            <Upload className={`w-8 h-8 ${isDragging ? 'text-indigo-600' : 'text-slate-400'}`} />
          </div>
          <p className="text-slate-900 font-medium text-lg mb-2">Click or drag image here</p>
          <p className="text-slate-500 text-sm text-center max-w-[200px]">
            Supports JPG, PNG, WEBP.
          </p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col gap-4">
          <div className="relative flex-grow bg-slate-900 rounded-2xl overflow-hidden shadow-md group">
            <img 
              src={previewUrl || ''} 
              alt="Preview" 
              className="w-full h-full object-contain absolute inset-0 transition-transform duration-700 hover:scale-105"
            />
            <button 
              onClick={onClear}
              disabled={isAnalyzing}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 p-2 rounded-full shadow-lg backdrop-blur-sm transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300
              ${isAnalyzing 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-1 active:translate-y-0'
              }
            `}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ScanEye className="w-5 h-5" />
                Analyze Scene
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;