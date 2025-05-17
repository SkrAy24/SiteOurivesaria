import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import HomePage from "@/pages/home-page";
import ProductPage from "@/pages/product-page";
import CategoryPage from "@/pages/category-page";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import AccountPage from "@/pages/account-page";
import AuthPage from "@/pages/auth-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/produtos/:slug" component={ProductPage} />
      <Route path="/produtos" component={() => <CategoryPage isAllProducts />} />
      <Route path="/categorias/:slug" component={CategoryPage} />
      <Route path="/categorias" component={CategoryPage} />
      <Route path="/carrinho" component={CartPage} />
      <ProtectedRoute path="/checkout" component={CheckoutPage} />
      <ProtectedRoute path="/conta" component={AccountPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contacto" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
