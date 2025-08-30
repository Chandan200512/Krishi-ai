import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudSun, Sun, CloudRain, Cloud, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }[];
  advisory: string;
}

export default function WeatherCard() {
  const { data: weather, isLoading } = useQuery<WeatherData>({
    queryKey: ['/api/weather'],
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'rainy': return CloudRain;
      case 'cloudy': return Cloud;
      default: return CloudSun;
    }
  };

  if (isLoading) {
    return (
      <Card data-testid="card-weather-loading">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-24 w-full mb-4" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-weather">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
            <CloudSun className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold" data-testid="text-weather-title">Weather Forecast</h3>
            <p className="text-muted-foreground" data-testid="text-weather-subtitle">
              Hyper-local weather and soil advisories
            </p>
          </div>
        </div>

        {weather && (
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4" data-testid="current-weather">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90" data-testid="text-current-location">{weather.location}</p>
                  <p className="text-2xl font-bold" data-testid="text-current-temperature">{weather.temperature}°C</p>
                  <p className="text-sm" data-testid="text-current-condition">{weather.condition}</p>
                </div>
                <CloudSun className="text-4xl opacity-80" />
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div className="grid grid-cols-3 gap-2 text-center" data-testid="forecast-grid">
              {weather.forecast.map((day, index) => {
                const IconComponent = getWeatherIcon(day.condition);
                return (
                  <div key={index} className="bg-muted rounded-lg p-3" data-testid={`forecast-day-${index}`}>
                    <p className="text-sm font-medium" data-testid={`forecast-day-name-${index}`}>{day.day}</p>
                    <IconComponent className="w-6 h-6 mx-auto my-2 text-yellow-500" />
                    <p className="text-sm" data-testid={`forecast-temp-${index}`}>{day.high}°/{day.low}°</p>
                  </div>
                );
              })}
            </div>

            {/* Farming Advisory */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4" data-testid="farming-advisory">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1" data-testid="text-advisory-title">
                    🌾 Farming Advisory
                  </h4>
                  <p className="text-sm text-amber-700" data-testid="text-advisory-content">
                    {weather.advisory}
                  </p>
                </div>
              </div>
            </div>

            {/* View More Button */}
            <Link href="/weather">
              <Button variant="outline" className="w-full" data-testid="button-view-weather">
                View Detailed Forecast
              </Button>
            </Link>
          </div>
        )}

        {!weather && !isLoading && (
          <div className="text-center py-8" data-testid="weather-error">
            <CloudSun className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground" data-testid="text-weather-error">
              Unable to load weather data
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
