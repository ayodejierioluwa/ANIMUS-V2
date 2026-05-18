/**
 * ANIMUS ENGINE V2 - High-Fidelity Sourcing & Fallback Engine
 * Provides beautiful, highly artistic abstract assets (using curated Pexels/Unsplash URLs and inline SVGs)
 * that never fail, avoiding blank sections or broken links.
 */

// Curated stock photo/video URLs from high-end collections (Unsplash & Pexels)
export const PREMIUM_ASSETS = {
  tech: {
    hero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", // Cyber abstract wave
    features: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80", // Floating neon sphere
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80", // Quantum energy nodes
      "https://images.unsplash.com/photo-1618005198143-d5182cf644e1?auto=format&fit=crop&w=600&q=80"  // Glassmorphic crystal shards
    ]
  },
  nature: {
    hero: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80", // Organic smooth mesh gradient
    features: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80", // Natural ripples
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80", // Flowing aura mist
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=600&q=80"  // Smooth clay shapes
    ]
  },
  crypto: {
    hero: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80", // Decentralized glowing sphere network
    features: [
      "https://images.unsplash.com/photo-1644020964372-c511394747eb?auto=format&fit=crop&w=600&q=80", // Cybernetic grid lines
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80", // Iridescent chrome liquid
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"  // Deep tech nodes
    ]
  },
  wellness: {
    hero: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80", // Calm morning light
    features: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80", // Serene abstract backdrop
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80", // Minimal stones stacking
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"  // Golden beach waves
    ]
  }
};

/**
 * Generates an ultra-premium SVG background as a data-URI.
 * Used as a 100% reliable local backup that looks spectacular.
 */
export function getSvgBackupImage(type, title = "AETHER") {
  const seed = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  
  // Custom HSL gradients based on category
  let gradient1 = "hsl(244, 75%, 20%)";
  let gradient2 = "hsl(270, 75%, 15%)";
  let accent = "hsl(180, 80%, 40%)";
  
  if (type === "tech") {
    gradient1 = "hsl(260, 60%, 12%)";
    gradient2 = "hsl(230, 70%, 15%)";
    accent = "hsl(180, 100%, 50%)"; // Cyan
  } else if (type === "nature") {
    gradient1 = "hsl(150, 40%, 10%)";
    gradient2 = "hsl(200, 50%, 12%)";
    accent = "hsl(140, 70%, 45%)"; // Green
  } else if (type === "crypto") {
    gradient1 = "hsl(280, 70%, 10%)";
    gradient2 = "hsl(320, 70%, 12%)";
    accent = "hsl(290, 100%, 65%)"; // Purple
  } else if (type === "wellness") {
    gradient1 = "hsl(20, 40%, 15%)";
    gradient2 = "hsl(340, 50%, 18%)";
    accent = "hsl(25, 90%, 65%)"; // Amber
  }

  // Create an beautiful procedural abstract SVG
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradient1}" />
          <stop offset="100%" stop-color="${gradient2}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${gradient2}" stop-opacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      
      <!-- Background base -->
      <rect width="800" height="600" fill="url(#bgGrad)" />
      
      <!-- Ambient Glow Orb -->
      <circle cx="${350 + (seed % 100)}" cy="${250 + (seed % 80)}" r="220" fill="url(#glow)" filter="url(#blur)" />
      
      <!-- Cyber geometric accent lines -->
      <g stroke="white" stroke-opacity="0.06" stroke-width="1.5">
        <line x1="0" y1="150" x2="800" y2="150" />
        <line x1="0" y1="450" x2="800" y2="450" />
        <line x1="200" y1="0" x2="200" y2="600" />
        <line x1="600" y1="0" x2="600" y2="600" />
        
        <!-- Diagonal laser cuts -->
        <line x1="0" y1="0" x2="800" y2="600" stroke="${accent}" stroke-opacity="0.15" stroke-width="2" />
      </g>
      
      <!-- Ambient decorative rings -->
      <circle cx="${350 + (seed % 100)}" cy="${250 + (seed % 80)}" r="100" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1" />
      <circle cx="${350 + (seed % 100)}" cy="${250 + (seed % 80)}" r="150" fill="none" stroke="${accent}" stroke-opacity="0.08" stroke-width="1" stroke-dasharray="10 5" />
      
      <!-- Artistic Typography in background -->
      <text x="50" y="530" font-family="'Outfit', sans-serif" font-weight="900" font-size="70" fill="white" fill-opacity="0.03" letter-spacing="10">${title.toUpperCase()}</text>
    </svg>
  `;

  // Encode to base64
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

/**
 * Fetches or provides a breathtaking background asset.
 */
export function getHeroAsset(category, customPrompt = "") {
  const cat = PREMIUM_ASSETS[category] ? category : "tech";
  // We can return both the premium unsplash photo and the procedural svg backup
  return {
    url: PREMIUM_ASSETS[cat].hero,
    fallbackUrl: getSvgBackupImage(cat, customPrompt || cat)
  };
}

/**
 * Returns a list of 3 premium feature background images/svgs.
 */
export function getFeatureAssets(category, seedText = "") {
  const cat = PREMIUM_ASSETS[category] ? category : "tech";
  const assets = PREMIUM_ASSETS[cat].features;
  return assets.map((url, i) => ({
    url,
    fallbackUrl: getSvgBackupImage(cat, `${seedText}_feat_${i + 1}`)
  }));
}
