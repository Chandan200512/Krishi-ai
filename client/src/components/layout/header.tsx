import { Link } from "wouter";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sprout, User } from "lucide-react";

export default function Header() {
  const [language, setLanguage] = useState("en");

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी" },
    { value: "mr", label: "मराठी" },
    { value: "ta", label: "தமிழ்" },
    { value: "te", label: "తెలుగు" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm" data-testid="header-main">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-primary-foreground text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground" data-testid="text-app-name">Krishi AI</h1>
                <p className="text-sm text-muted-foreground" data-testid="text-app-tagline">Smart Farming Technology</p>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage} data-testid="select-language">
              <SelectTrigger className="w-32 bg-muted border border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="ghost" size="icon" data-testid="button-user-menu">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
