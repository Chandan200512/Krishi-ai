import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4" data-testid="component-chat-interface">
      {/* Chat Messages */}
      <Card data-testid="card-chat-messages">
        <CardContent className="p-0">
          <ScrollArea className="h-96 p-4" data-testid="scroll-chat-messages">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-2",
                    message.isUser ? "flex-row-reverse space-x-reverse" : ""
                  )}
                  data-testid={`message-${message.id}`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    {message.isUser ? (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="text-primary-foreground text-sm" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="text-white text-sm" />
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md xl:max-w-lg p-3 rounded-lg break-words",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border border-border"
                    )}
                    data-testid={`message-content-${message.id}`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-2" data-testid="message-loading">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="text-white text-sm" />
                  </div>
                  <div className="bg-white border border-border p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Input */}
      <div className="flex space-x-2" data-testid="input-message-area">
        <Input
          type="text"
          placeholder="Ask about farming, crops, weather..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1"
          data-testid="input-chat-message"
        />
        <Button
          onClick={handleSend}
          disabled={!inputMessage.trim() || isLoading}
          data-testid="button-send-message"
        >
          <Send className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          disabled
          data-testid="button-voice-input"
          title="Voice input coming soon"
        >
          <Mic className="w-4 h-4" />
        </Button>
      </div>

      {/* Helper Text */}
      <div className="text-xs text-muted-foreground text-center" data-testid="text-chat-helper">
        Ask questions about crops, diseases, weather, farming techniques, or government schemes
      </div>
    </div>
  );
}
