import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { Loader2 } from "lucide-react";

// Lazy load pages for bundle optimization
const Home = lazy(() => import("@/pages/home"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const CreateListing = lazy(() => import("@/pages/create-listing"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">Initializing System...</p>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
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
