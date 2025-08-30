import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Microscope, Upload, Camera, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DiseaseDetectionUpload from "@/components/features/disease-detection-upload";

interface DetectionResult {
  diseaseName: string;
  confidence: number;
  organicSolutions: string[];
  chemicalSolutions: string[];
  description: string;
}

export default function DiseaseDetection() {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const detectDiseaseMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/detect-disease', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to detect disease');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: "Disease Detection Complete",
        description: `Identified: ${data.diseaseName} with ${data.confidence}% confidence`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
      console.error('Disease detection error:', error);
    },
  });

  const handleImageUpload = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    detectDiseaseMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-disease-detection">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Crop Disease Detection</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Upload a photo of your crop to identify diseases and get treatment recommendations
        </p>
      </div>

      <Card data-testid="card-disease-detection-main">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Microscope className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold" data-testid="text-detection-title">AI-Powered Disease Analysis</h3>
              <p className="text-muted-foreground" data-testid="text-detection-subtitle">
                Get instant diagnosis with organic and chemical treatment options
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <DiseaseDetectionUpload 
                onUpload={handleImageUpload}
                isLoading={detectDiseaseMutation.isPending}
              />
              
              {/* Sample Disease Examples */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3" data-testid="text-examples-title">Example Disease Photos:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                    alt="Crop disease example 1"
                    className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    data-testid="img-disease-example-1"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                    alt="Crop disease example 2"
                    className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    data-testid="img-disease-example-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {result ? (
                <Card className="bg-green-50 border-green-200" data-testid="card-detection-result">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="text-green-600" />
                      <h4 className="font-semibold text-green-600" data-testid="text-result-title">
                        Disease Identified: {result.diseaseName}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4" data-testid="text-result-confidence">
                      Confidence: {result.confidence}%
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2" data-testid="text-organic-solutions-title">
                          Organic Solutions:
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1" data-testid="list-organic-solutions">
                          {result.organicSolutions.map((solution, index) => (
                            <li key={index} data-testid={`text-organic-solution-${index}`}>• {solution}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2" data-testid="text-chemical-solutions-title">
                          Chemical Solutions:
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1" data-testid="list-chemical-solutions">
                          {result.chemicalSolutions.map((solution, index) => (
                            <li key={index} data-testid={`text-chemical-solution-${index}`}>• {solution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" data-testid="button-detailed-treatment">
                      Get Detailed Treatment Plan
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-muted/30" data-testid="card-upload-prompt">
                  <CardContent className="p-6 text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2" data-testid="text-upload-prompt-title">
                      Upload a crop photo to get started
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-upload-prompt-description">
                      Our AI will analyze the image and provide detailed diagnosis and treatment recommendations
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
