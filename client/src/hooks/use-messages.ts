import { useMutation } from "@tanstack/react-query";
import { createMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { InsertMessage } from "@/lib/types";

export function useSendMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      return createMessage(data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
}
