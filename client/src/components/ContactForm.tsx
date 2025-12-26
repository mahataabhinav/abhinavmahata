import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

// Frontend validation schema
const formSchema = insertMessageSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const { mutate, isPending } = useSendMessage();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto bg-card/30 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
      
      <h3 className="text-2xl font-display font-bold mb-6 text-white relative z-10">Get in touch</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</label>
          <input
            {...register("name")}
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">Message</label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full px-5 py-3 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="text-red-400 text-xs ml-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 mt-2 rounded-xl font-bold tracking-wide bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
