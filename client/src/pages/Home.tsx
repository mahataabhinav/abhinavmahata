import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Mail, Linkedin, Twitter, Instagram, LayoutGrid, User, Briefcase, FileText, Volume2, VolumeX, Play, Cloud, BarChart3 } from "lucide-react";
import {
  SiAmazon, SiGooglecloud,
  SiTableau, SiLooker,
  SiMlflow, SiWeightsandbiases, SiKubernetes,
  SiJira, SiConfluence, SiMiro,
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn
} from "react-icons/si";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getLandingPageConfig } from "@/lib/api";
import { useState, useRef, useEffect } from "react";

// Helper for glass effect with Spotlight
const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    className={`group/card relative backdrop-blur-md bg-white/[0.03] border border-white/20 shadow-2xl rounded-[32px] overflow-hidden ${className}`}
    style={{
      boxShadow: "0 20px 40px rgba(0,0,0,0.2), inset 0 0 0 0.5px rgba(255,255,255,0.1)"
    }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
  >
    {/* Spotlight Effect */}
    <div
      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

export default function Home() {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  const { data: config } = useQuery({
    queryKey: ['landing-config'],
    queryFn: getLandingPageConfig
  });

  // Sanitize the URL to remove accidental quotes or whitespace from manual entry
  const rawUrl = config?.videoUrl || "";
  const cleanedUrl = rawUrl.replace(/['"]+/g, '').trim();

  // Use the USER'S specific video as the default fallback so it always works
  const validFallback = "https://firebasestorage.googleapis.com/v0/b/abhinavmahata-b2af7.firebasestorage.app/o/178065-858860117.mp4?alt=media&token=51bc8644-a3f8-4985-9f95-259561201f73";
  const activeVideoUrl = cleanedUrl || validFallback;

  useEffect(() => {
    console.log("Current Video URL:", activeVideoUrl);
  }, [activeVideoUrl]);

  const [videoError, setVideoError] = useState(false);

  const [isImmersive, setIsImmersive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;

    // VR-like Head Tracking Intensity
    mouseX.set(x);
    mouseY.set(y);

    // Update CSS variables for Spotlight effect
    if (containerRef.current) {
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    }
  };

  const toggleAudio = () => {
    if (isMuted) {
      const audio = document.getElementById('bg-audio') as HTMLAudioElement;
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play prevented", e));
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-black relative perspective-1000"
      onMouseMove={handleMouseMove}
    >
      {/* Immersive Background Layer */}
      <motion.div
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] pointer-events-none"
        style={{
          x: useTransform(mouseX, value => -value * 60),
          y: useTransform(mouseY, value => -value * 60),
          rotateX: useTransform(mouseY, value => value * 5), // Background moves slightly differently
          rotateY: useTransform(mouseX, value => -value * 5),
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Dimmer */}

        {!videoError ? (
          <video
            key={activeVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.1]"
            onError={(e) => {
              console.error("Video load error details:", e.currentTarget.error, e);
              setVideoError(true);
            }}
          >
            <source src={activeVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Fallback Background"
          />
        )}
      </motion.div>

      {/* Ambient Audio Element - Subtle Space/Forest */}
      <audio id="bg-audio" loop src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_3335e38a20.mp3" />

      {/* AnimatePresence for overlay removed */}

      {/* Main Spatial Content Grid */}
      <motion.div
        animate={isImmersive ? { opacity: 1, scale: 1, z: 0 } : { opacity: 0, scale: 0.9, z: -100 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 h-full w-full max-w-[1600px] mx-auto p-8 grid grid-cols-[80px_1fr_380px] gap-10 items-center transform-style-3d"
      >

        {/* Left Dock (Navigation) */}
        <GlassCard className="h-fit py-6 px-3 flex flex-col gap-8 items-center justify-center rounded-full border-white/10 bg-black/20" delay={0.2}>
          {[
            { icon: LayoutGrid, label: "Home" },
            { icon: Briefcase, label: "Projects" },
            { icon: User, label: "About" },
            { icon: FileText, label: "Blog" },
            { icon: Mail, label: "Contact" }
          ].map((item, i) => (
            <button key={i} className="p-3 rounded-full hover:bg-white/20 text-white/50 hover:text-white transition-all group relative hover:scale-110 active:scale-95 duration-200">
              <item.icon size={24} strokeWidth={1.5} />
              <span className="absolute left-16 bg-white/10 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}

          <div className="w-8 h-[1px] bg-white/10 my-2" />

          <button onClick={toggleAudio} className="p-3 rounded-full hover:bg-white/20 text-white/50 hover:text-white transition-all">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </GlassCard>

        {/* Center Stage (Profile & Featured) */}
        <div className="h-[82vh] grid grid-rows-[auto_1fr] gap-8 perspective-500">

          {/* Main Profile Card */}
          <GlassCard className="p-10 flex items-center justify-between group" delay={0.4}>
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-white/50 to-white/5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold text-white">AM</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-sm font-bold text-white tracking-[0.2em] uppercase bg-white/10 px-4 py-1.5 rounded-full w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">Portfolio - AI x Fintech</h2>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <p className="text-xl text-white/90 font-medium tracking-wide">AI Product Leader (Payments, Billing & Monetization)</p>
                </div>
              </div>

              <h1 className="text-7xl font-display font-medium text-white mb-6 tracking-tight leading-[0.9] drop-shadow-lg">
                Abhinav <span className="text-white/40">Mahata</span>
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mb-10 text-pretty">
                I drive innovation in payment solutions that prioritize <span className="text-white font-medium">security, speed, and trust</span>. My expertise lies in crafting end-to-end payment experiences that protect users from fraud while delivering seamless, high-speed transactions.
              </p>

              <div className="flex gap-6 items-center">
                <Link href="/projects" className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Explore Projects
                </Link>
                <div className="flex gap-3">
                  {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/70 border border-white/10 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated 3D Element/Stats */}
            <div className="hidden xl:block w-72 h-72 relative perspective-1000">
              <motion.div
                animate={{ rotateY: [0, 10, 0], rotateX: [0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-rose-500/30 rounded-3xl blur-[60px]" />
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  <div className="p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-4xl font-bold text-white">5+</h3>
                      <Briefcase size={16} className="text-white/40" />
                    </div>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Years Experience</p>
                  </div>
                  <div className="p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-transform duration-500 delay-100 translate-x-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-4xl font-bold text-white">50+</h3>
                      <LayoutGrid size={16} className="text-white/40" />
                    </div>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Successful Projects</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlassCard>

          {/* Project Grid / Ticker */}
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: 'Nebula AI Workspace',
                desc: 'Next-gen collaborative whiteboard powered by LLMs.',
                tag: 'AI Agent'
              },
              {
                title: 'Lumina Finance',
                desc: 'Real-time crypto analytics dashboard with WebGL charts.',
                tag: 'Fintech'
              },
              {
                title: 'Echo Valley',
                desc: 'Immersive 3D storytelling experience for a VR brand.',
                tag: 'WebGL'
              }
            ].map((project, i) => (
              <GlassCard key={i} className="p-6 flex flex-col justify-between group cursor-pointer hover:border-white/40" delay={0.6 + (i * 0.1)}>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <ArrowRight className="text-white/20 group-hover:text-white -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>

                <div className="relative z-10 mt-6">
                  <div className="flex items-center gap-2 mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">{project.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform">{project.title}</h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed group-hover:text-white/80 transition-colors">{project.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>

        {/* Right Panel (Notes / Info) */}
        <GlassCard className="h-[82vh] p-0 overflow-hidden flex flex-col" delay={0.8}>
          <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-3xl sticky top-0 z-20 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">My Notes</h2>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">

            {/* Note Item 1 */}
            <div className="group">
              <div className="text-[10px] font-mono text-white/40 mb-2">TODAY, 10:42 AM</div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors cursor-default">
                <h3 className="text-sm font-semibold text-white mb-2">Product Philosophy</h3>
                <p className="text-xs text-white/70 leading-relaxed text-pretty">
                  Great products solve real problems elegantly. I focus on building solutions that reduce complexity for users, delivering clear value through thoughtful design and intuitive flows.
                </p>
              </div>
            </div>

            {/* Note Item 2 */}
            <div className="group">
              <div className="text-[10px] font-mono text-white/40 mb-2">YESTERDAY</div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Toolkit</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-300">PROFICIENT</span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Cloud AI/ML", tools: [
                        { name: "AWS", icon: SiAmazon },
                        { name: "Azure", icon: Cloud },
                        { name: "GCP", icon: SiGooglecloud }
                      ]
                    },
                    {
                      title: "Analytics & BI", tools: [
                        { name: "Tableau", icon: SiTableau },
                        { name: "Looker", icon: SiLooker },
                        { name: "Power BI", icon: BarChart3 }
                      ]
                    },
                    {
                      title: "MLOps", tools: [
                        { name: "MLflow", icon: SiMlflow },
                        { name: "W&B", icon: SiWeightsandbiases },
                        { name: "Kubeflow", icon: SiKubernetes }
                      ]
                    },
                    {
                      title: "Collaboration", tools: [
                        { name: "Jira", icon: SiJira },
                        { name: "Confluence", icon: SiConfluence },
                        { name: "Miro", icon: SiMiro }
                      ]
                    },
                    {
                      title: "Data Science", tools: [
                        { name: "Python", icon: SiPython },
                        { name: "TensorFlow", icon: SiTensorflow },
                        { name: "PyTorch", icon: SiPytorch },
                        { name: "Scikit-Learn", icon: SiScikitlearn }
                      ]
                    }
                  ].map((category, idx) => (
                    <div key={idx}>
                      <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{category.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tools.map(tool => (
                          <div key={tool.name} className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors" title={tool.name}>
                            <tool.icon className="w-4 h-4 text-white/80" />
                            <span className="text-[10px] text-white/70">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note Item 3 */}
            <div className="group">
              <div className="text-[10px] font-mono text-white/40 mb-2">LAST WEEK</div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors cursor-default">
                <h3 className="text-sm font-semibold text-white mb-2">Currently Reading</h3>
                <div className="flex items-start gap-4 mt-2">
                  <a href="https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers/dp/1119387507" target="_blank" rel="noopener noreferrer" className="group/book relative overflow-hidden rounded shadow-md hover:scale-105 transition-transform">
                    <img src="https://covers.openlibrary.org/b/isbn/9781119387503-L.jpg" alt="Inspired Book Cover" className="w-16 h-auto object-cover opacity-90 group-hover/book:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/book:opacity-100 transition-opacity">
                      <span className="text-[8px] font-bold text-white bg-black/80 px-1 py-0.5 rounded">BUY</span>
                    </div>
                  </a>
                  <div>
                    <h4 className="text-xs text-white/90 font-bold">INSPIRED</h4>
                    <p className="text-[10px] text-white/50 mb-1">Marty Cagan</p>
                    <p className="text-[10px] text-white/70 leading-snug text-pretty">Deep dives into building products customers love, from vision to execution.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </GlassCard>

      </motion.div>

      {/* Bottom Dock (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <GlassCard className="flex gap-4 p-4 rounded-full border-white/10 bg-black/20">
          <LayoutGrid size={20} className="text-white" />
          <Briefcase size={20} className="text-white/50" />
          <Mail size={20} className="text-white/50" />
        </GlassCard>
      </div>
    </div >
  );
}
