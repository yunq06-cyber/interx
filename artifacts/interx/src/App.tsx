import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import CreateListing from "@/pages/create-listing";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin">
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="p-8 border border-white/10 rounded-2xl bg-zinc-900/50 backdrop-blur-xl text-center">
            <h1 className="text-2xl font-bold font-sans mb-4 tracking-tight">Admin Console</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Initialization in progress...</p>
          </div>
        </div>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <AuthModal />
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
