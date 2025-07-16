# QuickResizer Image Processing Application

## Overview

QuickResizer is a browser-based image resizing and processing application built with React, TypeScript, and Express. The application allows users to upload, resize, crop, and optimize images with various presets and custom settings. It features both basic and advanced modes for different user needs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo architecture with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

## Key Components

### Image Processing System
- **Client-side Processing**: Canvas-based image manipulation using HTML5 Canvas API
- **Supported Formats**: JPG, JPEG, PNG, WEBP, HEIC
- **Processing Features**: Resize, crop, format conversion, quality adjustment, DPI settings
- **Batch Processing**: Support for up to 10 images simultaneously

### Preset System
- **50+ Presets**: Pre-configured dimensions for social media, print, web, and mobile
- **Unit Support**: Pixels (PX), centimeters (CM), millimeters (MM), inches (INCH), percentages (%)
- **Categories**: Social Media, Print, Document, Web, Mobile App, Video, etc.

### User Interface Components
- **Upload Area**: Drag-and-drop file upload with validation
- **Image Preview**: Grid-based preview with metadata display
- **Dimension Controls**: Custom width/height inputs with unit selection
- **Output Settings**: Format selection, quality control, file size targeting
- **Processing Modal**: Progress tracking with visual feedback

## Data Flow

1. **Image Upload**: Users drag/drop or select images through the upload interface
2. **Client Validation**: File type, size, and count validation on the frontend
3. **Image Processing**: Canvas-based manipulation entirely in the browser
4. **Preview Generation**: Real-time preview updates as settings change
5. **Batch Processing**: Sequential processing with progress tracking
6. **Download**: Processed images available for individual or batch download

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme variables
- **Icons**: Lucide React icons and Font Awesome
- **Image Processing**: Native HTML5 Canvas API
- **File Handling**: Browser File API and JSZip for batch downloads
- **Fonts**: Inter font family from Google Fonts

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Zod schema validation
- **Session Management**: PostgreSQL session store
- **Development Tools**: Replit-specific plugins for development environment

### Build and Development Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Full TypeScript support across the stack
- **Development**: Hot reload, error overlay, and development banner integration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Full-stack hot module replacement
- **Environment**: Development mode with Replit integration
- **Database**: Environment-based DATABASE_URL configuration

### Production Build
- **Frontend**: Vite build outputting to `dist/public`
- **Backend**: ESBuild bundling server code to `dist/index.js`
- **Static Assets**: Served through Express static middleware
- **Database**: PostgreSQL connection via environment variables

### Key Architectural Decisions

1. **Client-side Processing**: Chosen for privacy and performance - images never leave the user's browser
2. **Canvas API**: Selected over external libraries for better control and smaller bundle size
3. **Monorepo Structure**: Simplified development with shared types and utilities
4. **Serverless Database**: Neon provides scalable PostgreSQL without infrastructure management
5. **Component Library**: Radix UI + shadcn/ui for accessible, customizable components
6. **TypeScript**: Full type safety across client, server, and shared code

The application prioritizes user privacy by processing images entirely in the browser, ensures fast performance through optimized build tools, and maintains scalability through serverless infrastructure choices.