import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import DiseaseDetection from "@/pages/disease-detection";
import Chatbot from "@/pages/chatbot";
import Weather from "@/pages/weather";
import Marketplace from "@/pages/marketplace";
import GovernmentSchemes from "@/pages/government-schemes";
import D2BConnect from "@/pages/d2b-connect";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/disease-detection" component={DiseaseDetection} />
          <Route path="/chatbot" component={Chatbot} />
          <Route path="/weather" component={Weather} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/government-schemes" component={GovernmentSchemes} />
          <Route path="/d2b-connect" component={D2BConnect} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
