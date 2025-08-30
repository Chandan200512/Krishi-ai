import { Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12" data-testid="footer-main">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-primary-foreground" />
              </div>
              <span className="font-bold" data-testid="text-footer-brand">Krishi AI</span>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-description">
              Empowering farmers with AI technology for better yields and sustainable farming.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-features-heading">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-feature-disease">Disease Detection</li>
              <li data-testid="text-feature-assistant">AI Assistant</li>
              <li data-testid="text-feature-weather">Weather Forecasts</li>
              <li data-testid="text-feature-prices">Market Prices</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-services-heading">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-service-schemes">Government Schemes</li>
              <li data-testid="text-service-marketplace">Marketplace</li>
              <li data-testid="text-service-connect">D2B Connect</li>
              <li data-testid="text-service-soil">Soil Health</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-support-heading">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-support-help">Help Center</li>
              <li data-testid="text-support-contact">Contact Us</li>
              <li data-testid="text-support-training">Training Videos</li>
              <li data-testid="text-support-community">Community Forum</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            &copy; 2024 Krishi AI. All rights reserved. Made with ❤️ for farmers.
          </p>
        </div>
      </div>
    </footer>
  );
}
