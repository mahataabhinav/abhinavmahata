import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Loader2 } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Selected Work</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A curated collection of projects exploring the intersection of design, technology, and user experience.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-card/30">
            <p className="text-red-400 mb-2">Failed to load projects</p>
            <p className="text-sm text-muted-foreground">Please try again later.</p>
          </div>
        ) : !projects?.length ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-card/30">
            <p className="text-muted-foreground">No projects found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center border-b border-white/5 pb-12 last:border-0"
              >
                {/* Project Image */}
                <div className={`rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-[4/3] bg-secondary/30 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* 
                    Using Unsplash for dynamic images if project.imageUrl is not available 
                    Normally we'd use <img src={project.imageUrl} /> 
                  */}
                  <img 
                    src={project.imageUrl || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop`} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>

                {/* Project Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="font-mono text-primary text-sm tracking-widest uppercase mb-2 block">0{index + 1}</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{project.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {project.projectUrl && (
                      <a 
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
                      >
                        Live Demo
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                      >
                        Source Code
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
      
      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
