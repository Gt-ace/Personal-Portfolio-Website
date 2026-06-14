import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function App() {
  const [location] = useLocation();
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <ParticleBackground />
      <Navbar />
      <div className="app-container relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {mounted && (
            <Switch location={location} key={location}>
              <Route path="/" component={Home} />
              {/* Projects now live as a section on the landing page. */}
              <Route path="/projects">
                {() => <Redirect to="/" />}
              </Route>
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </>
  );
}

export default App;
