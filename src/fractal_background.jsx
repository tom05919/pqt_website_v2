// FractalBackground.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FractalBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) {
      console.error('Mount ref is not set.');
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create renderer and attach to mountRef
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Set up scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;

    // Define uniforms and shader material
    const uniforms = {
      zoom: { value: 1.0 },
      resolution: { value: new THREE.Vector2(width, height) }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float zoom;
        uniform vec2 resolution;
        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
          vec2 c = vec2(-0.95, 0.0) + uv / zoom;
          vec2 z = vec2(0.0);
          int iterations = 0;
          const int maxIterations = 100;
          while(length(z) < 2.0 && iterations < maxIterations) {
            z = vec2(
              z.x * z.x - z.y * z.y + c.x,
              2.0 * z.x * z.y + c.y
            );
            iterations++;
          }
          float color = float(iterations) / float(maxIterations);
          gl_FragColor = vec4(vec3(color), 1.0);
        }
      `
    });

    // Create geometry and mesh
    const geometry = new THREE.PlaneGeometry(width, height);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation loop with logging for debugging
    let animationFrameId;
    const animate = () => {
        const scrollValue = window.scrollY;
        const newZoom = 1 + scrollValue / 1000;
        uniforms.zoom.value = newZoom;
        console.log('Zoom value:', newZoom);
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    };
    animate()

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();
      uniforms.resolution.value.set(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup: cancel animation frame, remove event listener, and remove canvas
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1 // ensures it stays behind other content
      }}
    />
  );
};

export default FractalBackground;

