
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Define the questions for the reflection activity
const reflectionQuestions = [
  "How does your social network impact your performance, health, and well-being?",
  "How does technology impact your social connections? Do you think technology can lead to distancing and loneliness, or does it enhance our relationships?",
  "What methods mentioned in the article \"Your Journey to Self-Discovery\" resonate with you most as you embark on your path of self-discovery?"
];

// Properly type the form values
type ReflectionAnswers = {
  [key: string]: string;
};

export default function ReflectionActivity() {
  // Store the character counts for each question
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  
  const form = useForm<ReflectionAnswers>({
    defaultValues: reflectionQuestions.reduce((acc, _, index) => {
      acc[index.toString()] = "";
      return acc;
    }, {} as ReflectionAnswers)
  });

  const handleTextChange = (index: number, value: string) => {
    setCharCounts(prev => ({
      ...prev,
      [index.toString()]: value.length
    }));
    form.setValue(index.toString(), value);
  };

  const resetQuestion = (index: number) => {
    form.setValue(index.toString(), "");
    setCharCounts(prev => ({
      ...prev,
      [index.toString()]: 0
    }));
  };

  const handleSubmitQuestion = (index: number) => {
    const answer = form.getValues()[index.toString()];
    
    if (!answer || answer.trim() === "") {
      toast({
        title: "Empty Response",
        description: "Please write your answer before submitting.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Your reflection has been submitted successfully!",
      duration: 3000,
    });
  };

  return (
    <div className="py-6">
      <h2 className="section-heading text-center text-primary text-2xl font-bold mb-4">
        Activity: Reflecting on Your Social Connections
      </h2>
      
      <p className="mb-6 text-gray-700">
        In light of what you've learned and read so far, please reflect on the following questions:
      </p>

      <Form {...form}>
        <form className="space-y-8">
          {reflectionQuestions.map((question, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-start gap-2 mb-4">
                <FileText className="text-blue-600 mt-1" size={20} />
                <h3 className="text-lg font-medium">{question}</h3>
              </div>

              <FormField
                control={form.control}
                name={index.toString()}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write here your answer"
                        className="min-h-32 resize-none"
                        maxLength={1500}
                        {...field}
                        onChange={(e) => handleTextChange(index, e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {charCounts[index.toString()] || 0} of 1500 characters
                </span>
                <Button
                  type="button"
                  className="bg-primary text-white"
                  onClick={() => handleSubmitQuestion(index)}
                >
                  Submit
                </Button>
              </div>
            </div>
          ))}
        </form>
      </Form>

      <Toaster />
    </div>
  );
}
