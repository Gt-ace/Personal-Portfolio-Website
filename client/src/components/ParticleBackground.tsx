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
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 120);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
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
        
        // Mouse influence (subtle movement)
        const distX = mousePosition.x - p.x;
        const distY = mousePosition.y - p.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const influence = (150 - distance) / 15000;
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
      
      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
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
