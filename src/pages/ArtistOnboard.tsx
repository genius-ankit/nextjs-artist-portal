
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Music, Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Please select your experience level"),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const ArtistOnboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      experience: "",
      portfolio: "",
    },
  });

  const artistCategories = [
    { id: "singer", label: "Singer/Vocalist" },
    { id: "dancer", label: "Dancer/Performer" },
    { id: "dj", label: "DJ/Music Producer" },
    { id: "speaker", label: "Speaker/Host" },
    { id: "musician", label: "Musician/Instrumentalist" },
    { id: "comedian", label: "Comedian/Entertainer" },
  ];

  const languages = [
    { id: "hindi", label: "Hindi" },
    { id: "english", label: "English" },
    { id: "punjabi", label: "Punjabi" },
    { id: "tamil", label: "Tamil" },
    { id: "telugu", label: "Telugu" },
    { id: "marathi", label: "Marathi" },
    { id: "gujarati", label: "Gujarati" },
    { id: "bengali", label: "Bengali" },
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked 
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    
    setSelectedCategories(newCategories);
    form.setValue("categories", newCategories);
  };

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    const newLanguages = checked 
      ? [...selectedLanguages, languageId]
      : selectedLanguages.filter(id => id !== languageId);
    
    setSelectedLanguages(newLanguages);
    form.setValue("languages", newLanguages);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Artist onboarding data:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 24 hours.",
    });
    
    // Reset form
    form.reset();
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setCurrentStep(1);
  };

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 1 
      ? ["name", "email", "phone"] 
      : currentStep === 2 
      ? ["bio", "categories", "languages"]
      : ["feeRange", "location", "experience"];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information about you" },
    { number: 2, title: "Artist Details", description: "Your skills and categories" },
    { number: 3, title: "Pricing & Location", description: "Fee structure and availability" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Artistly</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/artists" className="text-gray-700 hover:text-purple-600 transition-colors">Browse Artists</Link>
              <Link to="/onboard" className="text-purple-600 font-semibold">Join as Artist</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-4 ${
                      currentStep > step.number ? "bg-purple-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 9876543210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Artist Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Artist Bio *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself, your experience, and what makes you unique as an artist..."
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum 50 characters. This will be shown on your profile.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categories"
                        render={() => (
                          <FormItem>
                            <FormLabel>Artist Categories *</FormLabel>
                            <FormDescription>
                              Select all categories that apply to you
                            </FormDescription>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                              {artistCategories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onCheckedChange={(checked) => 
                                      handleCategoryChange(category.id, !!checked)
                                    }
                                  />
                                  <label 
                                    htmlFor={category.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {category.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="languages"
                        render={() => (
                          <FormItem>
                            <FormLabel>Languages Spoken *</FormLabel>
                            <FormDescription>
                              Select all languages you can perform in
                            </FormDescription>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              {languages.map((language) => (
                                <div key={language.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={language.id}
                                    checked={selectedLanguages.includes(language.id)}
                                    onCheckedChange={(checked) => 
                                      handleLanguageChange(language.id, !!checked)
                                    }
                                  />
                                  <label 
                                    htmlFor={language.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {language.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Pricing & Location */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="feeRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fee Range per Event *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select fee range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                                  <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                                  <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                                  <SelectItem value="100000+">₹1,00,000+</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience Level *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                                  <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                                  <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Mumbai, Delhi, Bangalore" {...field} />
                            </FormControl>
                            <FormDescription>
                              City where you're primarily based for events
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio/Website (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://your-portfolio.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Link to your portfolio, YouTube channel, or website
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Submit Application
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtistOnboard;
