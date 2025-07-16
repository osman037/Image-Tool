import { UploadedImage, ProcessedImage, ProcessingSettings } from '@/types/image';
import JSZip from 'jszip';

export class ImageProcessor {
  static async processImages(
    images: UploadedImage[],
    settings: ProcessingSettings
  ): Promise<ProcessedImage[]> {
    const processedImages: ProcessedImage[] = [];

    for (const image of images) {
      try {
        const processedImage = await this.processImage(image, settings);
        processedImages.push(processedImage);
      } catch (error) {
        console.error(`Error processing image ${image.name}:`, error);
        throw new Error(`Failed to process image ${image.name}`);
      }
    }

    return processedImages;
  }

  static async processImage(
    image: UploadedImage,
    settings: ProcessingSettings
  ): Promise<ProcessedImage> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const dimensions = this.calculateDimensions(
            img.width,
            img.height,
            settings
          );

          canvas.width = dimensions.width;
          canvas.height = dimensions.height;

          // Clear canvas
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw image based on adjust mode
          this.drawImageWithMode(ctx, img, canvas, settings.adjustMode);

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to create blob'));
                return;
              }

              const processedImage: ProcessedImage = {
                id: image.id,
                name: this.generateFileName(image.name, settings.format),
                blob,
                downloadUrl: URL.createObjectURL(blob),
                width: canvas.width,
                height: canvas.height,
              };

              resolve(processedImage);
            },
            this.getMimeType(settings.format),
            settings.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = image.src;
    });
  }

  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    settings: ProcessingSettings
  ): { width: number; height: number } {
    let { width, height } = settings;

    // Handle percentage unit
    if (settings.unit === '%') {
      width = Math.round((originalWidth * width) / 100);
      height = Math.round((originalHeight * height) / 100);
    }
    // Handle physical units (approximate conversion to pixels)
    else if (settings.unit === 'CM') {
      const dpi = settings.dpi || 72;
      width = Math.round((width * dpi) / 2.54);
      height = Math.round((height * dpi) / 2.54);
    } else if (settings.unit === 'MM') {
      const dpi = settings.dpi || 72;
      width = Math.round((width * dpi) / 25.4);
      height = Math.round((height * dpi) / 25.4);
    } else if (settings.unit === 'INCH') {
      const dpi = settings.dpi || 72;
      width = Math.round(width * dpi);
      height = Math.round(height * dpi);
    }

    return { width: Math.max(1, width), height: Math.max(1, height) };
  }

  private static drawImageWithMode(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvas: HTMLCanvasElement,
    mode: string
  ): void {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    switch (mode) {
      case 'stretch':
        // Stretch to fill entire canvas
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        break;

      case 'fill':
        // Fill canvas while maintaining aspect ratio (may crop)
        const fillScale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const fillWidth = imgWidth * fillScale;
        const fillHeight = imgHeight * fillScale;
        const fillX = (canvasWidth - fillWidth) / 2;
        const fillY = (canvasHeight - fillHeight) / 2;
        ctx.drawImage(img, fillX, fillY, fillWidth, fillHeight);
        break;

      case 'fit':
        // Fit entire image within canvas while maintaining aspect ratio
        const fitScale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const fitWidth = imgWidth * fitScale;
        const fitHeight = imgHeight * fitScale;
        const fitX = (canvasWidth - fitWidth) / 2;
        const fitY = (canvasHeight - fitHeight) / 2;
        ctx.drawImage(img, fitX, fitY, fitWidth, fitHeight);
        break;

      case 'none':
        // Original size, centered
        const noneX = (canvasWidth - imgWidth) / 2;
        const noneY = (canvasHeight - imgHeight) / 2;
        ctx.drawImage(img, noneX, noneY);
        break;

      default:
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
  }

  private static getMimeType(format: string): string {
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      case 'heic':
        return 'image/heic';
      default:
        return 'image/jpeg';
    }
  }

  private static generateFileName(originalName: string, format: string): string {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const domain = window.location.hostname;
    return `${nameWithoutExt}_resized_by_${domain}.${format.toLowerCase()}`;
  }

  static async createZipDownload(images: ProcessedImage[]): Promise<string> {
    const zip = new JSZip();

    images.forEach((image) => {
      zip.file(image.name, image.blob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return URL.createObjectURL(zipBlob);
  }

  static downloadSingleImage(image: ProcessedImage): void {
    const link = document.createElement('a');
    link.href = image.downloadUrl;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async downloadAsZip(images: ProcessedImage[]): Promise<void> {
    const zipUrl = await this.createZipDownload(images);
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = 'resized_images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(zipUrl);
  }
}
