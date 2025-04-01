import { useEffect, useRef, useState } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    // Initialize particles
    const initParticles = () => {
      if (!canvas) return;
      
      const particles: any[] = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 100); // Reduced particle count
      
      // Ensure even distribution and avoid clustering
      const gridSize = Math.sqrt(particleCount);
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < particleCount; i++) {
        // Add randomness but maintain spacing to avoid clusters
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        const x = (gridX * cellWidth) + (Math.random() * cellWidth * 0.8 + cellWidth * 0.1);
        const y = (gridY * cellHeight) + (Math.random() * cellHeight * 0.8 + cellHeight * 0.1);
        
        particles.push({
          x: x,
          y: y,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.3 - 0.15, // Slower speed
          speedY: Math.random() * 0.3 - 0.15, // Slower speed
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      
      particlesRef.current = particles;
    };

    // Update particles
    const updateParticles = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse influence (more subtle movement)
        const distX = mousePosition.x - p.x;
        const distY = mousePosition.y - p.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const influence = (150 - distance) / 25000; // Reduced influence
          p.x += distX * influence;
          p.y += distY * influence;
        }
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }
      
      // Draw lines between nearby particles (with reduced intensity)
      for (let i = 0; i < particles.length; i++) {
        // Limit connections to nearest neighbors to improve performance and reduce clustering
        let connections = 0;
        const maxConnections = 3; // Limit connections per particle
        
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && connections < maxConnections) {
            connections++;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Reduced opacity for more subtle lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / 120)})`;
            ctx.stroke();
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    updateParticles();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;
