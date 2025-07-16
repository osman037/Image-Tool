import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { getAllPresets, getPresetsByUnit } from '@/lib/presets';
import { ArrowLeft } from 'lucide-react';

export default function Links() {
  const [selectedUnit, setSelectedUnit] = useState('PX');
  const [selectedCategory, setSelectedCategory] = useState('quick');

  const units = ['PX', 'CM', 'MM', 'INCH', '%'];
  const categories = [
    { id: 'quick', label: 'Quick Unit Resizers' },
    { id: 'popular', label: 'Popular Resize Presets' },
    { id: 'custom', label: 'Customized Resize Presets' }
  ];

  const presets = getPresetsByUnit(selectedUnit);

  const getPresetUrl = (preset: any) => {
    const slug = preset.name.toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace(/:/g, 'by');
    return `/?preset=${encodeURIComponent(preset.name)}&width=${preset.width}&height=${preset.height}&unit=${preset.unit}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resizer
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary-600">QuickResizer</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Image Resizing Presets</h1>
            <p className="text-xl text-gray-600">Explore 1200+ custom presets for easy and fast image editing</p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`links-category-btn border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Unit Selector */}
          <div className="text-center mb-8">
            <div className="inline-flex space-x-2">
              {units.map((unit) => (
                <Button
                  key={unit}
                  variant={selectedUnit === unit ? "default" : "outline"}
                  onClick={() => setSelectedUnit(unit)}
                  className={selectedUnit === unit ? 'bg-primary-600 text-white' : ''}
                >
                  {unit}
                </Button>
              ))}
            </div>
          </div>

          {/* Preset Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <Link key={`${preset.name}-${preset.width}x${preset.height}`} href={getPresetUrl(preset)}>
                <div className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
                  <span className="text-primary-600 hover:text-primary-700">
                    Resize image to {preset.name.toLowerCase()} ({preset.width}x{preset.height} {preset.unit.toLowerCase()})
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {presets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No presets available for {selectedUnit} unit.</p>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need a specific size?</h3>
            <p className="text-gray-600 mb-6">
              If you don't find the preset you're looking for, you can always create custom dimensions 
              using our advanced resizer tool.
            </p>
            <Link href="/">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Go to Advanced Resizer
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">QuickResizer</h3>
            <p className="text-gray-300 mb-6">Fast, free & secure image resizing tool</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-gray-400 mt-6">© 2024 QuickResizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
