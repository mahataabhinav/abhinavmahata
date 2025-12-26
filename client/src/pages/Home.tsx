import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink, Github, Layers, Code, Palette } from "lucide-react";
import { Link } from "wouter";
import SplineScene from "@/components/SplineScene";
import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />

      {/* Hero Section with Spline 3D */}
      <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
        <SplineScene />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="font-mono text-primary/80 mb-4 tracking-wider text-sm uppercase">Creative Developer</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Digital</span> <br />
              <span className="text-gradient">Experiences.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              I craft immersive web applications that blend stunning aesthetics with powerful functionality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
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
              <div className="flex gap-4">
                <div className="p-4 bg-card rounded-2xl border border-white/5">
                  <h3 className="text-2xl font-bold text-primary mb-1">5+</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Years Exp.</p>
                </div>
                <div className="p-4 bg-card rounded-2xl border border-white/5">
                  <h3 className="text-2xl font-bold text-accent mb-1">50+</h3>
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
                <div key={i} className="p-6 bg-card/50 border border-white/5 rounded-2xl hover:bg-card hover:border-primary/20 transition-all duration-300 group">
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
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground">A selection of my best projects.</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock featured projects for the home page teaser */}
            {[1, 2, 3].map((i) => (
              <Link href={`/projects`} key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-card rounded-2xl overflow-hidden mb-4 relative border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
                  </div>
                  {/* Abstract placeholder gradient */}
                  <div className={`w-full h-full bg-gradient-to-br ${
                    i === 1 ? 'from-purple-900 to-blue-900' : 
                    i === 2 ? 'from-emerald-900 to-teal-900' : 'from-rose-900 to-orange-900'
                  }`} />
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Project Name {i}</h3>
                <p className="text-sm text-muted-foreground">Design • Development</p>
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
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <ExternalLink size={18} />
                  </div>
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Github size={18} />
                  </div>
                  <span>@github_handle</span>
                </div>
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
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
