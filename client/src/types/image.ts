export interface UploadedImage {
  file: File;
  src: string;
  width: number;
  height: number;
  name: string;
  id: string;
}

export interface ProcessedImage {
  id: string;
  name: string;
  blob: Blob;
  downloadUrl: string;
  width: number;
  height: number;
}

export interface ProcessingSettings {
  width: number;
  height: number;
  format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'heic';
  quality: number;
  adjustMode: 'stretch' | 'fill' | 'fit' | 'none';
  dpi?: number;
  targetSize?: number;
  targetSizeUnit?: 'bytes' | 'kb' | 'mb';
  unit: 'PX' | 'CM' | 'MM' | 'INCH' | '%';
}

export interface Preset {
  name: string;
  width: number;
  height: number;
  category: string;
  unit: string;
}
