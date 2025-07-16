import { useCallback, useState } from 'react';
import { UploadedImage } from '@/types/image';
import { CloudUpload } from 'lucide-react';

interface UploadAreaProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxSize?: number;
  uploadedCount: number;
}

export function UploadArea({ 
  onImagesUploaded, 
  maxFiles = 10, 
  maxSize = 20 * 1024 * 1024,
  uploadedCount = 0
}: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = useCallback((files: FileList) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validImages: UploadedImage[] = [];

    if (files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported format`);
        return;
      }

      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds 20MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${Math.random()}`,
            file,
            src: e.target?.result as string,
            width: img.width,
            height: img.height,
            name: file.name,
          };

          validImages.push(uploadedImage);
          
          if (validImages.length === files.length || validImages.length === Array.from(files).filter(f => allowedTypes.includes(f.type) && f.size <= maxSize).length) {
            onImagesUploaded(validImages);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, [maxFiles, maxSize, onImagesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleFiles(target.files);
      }
    };
    input.click();
  };

  return (
    <div
      className={`upload-area border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragOver ? 'drag-over border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div className="max-w-md mx-auto">
        <CloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drag & drop images here, or click to select ({uploadedCount}/{maxFiles})
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, JPEG, PNG, WEBP (Max 20MB per file)
        </p>
      </div>
    </div>
  );
}
