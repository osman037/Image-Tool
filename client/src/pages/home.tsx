import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageProcessorComponent } from '@/components/image-processor';
import { SocialSharing } from '@/components/social-sharing';
import { Layers, Expand, Gem, FileImage, Crop, Printer } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('basic');
  const [location] = useLocation();
  const [presetData, setPresetData] = useState<{
    width: number;
    height: number;
    unit: string;
    preset: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const preset = params.get('preset');
    const width = params.get('width');
    const height = params.get('height');
    const unit = params.get('unit');

    if (preset && width && height && unit) {
      setPresetData({
        width: parseInt(width),
        height: parseInt(height),
        unit,
        preset
      });
      setActiveTab('advanced');
    }
  }, [location]);

  const features = [
    {
      icon: Layers,
      title: "Bulk Resizing",
      description: "Resize 10 images with consistent settings in a single click"
    },
    {
      icon: Expand,
      title: "Advanced Resizing", 
      description: "Comes with custom units such as pixel (px), percentage (%), inches, cm, or mm with intelligent scaling"
    },
    {
      icon: Gem,
      title: "Quality Control",
      description: "Advanced algorithms to maintain image quality while optimizing size"
    },
    {
      icon: FileImage,
      title: "Format Freedom",
      description: "Convert between JPG, PNG, WEBP, and HEIC with ease"
    },
    {
      icon: Crop,
      title: "Pro Crop & Resize",
      description: "Professional-grade cropping and rotation functionality"
    },
    {
      icon: Printer,
      title: "Print Ready",
      description: "Fine-tune DPI settings for perfect prints"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Upload Images",
      description: "Drag & drop up to 10 images at once or click to browse"
    },
    {
      step: 2,
      title: "Adjust Settings", 
      description: "Choose dimensions, format, and quality with live preview"
    },
    {
      step: 3,
      title: "Preview Results",
      description: "Click Preview & Download button to Resize and Review your changes before finalizing"
    },
    {
      step: 4,
      title: "Download",
      description: "Get your optimized images individually or as a ZIP in a single click"
    }
  ];

  const faq = [
    {
      question: "What is the maximum file size limit for image uploads?",
      answer: "You can upload images up to 20MB each."
    },
    {
      question: "Are my images and documents safe when resized using Quickresizer.com?",
      answer: "Absolutely! We process everything locally in your browser no uploads, no storage, complete private, secure and safe."
    },
    {
      question: "What upload formats are supported?",
      answer: "We support all major formats: JPG, JPEG, PNG, and WEBP. You can easily convert between any of these formats."
    },
    {
      question: "Can I resize multiple images at once?",
      answer: "Yes! You can upload a maximum of 10 images at once, resize them all with a single click, and download them as a convenient ZIP file."
    },
    {
      question: "Will I lose image quality after resizing?",
      answer: "We have developed our own image resizing algorithms to maintain quality, but it also depends on the quality of the original uploaded image. For the best image quality, always save images in PNG format."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">QuickResizer</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">How It Works</a>
              <a href="#faq" className="text-gray-700 hover:text-primary-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick Image Resizer – Fast, Free & Secure
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Resize, crop, and optimize your images with ease
          </p>
        </div>

        {/* Main App */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <ImageProcessorComponent mode="basic" />
            </TabsContent>
            
            <TabsContent value="advanced">
              <ImageProcessorComponent mode="advanced" presetData={presetData} />
            </TabsContent>
            
            <TabsContent value="links">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Image Resizing Presets</h2>
                <p className="text-gray-600 mb-6">Explore 1200+ custom presets for easy and fast image editing</p>
                <p className="text-gray-500">Visit our dedicated <a href="/links" className="text-primary-600 hover:text-primary-700">Links page</a> to browse all available presets.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Social Sharing */}
        <SocialSharing />

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for professional image resizing in one place</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Resize your images in just a few simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-600">Find quick answers to frequently asked questions</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
