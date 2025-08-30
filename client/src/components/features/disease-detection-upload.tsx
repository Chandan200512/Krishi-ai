import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiseaseDetectionUploadProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export default function DiseaseDetectionUpload({ onUpload, isLoading }: DiseaseDetectionUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-4" data-testid="component-disease-upload">
      <Card 
        className={cn(
          "upload-zone transition-all duration-300",
          dragActive && "border-primary bg-muted"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        data-testid="card-upload-zone"
      >
        <CardContent className="p-8 text-center">
          {previewUrl ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Selected crop image" 
                  className="max-w-full h-48 object-cover rounded-lg"
                  data-testid="img-preview"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={clearSelection}
                  data-testid="button-clear-selection"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm font-medium" data-testid="text-selected-filename">
                {selectedFile?.name}
              </p>
              <Button 
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full"
                data-testid="button-analyze-image"
              >
                {isLoading ? "Analyzing..." : "Analyze Disease"}
              </Button>
            </div>
          ) : (
            <>
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-upload-title">Upload Crop Photo</h3>
              <p className="text-muted-foreground text-sm mb-4" data-testid="text-upload-description">
                Drag and drop or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-input"
                data-testid="input-file-upload"
              />
              <label htmlFor="file-input">
                <Button asChild data-testid="button-choose-photo">
                  <span className="cursor-pointer">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Photo
                  </span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-2" data-testid="text-file-requirements">
                Supports JPG, PNG up to 10MB
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Detection Tips */}
      <Card data-testid="card-detection-tips">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4" data-testid="text-tips-title">📷 Tips for Better Detection</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-start" data-testid="text-tip-1">
                <span className="text-green-600 mr-2">✓</span>
                Take photos in good natural lighting
              </li>
              <li className="flex items-start" data-testid="text-tip-2">
                <span className="text-green-600 mr-2">✓</span>
                Focus on affected leaves or plant parts
              </li>
              <li className="flex items-start" data-testid="text-tip-3">
                <span className="text-green-600 mr-2">✓</span>
                Capture multiple angles if possible
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start" data-testid="text-tip-4">
                <span className="text-green-600 mr-2">✓</span>
                Keep the camera steady and close
              </li>
              <li className="flex items-start" data-testid="text-tip-5">
                <span className="text-green-600 mr-2">✓</span>
                Include healthy parts for comparison
              </li>
              <li className="flex items-start" data-testid="text-tip-6">
                <span className="text-green-600 mr-2">✓</span>
                Avoid blurry or dark images
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
