import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartLine, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { MarketPrice } from "@shared/schema";

export default function MarketPriceCard() {
  const { data: prices, isLoading } = useQuery<MarketPrice[]>({
    queryKey: ['/api/market-prices'],
  });

  const getTrendIcon = (changePercent: number) => {
    if (changePercent > 0) return TrendingUp;
    if (changePercent < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (changePercent: number) => {
    if (changePercent > 0) return "text-green-600";
    if (changePercent < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getCropIcon = (cropName: string) => {
    // Simple mapping of crop names to emoji/icons
    const icons: Record<string, string> = {
      'wheat': '🌾',
      'tomato': '🍅',
      'onion': '🧅',
      'rice': '🌾',
      'corn': '🌽',
      'potato': '🥔',
    };
    return icons[cropName.toLowerCase()] || '🌱';
  };

  if (isLoading) {
    return (
      <Card data-testid="card-market-prices-loading">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-market-prices">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <ChartLine className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold" data-testid="text-market-title">Market Prices</h3>
            <p className="text-muted-foreground" data-testid="text-market-subtitle">
              Real-time mandi prices and trends
            </p>
          </div>
        </div>

        {prices && prices.length > 0 && (
          <div className="space-y-3" data-testid="market-prices-list">
            {prices.slice(0, 3).map((price, index) => {
              const TrendIcon = getTrendIcon(price.changePercent);
              const trendColor = getTrendColor(price.changePercent);
              
              return (
                <div
                  key={price.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  data-testid={`price-item-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                      {getCropIcon(price.cropName)}
                    </div>
                    <div>
                      <p className="font-medium" data-testid={`price-crop-name-${index}`}>{price.cropName}</p>
                      <p className="text-sm text-muted-foreground" data-testid={`price-market-${index}`}>
                        {price.market}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold" data-testid={`price-value-${index}`}>
                      ₹{price.pricePerQuintal.toLocaleString()}/quintal
                    </p>
                    <div className={`text-sm flex items-center justify-end space-x-1 ${trendColor}`}>
                      <TrendIcon className="w-3 h-3" />
                      <span data-testid={`price-change-${index}`}>
                        {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Market Trend Summary */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg" data-testid="market-summary">
              <div className="flex items-center space-x-2 mb-2">
                <ChartLine className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800" data-testid="text-market-trend-title">
                  Market Trend
                </span>
              </div>
              <p className="text-sm text-blue-700" data-testid="text-market-trend-summary">
                {prices.filter(p => p.changePercent > 0).length > prices.filter(p => p.changePercent < 0).length
                  ? "📈 Most crops showing upward price movement"
                  : "📉 Mixed market conditions with price volatility"
                }
              </p>
            </div>

            {/* View More Button */}
            <Button variant="outline" className="w-full mt-4" asChild data-testid="button-view-all-prices">
              <Link href="/marketplace">
                View All Market Prices
              </Link>
            </Button>
          </div>
        )}

        {(!prices || prices.length === 0) && !isLoading && (
          <div className="text-center py-8" data-testid="market-prices-error">
            <ChartLine className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground" data-testid="text-market-error">
              Unable to load market prices
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
