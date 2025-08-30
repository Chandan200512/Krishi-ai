import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cropDiseases = pgTable("crop_diseases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  imagePath: text("image_path").notNull(),
  diseaseName: text("disease_name").notNull(),
  confidence: real("confidence").notNull(),
  organicSolutions: text("organic_solutions").array().notNull(),
  chemicalSolutions: text("chemical_solutions").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const marketplaceItems = pgTable("marketplace_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  sellerId: varchar("seller_id"),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const governmentSchemes = pgTable("government_schemes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  eligibility: text("eligibility").array().notNull(),
  benefits: text("benefits").notNull(),
  applicationDeadline: timestamp("application_deadline"),
  status: text("status").notNull(), // active, inactive, seasonal
  documentsRequired: text("documents_required").array().notNull(),
  applicationLink: text("application_link"),
});

export const marketPrices = pgTable("market_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cropName: text("crop_name").notNull(),
  pricePerQuintal: real("price_per_quintal").notNull(),
  changePercent: real("change_percent").notNull(),
  market: text("market").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessConnections = pgTable("business_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  companyType: text("company_type").notNull(),
  buyingCrop: text("buying_crop").notNull(),
  priceOffered: real("price_offered").notNull(),
  quantityNeeded: integer("quantity_needed").notNull(),
  location: text("location").notNull(),
  rating: real("rating").notNull(),
  paymentTerms: text("payment_terms").notNull(),
  contactInfo: jsonb("contact_info").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response").notNull(),
  language: text("language").default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCropDiseaseSchema = createInsertSchema(cropDiseases).omit({
  id: true,
  createdAt: true,
});

export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
  id: true,
  createdAt: true,
});

export const insertGovernmentSchemeSchema = createInsertSchema(governmentSchemes).omit({
  id: true,
});

export const insertMarketPriceSchema = createInsertSchema(marketPrices).omit({
  id: true,
  updatedAt: true,
});

export const insertBusinessConnectionSchema = createInsertSchema(businessConnections).omit({
  id: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type CropDisease = typeof cropDiseases.$inferSelect;
export type InsertCropDisease = z.infer<typeof insertCropDiseaseSchema>;
export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;
export type GovernmentScheme = typeof governmentSchemes.$inferSelect;
export type InsertGovernmentScheme = z.infer<typeof insertGovernmentSchemeSchema>;
export type MarketPrice = typeof marketPrices.$inferSelect;
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;
export type BusinessConnection = typeof businessConnections.$inferSelect;
export type InsertBusinessConnection = z.infer<typeof insertBusinessConnectionSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
