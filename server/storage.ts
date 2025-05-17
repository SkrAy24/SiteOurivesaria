import {
  User, InsertUser,
  Category, InsertCategory,
  Product, InsertProduct,
  CartItem, InsertCartItem,
  Order, InsertOrder,
  OrderItem, InsertOrderItem,
  Testimonial, InsertTestimonial,
  ContactMessage, InsertContactMessage
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { Decimal } from "decimal.js";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  getCartItemByUserAndProduct(userId: number, productId: number): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, cartItem: Partial<CartItem>): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Order methods
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, statusOrData: string | Partial<Order>): Promise<Order | undefined>;
  
  // Order Item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  public sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private categoryIdCounter: number;
  private productIdCounter: number;
  private cartItemIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  private testimonialIdCounter: number;
  private contactMessageIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.productIdCounter = 1;
    this.cartItemIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.contactMessageIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Seed initial data
    this.seedData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date(),
      price: new Decimal(insertProduct.price as any),
      originalPrice: insertProduct.originalPrice ? new Decimal(insertProduct.originalPrice as any) : null,
      rating: insertProduct.rating ? new Decimal(insertProduct.rating as any) : new Decimal('5.0')
    };
    this.products.set(id, product);
    return product;
  }
  
  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId,
    );
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async getCartItemByUserAndProduct(userId: number, productId: number): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      (item) => item.userId === userId && item.productId === productId,
    );
  }
  
  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemIdCounter++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id, 
      createdAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItem(id: number, cartItemData: Partial<CartItem>): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem = { ...cartItem, ...cartItemData };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.values()).filter(
      (item) => item.userId === userId,
    );
    
    for (const item of userCartItems) {
      this.cartItems.delete(item.id);
    }
    
    return true;
  }
  
  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      total: new Decimal(insertOrder.total as any),
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, statusOrData: string | Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = typeof statusOrData === 'string'
      ? { ...order, status: statusOrData }
      : { ...order, ...statusOrData };
      
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId,
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = { 
      ...insertOrderItem, 
      id, 
      price: new Decimal(insertOrderItem.price as any),
      createdAt: new Date()
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
  
  // Seed initial data
  private seedData() {
    // Seed categories
    const categories: InsertCategory[] = [
      {
        name: "Anéis",
        slug: "aneis",
        description: "Anéis elegantes para qualquer ocasião",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
      },
      {
        name: "Relógios",
        slug: "relogios",
        description: "Relógios de luxo com design moderno",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
      },
      {
        name: "Colares",
        slug: "colares",
        description: "Colares elegantes para ocasiões especiais",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
      },
      {
        name: "Pulseiras",
        slug: "pulseiras",
        description: "Pulseiras finas e elegantes",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
      }
    ];
    
    for (const category of categories) {
      this.createCategory(category);
    }
    
    // Seed products
    const products: InsertProduct[] = [
      {
        name: "Relógio Cronógrafo de Luxo",
        slug: "relogio-cronografo-de-luxo",
        description: "Relógio de luxo com design moderno e materiais de alta qualidade.",
        price: "999.99",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 2,
        inStock: true,
        isFeatured: true,
        isNew: true,
        rating: "4.5"
      },
      {
        name: "Anel de Diamante Solitário",
        slug: "anel-de-diamante-solitario",
        description: "Deslumbrante anel de diamante com acabamento em ouro branco 18k.",
        price: "1299.99",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 1,
        inStock: true,
        isFeatured: true,
        isNew: false,
        rating: "5.0"
      },
      {
        name: "Colar de Pérolas Naturais",
        slug: "colar-de-perolas-naturais",
        description: "Elegante colar de pérolas naturais com fecho em prata esterlina.",
        price: "799.99",
        originalPrice: "899.99",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 3,
        inStock: true,
        isFeatured: true,
        isNew: false,
        rating: "4.0"
      },
      {
        name: "Pulseira de Ouro 18k",
        slug: "pulseira-de-ouro-18k",
        description: "Elegante pulseira de ouro 18k com design contemporâneo.",
        price: "599.99",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 4,
        inStock: true,
        isFeatured: false,
        isNew: true,
        rating: "4.8"
      },
      {
        name: "Relógio de Ouro Automático",
        slug: "relogio-de-ouro-automatico",
        description: "Relógio automático de ouro com funcionalidades avançadas.",
        price: "1499.99",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 2,
        inStock: true,
        isFeatured: false,
        isNew: false,
        rating: "4.9"
      },
      {
        name: "Anel de Esmeralda",
        slug: "anel-de-esmeralda",
        description: "Anel exclusivo com esmeralda natural e diamantes.",
        price: "1099.99",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        categoryId: 1,
        inStock: true,
        isFeatured: false,
        isNew: true,
        rating: "5.0"
      }
    ];
    
    for (const product of products) {
      this.createProduct(product);
    }
    
    // Seed testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Miguel Almeida",
        initials: "MA",
        customerSince: "2022",
        content: "O anel de noivado que comprei na OuroElegance superou todas as minhas expectativas. A qualidade é extraordinária e o atendimento foi impecável.",
        rating: 5
      },
      {
        name: "Sofia Fernandes",
        initials: "SF",
        customerSince: "2019",
        content: "As joias da OuroElegance são verdadeiras obras de arte. Cada peça que possuo é um tesouro que pretendo passar para as próximas gerações.",
        rating: 5
      },
      {
        name: "Ricardo Costa",
        initials: "RC",
        customerSince: "2021",
        content: "Comprei um relógio para o meu pai e ele adorou. A qualidade é excepcional e o atendimento personalizado fez toda a diferença na escolha da peça perfeita.",
        rating: 4
      }
    ];
    
    for (const testimonial of testimonials) {
      this.createTestimonial(testimonial);
    }
  }
}

export const storage = new MemStorage();
