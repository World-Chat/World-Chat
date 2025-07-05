import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComethProvider } from "./providers/ComethProvider";
import { MessagingAppWithTransactions } from "./components/MessagingAppWithTransactions";
import { DebugPanel } from "./components/DebugPanel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { setupGlobalTestFunctions } from "./utils/global-test-functions";

const App = () => {
  // Setup global test functions for browser console debugging
  useEffect(() => {
    setupGlobalTestFunctions();
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ComethProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <DebugPanel />
      </ComethProvider>
    </TooltipProvider>
  );
};

export default App;
