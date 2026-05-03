import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, Mail, Github, Linkedin, Clock } from "lucide-react";

const formSchema = z.object({
  clientName: z.string().min(1, "Name is required"),
  clientEmail: z.string().email("Invalid email"),
  serviceType: z.string().min(1, "Service type is required"),
  projectDescription: z.string().min(10, "Please provide more details"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  priority: z.string().default("normal"),
});

export default function Contact() {
  const { toast } = useToast();
  const createOrder = useCreateOrder();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      serviceType: "Web App",
      projectDescription: "",
      budget: "",
      timeline: "",
      priority: "normal",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createOrder.mutateAsync({
        clientName: values.clientName,
        clientEmail: values.clientEmail,
        serviceType: values.serviceType,
        projectDescription: values.projectDescription,
        budget: values.budget || "",
        timeline: values.timeline || "",
        status: 'pending',
        priority: (values.priority as 'low' | 'medium' | 'high') || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast({
        title: "Message sent!",
        description: "I'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Contact Info */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4">Get in Touch</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 sm:mb-5 px-2 sm:px-0">Let's Work Together</h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 px-2 sm:px-0">
                Have a project in mind? Fill out the form and I'll get back to you within 24 hours with my thoughts and a rough timeline.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-0.5">Email</p>
                    <p className="text-muted-foreground text-sm">saif@devstudio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-0.5">Response Time</p>
                    <p className="text-muted-foreground text-sm">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-0.5">GitHub</p>
                    <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">github.com/devstudio</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-0.5">LinkedIn</p>
                    <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">linkedin.com/in/devstudio</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background border-border text-foreground h-10 sm:h-12 text-sm" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-background border-border text-foreground h-10 sm:h-12 text-sm" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">What Do You Need?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-border text-foreground h-10 sm:h-12 text-sm" data-testid="select-service">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border text-foreground">
                              <SelectItem value="Web App">Web Application</SelectItem>
                              <SelectItem value="Mobile App">Mobile App</SelectItem>
                              <SelectItem value="Website">Marketing Website</SelectItem>
                              <SelectItem value="Design">UI/UX Design</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Budget (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $3,000 – $8,000" {...field} className="bg-background border-border text-foreground h-10 sm:h-12 text-sm" data-testid="input-budget" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm">Tell Me About Your Project</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What problem are you trying to solve? What does success look like?"
                            {...field}
                            className="bg-background border-border text-foreground min-h-[120px] sm:min-h-[150px] resize-none text-sm"
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 text-base sm:text-lg btn-cta border-0 rounded-xl shadow-lg shadow-orange-900/20"
                    disabled={createOrder.isPending}
                    data-testid="button-submit"
                  >
                    {createOrder.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
