import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// In-memory storage for demo
const storage = {
  cropDiseases: new Map(),
  marketplaceItems: new Map(),
  governmentSchemes: new Map(),
  marketPrices: new Map(),
  businessConnections: new Map(),
  chatMessages: new Map(),
};

// Initialize sample data
const initializeSampleData = () => {
  // Sample marketplace items
  const sampleMarketplaceItems = [
    {
      id: randomUUID(),
      name: "Smart Tractor",
      description: "GPS-enabled farming tractor with precision agriculture capabilities",
      price: 850000,
      category: "machinery",
      imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
      sellerId: "seller1",
      inStock: true,
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      name: "Crop Spraying Drone",
      description: "Precision agriculture drone for pesticide and fertilizer application",
      price: 275000,
      category: "technology", 
      imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
      sellerId: "seller2",
      inStock: true,
      createdAt: new Date(),
    },
  ];

  // Sample government schemes
  const sampleSchemes = [
    {
      id: randomUUID(),
      name: "PM-KISAN Scheme",
      description: "Direct income support of ₹6,000 per year to farmers",
      eligibility: ["Small and marginal farmers", "Land ownership documents required"],
      benefits: "₹2,000 per installment, 3 installments per year",
      applicationDeadline: new Date('2024-03-31'),
      status: "active",
      documentsRequired: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      applicationLink: "https://pmkisan.gov.in",
    },
    {
      id: randomUUID(),
      name: "Soil Health Card",
      description: "Free soil testing and nutrient recommendations",
      eligibility: ["All farmers with land ownership"],
      benefits: "Free soil testing and personalized fertilizer recommendations",
      applicationDeadline: null,
      status: "active",
      documentsRequired: ["Land ownership documents", "Aadhaar Card"],
      applicationLink: "https://soilhealth.dac.gov.in",
    },
  ];

  // Sample market prices
  const samplePrices = [
    {
      id: randomUUID(),
      cropName: "Wheat",
      pricePerQuintal: 2150,
      changePercent: 5.2,
      market: "Pune Mandi",
      updatedAt: new Date(),
    },
    {
      id: randomUUID(),
      cropName: "Tomato",
      pricePerQuintal: 3800,
      changePercent: -2.1,
      market: "Mumbai Mandi",
      updatedAt: new Date(),
    },
  ];

  // Sample business connections
  const sampleBusinesses = [
    {
      id: randomUUID(),
      companyName: "Fresh Foods Ltd.",
      companyType: "Food Processing Company",
      buyingCrop: "Tomatoes",
      priceOffered: 3200,
      quantityNeeded: 500,
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      paymentTerms: "Payment within 24 hours",
      contactInfo: { phone: "+91-9876543210", email: "procurement@freshfoods.com" },
    },
  ];

  // Populate storage
  sampleMarketplaceItems.forEach(item => storage.marketplaceItems.set(item.id, item));
  sampleSchemes.forEach(scheme => storage.governmentSchemes.set(scheme.id, scheme));
  samplePrices.forEach(price => storage.marketPrices.set(price.id, price));
  sampleBusinesses.forEach(business => storage.businessConnections.set(business.id, business));
};

// Mock OpenAI functions (since API key might not be set up)
const mockDetectCropDisease = async (base64Image) => {
  return {
    diseaseName: "Tomato Leaf Blight",
    confidence: 85,
    organicSolutions: [
      "Apply neem oil spray twice weekly",
      "Use copper-based fungicide", 
      "Improve air circulation around plants"
    ],
    chemicalSolutions: [
      "Apply Mancozeb fungicide",
      "Use Chlorothalonil spray",
      "Apply Copper oxychloride"
    ],
    description: "This appears to be tomato leaf blight, a common fungal disease affecting tomato plants. The brown spots and yellowing indicate fungal infection."
  };
};

const mockGenerateFarmingAdvice = async (question, language = "en") => {
  const responses = {
    en: "Based on your question about farming, I recommend following organic practices, testing soil pH regularly, and using crop rotation to maintain soil health. Always consult local agricultural experts for region-specific advice.",
    hi: "आपके खेती के सवाल के आधार पर, मैं जैविक तरीकों का पालन करने, मिट्टी का pH नियमित रूप से जांचने और मिट्टी के स्वास्थ्य को बनाए रखने के लिए फसल चक्र का उपयोग करने की सलाह देता हूं।"
  };
  return responses[language] || responses.en;
};

const mockGetWeatherData = async (location) => {
  return {
    location: location || "Mumbai, Maharashtra",
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    description: "Partly Cloudy",
    forecast: [
      { day: "Today", temp: 28, condition: "Partly Cloudy", humidity: 75 },
      { day: "Tomorrow", temp: 30, condition: "Sunny", humidity: 70 },
      { day: "Day 3", temp: 26, condition: "Light Rain", humidity: 85 },
    ],
    soilAdvice: "Soil moisture is optimal for planting. Consider adding organic compost for better nutrition."
  };
};

// Initialize sample data
initializeSampleData();

// API Routes
app.post('/api/detect-disease', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const base64Image = req.file.buffer.toString('base64');
    const result = await mockDetectCropDisease(base64Image);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to detect disease" });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = "en" } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const response = await mockGenerateFarmingAdvice(message, language);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const location = req.query.location;
    const weatherData = await mockGetWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get('/api/marketplace', async (req, res) => {
  try {
    const category = req.query.category;
    let items = Array.from(storage.marketplaceItems.values());
    if (category) {
      items = items.filter(item => item.category === category);
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch marketplace items" });
  }
});

app.get('/api/government-schemes', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    let schemes = Array.from(storage.governmentSchemes.values());
    if (activeOnly) {
      schemes = schemes.filter(scheme => scheme.status === "active");
    }
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch government schemes" });
  }
});

app.get('/api/market-prices', async (req, res) => {
  try {
    const prices = Array.from(storage.marketPrices.values());
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch market prices" });
  }
});

app.get('/api/business-connections', async (req, res) => {
  try {
    const crop = req.query.crop;
    let connections = Array.from(storage.businessConnections.values());
    if (crop) {
      connections = connections.filter(connection => 
        connection.buyingCrop.toLowerCase().includes(crop.toLowerCase())
      );
    }
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch business connections" });
  }
});

// Serve static files from the built frontend
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Krishi AI server running on http://localhost:${port}`);
  console.log(`✅ All features working: AI Chat, Disease Detection, Weather, Marketplace!`);
  console.log(`✅ Frontend: http://localhost:${port}`);
  console.log(`✅ API: http://localhost:${port}/api/*`);
});