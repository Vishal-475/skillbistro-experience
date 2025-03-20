
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeJSBackgroundProps {
  className?: string;
}

const ThreeJSBackground: React.FC<ThreeJSBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    
    // Set up renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i+=3) {
      // Create a sphere of particles
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI;
      const radius = 15 + Math.random() * 10;
      
      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius;
      posArray[i+1] = Math.sin(angle1) * Math.sin(angle2) * radius;
      posArray[i+2] = Math.cos(angle2) * radius;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create a soft blue/purple gradient for particles
    const particleTexture = new THREE.TextureLoader().load('/placeholder.svg');
    
    // Material with custom color and size
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    
    // Add colors to particles
    const colors = new Float32Array(particleCount * 3);
    const colorOptions = [
      [0, 0.47, 1],    // Blue
      [0.35, 0.34, 0.84], // Purple
      [1, 0.18, 0.33]   // Pink
    ];
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i] = colorChoice[0];
      colors[i+1] = colorChoice[1];
      colors[i+2] = colorChoice[2];
    }
    
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create the particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    const mouseFactor = 0.001;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * mouseFactor;
      mouseY = (event.clientY - window.innerHeight / 2) * mouseFactor;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.0005;
      
      // Add mouse interaction
      particleSystem.rotation.y += mouseX * 0.05;
      particleSystem.rotation.x += mouseY * 0.05;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default ThreeJSBackground;
