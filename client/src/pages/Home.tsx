import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Layers, Code, Palette, Mail } from "lucide-react";
import { Link } from "wouter";
import { Suspense, lazy } from 'react';
import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />

      {/* Hero Section with Spline 3D */}
      <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene="https://prod.spline.design/DmOvuGdkDSLzS8na/scene.splinecode"
            />
          </Suspense>
        </div>
        
        {/* Profile Info Overlay - positioned to precisely cover Spline's built-in card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute z-10"
          style={{
            left: '3%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(200px, 22vw, 280px)',
          }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }} data-testid="card-profile">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent mb-3 flex items-center justify-center text-xl font-bold text-white shadow-lg" data-testid="avatar-initials">
              AM
            </div>
            <p className="text-xs text-muted-foreground mb-0.5 tracking-wide" data-testid="text-portfolio-title">AI Product Leader Portfolio</p>
            <h1 className="text-xl md:text-2xl font-display font-bold mb-1 tracking-tight text-white" data-testid="text-name">Abhinav Mahata</h1>
            <p className="text-xs text-muted-foreground mb-3" data-testid="text-tagline">Building the future with AI</p>
            <Link 
              href="/projects"
              className="inline-block px-4 py-2 rounded-full bg-white text-black text-xs font-semibold transition-all duration-150 ease-out hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
              data-testid="link-see-more"
            >
              See more
            </Link>
          </div>
        </motion.div>
        
        {/* Subtle edge gradients - keeping the 3D scene bright and clear */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-20"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About / Skills Section */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Bridging the gap between <span className="text-primary">design</span> and <span className="text-accent">engineering</span>.</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                With a passion for 3D graphics and interactive web experiences, I specialize in creating websites that leave a lasting impression. My approach combines technical precision with artistic vision.
              </p>
              <div className="flex gap-4 flex-wrap">
                <div className="p-4 bg-card rounded-2xl border border-white/5">
                  <h3 className="text-2xl font-bold text-primary mb-1" data-testid="text-years-exp">5+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Years Exp.</p>
                </div>
                <div className="p-4 bg-card rounded-2xl border border-white/5">
                  <h3 className="text-2xl font-bold text-accent mb-1" data-testid="text-projects-count">50+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Projects</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Code, title: "Frontend", desc: "React, TypeScript, Next.js" },
                { icon: Layers, title: "Backend", desc: "Node.js, PostgreSQL, Drizzle" },
                { icon: Palette, title: "Design", desc: "Figma, Tailwind, Framer Motion" },
                { icon: Layers, title: "3D & WebGL", desc: "Three.js, Spline, R3F" },
              ].map((skill, i) => (
                <div 
                  key={i} 
                  className="p-6 bg-card/50 border border-white/5 rounded-2xl hover:bg-card hover:border-primary/20 transition-all duration-300 group"
                  data-testid={`card-skill-${i}`}
                >
                  <skill.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Background gradient blob */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Featured Project Teaser (More in /projects) */}
      <section className="py-32 bg-secondary/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground">A selection of my best projects.</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { gradient: 'from-purple-900 to-blue-900', name: 'E-Commerce Dashboard' },
              { gradient: 'from-emerald-900 to-teal-900', name: 'AI Chat Interface' },
              { gradient: 'from-rose-900 to-orange-900', name: '3D Product Configurator' },
            ].map((project, i) => (
              <Link href="/projects" key={i} className="group cursor-pointer" data-testid={`card-project-${i}`}>
                <div className="aspect-[4/3] bg-card rounded-2xl overflow-hidden mb-4 relative border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                    <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
                  </div>
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-sm text-muted-foreground">Design & Development</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 md:hidden">
            <Link href="/projects" className="flex items-center gap-2 text-primary hover:text-white transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Let's create something <br /><span className="text-gradient">extraordinary.</span></h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Have a project in mind? I'm currently available for freelance work and open to new opportunities.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:hello@abhinavmahata.com" className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span>hello@abhinavmahata.com</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                    <Github size={18} />
                  </div>
                  <span>@abhinavmahata</span>
                </a>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p data-testid="text-copyright">© {new Date().getFullYear()} Abhinav Mahata. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
