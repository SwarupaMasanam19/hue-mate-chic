
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Upload, X } from 'lucide-react';
import ActionButton from './ActionButton';

interface PhotoUploaderProps {
  onPhotoSelected: (file: File) => void;
  variant?: 'user' | 'clothing';
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ 
  onPhotoSelected,
  variant = 'user'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  const handleFiles = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        onPhotoSelected(file);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative w-full h-32 rounded-xl overflow-hidden transition-all duration-300 border-2 border-dashed",
          dragActive ? "border-huemate-gold bg-huemate-gold/10" : "border-huemate-gold/30 bg-huemate-cream/50",
          preview ? "h-48" : "h-32"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-2 right-2 p-1 rounded-full bg-huemate-dark/70 text-white hover:bg-huemate-dark"
              onClick={clearPreview}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-huemate-dark/70">
            {variant === 'user' ? (
              <>
                <Camera className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Upload your photo</p>
                <p className="text-xs mt-1">Drag & drop or click to browse</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Upload clothing item</p>
                <p className="text-xs mt-1">Drag & drop or click to browse</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
