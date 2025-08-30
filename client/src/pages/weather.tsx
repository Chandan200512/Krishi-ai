import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudSun, Sun, CloudRain, Cloud, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function Weather() {
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
      <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-weather-loading">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-32 w-full mb-4" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8" data-testid="page-weather">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Weather Forecast</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Hyper-local weather forecasts and actionable climate advisories
        </p>
      </div>

      {weather && (
        <>
          {/* Current Weather */}
          <Card data-testid="card-current-weather">
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90" data-testid="text-current-location">{weather.location}</p>
                    <p className="text-3xl font-bold" data-testid="text-current-temperature">{weather.temperature}°C</p>
                    <p className="text-sm" data-testid="text-current-condition">{weather.condition}</p>
                  </div>
                  <CloudSun className="text-6xl opacity-80" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3-Day Forecast */}
          <Card data-testid="card-forecast">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6" data-testid="text-forecast-title">3-Day Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weather.forecast.map((day, index) => {
                  const IconComponent = getWeatherIcon(day.condition);
                  return (
                    <Card key={index} className="text-center" data-testid={`card-forecast-day-${index}`}>
                      <CardContent className="p-4">
                        <p className="text-sm font-medium mb-2" data-testid={`text-forecast-day-${index}`}>{day.day}</p>
                        <IconComponent className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                        <p className="text-sm font-bold" data-testid={`text-forecast-temp-${index}`}>
                          {day.high}°/{day.low}°
                        </p>
                        <p className="text-xs text-muted-foreground" data-testid={`text-forecast-condition-${index}`}>
                          {day.condition}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Farming Advisory */}
          <Card className="bg-amber-50 border-amber-200" data-testid="card-farming-advisory">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2" data-testid="text-advisory-title">
                    🌾 Farming Advisory
                  </h4>
                  <p className="text-sm text-amber-700" data-testid="text-advisory-content">
                    {weather.advisory}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Soil Health Indicators */}
          <Card data-testid="card-soil-health">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6" data-testid="text-soil-health-title">Soil Health Indicators</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="font-bold">pH</span>
                  </div>
                  <p className="text-sm font-medium" data-testid="text-soil-ph-value">6.8</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-soil-ph-status">Optimal</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-bold">NPK</span>
                  </div>
                  <p className="text-sm font-medium" data-testid="text-soil-npk-value">High</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-soil-npk-status">Good</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-bold">OM</span>
                  </div>
                  <p className="text-sm font-medium" data-testid="text-soil-om-value">2.8%</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-soil-om-status">Moderate</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-bold">EC</span>
                  </div>
                  <p className="text-sm font-medium" data-testid="text-soil-ec-value">0.4</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-soil-ec-status">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
