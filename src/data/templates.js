/**
 * ANIMUS ENGINE V2 - Premium Component Templates Library
 * Contains production-ready interactive component HTML/CSS/JS snippets
 * that the generator combines based on user prompts.
 */

// 1. Base HTML Shell
export const BASE_HTML_SHELL = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[[title]]</title>
  
  <!-- Premium Font integrations -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Advanced Animation & 3D libraries from secure CDNs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  
  <style>
    /* --- CSS Reset & Custom Styling Tokens --- */
    :root {
      --bg-deep: [[bg_color]];
      --accent-primary: [[accent_primary]];
      --accent-secondary: [[accent_secondary]];
      --accent-glow: [[accent_glow]];
      --font-heading: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
      
      --c-text-primary: #f8fafc;
      --c-text-secondary: #94a3b8;
      --c-text-muted: #64748b;
      
      --glass-bg: rgba(10, 10, 15, 0.6);
      --glass-border: rgba(255, 255, 255, 0.05);
      --glass-border-hover: rgba(255, 255, 255, 0.12);
      
      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
    }
    
    body {
      background-color: var(--bg-deep);
      color: var(--c-text-primary);
      font-family: var(--font-body);
      overflow-x: hidden;
    }
    
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent-primary);
    }
    
    /* --- Layout Utilities --- */
    .section-padding {
      padding: 100px 24px;
    }
    
    .max-width-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    /* Glassmorphism panel core style */
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      transition: var(--transition-smooth);
    }
    
    .glass-panel:hover {
      border-color: var(--glass-border-hover);
      box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
    }
    
    /* Neon button elements */
    .btn-action {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
      border: none;
      font-weight: 600;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: var(--font-heading);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 0 15px var(--accent-glow);
      transition: var(--transition-smooth);
      text-decoration: none;
    }
    
    .btn-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px var(--accent-glow);
    }
    
    /* --- ThreeJS background --- */
    #three-canvas-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }
    
    /* Dynamic styling injections override */
    [[custom_css]]
  </style>
</head>
<body>
  
  <!-- WebGL Background Canvas -->
  <div id="three-canvas-bg"></div>

  <!-- Generated Body Content -->
  [[body]]

  <!-- Three.js + GSAP Interactivity Engine script -->
  <script>
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- Three.js WebGL Particle Background ---
    const initThreeBg = () => {
      const container = document.getElementById('three-canvas-bg');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Create interactive particle geometry
      const particlesCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);

      const colorAccent = new THREE.Color('[[accent_primary]]');
      const colorBg = new THREE.Color('[[bg_color]]');

      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        // Color blending
        const mixedColor = colorBg.clone().lerp(colorAccent, Math.random() * 0.7 + 0.1);
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Particle texture/material
      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      // Special custom floating geometry based on tokens
      const geometryType = '[[geometry_type]]';
      let mainMesh;

      if (geometryType === 'torus_knot') {
        const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
        const torusMaterial = new THREE.MeshBasicMaterial({
          color: colorAccent,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        });
        mainMesh = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(mainMesh);
      } else if (geometryType === 'sphere') {
        const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: colorAccent,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        });
        mainMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(mainMesh);
      }

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      camera.position.z = 5;

      // Mouse tracking interaction
      let mouseX = 0;
      let mouseY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 0.8;
      });

      // Resize handler
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Slow rotation
        points.rotation.y += 0.001;
        points.rotation.x += 0.0005;

        if (mainMesh) {
          mainMesh.rotation.y += 0.003;
          mainMesh.rotation.x += 0.0015;
          // React to mouse
          mainMesh.position.x += (mouseX - mainMesh.position.x) * 0.05;
          mainMesh.position.y += (mouseY - mainMesh.position.y) * 0.05;
        }

        // Camera gentle drift
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();
    };

    // Initialize 3D on load
    window.addEventListener('DOMContentLoaded', () => {
      initThreeBg();
      
      // Inject GSAP page entrances
      gsap.from('.header-nav', { opacity: 0, y: -20, duration: 1, ease: 'power3.out' });
      gsap.from('.hero-content > *', { opacity: 0, y: 30, duration: 1.2, stagger: 0.2, ease: 'power3.out' });
    });

    // Custom interactive script injections
    [[custom_js]]
  </script>
</body>
</html>`;

// 2. Interactive Navigation Bar
export const NAVIGATION_BAR_TEMPLATE = `
  <header class="header-nav glass-panel" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); width: calc(100% - 48px); max-width: 1152px; height: 64px; z-index: 1000; border-radius: 99px; display: flex; align-items: center; justify-content: space-between; padding: 0 30px;">
    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 20px; background: linear-gradient(135deg, #fff 40%, var(--accent-primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 8px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#navBrandGrad)" stroke-width="2.5">
        <defs>
          <linearGradient id="navBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="[[accent_primary]]" />
            <stop offset="100%" stop-color="[[accent_secondary]]" />
          </linearGradient>
        </defs>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
      [[project_name]]
    </div>
    <nav style="display: flex; gap: 32px; font-weight: 500; font-size: 14px;">
      <a href="#hero" style="color: var(--c-text-primary); text-decoration: none; transition: var(--transition-smooth);">Home</a>
      <a href="#features" style="color: var(--c-text-secondary); text-decoration: none; transition: var(--transition-smooth);" onmouseover="this.style.color='var(--accent-primary)'" onmouseout="this.style.color='var(--c-text-secondary)'">Features</a>
      <a href="#scrolly" style="color: var(--c-text-secondary); text-decoration: none; transition: var(--transition-smooth);" onmouseover="this.style.color='var(--accent-primary)'" onmouseout="this.style.color='var(--c-text-secondary)'">Timeline</a>
    </nav>
    <a href="#footer" class="btn-action" style="padding: 8px 20px; font-size: 13px; border-radius: 99px;">
      [[cta_text]]
    </a>
  </header>
`;

// 3. Premium Interactive Hero Section
export const HERO_SECTION_TEMPLATE = `
  <section id="hero" class="section-padding" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding-top: 130px; overflow: hidden;">
    <div class="max-width-container hero-content" style="width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px; position: relative; z-index: 10;">
      
      <!-- Micro-accent floating badge -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 99px; font-size: 12px; letter-spacing: 2px; font-weight: 600; text-transform: uppercase; color: var(--accent-primary); display: inline-flex; align-items: center; gap: 8px;">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-primary); box-shadow: 0 0 8px var(--accent-glow);"></span>
        [[badge_text]]
      </div>
      
      <h1 style="font-family: var(--font-heading); font-size: clamp(40px, 7vw, 80px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; max-width: 900px; background: linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.6) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        [[title_bold]]
        <span style="background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">[[title_gradient]]</span>
      </h1>
      
      <p style="color: var(--c-text-secondary); font-size: clamp(16px, 2vw, 19px); font-weight: 400; line-height: 1.6; max-width: 600px;">
        [[subtitle]]
      </p>
      
      <div style="display: flex; gap: 16px; margin-top: 12px;">
        <a href="#features" class="btn-action">
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </a>
        <a href="#scrolly" class="glass-panel" style="color: white; border-radius: 8px; padding: 12px 24px; font-weight: 600; text-decoration: none; font-family: var(--font-heading); display: inline-flex; align-items: center; justify-content: center; font-size: 15px;">
          Learn More
        </a>
      </div>

    </div>
  </section>
`;

// 4. Bento Grid / Interactive Features Grid Section
export const FEATURES_GRID_TEMPLATE = `
  <section id="features" class="section-padding" style="position: relative; z-index: 10;">
    <div class="max-width-container">
      
      <div style="text-align: center; margin-bottom: 70px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <h2 style="font-family: var(--font-heading); font-size: clamp(32px, 4vw, 44px); font-weight: 800; letter-spacing: -1px;">
          Engineered for <span style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Surgical Precision</span>
        </h2>
        <p style="color: var(--c-text-secondary); max-width: 500px; font-size: 15px; line-height: 1.6;">
          An array of ultra-premium features designed to deliver unmatched performance, built on next-generation architectures.
        </p>
      </div>
      
      <!-- Bento Grid Layout -->
      <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
        
        <!-- Bento item 1: Large card -->
        <div class="glass-panel" style="grid-column: span 8; min-height: 320px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">
          <div style="position: absolute; right: -20px; bottom: -20px; width: 220px; height: 220px; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); opacity: 0.4; filter: blur(30px); pointer-events: none;"></div>
          
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 440px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); display: flex; align-items: center; justify-content: center; color: var(--accent-primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700;">[[feat1_title]]</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">[[feat1_desc]]</p>
          </div>
          
          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <span style="font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary);">GSAP Engine</span>
            <span style="font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary);">Visual Core</span>
          </div>
        </div>
        
        <!-- Bento item 2: Small card -->
        <div class="glass-panel" style="grid-column: span 4; min-height: 320px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); display: flex; align-items: center; justify-content: center; color: var(--accent-secondary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700;">[[feat2_title]]</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">[[feat2_desc]]</p>
          </div>
          
          <span style="align-self: flex-start; font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary); margin-top: 24px;">Active WebGL</span>
        </div>

        <!-- Bento item 3: Medium card -->
        <div class="glass-panel" style="grid-column: span 4; min-height: 320px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.2); display: flex; align-items: center; justify-content: center; color: var(--accent-primary);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700;">[[feat3_title]]</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">[[feat3_desc]]</p>
          </div>
          
          <span style="align-self: flex-start; font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary); margin-top: 24px;">Sentry Audit</span>
        </div>

        <!-- Bento item 4: Large Card -->
        <div class="glass-panel" style="grid-column: span 8; min-height: 320px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative;">
          <div style="position: absolute; right: -20px; top: -20px; width: 220px; height: 220px; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); opacity: 0.3; filter: blur(30px); pointer-events: none;"></div>
          
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 440px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); display: flex; align-items: center; justify-content: center; color: #10b981;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 700;">[[feat4_title]]</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">[[feat4_desc]]</p>
          </div>
          
          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <span style="font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary);">CORTEX Logic</span>
            <span style="font-size: 11px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 99px; color: var(--c-text-secondary);">Production Shield</span>
          </div>
        </div>

      </div>
      
    </div>
  </section>
`;

// 5. GSAP Scrollytelling Interactive Section
export const SCROLLYTELLING_SECTION_TEMPLATE = `
  <section id="scrolly" class="section-padding" style="position: relative; z-index: 10;">
    <div class="max-width-container">
      
      <div style="text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <h2 style="font-family: var(--font-heading); font-size: clamp(32px, 4vw, 44px); font-weight: 800; letter-spacing: -1px;">
          Product <span style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Evolution & Milestones</span>
        </h2>
        <p style="color: var(--c-text-secondary); max-width: 500px; font-size: 15px; line-height: 1.6;">
          Scroll down to experience our interactive GSAP-powered evolution timeline, showing our journey step-by-step.
        </p>
      </div>

      <!-- Scrolly Cards Column -->
      <div style="display: flex; flex-direction: column; gap: 120px; max-width: 800px; margin: 0 auto; position: relative;">
        <!-- Timeline vertical line indicator -->
        <div style="position: absolute; left: 50px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--accent-primary), transparent); opacity: 0.15; z-index: -1;"></div>

        <!-- Scrolly Card 1 -->
        <div class="scrolly-card glass-panel" style="display: flex; gap: 30px; padding: 40px; align-items: flex-start; transform: translateY(40px); opacity: 0;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-deep); border: 2px solid var(--accent-primary); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--accent-primary); flex-shrink: 0; box-shadow: 0 0 10px var(--accent-glow);">1</div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <span style="font-size: 12px; color: var(--accent-primary); font-family: var(--font-heading); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">PHASE 01</span>
            <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700;">Cognitive Inception</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">
              Defining the core neural abstractions, training agent heuristics, and laying out the basic generative algorithms that power the visual framework.
            </p>
          </div>
        </div>

        <!-- Scrolly Card 2 -->
        <div class="scrolly-card glass-panel" style="display: flex; gap: 30px; padding: 40px; align-items: flex-start; transform: translateY(40px); opacity: 0;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-deep); border: 2px solid var(--accent-secondary); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--accent-secondary); flex-shrink: 0; box-shadow: 0 0 10px var(--accent-glow);">2</div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <span style="font-size: 12px; color: var(--accent-secondary); font-family: var(--font-heading); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">PHASE 02</span>
            <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700;">Spatial Integration</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">
              Interweaving Three.js WebGL structures with responsive layout tokens. Introducing custom spatial physics, particle nets, and mouse-reactive mesh shaders.
            </p>
          </div>
        </div>

        <!-- Scrolly Card 3 -->
        <div class="scrolly-card glass-panel" style="display: flex; gap: 30px; padding: 40px; align-items: flex-start; transform: translateY(40px); opacity: 0;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-deep); border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #10b981; flex-shrink: 0; box-shadow: 0 0 10px rgba(16, 185, 129, 0.25);">3</div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <span style="font-size: 12px; color: #10b981; font-family: var(--font-heading); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">PHASE 03</span>
            <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 700;">Autonomous Sentinel Audit</h3>
            <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">
              Deploying the Quality Sentry system. Automating real-time WCAG contrast ratio computations, checking layout overflow issues, and running structural self-correction critiques.
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
`;

// 6. High-end Footer with Animus Sovereign Seal
export const FOOTER_TEMPLATE = `
  <footer id="footer" class="section-padding" style="background: rgba(5, 5, 8, 0.8); border-top: 1px solid var(--glass-border); position: relative; z-index: 10;">
    <div class="max-width-container" style="display: flex; flex-direction: column; gap: 60px;">
      
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 40px;">
        <div style="display: flex; flex-direction: column; gap: 20px; max-width: 320px;">
          <div style="font-family: var(--font-heading); font-weight: 800; font-size: 24px; color: white; display: flex; align-items: center; gap: 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="[[accent_primary]]" stroke-width="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            [[project_name]]
          </div>
          <p style="color: var(--c-text-secondary); font-size: 14px; line-height: 1.6;">
            A premier static production compile crafted with natural language design heuristics, audited for supreme visual layout excellence.
          </p>
        </div>
        
        <div style="display: flex; gap: 60px;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 600; text-transform: uppercase; color: var(--accent-primary);">Links</h4>
            <a href="#hero" style="color: var(--c-text-secondary); text-decoration: none; font-size: 14px; transition: var(--transition-smooth);" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--c-text-secondary)'">Home</a>
            <a href="#features" style="color: var(--c-text-secondary); text-decoration: none; font-size: 14px; transition: var(--transition-smooth);" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--c-text-secondary)'">Features</a>
            <a href="#scrolly" style="color: var(--c-text-secondary); text-decoration: none; font-size: 14px; transition: var(--transition-smooth);" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--c-text-secondary)'">Timeline</a>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 600; text-transform: uppercase; color: var(--accent-primary);">Developer</h4>
            <span style="color: var(--c-text-secondary); font-size: 14px;">Viktor Oddy</span>
            <span style="color: var(--c-text-secondary); font-size: 14px;">Kimi K2.6Swarm</span>
            <span style="color: var(--c-text-secondary); font-size: 14px;">Antigravity Engine</span>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <p style="color: var(--c-text-muted); font-size: 13px;">
          &copy; 2026 [[project_name]]. Powered by ANIMUS Engine V2.
        </p>

        <!-- Sovereign Seal Design -->
        <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); padding: 8px 16px; border-radius: 99px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);"></span>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--c-text-secondary); letter-spacing: 1px;">SOVEREIGN SEAL CERTIFIED</span>
        </div>
      </div>

    </div>
  </footer>
`;

// 7. Custom GSAP timelines script injection
export const DYNAMIC_GSAP_TIMELINES = `
  // Register Scrollytelling transitions on timeline cards
  document.querySelectorAll('.scrolly-card').forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
`;
