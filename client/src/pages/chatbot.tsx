import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Send, Mic, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/features/chat-interface";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your AI farming assistant. Ask me anything about crops, diseases, weather, or farming techniques.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async ({ message, language }: { message: string; language: string }) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      return response.json();
    },
    onSuccess: (data, variables) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: variables.message,
        isUser: true,
        timestamp: new Date(),
      };
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage, aiMessage]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      console.error('Chat error:', error);
    },
  });

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      chatMutation.mutate({ message, language });
    }
  };

  const commonQuestions = [
    {
      text: "🐛 How to control pests naturally?",
      question: "What are the best natural methods to control crop pests?"
    },
    {
      text: "🌱 How to improve soil health?",
      question: "What practices can I follow to improve my soil health and fertility?"
    },
    {
      text: "💧 Best irrigation practices?",
      question: "What are the most efficient irrigation techniques for water conservation?"
    },
    {
      text: "🧪 Organic vs chemical fertilizers?",
      question: "What are the pros and cons of organic vs chemical fertilizers?"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-chatbot">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">AI Farming Assistant</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Get instant expert advice on farming, crops, and agricultural practices
        </p>
      </div>

      <Card data-testid="card-chatbot-main">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Bot className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold" data-testid="text-assistant-title">Smart Farming Advisor</h3>
                <p className="text-muted-foreground" data-testid="text-assistant-description">
                  Available 24/7 in multiple languages
                </p>
              </div>
            </div>

            <Select value={language} onValueChange={setLanguage} data-testid="select-chat-language">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ChatInterface 
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={chatMutation.isPending}
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold" data-testid="text-common-questions-title">Common Questions:</h4>
              <div className="space-y-2">
                {commonQuestions.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => handleSendMessage(item.question)}
                    data-testid={`button-common-question-${index}`}
                  >
                    {item.text}
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2" data-testid="text-voice-assistant-title">
                  🎙️ Voice Assistant
                </h4>
                <p className="text-sm text-blue-700 mb-3" data-testid="text-voice-assistant-description">
                  Speak your questions in your local language
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                  data-testid="button-voice-input"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Input (Coming Soon)
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
