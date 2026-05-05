import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SkillSwap from "./pages/SkillSwap";
import FoodDiscovery from "./pages/FoodDiscovery";
import Budget from "./pages/Budget";
import CareerPath from "./pages/CareerPath";
import Profile from "./pages/Profile";

import { AuthProvider } from "./hooks/use-auth";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/skillswap" element={<SkillSwap />} />
            <Route path="/food-discovery" element={<FoodDiscovery />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
