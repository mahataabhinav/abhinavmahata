import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Get in <br /><span className="text-gradient">touch.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
            Whether you have a question, a project proposal, or just want to say hello, I'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                <p className="text-muted-foreground">hello@example.com</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Responses within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Available for remote work globally</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <ContactForm />
        </div>
      </main>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
