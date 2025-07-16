import { basicPresets } from '@/lib/presets';

interface PresetButtonsProps {
  onPresetSelect: (width: number, height: number) => void;
  selectedPreset?: { width: number; height: number };
}

export function PresetButtons({ onPresetSelect, selectedPreset }: PresetButtonsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Resize Options</h3>
      <div className="grid grid-cols-2 gap-3">
        {basicPresets.map((preset) => {
          const isSelected = selectedPreset?.width === preset.width && selectedPreset?.height === preset.height;
          
          return (
            <button
              key={preset.name}
              onClick={() => onPresetSelect(preset.width, preset.height)}
              className={`preset-btn p-4 border rounded-lg text-center transition-all ${
                isSelected
                  ? 'selected border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                  : 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
              }`}
            >
              <div className="font-medium text-gray-900">{preset.name}</div>
              <div className="text-sm text-gray-500">{preset.width}x{preset.height} px</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
