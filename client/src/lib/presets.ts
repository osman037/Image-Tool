import { Preset } from '@/types/image';

export const presets: Record<string, Preset[]> = {
  PX: [
    { name: "A4 Size", width: 2480, height: 3508, category: "Document", unit: "PX" },
    { name: "Book Cover", width: 1600, height: 2560, category: "Print", unit: "PX" },
    { name: "Business Card", width: 1050, height: 600, category: "Print", unit: "PX" },
    { name: "CD Cover", width: 1417, height: 1417, category: "Print", unit: "PX" },
    { name: "Ebook Cover", width: 1600, height: 2400, category: "Digital", unit: "PX" },
    { name: "Email Header", width: 600, height: 200, category: "Email", unit: "PX" },
    { name: "Etsy Cover Photo", width: 3360, height: 840, category: "E-commerce", unit: "PX" },
    { name: "Facebook Cover", width: 1920, height: 1080, category: "Social Media", unit: "PX" },
    { name: "Facebook Post", width: 1200, height: 630, category: "Social Media", unit: "PX" },
    { name: "Facebook Story", width: 1080, height: 1920, category: "Social Media", unit: "PX" },
    { name: "Flyer (A5)", width: 1748, height: 2480, category: "Print", unit: "PX" },
    { name: "Flyer (US Letter)", width: 2550, height: 3300, category: "Print", unit: "PX" },
    { name: "Instagram Post", width: 1080, height: 1080, category: "Social Media", unit: "PX" },
    { name: "Instagram Story", width: 1080, height: 1920, category: "Social Media", unit: "PX" },
    { name: "LinkedIn Post", width: 1200, height: 627, category: "Social Media", unit: "PX" },
    { name: "LinkedIn Profile Banner", width: 1584, height: 396, category: "Social Media", unit: "PX" },
    { name: "Pinterest Pin", width: 1000, height: 1500, category: "Social Media", unit: "PX" },
    { name: "Podcast Cover", width: 3000, height: 3000, category: "Audio", unit: "PX" },
    { name: "Poster (Large)", width: 3300, height: 5100, category: "Print", unit: "PX" },
    { name: "Poster (Small)", width: 2550, height: 3300, category: "Print", unit: "PX" },
    { name: "Presentation Slide (16:9)", width: 1920, height: 1080, category: "Presentation", unit: "PX" },
    { name: "Presentation Slide (4:3)", width: 1024, height: 768, category: "Presentation", unit: "PX" },
    { name: "Product Thumbnail", width: 800, height: 800, category: "E-commerce", unit: "PX" },
    { name: "Resume (A4)", width: 2480, height: 3508, category: "Document", unit: "PX" },
    { name: "Snapchat Geofilter", width: 1080, height: 1920, category: "Social Media", unit: "PX" },
    { name: "Story Highlight Cover", width: 1080, height: 1920, category: "Social Media", unit: "PX" },
    { name: "TikTok Video", width: 1080, height: 1920, category: "Social Media", unit: "PX" },
    { name: "Tumblr Banner", width: 3000, height: 1055, category: "Social Media", unit: "PX" },
    { name: "Twitter Header", width: 1500, height: 500, category: "Social Media", unit: "PX" },
    { name: "Twitter Post", width: 1200, height: 675, category: "Social Media", unit: "PX" },
    { name: "US Letter Document", width: 2550, height: 3300, category: "Document", unit: "PX" },
    { name: "Wallpaper (Desktop)", width: 1920, height: 1080, category: "Desktop", unit: "PX" },
    { name: "Wallpaper (Mobile)", width: 1080, height: 1920, category: "Mobile", unit: "PX" },
    { name: "Web Banner (Large)", width: 1600, height: 500, category: "Web", unit: "PX" },
    { name: "Web Banner (Medium)", width: 728, height: 90, category: "Web", unit: "PX" },
    { name: "Web Banner (Small)", width: 468, height: 60, category: "Web", unit: "PX" },
    { name: "Website Hero Image", width: 1920, height: 1080, category: "Web", unit: "PX" },
    { name: "YouTube Channel Art", width: 2560, height: 1440, category: "Video", unit: "PX" },
    { name: "YouTube Thumbnail", width: 1280, height: 720, category: "Video", unit: "PX" },
    { name: "Zoom Virtual Background", width: 1920, height: 1080, category: "Video Call", unit: "PX" },
    { name: "App Screenshot (iOS)", width: 1242, height: 2688, category: "Mobile App", unit: "PX" },
    { name: "App Screenshot (Android)", width: 1080, height: 2400, category: "Mobile App", unit: "PX" },
    { name: "Web Icon (Small)", width: 64, height: 64, category: "Icon", unit: "PX" },
    { name: "Web Icon (Medium)", width: 128, height: 128, category: "Icon", unit: "PX" },
    { name: "Web Icon (Large)", width: 256, height: 256, category: "Icon", unit: "PX" },
    { name: "Ad Banner (Leaderboard)", width: 728, height: 90, category: "Advertisement", unit: "PX" },
    { name: "Ad Banner (Skyscraper)", width: 160, height: 600, category: "Advertisement", unit: "PX" },
    { name: "Ad Banner (Square)", width: 250, height: 250, category: "Advertisement", unit: "PX" }
  ],
  CM: [
    { name: "A4 Size", width: 21, height: 29.7, category: "Document", unit: "CM" },
    { name: "A3 Size", width: 29.7, height: 42, category: "Document", unit: "CM" },
    { name: "A5 Size", width: 14.8, height: 21, category: "Document", unit: "CM" },
    { name: "Business Card", width: 8.9, height: 5.1, category: "Print", unit: "CM" },
    { name: "Photo 4x6", width: 10.2, height: 15.2, category: "Photo", unit: "CM" },
    { name: "Photo 5x7", width: 12.7, height: 17.8, category: "Photo", unit: "CM" },
    { name: "Photo 8x10", width: 20.3, height: 25.4, category: "Photo", unit: "CM" }
  ],
  MM: [
    { name: "A4 Size", width: 210, height: 297, category: "Document", unit: "MM" },
    { name: "A3 Size", width: 297, height: 420, category: "Document", unit: "MM" },
    { name: "A5 Size", width: 148, height: 210, category: "Document", unit: "MM" },
    { name: "Business Card", width: 89, height: 51, category: "Print", unit: "MM" },
    { name: "Credit Card", width: 85.6, height: 53.98, category: "Card", unit: "MM" }
  ],
  INCH: [
    { name: "A4 Size", width: 8.27, height: 11.69, category: "Document", unit: "INCH" },
    { name: "US Letter", width: 8.5, height: 11, category: "Document", unit: "INCH" },
    { name: "Business Card", width: 3.5, height: 2, category: "Print", unit: "INCH" },
    { name: "Photo 4x6", width: 4, height: 6, category: "Photo", unit: "INCH" },
    { name: "Photo 5x7", width: 5, height: 7, category: "Photo", unit: "INCH" },
    { name: "Photo 8x10", width: 8, height: 10, category: "Photo", unit: "INCH" }
  ],
  '%': [
    { name: "50% Scale", width: 50, height: 50, category: "Scale", unit: "%" },
    { name: "75% Scale", width: 75, height: 75, category: "Scale", unit: "%" },
    { name: "125% Scale", width: 125, height: 125, category: "Scale", unit: "%" },
    { name: "150% Scale", width: 150, height: 150, category: "Scale", unit: "%" },
    { name: "200% Scale", width: 200, height: 200, category: "Scale", unit: "%" }
  ]
};

export const basicPresets = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "Profile Picture", width: 800, height: 800 }
];

export function getPresetsByUnit(unit: string): Preset[] {
  return presets[unit] || [];
}

export function getAllPresets(): Preset[] {
  return Object.values(presets).flat();
}
