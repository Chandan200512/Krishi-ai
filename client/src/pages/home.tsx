import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WeatherCard from "@/components/features/weather-card";
import MarketPriceCard from "@/components/features/market-price-card";
import { 
  Camera, 
  Bot, 
  CloudSun, 
  Store, 
  University, 
  Handshake,
  Microscope,
  ChartLine,
  ShoppingCart,
  Building
} from "lucide-react";

export default function Home() {
  const quickActions = [
    {
      icon: Camera,
      title: "Disease Detection",
      description: "Upload crop photo",
      href: "/disease-detection",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      testId: "card-disease-detection"
    },
    {
      icon: Bot,
      title: "AI Assistant", 
      description: "Ask farming questions",
      href: "/chatbot",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      testId: "card-ai-assistant"
    },
    {
      icon: CloudSun,
      title: "Weather",
      description: "Local forecasts",
      href: "/weather",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      testId: "card-weather"
    },
    {
      icon: Store,
      title: "Marketplace",
      description: "Buy/Sell tools",
      href: "/marketplace",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      testId: "card-marketplace"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-home">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-center text-white" data-testid="section-hero">
        <div className="mb-6">
          <img 
            src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Farmers using modern technology" 
            className="w-full h-48 object-cover rounded-lg mb-4 opacity-90"
            data-testid="img-hero-farmers"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4" data-testid="text-hero-title">
          Transform Your Farming with AI Technology
        </h2>
        <p className="text-lg mb-6 opacity-90" data-testid="text-hero-description">
          Get instant crop disease detection, market insights, and connect directly with buyers
        </p>
        <Button 
          className="bg-white text-primary px-8 py-3 hover:bg-gray-100"
          data-testid="button-get-started"
        >
          Get Started Today
        </Button>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="section-quick-actions">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer" data-testid={action.testId}>
              <CardContent className="p-4 text-center">
                <div className={`feature-icon ${action.bgColor} ${action.textColor} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <action.icon className="text-xl" />
                </div>
                <h3 className="font-semibold text-sm" data-testid={`text-${action.testId}-title`}>{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1" data-testid={`text-${action.testId}-description`}>
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Weather and Market Prices */}
      <div className="grid md:grid-cols-2 gap-6" data-testid="section-weather-market">
        <WeatherCard />
        <MarketPriceCard />
      </div>

      {/* Marketplace Preview */}
      <section data-testid="section-marketplace-preview">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  <ShoppingCart className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" data-testid="text-marketplace-title">Agricultural Marketplace</h3>
                  <p className="text-muted-foreground" data-testid="text-marketplace-description">
                    Discover and purchase modern farming tools
                  </p>
                </div>
              </div>
              <Link href="/marketplace">
                <Button data-testid="button-view-all-marketplace">View All</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  name: "Smart Tractor",
                  description: "GPS-enabled farming",
                  price: "₹8,50,000",
                  image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"
                },
                {
                  name: "Crop Spraying Drone", 
                  description: "Precision agriculture",
                  price: "₹2,75,000",
                  image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f"
                },
                {
                  name: "Soil Test Kit",
                  description: "Digital pH meter", 
                  price: "₹15,500",
                  image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b"
                },
                {
                  name: "Smart Irrigation",
                  description: "IoT water management",
                  price: "₹45,000", 
                  image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff"
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" data-testid={`card-marketplace-item-${index}`}>
                  <CardContent className="p-4">
                    <img 
                      src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200`}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      data-testid={`img-marketplace-item-${index}`}
                    />
                    <h4 className="font-semibold mb-1" data-testid={`text-marketplace-item-name-${index}`}>{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`text-marketplace-item-description-${index}`}>
                      {item.description}
                    </p>
                    <p className="font-bold text-primary" data-testid={`text-marketplace-item-price-${index}`}>{item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Government Schemes Preview */}
      <section data-testid="section-government-schemes-preview">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <University className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold" data-testid="text-schemes-title">Government Schemes</h3>
                <p className="text-muted-foreground" data-testid="text-schemes-description">
                  Navigate and access government aid and subsidies
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "PM-KISAN Scheme",
                  description: "Direct income support of ₹6,000 per year to farmers",
                  status: "Active",
                  statusColor: "bg-green-100 text-green-800"
                },
                {
                  name: "Soil Health Card",
                  description: "Free soil testing and nutrient recommendations", 
                  status: "Available",
                  statusColor: "bg-blue-100 text-blue-800"
                },
                {
                  name: "Crop Insurance",
                  description: "Insurance coverage for crop losses due to natural disasters",
                  status: "Seasonal", 
                  statusColor: "bg-purple-100 text-purple-800"
                }
              ].map((scheme, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`card-scheme-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" data-testid={`text-scheme-name-${index}`}>{scheme.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3" data-testid={`text-scheme-description-${index}`}>
                          {scheme.description}
                        </p>
                        <Badge className={scheme.statusColor} data-testid={`badge-scheme-status-${index}`}>
                          {scheme.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" data-testid={`button-apply-scheme-${index}`}>
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/government-schemes">
                <Button variant="outline" data-testid="button-view-all-schemes">
                  View All Schemes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* D2B Connect Preview */}
      <section data-testid="section-d2b-preview">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <Handshake className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold" data-testid="text-d2b-title">Direct to Business Connect</h3>
                <p className="text-muted-foreground" data-testid="text-d2b-description">
                  Connect directly with businesses to sell your produce at the best prices
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  company: "Fresh Foods Ltd.",
                  type: "Food Processing Company",
                  crop: "Tomatoes",
                  price: "₹3,200/quintal",
                  quantity: "500 quintals",
                  rating: "4.8★"
                },
                {
                  company: "Organic Exports Co.",
                  type: "Export Company", 
                  crop: "Wheat",
                  price: "₹2,300/quintal",
                  quantity: "1000 quintals",
                  rating: "4.6★"
                }
              ].map((business, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`card-business-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Building className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold" data-testid={`text-business-name-${index}`}>{business.company}</h4>
                          <p className="text-sm text-muted-foreground" data-testid={`text-business-type-${index}`}>
                            {business.type}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800" data-testid={`badge-business-rating-${index}`}>
                        {business.rating}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium" data-testid={`text-business-crop-label-${index}`}>
                          Buying: {business.crop}
                        </p>
                        <p className="text-lg font-bold text-green-600" data-testid={`text-business-price-${index}`}>
                          {business.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium" data-testid={`text-business-quantity-label-${index}`}>
                          Quantity Needed
                        </p>
                        <p className="text-lg font-bold" data-testid={`text-business-quantity-${index}`}>
                          {business.quantity}
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full" data-testid={`button-connect-business-${index}`}>
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/d2b-connect">
                <Button variant="outline" data-testid="button-view-all-businesses">
                  View All Connections
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
