import { pgTable, text, serial, integer, decimal, timestamp, boolean, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  vatNumber: text("vat_number"), // NIF em Portugal
  isCompany: boolean("is_company").default(false),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image"),
  categoryId: integer("category_id").references(() => categories.id),
  inStock: boolean("in_stock").default(true),
  isFeatured: boolean("is_featured").default(false),
  isNew: boolean("is_new").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5"),
  // Campos para integração com o Diamante
  sku: text("sku"), // Código do produto no Diamante
  diamanteId: text("diamante_id"), // ID do produto no Diamante
  vatRate: integer("vat_rate").default(23), // Taxa de IVA em Portugal (normalmente 23%)
  stockQuantity: integer("stock_quantity"), // Quantidade em estoque
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  status: text("status").notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: text("shipping_address").notNull(),
  phoneNumber: text("phone_number"),
  paymentMethod: text("payment_method"),
  vatNumber: text("vat_number"), // NIF para faturação
  notes: text("notes"),
  diamanteInvoiceId: text("diamante_invoice_id"), // ID da fatura no Diamante
  diamanteInvoiceUrl: text("diamante_invoice_url"), // URL para visualizar a fatura
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  initials: text("initials"),
  customerSince: text("customer_since"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create Zod schemas for insertions
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCategorySchema = createInsertSchema(categories).omit({ 
  id: true 
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ 
  id: true, 
  createdAt: true 
});

export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  createdAt: true 
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ 
  id: true, 
  createdAt: true 
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ 
  id: true 
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ 
  id: true, 
  createdAt: true 
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Create extended schema for login
export const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

export type LoginData = z.infer<typeof loginSchema>;
