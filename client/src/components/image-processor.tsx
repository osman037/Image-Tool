import { useState, useEffect } from 'react';
import { UploadedImage, ProcessedImage, ProcessingSettings } from '@/types/image';
import { UploadArea } from './upload-area';
import { ImagePreview } from './image-preview';
import { PresetButtons } from './preset-buttons';
import { DimensionControls } from './dimension-controls';
import { OutputSettings } from './output-settings';
import { ProcessingModal } from './processing-modal';
import { ImageProcessor } from '@/lib/image-processor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileImage } from 'lucide-react';

interface ImageProcessorProps {
  mode: 'basic' | 'advanced';
  presetData?: {
    width: number;
    height: number;
    unit: string;
    preset: string;
  } | null;
}

export function ImageProcessorComponent({ mode, presetData }: ImageProcessorProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentProcessingImage, setCurrentProcessingImage] = useState(0);

  // Basic mode settings
  const [basicWidth, setBasicWidth] = useState(1080);
  const [basicHeight, setBasicHeight] = useState(1080);
  const [selectedBasicPreset, setSelectedBasicPreset] = useState<{ width: number; height: number }>();

  // Advanced mode settings
  const [advancedWidth, setAdvancedWidth] = useState(1080);
  const [advancedHeight, setAdvancedHeight] = useState(1080);
  const [unit, setUnit] = useState('PX');
  const [adjustMode, setAdjustMode] = useState('stretch');
  const [format, setFormat] = useState('jpg');
  const [targetSize, setTargetSize] = useState(0);
  const [targetSizeUnit, setTargetSizeUnit] = useState('kb');
  const [dpi, setDpi] = useState(72);

  // Apply preset data when it changes
  useEffect(() => {
    if (presetData && mode === 'advanced') {
      setAdvancedWidth(presetData.width);
      setAdvancedHeight(presetData.height);
      setUnit(presetData.unit);
    }
  }, [presetData, mode]);

  const handleImagesUploaded = (images: UploadedImage[]) => {
    setUploadedImages(images);
    setProcessedImages([]);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleBasicPresetSelect = (width: number, height: number) => {
    setBasicWidth(width);
    setBasicHeight(height);
    setSelectedBasicPreset({ width, height });
  };

  const handleAdvancedPresetSelect = (width: number, height: number) => {
    setAdvancedWidth(width);
    setAdvancedHeight(height);
  };

  const processImages = async () => {
    if (uploadedImages.length === 0) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentProcessingImage(0);

    const settings: ProcessingSettings = {
      width: mode === 'basic' ? basicWidth : advancedWidth,
      height: mode === 'basic' ? basicHeight : advancedHeight,
      format: mode === 'basic' ? 'jpg' : format as any,
      quality: 0.9,
      adjustMode: mode === 'basic' ? 'stretch' : adjustMode as any,
      unit: mode === 'basic' ? 'PX' : unit as any,
      dpi: mode === 'basic' ? 72 : dpi,
      targetSize: mode === 'advanced' ? targetSize : undefined,
      targetSizeUnit: mode === 'advanced' ? targetSizeUnit as any : undefined,
    };

    try {
      const processed: ProcessedImage[] = [];
      
      for (let i = 0; i < uploadedImages.length; i++) {
        setCurrentProcessingImage(i + 1);
        const processedImage = await ImageProcessor.processImage(uploadedImages[i], settings);
        processed.push(processedImage);
        setProcessingProgress(((i + 1) / uploadedImages.length) * 100);
      }

      setProcessedImages(processed);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSingleImage = (image: ProcessedImage) => {
    ImageProcessor.downloadSingleImage(image);
  };

  const downloadAllAsZip = async () => {
    if (processedImages.length === 0) return;
    await ImageProcessor.downloadAsZip(processedImages);
  };

  const canProcess = uploadedImages.length > 0 && 
    (mode === 'basic' ? (basicWidth > 0 && basicHeight > 0) : (advancedWidth > 0 && advancedHeight > 0));

  return (
    <div className="space-y-8">
      <UploadArea 
        onImagesUploaded={handleImagesUploaded}
        uploadedCount={uploadedImages.length}
      />

      {uploadedImages.length > 0 && (
        <ImagePreview images={uploadedImages} onRemoveImage={handleRemoveImage} />
      )}

      {mode === 'basic' ? (
        <div className="grid md:grid-cols-2 gap-8">
          <PresetButtons 
            onPresetSelect={handleBasicPresetSelect}
            selectedPreset={selectedBasicPreset}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Size</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="basic-width" className="block text-sm font-medium text-gray-700 mb-2">
                  Width (px)
                </Label>
                <Input
                  id="basic-width"
                  type="number"
                  value={basicWidth}
                  onChange={(e) => setBasicWidth(parseInt(e.target.value) || 0)}
                  placeholder="Enter width"
                />
              </div>
              <div>
                <Label htmlFor="basic-height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height (px)
                </Label>
                <Input
                  id="basic-height"
                  type="number"
                  value={basicHeight}
                  onChange={(e) => setBasicHeight(parseInt(e.target.value) || 0)}
                  placeholder="Enter height"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <DimensionControls
            width={advancedWidth}
            height={advancedHeight}
            unit={unit}
            adjustMode={adjustMode}
            onWidthChange={setAdvancedWidth}
            onHeightChange={setAdvancedHeight}
            onUnitChange={setUnit}
            onAdjustModeChange={setAdjustMode}
            onPresetSelect={handleAdvancedPresetSelect}
          />
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Custom Dimensions</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="advanced-width" className="block text-sm font-medium text-gray-700 mb-2">
                  Width
                </Label>
                <div className="flex">
                  <Input
                    id="advanced-width"
                    type="number"
                    value={advancedWidth}
                    onChange={(e) => setAdvancedWidth(parseInt(e.target.value) || 0)}
                    className="rounded-r-none"
                    placeholder="Enter width"
                  />
                  <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                    {unit.toLowerCase()}
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="advanced-height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </Label>
                <div className="flex">
                  <Input
                    id="advanced-height"
                    type="number"
                    value={advancedHeight}
                    onChange={(e) => setAdvancedHeight(parseInt(e.target.value) || 0)}
                    className="rounded-r-none"
                    placeholder="Enter height"
                  />
                  <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                    {unit.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <OutputSettings
            format={format}
            targetSize={targetSize}
            targetSizeUnit={targetSizeUnit}
            dpi={dpi}
            onFormatChange={setFormat}
            onTargetSizeChange={setTargetSize}
            onTargetSizeUnitChange={setTargetSizeUnit}
            onDpiChange={setDpi}
          />
        </div>
      )}

      <div className="text-center">
        <Button
          onClick={processImages}
          disabled={!canProcess || isProcessing}
          size="lg"
          className="bg-primary-600 hover:bg-primary-700"
        >
          <FileImage className="w-5 h-5 mr-2" />
          Preview & Download
        </Button>
      </div>

      {processedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processed Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {processedImages.map((image) => (
              <div key={image.id} className="relative bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={image.downloadUrl} 
                  alt={image.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{image.name}</p>
                  <p className="text-xs text-gray-500">{image.width}x{image.height}</p>
                </div>
                <button 
                  onClick={() => downloadSingleImage(image)}
                  className="absolute top-2 right-2 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs hover:bg-primary-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {processedImages.length > 1 && (
            <div className="text-center">
              <Button onClick={downloadAllAsZip} className="bg-primary-600 hover:bg-primary-700">
                <Download className="w-4 h-4 mr-2" />
                Download All as ZIP
              </Button>
            </div>
          )}
        </div>
      )}

      <ProcessingModal
        isOpen={isProcessing}
        progress={processingProgress}
        currentImage={currentProcessingImage}
        totalImages={uploadedImages.length}
      />
    </div>
  );
}
