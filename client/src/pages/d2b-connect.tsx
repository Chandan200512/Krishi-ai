import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Handshake, Building, Search, TrendingUp, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { BusinessConnection } from "@shared/schema";

export default function D2BConnect() {
  const [searchCrop, setSearchCrop] = useState("");

  const { data: connections, isLoading } = useQuery<BusinessConnection[]>({
    queryKey: ['/api/business-connections', searchCrop || undefined].filter(Boolean),
  });

  const filteredConnections = connections?.filter(connection =>
    searchCrop === "" || 
    connection.buyingCrop.toLowerCase().includes(searchCrop.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-d2b-loading">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="grid gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-d2b-connect">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Direct to Business Connect</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Connect directly with businesses to sell your produce at the best prices
        </p>
      </div>

      {/* Sales Dashboard */}
      <Card className="bg-orange-50 border-orange-200" data-testid="card-sales-dashboard">
        <CardContent className="p-6">
          <h3 className="font-semibold text-orange-800 mb-4" data-testid="text-dashboard-title">
            📈 Your Sales Dashboard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600" data-testid="text-sales-month">₹2,45,000</p>
              <p className="text-sm text-muted-foreground" data-testid="text-sales-month-label">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600" data-testid="text-pending-payments">₹45,000</p>
              <p className="text-sm text-muted-foreground" data-testid="text-pending-payments-label">Pending Payments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600" data-testid="text-active-contracts">3</p>
              <p className="text-sm text-muted-foreground" data-testid="text-active-contracts-label">Active Contracts</p>
            </div>
            <div className="text-center">
              <Button className="bg-orange-500 hover:bg-orange-600" data-testid="button-list-produce">
                List Your Produce
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Filter */}
      <Card data-testid="card-search-filter">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by crop name (e.g., tomatoes, wheat, onion)..."
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              className="pl-10"
              data-testid="input-search-crop"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Connections */}
      <div className="grid gap-6" data-testid="grid-business-connections">
        {filteredConnections.map((connection) => (
          <Card key={connection.id} className="hover:shadow-md transition-shadow" data-testid={`card-business-${connection.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Building className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold" data-testid={`text-company-name-${connection.id}`}>
                        {connection.companyName}
                      </h3>
                      <Badge className="bg-green-100 text-green-800" data-testid={`badge-company-rating-${connection.id}`}>
                        {connection.rating}★
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3" data-testid={`text-company-type-${connection.id}`}>
                      {connection.companyType}
                    </p>
                  </div>
                </div>
                
                <Button data-testid={`button-connect-${connection.id}`}>
                  Connect Now
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Buying</p>
                  <p className="text-lg font-bold" data-testid={`text-buying-crop-${connection.id}`}>
                    {connection.buyingCrop}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price Offered</p>
                  <p className="text-lg font-bold text-green-600" data-testid={`text-price-offered-${connection.id}`}>
                    ₹{connection.priceOffered}/quintal
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quantity Needed</p>
                  <p className="text-lg font-bold" data-testid={`text-quantity-needed-${connection.id}`}>
                    {connection.quantityNeeded} quintals
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Terms</p>
                  <p className="text-sm" data-testid={`text-payment-terms-${connection.id}`}>
                    {connection.paymentTerms}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center" data-testid={`text-location-${connection.id}`}>
                    <MapPin className="w-4 h-4 mr-1" />
                    {connection.location}
                  </div>
                  <div className="flex items-center" data-testid={`text-contact-phone-${connection.id}`}>
                    <Phone className="w-4 h-4 mr-1" />
                    Contact Available
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid={`button-view-details-${connection.id}`}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConnections.length === 0 && !isLoading && (
        <Card data-testid="card-no-connections">
          <CardContent className="p-12 text-center">
            <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2" data-testid="text-no-connections-title">No business connections found</h3>
            <p className="text-muted-foreground" data-testid="text-no-connections-description">
              {searchCrop ? `No businesses are currently buying ${searchCrop}` : "Check back later for new opportunities"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
