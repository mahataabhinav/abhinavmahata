import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Loading 3D Scene</p>
      </div>
    </div>
  );
}

export default function SplineScene() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-background">
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene="https://prod.spline.design/DmOvuGdkDSLzS8na/scene.splinecode"
        />
      </Suspense>
      
      {/* Vignette Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 pointer-events-none z-[1]" />
    </div>
  );
}
