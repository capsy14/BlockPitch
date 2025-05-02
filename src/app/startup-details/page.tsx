import React from 'react'
import StartupForm from "@/components/startupDetailFill";
const StartupDetails = () => {
  return (
    <div>
      <StartupForm/>
    </div>
  )
}

export default StartupDetails


// "use client";

// import type React from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Building2,
//   MapPin,
//   Users,
//   FileText,
//   ChevronRight,
//   ChevronLeft
// } from "lucide-react";
// import { useState } from "react";
// import Link from "next/link";
// import router from "next/router";

// export default function StartupForm() {
//   const [step, setStep] = useState(1);
//   const totalSteps = 4;

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     industry: "",
//     location: "",
//     problem: "",
//     solution: "",
//     founderName: "",
//     founderEmail: "",
//     // founderLinkedIn: "",
//     startupName: "",
//     // description: "",
//     // industry: "",
//     // location: "",
//     // problem: "",
//     // solution: "",
//     // founderName: "",
//     // founderEmail: "",
//     founderLinkedIn: "",
//     cofounderName: "",
//     cofounderEmail: "",
//     cofounderLinkedin: "",
//     pitchDeck: null
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Handle file upload logic here
//     const file = e.target.files?.[0];
//     if (file) {
//       setForm({ ...form, pitchDeck: file });
//       console.log("File selected:", file.name);
//     }
//   };

//   const nextStep = () => {
//     if (step < totalSteps) {
//       setStep(step + 1);
//     }
//   };

//   const prevStep = () => {
//     if (step > 1) {
//       setStep(step - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     // Validate required fields
//     if (!form.name || !form.description || !form.industry || !form.location) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const formData = {
//       startupName: form.name,
//       description: form.description,
//       industry: form.industry,
//       location: form.location,
//       problem: form.problem,
//       solution: form.solution,
//       founderName: form.founderName,
//       founderEmail: form.founderEmail,
//       founderLinkedIn: form.founderLinkedIn,
//       cofounderName: form.cofounderName,
//       cofounderEmail: form.cofounderEmail,
//       cofounderLinkedin: form.cofounderLinkedin,
//     };

//     try {
//       const res = await fetch("/api/startup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         alert("Successfully submitted to MongoDB ✅");
//         console.log("Mongo result:", result);
//         window.location.href = "/startup/dashboard";
//       } else {
//         console.error("Error:", result.error);
//         alert(result.error || "Failed to save startup details.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Card className="max-w-3xl mx-auto">
//         <CardHeader>
//           <CardTitle>Startup Details</CardTitle>
//           <CardDescription>Tell us about your startup journey</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {/* Step indicator */}
//             <div className="flex justify-between mb-8">
//               {Array.from({ length: totalSteps }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-2 flex-1 mx-1 rounded ${
//                     index + 1 <= step ? "bg-primary" : "bg-muted"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Step 1: Basic Information */}
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="startup-name">Startup Name</Label>
//                   <div className="flex items-center space-x-2">
//                     <Building2 className="w-4 h-4 text-muted-foreground" />
//                     <Input
//                       id="startup-name"
//                       value={form.name}
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value })
//                       }
//                       placeholder="Enter your startup name"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     value={form.description}
//                     onChange={(e) =>
//                       setForm({ ...form, description: e.target.value })
//                     }
//                     placeholder="Brief description of your startup"
//                     className="min-h-[100px]"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="industry">Industry</Label>
//                   <Select
//                     value={form.industry}
//                     onValueChange={(value) =>
//                       setForm({ ...form, industry: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select industry" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="tech">Technology</SelectItem>
//                       <SelectItem value="health">Healthcare</SelectItem>
//                       <SelectItem value="finance">Finance</SelectItem>
//                       <SelectItem value="education">Education</SelectItem>
//                       <SelectItem value="ecommerce">E-commerce</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="w-4 h-4 text-muted-foreground" />
//                     <Input
//                       id="location"
//                       value={form.location}
//                       onChange={(e) =>
//                         setForm({ ...form, location: e.target.value })
//                       }
//                       placeholder="City, Country"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Problem & Solution */}
//             {step === 2 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="problem">
//                     What problem does your startup solve?
//                   </Label>
//                   <Textarea
//                     id="problem"
//                     value={form.problem}
//                     onChange={(e) =>
//                       setForm({ ...form, problem: e.target.value })
//                     }
//                     placeholder="Describe the problem your startup addresses"
//                     className="min-h-[150px]"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="solution">How does your solution work?</Label>
//                   <Textarea
//                     id="solution"
//                     value={form.solution}
//                     onChange={(e) =>
//                       setForm({ ...form, solution: e.target.value })
//                     }
//                     placeholder="Explain your solution and its unique value proposition"
//                     className="min-h-[150px]"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Founder Information */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Users className="w-5 h-5 text-muted-foreground" />
//                     <h3 className="text-lg font-medium">Founder Details</h3>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="founder-name">Founder Name</Label>
//                       <Input
//                         id="founder-name"
//                         value={form.founderName}
//                         onChange={(e) =>
//                           setForm({ ...form, founderName: e.target.value })
//                         }
//                         placeholder="Full name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="founder-email">Email</Label>
//                       <Input
//                         id="founder-email"
//                         type="email"
//                         value={form.founderEmail}
//                         onChange={(e) =>
//                           setForm({ ...form, founderEmail: e.target.value })
//                         }
//                         placeholder="Email address"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="founder-linkedin">LinkedIn Profile</Label>
//                     <Input
//                       id="founder-linkedin"
//                       placeholder="LinkedIn URL"
//                       value={form.founderLinkedIn}
//                       onChange={(e) =>
//                         setForm({ ...form, founderLinkedIn: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Users className="w-5 h-5 text-muted-foreground" />
//                       <h3 className="text-lg font-medium">
//                         Co-Founder Details (Optional)
//                       </h3>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="cofounder-name">Co-Founder Name</Label>
//                       <Input
//                         id="cofounder-name"
//                         value={form.cofounderName}
//                         onChange={(e) =>
//                           setForm({ ...form, cofounderName: e.target.value })
//                         }
//                         placeholder="Full name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="cofounder-email">Email</Label>
//                       <Input
//                         id="cofounder-email"
//                         type="email"
//                         value={form.cofounderEmail}
//                         onChange={(e) =>
//                           setForm({ ...form, cofounderEmail: e.target.value })
//                         }
//                         placeholder="Email address"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="cofounder-linkedin">LinkedIn Profile</Label>
//                     <Input
//                       id="cofounder-linkedin"
//                       value={form.cofounderLinkedin}
//                       onChange={(e) =>
//                         setForm({ ...form, cofounderLinkedin: e.target.value })
//                       }
//                       placeholder="LinkedIn URL"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Pitch Deck Upload */}
//             {step === 4 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <FileText className="w-5 h-5 text-muted-foreground" />
//                     <Label htmlFor="pitch-deck">Upload Pitch Deck</Label>
//                   </div>
//                   <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-muted/50">
//                     <Input
//                       id="pitch-deck"
//                       type="file"
//                       className="hidden"
//                       accept=".pdf,.ppt,.pptx"
//                       onChange={handleFileChange}
//                     />
//                     <Label
//                       htmlFor="pitch-deck"
//                       className="flex flex-col items-center cursor-pointer space-y-2"
//                     >
//                       <FileText className="w-8 h-8 text-muted-foreground" />
//                       <span className="text-sm font-medium">
//                         Drop your pitch deck here or click to browse
//                       </span>
//                       <span className="text-xs text-muted-foreground">
//                         Supported formats: PDF, PPT, PPTX (Max 10MB)
//                       </span>
//                     </Label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-4">
//               <Button
//                 variant="outline"
//                 onClick={prevStep}
//                 disabled={step === 1}
//                 className="space-x-2"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 <span>Previous</span>
//               </Button>

//               {step === totalSteps ? (
//                 <Button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="space-x-2"
//                 >
//                   <span>Submit</span>
//                 </Button>
//               ) : (
//                 <Button onClick={nextStep} className="space-x-2">
//                   <span>Next</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
