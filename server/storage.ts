import { 
  type User, 
  type InsertUser, 
  type CropDisease, 
  type InsertCropDisease,
  type MarketplaceItem,
  type InsertMarketplaceItem,
  type GovernmentScheme,
  type InsertGovernmentScheme,
  type MarketPrice,
  type InsertMarketPrice,
  type BusinessConnection,
  type InsertBusinessConnection,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Crop disease operations
  createCropDisease(disease: InsertCropDisease): Promise<CropDisease>;
  getCropDiseasesByUser(userId: string): Promise<CropDisease[]>;
  
  // Marketplace operations
  getMarketplaceItems(): Promise<MarketplaceItem[]>;
  getMarketplaceItemsByCategory(category: string): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;
  
  // Government schemes operations
  getGovernmentSchemes(): Promise<GovernmentScheme[]>;
  getActiveGovernmentSchemes(): Promise<GovernmentScheme[]>;
  
  // Market prices operations
  getMarketPrices(): Promise<MarketPrice[]>;
  updateMarketPrice(price: InsertMarketPrice): Promise<MarketPrice>;
  
  // Business connections operations
  getBusinessConnections(): Promise<BusinessConnection[]>;
  getBusinessConnectionsByCrop(crop: string): Promise<BusinessConnection[]>;
  
  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByUser(userId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cropDiseases: Map<string, CropDisease>;
  private marketplaceItems: Map<string, MarketplaceItem>;
  private governmentSchemes: Map<string, GovernmentScheme>;
  private marketPrices: Map<string, MarketPrice>;
  private businessConnections: Map<string, BusinessConnection>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.cropDiseases = new Map();
    this.marketplaceItems = new Map();
    this.governmentSchemes = new Map();
    this.marketPrices = new Map();
    this.businessConnections = new Map();
    this.chatMessages = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample marketplace items
    const sampleMarketplaceItems: MarketplaceItem[] = [
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
      {
        id: randomUUID(),
        name: "Soil Test Kit",
        description: "Digital pH meter and soil nutrient analyzer",
        price: 15500,
        category: "testing",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
        sellerId: "seller3",
        inStock: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Smart Irrigation System",
        description: "IoT-enabled water management system with automated scheduling",
        price: 45000,
        category: "irrigation",
        imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff",
        sellerId: "seller4",
        inStock: true,
        createdAt: new Date(),
      },
    ];

    // Sample government schemes
    const sampleSchemes: GovernmentScheme[] = [
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
      {
        id: randomUUID(),
        name: "Pradhan Mantri Fasal Bima Yojana",
        description: "Insurance coverage for crop losses due to natural disasters",
        eligibility: ["All farmers growing notified crops"],
        benefits: "Comprehensive crop insurance coverage",
        applicationDeadline: null,
        status: "seasonal",
        documentsRequired: ["Aadhaar Card", "Land Records", "Bank Account", "Sowing Certificate"],
        applicationLink: "https://pmfby.gov.in",
      },
    ];

    // Sample market prices
    const samplePrices: MarketPrice[] = [
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
        market: "Kolar Mandi",
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        cropName: "Onion",
        pricePerQuintal: 1650,
        changePercent: 8.3,
        market: "Nashik Mandi",
        updatedAt: new Date(),
      },
    ];

    // Sample business connections
    const sampleBusinesses: BusinessConnection[] = [
      {
        id: randomUUID(),
        companyName: "Fresh Foods Ltd.",
        companyType: "Food Processing Company",
        buyingCrop: "Tomatoes",
        priceOffered: 3200,
        quantityNeeded: 500,
        location: "Kolar, Karnataka",
        rating: 4.8,
        paymentTerms: "Payment within 24 hours",
        contactInfo: { phone: "+91-9876543210", email: "procurement@freshfoods.com" },
      },
      {
        id: randomUUID(),
        companyName: "Organic Exports Co.",
        companyType: "Export Company",
        buyingCrop: "Wheat",
        priceOffered: 2300,
        quantityNeeded: 1000,
        location: "Pune, Maharashtra",
        rating: 4.6,
        paymentTerms: "Payment within 48 hours",
        contactInfo: { phone: "+91-9876543211", email: "buyers@organicexports.com" },
      },
    ];

    // Populate storage
    sampleMarketplaceItems.forEach(item => this.marketplaceItems.set(item.id, item));
    sampleSchemes.forEach(scheme => this.governmentSchemes.set(scheme.id, scheme));
    samplePrices.forEach(price => this.marketPrices.set(price.id, price));
    sampleBusinesses.forEach(business => this.businessConnections.set(business.id, business));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCropDisease(disease: InsertCropDisease): Promise<CropDisease> {
    const id = randomUUID();
    const cropDisease: CropDisease = { 
      ...disease, 
      id, 
      userId: disease.userId || null,
      createdAt: new Date() 
    };
    this.cropDiseases.set(id, cropDisease);
    return cropDisease;
  }

  async getCropDiseasesByUser(userId: string): Promise<CropDisease[]> {
    return Array.from(this.cropDiseases.values()).filter(
      disease => disease.userId === userId
    );
  }

  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return Array.from(this.marketplaceItems.values());
  }

  async getMarketplaceItemsByCategory(category: string): Promise<MarketplaceItem[]> {
    return Array.from(this.marketplaceItems.values()).filter(
      item => item.category === category
    );
  }

  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const id = randomUUID();
    const marketplaceItem: MarketplaceItem = { 
      ...item, 
      id, 
      imageUrl: item.imageUrl || null,
      sellerId: item.sellerId || null,
      inStock: item.inStock ?? true,
      createdAt: new Date() 
    };
    this.marketplaceItems.set(id, marketplaceItem);
    return marketplaceItem;
  }

  async getGovernmentSchemes(): Promise<GovernmentScheme[]> {
    return Array.from(this.governmentSchemes.values());
  }

  async getActiveGovernmentSchemes(): Promise<GovernmentScheme[]> {
    return Array.from(this.governmentSchemes.values()).filter(
      scheme => scheme.status === "active"
    );
  }

  async getMarketPrices(): Promise<MarketPrice[]> {
    return Array.from(this.marketPrices.values());
  }

  async updateMarketPrice(price: InsertMarketPrice): Promise<MarketPrice> {
    const id = randomUUID();
    const marketPrice: MarketPrice = { 
      ...price, 
      id, 
      updatedAt: new Date() 
    };
    this.marketPrices.set(id, marketPrice);
    return marketPrice;
  }

  async getBusinessConnections(): Promise<BusinessConnection[]> {
    return Array.from(this.businessConnections.values());
  }

  async getBusinessConnectionsByCrop(crop: string): Promise<BusinessConnection[]> {
    return Array.from(this.businessConnections.values()).filter(
      connection => connection.buyingCrop.toLowerCase().includes(crop.toLowerCase())
    );
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const chatMessage: ChatMessage = { 
      ...message, 
      id, 
      userId: message.userId || null,
      language: message.language || "en",
      createdAt: new Date() 
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatMessagesByUser(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => message.userId === userId
    );
  }
}

export const storage = new MemStorage();
