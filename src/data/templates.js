/**
 * ANIMUS AURA V2 - Premium Static Page Templates
 * Models the production-ready code blocks exported by Aura.build.
 */

export const BASE_HTML_SHELL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[[title]]</title>
  
  <!-- Font CDNs -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;800;900&family=Space+Grotesk:wght@400;600;700&family=Syne:wght@600;800&display=swap" rel="stylesheet">
  
  <!-- GSAP & ThreeJS Libraries -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <!-- Aura Compiled Stylesheet -->
  <style>
    :root {
      --bg-base: [[bg_color]];
      --accent-primary: [[accent_primary]];
      --accent-secondary: [[accent_secondary]];
      --accent-glow: [[accent_glow]];
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: var(--bg-base);
      color: #e2e8f0;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    /* Aura Custom Glow Background */
    .aura-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background-color: var(--bg-base);
      overflow: hidden;
    }

    .aura-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.85;
    }

    .aura-gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 30%, transparent 20%, var(--bg-base) 80%);
      z-index: 0;
      pointer-events: none;
    }

    /* Section Spacing */
    section {
      position: relative;
      z-index: 10;
      padding: 100px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Typography Utilities */
    .gradient-header {
      background: linear-gradient(135deg, #ffffff 40%, var(--accent-primary) 70%, var(--accent-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* UI Styling blocks */
    [[custom_css]]
  </style>
</head>
<body>

  <!-- WebGL Backdrops -->
  <div class="aura-backdrop">
    <canvas id="webgl-canvas" class="aura-canvas"></canvas>
    <div class="aura-gradient-overlay"></div>
  </div>

  <!-- Compiled Page Body -->
  [[body]]

  <!-- ThreeJS WebGL Render Script -->
  <script>
    let scene, camera, renderer, geometry, material, mesh, particles;
    const geometryType = "[[geometry_type]]";

    function initWebGL() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 1. Interactive 3D Mesh Object
      if (geometryType === 'torus_knot') {
        geometry = new THREE.TorusKnotGeometry(1.8, 0.45, 120, 16);
      } else if (geometryType === 'sphere') {
        geometry = new THREE.SphereGeometry(2.0, 32, 32);
      }

      if (geometryType !== 'none') {
        material = new THREE.MeshBasicMaterial({
          color: new THREE.Color("[[accent_primary]]"),
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      }

      // 2. Premium floating particles grid background (Unicorn Studio style)
      const particleCount = 280;
      const particlesGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 18;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMat = new THREE.PointsMaterial({
        size: 0.045,
        color: new THREE.Color("[[accent_secondary]]"),
        transparent: true,
        opacity: 0.35
      });

      particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      animate();
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    });

    function animate() {
      requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.004;
        // Ease towards mouse pointers
        mesh.position.x += (mouseX - mesh.position.x) * 0.05;
        mesh.position.y += (-mouseY - mesh.position.y) * 0.05;
      }

      if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
      }

      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    initWebGL();
  </script>

  <!-- Compiled Custom Interactions -->
  <script>
    [[custom_js]]
  </script>

</body>
</html>
`;

export const NAVIGATION_BAR_TEMPLATE = `
<nav style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.04); background: rgba(10,10,15,0.4);">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 18px 24px;">
    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 20px; letter-spacing: -0.03em; color: #fff; display: flex; align-items: center; gap: 8px;">
      <span style="width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary)); box-shadow: var(--accent-glow);"></span>
      [[project_name]]
    </div>
    
    <div style="display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: #94a3b8;">
      <a href="#hero" style="color: #fff; text-decoration: none; transition: 0.2s;">Home</a>
      <a href="#features" style="color: #94a3b8; text-decoration: none; transition: 0.2s;">Features</a>
      <a href="#about" style="color: #94a3b8; text-decoration: none; transition: 0.2s;">Sovereignty</a>
      <a href="#footer" style="color: #94a3b8; text-decoration: none; transition: 0.2s;">Contact</a>
    </div>

    <button style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); border: none; color: #fff; padding: 8px 18px; border-radius: 6px; font-family: var(--font-heading); font-weight: 600; font-size: 12px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      [[cta_text]]
    </button>
  </div>
</nav>
`;

export const HERO_SECTION_TEMPLATE = `
<section id="hero" style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding-top: 140px; padding-bottom: 60px;">
  <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 99px; padding: 6px 14px; margin-bottom: 24px;">
    <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-primary); animation: aura-pulse 2s infinite;"></span>
    <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #cbd5e1;">[[badge_text]]</span>
  </div>

  <h1 style="font-family: var(--font-heading); font-weight: 900; font-size: clamp(36px, 6vw, 68px); letter-spacing: -0.04em; line-height: 1.05; max-width: 900px; margin-bottom: 24px;">
    [[title_bold]] <span class="gradient-header">[[title_gradient]]</span>
  </h1>

  <p style="font-size: clamp(14px, 2vw, 17px); font-weight: 400; line-height: 1.6; max-width: 640px; color: #94a3b8; margin-bottom: 40px;">
    [[subtitle]]
  </p>

  <div style="display: flex; gap: 16px; justify-content: center;">
    <button style="background: #fff; color: #050508; border: none; padding: 12px 28px; border-radius: 8px; font-family: var(--font-heading); font-weight: 700; font-size: 13px; cursor: pointer; transition: 0.2s;">
      Initialize Core
    </button>
    <button style="background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.06); padding: 12px 28px; border-radius: 8px; font-family: var(--font-heading); font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s;">
      Learn More
    </button>
  </div>
</section>
`;

export const FEATURES_GRID_TEMPLATE = `
<section id="features" style="padding-top: 60px; padding-bottom: 80px;">
  <div style="text-align: center; margin-bottom: 60px;">
    <h2 style="font-family: var(--font-heading); font-weight: 800; font-size: 32px; letter-spacing: -0.03em; margin-bottom: 12px;">Unified Component Stack</h2>
    <p style="font-size: 14px; color: #64748b; max-width: 500px; margin: 0 auto;">Engineered for maximum visual rendering speed and responsive modularity.</p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
    
    <!-- Card 1 -->
    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 32px; transition: 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent-primary)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.03)';">
      <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(99,102,241,0.05); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--accent-primary);">⚡</div>
      <h3 style="font-family: var(--font-heading); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 12px;">[[feat1_title]]</h3>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b;">[[feat1_desc]]</p>
    </div>

    <!-- Card 2 -->
    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 32px; transition: 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent-secondary)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.03)';">
      <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(168,85,247,0.05); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--accent-secondary);">🔮</div>
      <h3 style="font-family: var(--font-heading); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 12px;">[[feat2_title]]</h3>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b;">[[feat2_desc]]</p>
    </div>

    <!-- Card 3 -->
    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 32px; transition: 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent-primary)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.03)';">
      <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(99,102,241,0.05); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--accent-primary);">🛡️</div>
      <h3 style="font-family: var(--font-heading); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 12px;">[[feat3_title]]</h3>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b;">[[feat3_desc]]</p>
    </div>

    <!-- Card 4 -->
    <div style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 32px; transition: 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent-secondary)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.03)';">
      <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(168,85,247,0.05); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--accent-secondary);">🌐</div>
      <h3 style="font-family: var(--font-heading); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 12px;">[[feat4_title]]</h3>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b;">[[feat4_desc]]</p>
    </div>

  </div>
</section>
`;

export const SCROLLYTELLING_SECTION_TEMPLATE = `
<section id="about" style="padding-top: 80px; padding-bottom: 100px;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
    
    <!-- Left Column: Sticky Title -->
    <div style="position: sticky; top: 120px;">
      <span style="font-size: 11px; font-weight: 700; color: var(--accent-primary); letter-spacing: 0.1em; text-transform: uppercase;">Chronology Flow</span>
      <h2 style="font-family: var(--font-heading); font-weight: 900; font-size: 42px; letter-spacing: -0.03em; color: #fff; margin-top: 12px; margin-bottom: 20px;">Continuous Development Cycles</h2>
      <p style="color: #64748b; font-size: 14px; line-height: 1.7; max-width: 420px;">Driven by the automated self-correction critic loop, our static templates optimize in real-time as users fine-tune styling attributes.</p>
    </div>

    <!-- Right Column: Scrollable cards -->
    <div style="display: flex; flex-direction: column; gap: 40px;">
      
      <!-- Card 1 -->
      <div class="scroll-card" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 36px; transition: 0.3s; opacity: 0.65;">
        <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: var(--accent-primary);">PHASE 01</span>
        <h4 style="font-family: var(--font-heading); font-weight: 700; font-size: 20px; color: #fff; margin-top: 8px; margin-bottom: 12px;">Visual Vibe Structuring</h4>
        <p style="font-size: 13px; line-height: 1.6; color: #64748b;">The client visualizes natural language instructions, binding style tokens into custom HSL accent values immediately.</p>
      </div>

      <!-- Card 2 -->
      <div class="scroll-card" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 36px; transition: 0.3s; opacity: 0.65;">
        <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: var(--accent-secondary);">PHASE 02</span>
        <h4 style="font-family: var(--font-heading); font-weight: 700; font-size: 20px; color: #fff; margin-top: 8px; margin-bottom: 12px;">ThreeJS Backplane Binding</h4>
        <p style="font-size: 13px; line-height: 1.6; color: #64748b;">Injects WebGL custom geometry (Torus knot or Interactive spheres) containing custom material shaders responding to cursor inputs.</p>
      </div>

      <!-- Card 3 -->
      <div class="scroll-card" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; padding: 36px; transition: 0.3s; opacity: 0.65;">
        <span style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: var(--accent-primary);">PHASE 03</span>
        <h4 style="font-family: var(--font-heading); font-weight: 700; font-size: 20px; color: #fff; margin-top: 8px; margin-bottom: 12px;">Audit Sentry Certification</h4>
        <p style="font-size: 13px; line-height: 1.6; color: #64748b;">Evaluates layout contrast constraints and z-index structures, outputting pristine code bundles with 0 unclosed div containers.</p>
      </div>

    </div>
  </div>
</section>
`;

export const FOOTER_TEMPLATE = `
<footer id="footer" style="border-top: 1px solid rgba(255,255,255,0.03); padding: 80px 24px 40px 24px; position: relative; z-index: 10;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
    
    <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 30px;">
      <div>
        <div style="font-family: var(--font-heading); font-weight: 800; font-size: 20px; color: #fff; display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));"></span>
          [[project_name]]
        </div>
        <p style="color: #64748b; font-size: 13px; max-width: 260px; line-height: 1.6;">Precision-audited website designs engineered automatically via local swarm modules.</p>
      </div>

      <div style="display: flex; gap: 60px;">
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
          <span style="color: #fff; font-weight: 600; font-family: var(--font-heading);">System</span>
          <a href="#" style="color: #64748b; text-decoration: none;">Status Panel</a>
          <a href="#" style="color: #64748b; text-decoration: none;">Exporters</a>
          <a href="#" style="color: #64748b; text-decoration: none;">Diagnostics</a>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
          <span style="color: #fff; font-weight: 600; font-family: var(--font-heading);">Company</span>
          <a href="#" style="color: #64748b; text-decoration: none;">Figma Swarm</a>
          <a href="#" style="color: #64748b; text-decoration: none;">Sovereignty</a>
          <a href="#" style="color: #64748b; text-decoration: none;">V2 Engine</a>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 24px; font-size: 11px; color: #64748b; flex-wrap: wrap; gap: 12px;">
      <span>© 2026 [[project_name]]. Certified Sovereign Design.</span>
      <span>Engineered Client-Side</span>
    </div>

  </div>
</footer>
`;

export const DYNAMIC_GSAP_TIMELINES = `
  // GSAP Scrollytelling card entrances
  gsap.utils.toArray('.scroll-card').forEach((card) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      borderColor: 'rgba(255,255,255,0.1)',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 50%',
        toggleActions: 'play reverse play reverse',
        scrub: true
      }
    });
  });

  // Logo animation on enter
  gsap.from('nav', {
    y: -50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  // Hero section entrance animation sequence
  const heroTl = gsap.timeline();
  heroTl.from('#hero h1', {
    y: 40,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out'
  }).from('#hero p', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6').from('#hero button', {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, '-=0.4');
`;
