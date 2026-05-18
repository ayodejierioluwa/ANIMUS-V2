import {
  BASE_HTML_SHELL,
  NAVIGATION_BAR_TEMPLATE,
  HERO_SECTION_TEMPLATE,
  FEATURES_GRID_TEMPLATE,
  SCROLLYTELLING_SECTION_TEMPLATE,
  FOOTER_TEMPLATE,
  DYNAMIC_GSAP_TIMELINES
} from '../data/templates';

/**
 * ANIMUS ENGINE V2 - Client-side Generative Site Compiler
 * Combines style tokens and custom layout metadata to output clean static web projects.
 */
export function compileSite(tokens, content) {
  const projectName = content.projectName || "AETHER_FLOW";
  
  // 1. Compile Nav Bar
  let navHtml = NAVIGATION_BAR_TEMPLATE;
  navHtml = navHtml.replace(/\[\[project_name\]\]/g, projectName);
  navHtml = navHtml.replace(/\[\[cta_text\]\]/g, content.ctaText || "Connect Node");
  
  // 2. Compile Hero Section
  let heroHtml = HERO_SECTION_TEMPLATE;
  heroHtml = heroHtml.replace(/\[\[badge_text\]\]/g, content.heroBadge || "V2 Engine Live");
  heroHtml = heroHtml.replace(/\[\[title_bold\]\]/g, content.heroTitleBold || "Intelligent");
  heroHtml = heroHtml.replace(/\[\[title_gradient\]\]/g, content.heroTitleGradient || " Architecture");
  heroHtml = heroHtml.replace(/\[\[subtitle\]\]/g, content.heroSubtitle || "Forged in the agent swarm, audited for visual precision.");
  
  // 3. Compile Bento Features Grid
  let gridHtml = FEATURES_GRID_TEMPLATE;
  gridHtml = gridHtml.replace(/\[\[feat1_title\]\]/g, content.feat1Title || "Dynamic GSAP Scrollytelling");
  gridHtml = gridHtml.replace(/\[\[feat1_desc\]\]/g, content.feat1Desc || "Seamless parallax transitions that feel organic and fluid, driven by native high-end scroll listeners.");
  gridHtml = gridHtml.replace(/\[\[feat2_title\]\]/g, content.feat2Title || "WebGL ThreeJS Backdrop");
  gridHtml = gridHtml.replace(/\[\[feat2_desc\]\]/g, content.feat2Desc || "Procedurally generated 3D meshes that respond to human gaze and physical interaction, completely responsive.");
  gridHtml = gridHtml.replace(/\[\[feat3_title\]\]/g, content.feat3Title || "Self-Correcting Critique Layer");
  gridHtml = gridHtml.replace(/\[\[feat3_desc\]\]/g, content.feat3Desc || "The Animus Sentry runs automated WCAG diagnostics on layout structure and contrast, instantly patching defects.");
  gridHtml = gridHtml.replace(/\[\[feat4_title\]\]/g, content.feat4Title || "CORTEX Multi-User Sync");
  gridHtml = gridHtml.replace(/\[\[feat4_desc\]\]/g, content.feat4Desc || "Saves compilation nodes, stores user preference patterns, and deploys builds straight to GitHub main branch.");

  // 4. Compile GSAP Scrollytelling cards
  let scrollyHtml = SCROLLYTELLING_SECTION_TEMPLATE;

  // 5. Compile Footer
  let footerHtml = FOOTER_TEMPLATE;
  footerHtml = footerHtml.replace(/\[\[project_name\]\]/g, projectName);

  // 6. Assemble Full Body Content
  const bodyContent = `
    \${navHtml}
    \${heroHtml}
    \${gridHtml}
    \${scrollyHtml}
    \${footerHtml}
  `;

  // 7. Inject Styling Tokens into Base HTML
  let fullPage = BASE_HTML_SHELL;
  fullPage = fullPage.replace(/\[\[title\]\]/g, `\${projectName} | Audit Certified`);
  fullPage = fullPage.replace(/\[\[bg_color\]\]/g, tokens.bgColor || "#050508");
  fullPage = fullPage.replace(/\[\[accent_primary\]\]/g, tokens.accentPrimary || "#6366f1");
  fullPage = fullPage.replace(/\[\[accent_secondary\]\]/g, tokens.accentSecondary || "#a855f7");
  
  // Custom Glow calculation from primary accent
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}` : "99, 102, 241";
  };
  const glowRgb = hexToRgb(tokens.accentPrimary || "#6366f1");
  fullPage = fullPage.replace(/\[\[accent_glow\]\]/g, `rgba(\${glowRgb}, 0.35)`);
  fullPage = fullPage.replace(/\[\[geometry_type\]\]/g, tokens.geometryType || "torus_knot");

  // Inject custom CSS modifications (if any)
  const customCss = `
    body {
      font-family: '\${tokens.fontBody || "Inter"}', sans-serif;
    }
    h1, h2, h3, h4, .btn-action {
      font-family: '\${tokens.fontHeading || "Outfit"}', sans-serif;
    }
  `;
  fullPage = fullPage.replace(/\[\[custom_css\]\]/g, customCss);

  // Inject Custom JS interactions
  const customJs = DYNAMIC_GSAP_TIMELINES;
  fullPage = fullPage.replace(/\[\[custom_js\]\]/g, customJs);

  // Inject assembled body
  fullPage = fullPage.replace(/\[\[body\]\]/g, bodyContent);

  // Split components into separate editable assets
  const compiledCss = `
/* --- ANIMUS DESIGN SYSTEM COMPILE --- */
:root {
  --bg-deep: \${tokens.bgColor || "#050508"};
  --accent-primary: \${tokens.accentPrimary || "#6366f1"};
  --accent-secondary: \${tokens.accentSecondary || "#a855f7"};
  --font-heading: '\${tokens.fontHeading || "Outfit"}', sans-serif;
  --font-body: '\${tokens.fontBody || "Inter"}', sans-serif;
}
  `.trim();

  const compiledJs = `
/* --- ANIMUS INTERACTIVE SCRIPT COMPILE --- */
gsap.registerPlugin(ScrollTrigger);
\${DYNAMIC_GSAP_TIMELINES}
  `.trim();

  return {
    html: fullPage,
    css: compiledCss,
    js: compiledJs
  };
}
