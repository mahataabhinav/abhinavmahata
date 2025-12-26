import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateX = (mousePos.y - 0.5) * 20;
  const rotateY = (mousePos.x - 0.5) * -20;
  const translateX = (mousePos.x - 0.5) * 30;
  const translateY = (mousePos.y - 0.5) * 30;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#080812]"
      style={{ perspective: '1500px' }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [0, -500, 0],
              opacity: [0, particle.opacity, 0],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              filter: `blur(${particle.z > 50 ? 2 : 0}px)`,
            }}
          />
        ))}
      </div>

      {/* Main 3D Name Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Glowing backdrop */}
          <div 
            className="absolute inset-0 -z-10"
            style={{
              transform: 'translateZ(-100px) scale(1.5)',
              background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Name layers for depth effect */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* Back shadow layer */}
            <div 
              className="absolute inset-0 text-center select-none pointer-events-none"
              style={{ transform: 'translateZ(-60px)' }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-purple-900/50 blur-sm">
                Abhinav
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-cyan-900/50 blur-sm mt-2">
                Mahata
              </h1>
            </div>

            {/* Middle glow layer */}
            <div 
              className="absolute inset-0 text-center select-none pointer-events-none"
              style={{ transform: 'translateZ(-30px)' }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-purple-500/30 blur-md">
                Abhinav
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-cyan-400/30 blur-md mt-2">
                Mahata
              </h1>
            </div>

            {/* Main text layer with glass effect */}
            <div className="text-center relative" style={{ transform: 'translateZ(0px)' }}>
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold bg-clip-text text-transparent select-none"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(200,200,255,0.9) 25%, rgba(255,255,255,0.85) 50%, rgba(180,200,255,0.9) 75%, rgba(255,255,255,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  textShadow: '0 0 80px rgba(147, 51, 234, 0.5)',
                }}
              >
                Abhinav
              </h1>
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold bg-clip-text text-transparent mt-2 select-none"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(200,255,255,0.9) 25%, rgba(255,255,255,0.85) 50%, rgba(180,255,255,0.9) 75%, rgba(255,255,255,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  textShadow: '0 0 80px rgba(6, 182, 212, 0.5)',
                }}
              >
                Mahata
              </h1>
            </div>

            {/* Front highlight layer */}
            <div 
              className="absolute inset-0 text-center select-none pointer-events-none mix-blend-overlay"
              style={{ transform: 'translateZ(20px)' }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white/10">
                Abhinav
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-white/10 mt-2">
                Mahata
              </h1>
            </div>
          </div>

          {/* Subtitle with glass card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex justify-center"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <p className="text-lg md:text-xl text-white/80 font-light tracking-widest uppercase">
                Creative Developer
              </p>
            </div>
          </motion.div>

          {/* Floating rings */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square pointer-events-none"
            style={{ transform: 'translateZ(-80px)' }}
          >
            <div className="absolute inset-0 rounded-full border border-purple-500/10" />
            <div className="absolute inset-[10%] rounded-full border border-cyan-500/10" />
            <div className="absolute inset-[20%] rounded-full border border-white/5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scan lines overlay for Vision Pro effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Bottom gradient for content transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
