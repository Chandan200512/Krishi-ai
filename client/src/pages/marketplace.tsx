import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { MarketplaceItem } from "@shared/schema";

export default function Marketplace() {
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: items, isLoading } = useQuery<MarketplaceItem[]>({
    queryKey: ['/api/marketplace', category !== "all" ? category : undefined].filter(Boolean),
  });

  const filteredItems = items?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "machinery", label: "Machinery" },
    { value: "technology", label: "Technology" },
    { value: "testing", label: "Testing Equipment" },
    { value: "irrigation", label: "Irrigation" },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-marketplace-loading">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="grid md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-marketplace">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Agricultural Marketplace</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Discover and purchase modern farming tools and technology
        </p>
      </div>

      {/* Filters */}
      <Card data-testid="card-marketplace-filters">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-products"
              />
            </div>
            
            <Select value={category} onValueChange={setCategory} data-testid="select-product-category">
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-4 gap-6" data-testid="grid-marketplace-items">
        {filteredItems.map((item, index) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow" data-testid={`card-marketplace-item-${item.id}`}>
            <CardContent className="p-4">
              <img
                src={`${item.imageUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200`}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                data-testid={`img-marketplace-item-${item.id}`}
              />
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold" data-testid={`text-item-name-${item.id}`}>{item.name}</h3>
                  {item.inStock ? (
                    <Badge className="bg-green-100 text-green-800" data-testid={`badge-item-stock-${item.id}`}>
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive" data-testid={`badge-item-stock-${item.id}`}>
                      Out of Stock
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground" data-testid={`text-item-description-${item.id}`}>
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-bold text-primary" data-testid={`text-item-price-${item.id}`}>
                    ₹{item.price.toLocaleString()}
                  </p>
                  <Button 
                    size="sm" 
                    disabled={!item.inStock}
                    data-testid={`button-add-to-cart-${item.id}`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && !isLoading && (
        <Card data-testid="card-no-results">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2" data-testid="text-no-results-title">No products found</h3>
            <p className="text-muted-foreground" data-testid="text-no-results-description">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
