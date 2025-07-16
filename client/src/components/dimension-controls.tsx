import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPresetsByUnit } from '@/lib/presets';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DimensionControlsProps {
  width: number;
  height: number;
  unit: string;
  adjustMode: string;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onUnitChange: (unit: string) => void;
  onAdjustModeChange: (mode: string) => void;
  onPresetSelect: (width: number, height: number) => void;
}

const units = ['PX', 'CM', 'MM', 'INCH', '%'];
const adjustModes = [
  { value: 'stretch', label: 'Stretch' },
  { value: 'fill', label: 'Fill' },
  { value: 'fit', label: 'Fit' },
  { value: 'none', label: 'None' }
];

export function DimensionControls({
  width,
  height,
  unit,
  adjustMode,
  onWidthChange,
  onHeightChange,
  onUnitChange,
  onAdjustModeChange,
  onPresetSelect
}: DimensionControlsProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const presets = getPresetsByUnit(unit);

  const handlePresetClick = (preset: any) => {
    onPresetSelect(preset.width, preset.height);
    setSelectedPreset(`${preset.width}x${preset.height}`);
  };

  return (
    <div className="space-y-6">
      {/* Unit Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dimension Unit</h3>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {units.map((u) => (
            <Button
              key={u}
              variant={unit === u ? "default" : "outline"}
              size="sm"
              onClick={() => onUnitChange(u)}
              className={`unit-btn ${unit === u ? 'active' : ''}`}
            >
              {u}
            </Button>
          ))}
        </div>

        {/* Presets */}
        <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Presets for {unit} dimensions</h4>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {presets.map((preset) => {
                  const presetKey = `${preset.width}x${preset.height}`;
                  const isSelected = selectedPreset === presetKey;
                  
                  return (
                    <button
                      key={`${preset.name}-${preset.width}x${preset.height}-${preset.unit}`}
                      onClick={() => handlePresetClick(preset)}
                      className={`advanced-preset-btn w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      {preset.name} ({preset.width}x{preset.height} {preset.unit.toLowerCase()})
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Custom Dimensions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Dimensions</h3>
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </Label>
            <div className="flex">
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)}
                className="flex-1 rounded-r-none"
                placeholder="Enter width"
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                {unit.toLowerCase()}
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </Label>
            <div className="flex">
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)}
                className="flex-1 rounded-r-none"
                placeholder="Enter height"
              />
              <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-500">
                {unit.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Adjust Image Mode */}
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Adjust image</h4>
        <div className="grid grid-cols-2 gap-2">
          {adjustModes.map((mode) => (
            <Button
              key={mode.value}
              variant={adjustMode === mode.value ? "default" : "outline"}
              size="sm"
              onClick={() => onAdjustModeChange(mode.value)}
              className={`adjust-btn ${adjustMode === mode.value ? 'active' : ''}`}
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
