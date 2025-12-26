import { useEffect, useState } from 'react';

// Declare custom element to avoid TS errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url: string }, HTMLElement>;
    }
  }
}

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load the script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js';
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-background">
      <spline-viewer url="https://prod.spline.design/DmOvuGdkDSLzS8na/scene.splinecode" />
      
      {/* Loading Overlay */}
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-background transition-opacity duration-1000 z-10 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Initializing 3D Environment</p>
        </div>
      </div>
      
      {/* Vignette Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 pointer-events-none z-1" />
    </div>
  );
}
