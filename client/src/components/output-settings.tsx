import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OutputSettingsProps {
  format: string;
  targetSize: number;
  targetSizeUnit: string;
  dpi: number;
  onFormatChange: (format: string) => void;
  onTargetSizeChange: (size: number) => void;
  onTargetSizeUnitChange: (unit: string) => void;
  onDpiChange: (dpi: number) => void;
}

export function OutputSettings({
  format,
  targetSize,
  targetSizeUnit,
  dpi,
  onFormatChange,
  onTargetSizeChange,
  onTargetSizeUnitChange,
  onDpiChange
}: OutputSettingsProps) {
  const isDpiDisabled = ['png', 'webp', 'heic'].includes(format);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Output Settings</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="format-select" className="block text-sm font-medium text-gray-700 mb-2">
            Save image as
          </Label>
          <Select value={format} onValueChange={onFormatChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WEBP</SelectItem>
              <SelectItem value="heic">HEIC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="target-size" className="block text-sm font-medium text-gray-700 mb-2">
            Target File Size
          </Label>
          <div className="flex">
            <Input
              id="target-size"
              type="number"
              value={targetSize || ''}
              onChange={(e) => onTargetSizeChange(parseInt(e.target.value) || 0)}
              className="flex-1 rounded-r-none"
              placeholder="Optional"
            />
            <Select value={targetSizeUnit} onValueChange={onTargetSizeUnitChange}>
              <SelectTrigger className="w-20 rounded-l-none border-l-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kb">KB</SelectItem>
                <SelectItem value="mb">MB</SelectItem>
                <SelectItem value="bytes">Bytes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="dpi-input" className="block text-sm font-medium text-gray-700 mb-2">
            DPI
          </Label>
          <Input
            id="dpi-input"
            type="number"
            value={dpi}
            onChange={(e) => onDpiChange(parseInt(e.target.value) || 72)}
            disabled={isDpiDisabled}
            className={isDpiDisabled ? 'bg-gray-100' : ''}
            placeholder="72"
          />
          {isDpiDisabled && (
            <p className="text-xs text-gray-500 mt-1">
              DPI is only applicable to JPG and JPEG formats
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
