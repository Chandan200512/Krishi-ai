import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { detectCropDisease, generateFarmingAdvice } from "./services/openai";
import { getWeatherData } from "./services/weather";
import { insertCropDiseaseSchema, insertChatMessageSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Disease detection endpoint
  app.post('/api/detect-disease', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const base64Image = req.file.buffer.toString('base64');
      const result = await detectCropDisease(base64Image);
      
      // Save to storage if user is provided
      if (req.body.userId) {
        const diseaseRecord = await storage.createCropDisease({
          userId: req.body.userId,
          imagePath: `uploads/${req.file.filename || Date.now()}`,
          diseaseName: result.diseaseName,
          confidence: result.confidence,
          organicSolutions: result.organicSolutions,
          chemicalSolutions: result.chemicalSolutions,
        });
        
        return res.json({ ...result, id: diseaseRecord.id });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Disease detection error:', error);
      res.status(500).json({ error: "Failed to detect disease" });
    }
  });

  // Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language = "en", userId } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await generateFarmingAdvice(message, language);
      
      // Save chat message if user is provided
      if (userId) {
        await storage.createChatMessage({
          userId,
          message,
          response,
          language,
        });
      }
      
      res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Weather endpoint
  app.get('/api/weather', async (req, res) => {
    try {
      const location = req.query.location as string;
      const weatherData = await getWeatherData(location);
      res.json(weatherData);
    } catch (error) {
      console.error('Weather error:', error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Marketplace endpoints
  app.get('/api/marketplace', async (req, res) => {
    try {
      const category = req.query.category as string;
      const items = category 
        ? await storage.getMarketplaceItemsByCategory(category)
        : await storage.getMarketplaceItems();
      res.json(items);
    } catch (error) {
      console.error('Marketplace error:', error);
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  // Government schemes endpoints
  app.get('/api/government-schemes', async (req, res) => {
    try {
      const activeOnly = req.query.active === 'true';
      const schemes = activeOnly 
        ? await storage.getActiveGovernmentSchemes()
        : await storage.getGovernmentSchemes();
      res.json(schemes);
    } catch (error) {
      console.error('Government schemes error:', error);
      res.status(500).json({ error: "Failed to fetch government schemes" });
    }
  });

  // Market prices endpoint
  app.get('/api/market-prices', async (req, res) => {
    try {
      const prices = await storage.getMarketPrices();
      res.json(prices);
    } catch (error) {
      console.error('Market prices error:', error);
      res.status(500).json({ error: "Failed to fetch market prices" });
    }
  });

  // Business connections endpoint
  app.get('/api/business-connections', async (req, res) => {
    try {
      const crop = req.query.crop as string;
      const connections = crop 
        ? await storage.getBusinessConnectionsByCrop(crop)
        : await storage.getBusinessConnections();
      res.json(connections);
    } catch (error) {
      console.error('Business connections error:', error);
      res.status(500).json({ error: "Failed to fetch business connections" });
    }
  });

  // User disease history endpoint
  app.get('/api/user/:userId/diseases', async (req, res) => {
    try {
      const { userId } = req.params;
      const diseases = await storage.getCropDiseasesByUser(userId);
      res.json(diseases);
    } catch (error) {
      console.error('User diseases error:', error);
      res.status(500).json({ error: "Failed to fetch user disease history" });
    }
  });

  // User chat history endpoint
  app.get('/api/user/:userId/chats', async (req, res) => {
    try {
      const { userId } = req.params;
      const chats = await storage.getChatMessagesByUser(userId);
      res.json(chats);
    } catch (error) {
      console.error('User chats error:', error);
      res.status(500).json({ error: "Failed to fetch user chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
