export interface WeatherData {
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

export async function getWeatherData(location: string = "Pune, Maharashtra"): Promise<WeatherData> {
  // In a real implementation, this would call a weather API like OpenWeatherMap
  // For now, returning structured data that would come from an API
  
  try {
    // This would be replaced with actual API call
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`);
    
    return {
      location,
      temperature: 28,
      condition: "Partly Cloudy",
      forecast: [
        {
          day: "Today",
          high: 32,
          low: 24,
          condition: "Sunny",
          icon: "fas fa-sun"
        },
        {
          day: "Tomorrow", 
          high: 26,
          low: 20,
          condition: "Rainy",
          icon: "fas fa-cloud-rain"
        },
        {
          day: "Day 3",
          high: 29,
          low: 22,
          condition: "Cloudy",
          icon: "fas fa-cloud"
        }
      ],
      advisory: "Rain expected tomorrow. Good time for transplanting. Avoid pesticide application for next 2 days."
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data: " + (error as Error).message);
  }
}
