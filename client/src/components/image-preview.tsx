import { UploadedImage } from '@/types/image';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  images: UploadedImage[];
  onRemoveImage: (id: string) => void;
}

export function ImagePreview({ images, onRemoveImage }: ImagePreviewProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative bg-gray-50 rounded-lg overflow-hidden">
          <img 
            src={image.src} 
            alt={image.name} 
            className="w-full h-32 object-cover"
          />
          <div className="p-2">
            <p className="text-xs font-medium text-gray-900 truncate">{image.name}</p>
            <p className="text-xs text-gray-500">{image.width}x{image.height}</p>
          </div>
          <button 
            onClick={() => onRemoveImage(image.id)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
