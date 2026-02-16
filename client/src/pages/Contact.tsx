import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
      await createOrder.mutateAsync(values);
      toast({
        title: "Request Sent!",
        description: "We'll get back to you within 24 hours.",
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
      <Navbar />
      
      <div className="pt-32 pb-20 container-padding max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Let's Talk</h1>
              <p className="text-xl text-gray-400 mb-12">
                Have a project in mind? We'd love to hear about it. Fill out the form and we'll be in touch shortly.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-white font-bold mb-2">Email Us</h3>
                  <p className="text-gray-400">hello@devstudio.com</p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Call Us</h3>
                  <p className="text-gray-400">+1 (555) 000-0000</p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Visit Us</h3>
                  <p className="text-gray-400">123 Innovation Drive<br />Tech Valley, CA 94043</p>
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
              className="bg-card border border-white/5 rounded-3xl p-8 lg:p-12"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background border-white/10 text-white h-12" />
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
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-background border-white/10 text-white h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-white/10 text-white h-12">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-white/10 text-white">
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
                          <FormLabel className="text-white">Budget (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="$5,000 - $10,000" {...field} className="bg-background border-white/10 text-white h-12" />
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
                        <FormLabel className="text-white">Project Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            {...field} 
                            className="bg-background border-white/10 text-white min-h-[150px] resize-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white"
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
