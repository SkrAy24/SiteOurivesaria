import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertCartItemSchema
} from "@shared/schema";
import { z } from "zod";
import diamanteRoutes from "./routes/diamante";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup auth routes
  setupAuth(app);
  
  // Setup Diamante integration routes
  app.use('/api/diamante', diamanteRoutes);
  
  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  });
  
  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  
  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured products" });
    }
  });
  
  app.get("/api/products/new", async (req, res) => {
    try {
      const products = await storage.getNewProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching new products" });
    }
  });
  
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });
  
  app.get("/api/categories/:categoryId/products", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products by category" });
    }
  });
  
  // Cart routes (authenticated)
  app.get("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const cartItems = await storage.getCartItems(req.user.id);
      
      // Get product details for each cart item
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.json(cartWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  });
  
  app.post("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const validationResult = insertCartItemSchema.safeParse({
        ...req.body,
        userId: req.user.id
      });
      
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid cart item data", errors: validationResult.error });
      }
      
      const { productId, quantity } = validationResult.data;
      
      // Check if product exists
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already in cart
      const existingItem = await storage.getCartItemByUserAndProduct(req.user.id, productId);
      
      if (existingItem) {
        // Update quantity if already in cart
        const updatedItem = await storage.updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + quantity
        });
        
        const updatedWithProduct = {
          ...updatedItem,
          product
        };
        
        return res.json(updatedWithProduct);
      }
      
      // Add new item to cart
      const newItem = await storage.createCartItem({
        userId: req.user.id,
        productId,
        quantity
      });
      
      const newItemWithProduct = {
        ...newItem,
        product
      };
      
      res.status(201).json(newItemWithProduct);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart" });
    }
  });
  
  app.put("/api/cart/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      // Validate quantity
      const schema = z.object({
        quantity: z.number().min(1)
      });
      
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid quantity", errors: validationResult.error });
      }
      
      // Check if item exists and belongs to user
      const cartItem = await storage.getCartItem(itemId);
      if (!cartItem || cartItem.userId !== req.user.id) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      // Update cart item
      const updatedItem = await storage.updateCartItem(itemId, {
        quantity: validationResult.data.quantity
      });
      
      // Get product details
      const product = await storage.getProduct(cartItem.productId);
      
      const updatedWithProduct = {
        ...updatedItem,
        product
      };
      
      res.json(updatedWithProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });
  
  app.delete("/api/cart/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      // Check if item exists and belongs to user
      const cartItem = await storage.getCartItem(itemId);
      if (!cartItem || cartItem.userId !== req.user.id) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      // Delete cart item
      await storage.deleteCartItem(itemId);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting cart item" });
    }
  });
  
  app.delete("/api/cart", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      await storage.clearCart(req.user.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart" });
    }
  });
  
  // Order routes (authenticated)
  app.get("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const orders = await storage.getOrders(req.user.id);
      
      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItems(order.id);
          
          // Get product details for each order item
          const itemsWithProducts = await Promise.all(
            items.map(async (item) => {
              const product = await storage.getProduct(item.productId);
              return {
                ...item,
                product
              };
            })
          );
          
          return {
            ...order,
            items: itemsWithProducts
          };
        })
      );
      
      res.json(ordersWithItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });
  
  app.post("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      // Validate shipping address
      const schema = z.object({
        shippingAddress: z.string().min(5)
      });
      
      const validationResult = schema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid shipping address", errors: validationResult.error });
      }
      
      // Get user's cart items
      const cartItems = await storage.getCartItems(req.user.id);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      
      // Calculate total
      let total = 0;
      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;
        
        // Use numeric price from product
        const price = parseFloat(product.price.toString());
        total += price * item.quantity;
      }
      
      // Create order
      const order = await storage.createOrder({
        userId: req.user.id,
        total: total.toString(),
        shippingAddress: validationResult.data.shippingAddress,
        status: "pending"
      });
      
      // Create order items
      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;
        
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price.toString()
        });
      }
      
      // Clear cart
      await storage.clearCart(req.user.id);
      
      // Get order with items
      const orderItems = await storage.getOrderItems(order.id);
      
      // Get product details for each order item
      const itemsWithProducts = await Promise.all(
        orderItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      const fullOrder = {
        ...order,
        items: itemsWithProducts
      };
      
      res.status(201).json(fullOrder);
    } catch (error) {
      res.status(500).json({ message: "Error creating order" });
    }
  });
  
  // Testimonials route
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });
  
  // Contact route
  app.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactMessageSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid contact form data", errors: validationResult.error });
      }
      
      const message = await storage.createContactMessage(validationResult.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error sending contact message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
