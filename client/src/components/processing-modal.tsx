import { Progress } from '@/components/ui/progress';

interface ProcessingModalProps {
  isOpen: boolean;
  progress: number;
  currentImage: number;
  totalImages: number;
}

export function ProcessingModal({ isOpen, progress, currentImage, totalImages }: ProcessingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Images...</h3>
          <p className="text-gray-600 mb-4">
            Please wait while we resize your images.
            {totalImages > 1 && (
              <span className="block text-sm mt-1">
                Processing image {currentImage} of {totalImages}
              </span>
            )}
          </p>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
