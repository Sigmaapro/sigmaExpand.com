"use client";

import React, { useState, useEffect, useRef, useCallback, type ComponentType } from "react";
import Link from "next/link";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LiveSupportButton } from "@/components/sigma/LiveSupportButton";
import { ProofLayer } from "@/components/sigma/ProofLayer";
import { MagneticButton } from "@/components/sigma/SigmaCtaButton";
import { MidConversionCta, FinalConversionCta } from "@/components/sigma/ConversionSections";
import { BookCallModal } from "@/components/sigma/BookCallModal";
import { HeroGlassCarousel } from "@/components/sigma/HeroGlassCarousel";
import { CryptoMarketingSection } from "@/components/sigma/CryptoMarketingSection";
import { SeoHiddenImages } from "@/components/seo/SeoHiddenImages";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import {
  Shield,
  Cpu,
  Activity,
  ArrowUpRight,
  Code2,
  Mail,
  Info,
  Network,
  LayoutGrid,
  Menu,
  X,
  Sparkles,
  Check,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconId, SiteTranslations } from "@/content/types";
import {
  socialContactEmail,
  socialLinks,
  type SocialPlatformKey,
} from "@/content/socials";
import { InsightsOuterLink } from "@/components/site/InsightsOuterLink";
import { LanguageSwitcherButton } from "@/components/site/LanguageSwitcherButton";
import { SigmaMobileNavPanel } from "@/components/sigma/SigmaMobileNavPanel";
import { pickLang } from "@/content/global/marketing/helpers";
import { aboutPageMetaByLang } from "@/content/global/marketing/aboutContent";
import { teamPageMetaByLang } from "@/content/global/marketing/teamContent";
import { MarketingFooter } from "@/components/site/MarketingFooter";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import { useLanguage } from "@/context/LanguageContext";
import {
  localeCardTitle,
  localeCta,
  localeEyebrow,
  localeHeading,
  localeHeroSubtitle,
  localeHeroSupporting,
  localeNav,
  localeSmallLabelTrack,
  localeWideMutedTrack,
  localeWordmarkNav,
} from "@/lib/localeTypography";
import { useIsMobile, useMinWidth } from "@/hooks/useMedia";

const theme = {
  colors: {
    erie: "#212529",
    persian: "#1c39bb",
    cadet: "#adb5bd",
    uranian: "#bde0fe",
  },
};

/** Pass 2: Σ-inspired extruded shards. Pass 1 (platonic cluster) = set WEBGL_USE_SIGMA_SHARDS to false in WebGLBackground. */
const WEBGL_USE_SIGMA_SHARDS = true;

function buildSigmaShardGeometries(): THREE.BufferGeometry[] {
  const shardDepth = 0.1;
  const ext = { depth: shardDepth, bevelEnabled: false };
  const list: THREE.BufferGeometry[] = [];

  const shUpper = new THREE.Shape();
  shUpper.moveTo(-0.42, -0.12);
  shUpper.lineTo(0.52, 0.48);
  shUpper.lineTo(0.38, 0.22);
  shUpper.lineTo(-0.28, -0.12);
  shUpper.closePath();
  const g0 = new THREE.ExtrudeGeometry(shUpper, ext);
  g0.center();
  list.push(g0);

  const shLower = new THREE.Shape();
  shLower.moveTo(-0.38, 0.18);
  shLower.lineTo(0.48, -0.42);
  shLower.lineTo(0.22, -0.22);
  shLower.lineTo(-0.42, 0.02);
  shLower.closePath();
  const g1 = new THREE.ExtrudeGeometry(shLower, ext);
  g1.center();
  list.push(g1);

  const shBar = new THREE.Shape();
  shBar.moveTo(-0.52, -0.07);
  shBar.lineTo(0.52, -0.07);
  shBar.lineTo(0.48, 0.07);
  shBar.lineTo(-0.48, 0.07);
  shBar.closePath();
  const g2 = new THREE.ExtrudeGeometry(shBar, ext);
  g2.center();
  list.push(g2);

  const shSpine = new THREE.Shape();
  shSpine.moveTo(-0.09, -0.52);
  shSpine.lineTo(0.09, -0.48);
  shSpine.lineTo(0.07, 0.52);
  shSpine.lineTo(-0.07, 0.48);
  shSpine.closePath();
  const g3 = new THREE.ExtrudeGeometry(shSpine, ext);
  g3.center();
  list.push(g3);

  const shDiag = new THREE.Shape();
  shDiag.moveTo(0, 0);
  shDiag.lineTo(0.58, 0.18);
  shDiag.lineTo(0.32, -0.28);
  shDiag.closePath();
  const g4 = new THREE.ExtrudeGeometry(shDiag, {
    depth: shardDepth * 1.15,
    bevelEnabled: false,
  });
  g4.center();
  list.push(g4);

  const shKite = new THREE.Shape();
  shKite.moveTo(0, 0);
  shKite.lineTo(0.38, 0.52);
  shKite.lineTo(-0.18, 0.22);
  shKite.closePath();
  const g5 = new THREE.ExtrudeGeometry(shKite, ext);
  g5.center();
  list.push(g5);

  return list;
}

const GlobalStyles = () => (
  <style>{`
    :root {
      --bg-color: ${theme.colors.erie};
      --primary: ${theme.colors.persian};
      --text-muted: ${theme.colors.cadet};
      --glow: ${theme.colors.uranian};
    }

    /*
     * Fallback layout when the main Tailwind bundle fails to load (dev chunk/HMR issues).
     * Keeps nav + hero readable until a hard refresh or clean .next rebuild.
     */
    .sigma-landing-root {
      min-height: 100vh;
      background-color: ${theme.colors.erie};
      color: ${theme.colors.cadet};
      overflow-x: clip;
    }
    .sigma-landing-root nav.sigma-nav-shell {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      box-sizing: border-box;
      pointer-events: auto;
    }
    .sigma-landing-root main {
      position: relative;
      z-index: 10;
      padding-top: max(4.5rem, calc(env(safe-area-inset-top, 0px) + 3.25rem));
    }
    @media (max-width: 767px) {
      .sigma-landing-root main {
        padding-top: max(4.25rem, calc(env(safe-area-inset-top, 0px) + 3rem));
      }
    }
    .sigma-landing-root #hero {
      min-height: min(100svh, 920px);
      padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
      padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
      padding-bottom: 2rem;
      box-sizing: border-box;
    }
    @media (min-width: 640px) {
      .sigma-landing-root #hero {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    .sigma-landing-root ::selection {
      background: var(--primary);
      color: #fff;
    }

    .sigma-landing-root ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .sharp-edge {
      border-radius: 0 !important;
    }

    .grid-bg {
      background-size: 50px 50px;
      background-image:
        linear-gradient(to right, rgba(173, 181, 189, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(173, 181, 189, 0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    }

    .glow-text {
      text-shadow: 0 0 20px rgba(189, 224, 254, 0.4);
    }

    @media (max-width: 767px) {
      .glow-text {
        text-shadow: 0 0 26px rgba(189, 224, 254, 0.55);
      }
    }
  `}</style>
);

/** Heavy Three.js layer — only mounted from tablet-up to protect phone performance. */
const WebGLScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const windowHalf = useRef(new THREE.Vector2(1, 1));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    windowHalf.current.set(window.innerWidth / 2, window.innerHeight / 2);

    const w = window.innerWidth;
    const isTablet = w < 1024;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme.colors.erie, isTablet ? 0.024 : 0.021);

    const camera = new THREE.PerspectiveCamera(
      72,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTablet ? 1.5 : 2));
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const baseScale = isTablet ? 1.12 : 1.34;

    /**
     * Pass 1 — original platonic cluster (tet / oct): exact composition baseline.
     * Pass 2 — `buildSigmaShardGeometries()`: same loop, same motion; only mesh geometry changes.
     */
    let tetGeo: THREE.BufferGeometry | null = null;
    let octGeo: THREE.BufferGeometry | null = null;
    let sigmaShardGeometries: THREE.BufferGeometry[] = [];

    if (WEBGL_USE_SIGMA_SHARDS) {
      sigmaShardGeometries = buildSigmaShardGeometries();
    } else {
      tetGeo = new THREE.TetrahedronGeometry(baseScale, 0);
      octGeo = new THREE.OctahedronGeometry(baseScale * 0.92, 0);
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: theme.colors.persian,
      emissive: theme.colors.erie,
      emissiveIntensity: 0.12,
      metalness: 0.82,
      roughness: 0.22,
      wireframe: false,
      flatShading: true,
    });

    const wireMaterial = new THREE.LineBasicMaterial({
      color: theme.colors.uranian,
      transparent: true,
      opacity: 0.17,
    });

    const numShards = isTablet ? 156 : 298;
    const shards: THREE.Mesh[] = [];

    const SIGMA_W = 2.8;
    const SIGMA_H = 4.2;
    const SIGMA_THICKNESS = 0.20;
    const SIGMA_DEPTH = 0.05;

    // Σ has FOUR strokes. Coordinates in 2D, Y axis goes UP.
    // Top bar runs across the top. Bottom bar runs across the bottom.
    // The vertex of the < shape is on the LEFT at y=0.
    const sigmaSegments: Array<{ sx: number; sy: number; ex: number; ey: number }> = [
      { sx:  SIGMA_W, sy:  SIGMA_H, ex: -SIGMA_W, ey:  SIGMA_H }, // top bar
      { sx: -SIGMA_W, sy:  SIGMA_H, ex:  SIGMA_W, ey:  0       }, // upper diag TL -> vertex right
      { sx:  SIGMA_W, sy:  0,       ex: -SIGMA_W, ey: -SIGMA_H }, // lower diag vertex -> BL
      { sx:  SIGMA_W, sy: -SIGMA_H, ex: -SIGMA_W, ey: -SIGMA_H }, // bottom bar
    ];

    const sigmaSegmentLengths = sigmaSegments.map((s) =>
      Math.hypot(s.ex - s.sx, s.ey - s.sy),
    );
    const sigmaTotalLength = sigmaSegmentLengths.reduce((a, b) => a + b, 0);

    const sampleSigmaPoint = (): THREE.Vector3 => {
      let pick = Math.random() * sigmaTotalLength;
      let segIdx = 0;
      for (let s = 0; s < sigmaSegments.length; s++) {
        if (pick <= sigmaSegmentLengths[s]!) { segIdx = s; break; }
        pick -= sigmaSegmentLengths[s]!;
      }
      const seg = sigmaSegments[segIdx]!;
      const t = Math.random();
      const x = seg.sx + (seg.ex - seg.sx) * t;
      const y = seg.sy + (seg.ey - seg.sy) * t;

      const dx = seg.ex - seg.sx;
      const dy = seg.ey - seg.sy;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny =  dx / len;

      const jitter = (Math.random() - 0.5) * 2 * SIGMA_THICKNESS;
      const z      = (Math.random() - 0.5) * 2 * SIGMA_DEPTH;

      return new THREE.Vector3(x + nx * jitter, y + ny * jitter, z);
    };

    for (let i = 0; i < numShards; i++) {
      const geometry = WEBGL_USE_SIGMA_SHARDS
        ? sigmaShardGeometries[i % sigmaShardGeometries.length]!
        : i % 3 === 0
          ? octGeo!
          : tetGeo!;
      const mesh = new THREE.Mesh(geometry, material);
      const sigmaPos = sampleSigmaPoint();
      mesh.position.copy(sigmaPos);

      mesh.userData = {
        initialPos: mesh.position.clone(),
        direction: mesh.position.clone().normalize(),
        speed: Math.random() * 0.42 + 0.12,
        rotSpeed: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).multiplyScalar(0.042),
      };

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      if (WEBGL_USE_SIGMA_SHARDS) {
        mesh.scale.setScalar(i % 3 === 0 ? baseScale * 0.92 : baseScale);
      }

      const wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        wireMaterial,
      );
      mesh.add(wireframe);

      group.add(mesh);
      shards.push(mesh);
    }

    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = isTablet ? 280 : 620;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: isTablet ? 0.04 : 0.045,
      color: theme.colors.cadet,
      transparent: true,
      opacity: isTablet ? 0.22 : 0.3,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.36);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(theme.colors.uranian, 1.65, 55);
    scene.add(pointLight);

    const rim = new THREE.DirectionalLight(0xffffff, 0.28);
    rim.position.set(4, 6, 8);
    scene.add(rim);

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX - windowHalf.current.x;
      mouse.current.y = event.clientY - windowHalf.current.y;
    };

    const handleResize = () => {
      windowHalf.current.x = window.innerWidth / 2;
      windowHalf.current.y = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const maxScroll = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1,
      );
      const scrollProgress = Math.min(scrollY.current / maxScroll, 1.0);

      pointLight.position.x +=
        (mouse.current.x * 0.01 - pointLight.position.x) * 0.05;
      pointLight.position.y +=
        (-mouse.current.y * 0.01 - pointLight.position.y) * 0.05;
      pointLight.position.z = 5;

      group.rotation.y +=
        (mouse.current.x * 0.00042 - group.rotation.y) * 0.045;
      group.rotation.x +=
        (-mouse.current.y * 0.00042 - group.rotation.x) * 0.045;

      const explosionFactor = scrollProgress * 22;

      shards.forEach((shard) => {
        const ud = shard.userData as {
          initialPos: THREE.Vector3;
          direction: THREE.Vector3;
          speed: number;
          rotSpeed: THREE.Vector3;
        };
        const targetPos = ud.initialPos
          .clone()
          .add(ud.direction.clone().multiplyScalar(explosionFactor * ud.speed));
        shard.position.lerp(targetPos, 0.05);

        shard.rotation.x += ud.rotSpeed.x;
        shard.rotation.y += ud.rotSpeed.y;
        shard.rotation.z += ud.rotSpeed.z;
      });

      particlesMesh.rotation.y = time * 0.042;

      camera.position.z = 15 - scrollProgress * 4;
      camera.position.y = -(scrollProgress * 4);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      shards.forEach((m) => {
        m.children.forEach((ch) => {
          if (ch instanceof THREE.LineSegments) ch.geometry.dispose();
        });
      });
      if (tetGeo) tetGeo.dispose();
      if (octGeo) octGeo.dispose();
      sigmaShardGeometries.forEach((g) => g.dispose());
      material.dispose();
      wireMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

const WebGLBackground = () => {
  /** Canvas from lg-up saves tablet GPU / battery; film grain still shows below */
  const showCanvas = useMinWidth(1024);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#080a0f] via-[#151a22] to-[#0c111a]" />
      {showCanvas ? <WebGLScene /> : null}
      <div
        className={`pointer-events-none absolute inset-0 sigma-webgl-film ${showCanvas ? "opacity-100" : "opacity-[0.35]"}`}
        aria-hidden
      />
    </div>
  );
};

const AnimatedText = ({
  text,
  className,
  /** Mobile: each word on its own centered line (e.g. "CORE" / "ECOSYSTEM"). Desktop: unchanged word-by-word row. */
  mobileWordStack = false,
  /** Semantic heading — motion + typography unchanged. */
  as,
}: {
  text: string;
  className?: string;
  mobileWordStack?: boolean;
  as?: "h2" | "h3";
}) => {
  const words = text.split(" ").filter((w) => w.length > 0);
  const spanMotion = (i: number) => ({
    initial: { opacity: 1, y: 14 } as const,
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    viewport: { once: true, margin: "-100px" as const },
  });

  if (mobileWordStack) {
    const Wrapper = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.div;
    return (
      <Wrapper
        className={`flex w-full min-w-0 max-w-full flex-col items-center gap-1.5 text-center [overflow-wrap:anywhere] leading-snug md:flex-row md:flex-wrap md:items-baseline md:gap-x-0 md:gap-y-1 md:leading-none md:text-start ${className ?? ""}`}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            {...spanMotion(i)}
            className="max-w-full shrink-0 [word-break:normal] max-md:block max-md:w-full max-md:px-1 md:mb-1 md:mr-3 md:inline-block md:break-words rtl:md:mr-0 rtl:md:ml-3"
          >
            {word}
          </motion.span>
        ))}
      </Wrapper>
    );
  }

  const MobileTag = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.p;
  const DesktopTag = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.div;

  return (
    <>
      <MobileTag
        {...spanMotion(0)}
        className={`max-w-full md:hidden [overflow-wrap:anywhere] [word-break:normal] ${className ?? ""}`}
      >
        {text}
      </MobileTag>
      <DesktopTag
        className={`hidden max-w-full flex-wrap break-words [overflow-wrap:anywhere] md:flex md:gap-y-1 ${className ?? ""}`}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            {...spanMotion(i)}
            className="mb-1 mr-3 max-w-full break-words [word-break:normal] md:inline-block rtl:mr-0 rtl:ml-3"
          >
            {word}
          </motion.span>
        ))}
      </DesktopTag>
    </>
  );
};

const HeroVisual = ({ t }: { t: SiteTranslations }) => {
  const reduceMotion = useReducedMotion();
  const isNarrow = useIsMobile(768);
  const isTiny = useIsMobile(480);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sparkleCount = isTiny ? 4 : isNarrow ? 6 : 22;
  const parallaxMul = isNarrow ? 3.5 : 10;
  const parallaxMulY = isNarrow ? 2.5 : 8;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || isNarrow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
    const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
    setParallax({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative flex min-h-[min(220px,34svh)] w-full max-w-full -translate-y-1 items-center justify-center overflow-x-clip overflow-y-visible sm:min-h-[min(300px,42vh)] sm:overflow-x-visible sm:-translate-y-6 md:-translate-y-8 md:min-h-[min(400px,50vh)] lg:min-h-[min(520px,62vh)] lg:-translate-y-[52px] xl:-translate-y-[60px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div className="absolute -inset-[14%] bg-[radial-gradient(ellipse_92%_78%_at_50%_38%,rgba(28,57,187,0.02),transparent_74%)] opacity-70 md:opacity-100 md:bg-[radial-gradient(ellipse_92%_78%_at_50%_38%,rgba(28,57,187,0.048),transparent_74%)]" />
        <div className="absolute left-1/2 top-[36%] h-[min(70vw,30rem)] w-[min(82vw,36rem)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_62%_52%_at_48%_46%,rgba(28,57,187,0.03)_0%,rgba(28,57,187,0.012)_48%,transparent_76%)] opacity-80 md:opacity-100 md:bg-[radial-gradient(ellipse_62%_52%_at_48%_46%,rgba(28,57,187,0.072)_0%,rgba(28,57,187,0.028)_48%,transparent_76%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_56%_44%_at_68%_52%,rgba(189,224,254,0.008),transparent_62%)] md:bg-[radial-gradient(ellipse_56%_44%_at_68%_52%,rgba(189,224,254,0.022),transparent_62%)]" />
      </div>
      <motion.div
        className="relative z-10 flex w-full min-w-0 items-center justify-center px-1 sm:px-0 ltr:lg:justify-end rtl:lg:justify-start"
        animate={{
          x: reduceMotion || isNarrow ? 0 : parallax.x * parallaxMul,
          y: reduceMotion || isNarrow ? 0 : parallax.y * parallaxMulY,
        }}
        transition={{ type: "spring", stiffness: 70, damping: 24, mass: 0.9 }}
      >
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, -6, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="group relative block w-full max-w-full overflow-hidden rounded-2xl border border-[#bde0fe]/[0.15] bg-[#0a0f18]/[0.44] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.45),0_0_56px_rgba(28,57,187,0.16)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#bde0fe]/30 hover:shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_64px_rgba(28,57,187,0.2)] md:max-w-[min(35rem,88%)] lg:max-w-[min(39rem,92%)] lg:p-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(189,224,254,0.06)_0%,rgba(28,57,187,0.035)_38%,transparent_74%)]" />
          <HeroGlassCarousel t={t} />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-[15]" aria-hidden>
        {Array.from({ length: sparkleCount }, (_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#bde0fe]/18 sm:h-[3px] sm:w-[3px] sm:bg-[#bde0fe]/22"
            style={{
              left: `${10 + (i * 41) % 78}%`,
              top: `${8 + (i * 47) % 82}%`,
            }}
            animate={
              reduceMotion || isNarrow
                ? { opacity: 0.22, scale: 1 }
                : { opacity: [0.12, 0.5, 0.12], scale: [0.88, 1.15, 0.88] }
            }
            transition={
              reduceMotion || isNarrow
                ? { duration: 0 }
                : {
                    duration: 5 + (i % 4),
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>
    </div>
  );
};

const TiltCard = ({
  title,
  icon: Icon,
  desc,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}) => {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const isNarrow = useIsMobile(1024);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNarrow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: isNarrow ? 0 : rotate.x, rotateY: isNarrow ? 0 : rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full min-h-[16.75rem] w-full min-w-0 max-w-full flex-col overflow-hidden sharp-edge border border-[#adb5bd]/20 bg-[#212529]/80 p-6 backdrop-blur-md sm:p-8"
      style={{ transformStyle: isNarrow ? "flat" : "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c39bb]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: "translateZ(30px)" }}
      >
        <Icon className="mb-6 h-10 w-10 text-[#adb5bd] transition-colors duration-300 group-hover:text-[#bde0fe]" />
        <h3
          className={`mb-3 break-words font-display text-lg font-semibold tracking-wide text-[#e9ecef] sm:text-xl ${localeCardTitle(lang)}`}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#c5ccd4] md:text-[#adb5bd]">{desc}</p>
      </div>
      <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#bde0fe] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#bde0fe] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
};

const HeroSection = ({
  t,
  isRtl,
}: {
  t: SiteTranslations;
  isRtl: boolean;
}) => {
  const { lang } = useLanguage();
  return (
  <section
    id="hero"
    className="relative flex min-h-[min(100svh,920px)] scroll-mt-24 items-center overflow-x-clip px-5 pb-10 pt-[max(5.25rem,calc(env(safe-area-inset-top,0px)+4.25rem))] sm:px-6 sm:pb-14 sm:pt-28 md:min-h-screen md:px-16 md:pt-32 lg:px-24"
  >
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-sigma-mesh opacity-[0.1] sm:opacity-[0.16] md:opacity-[0.2]" />
      <div className="absolute inset-0 bg-sigma-radial opacity-[0.14] sm:opacity-[0.2] md:opacity-[0.26]" />
      <div className="absolute inset-0 sigma-hero-vignette opacity-[0.35] sm:opacity-[0.45] md:opacity-[0.55]" />
    </div>
    <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-[90rem] grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-16 lg:gap-y-10 xl:gap-x-24">
      <div className="relative z-20 order-2 flex w-full min-w-0 max-w-full flex-col justify-center sm:order-1 md:max-w-xl lg:order-none lg:max-w-none lg:pe-4">
        <div
          className={`absolute -top-2 hidden h-[calc(100%+1rem)] w-px bg-gradient-to-b from-[#1c39bb]/50 via-[#1c39bb]/15 to-transparent lg:block ${isRtl ? "-right-3" : "-left-3"}`}
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 1, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow + accent: explicit order per direction so RTL aligns with the hero text block edge (no flex-row-reverse drift). */}
          <div className="mb-5 flex w-full min-w-0 items-center gap-4 sm:mb-6">
            {!isRtl ? (
              <>
                <div className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent via-[#adb5bd]/80 to-transparent sigma-line-glow sm:w-14" />
                <span className="sigma-hero-eyebrow min-w-0 break-words text-[10px] font-semibold uppercase leading-snug text-[#d8dde2] sm:text-[11px]">
                  {t.hero.eyebrow}
                </span>
              </>
            ) : (
              <>
                <span className="sigma-hero-eyebrow min-w-0 shrink break-words text-[10px] font-semibold uppercase leading-snug text-[#d8dde2] sm:text-[11px]">
                  {t.hero.eyebrow}
                </span>
                <div className="h-px w-10 shrink-0 bg-gradient-to-l from-transparent via-[#adb5bd]/80 to-transparent sigma-line-glow sm:w-14" />
              </>
            )}
          </div>

          <h1
            className={`sigma-hero-title mb-5 max-w-full break-words text-[clamp(1.45rem,7.2vw,2.35rem)] font-semibold uppercase leading-[1.14] tracking-normal text-balance [overflow-wrap:anywhere] sm:mb-6 sm:text-6xl sm:leading-none sm:tracking-tight md:text-8xl lg:mb-6 lg:text-[5.25rem] xl:text-[5.75rem] ${
              isRtl ? "text-white glow-text" : "sigma-hero-wordmark"
            }`}
          >
            {t.hero.title}
          </h1>

          <p
            className={`mb-4 max-w-xl font-display text-[0.95rem] font-medium leading-snug text-[#f1f3f5] text-balance sm:text-lg sm:leading-[1.35] md:text-xl ${localeHeroSubtitle(lang)}`}
          >
            {t.hero.subtitle}
          </p>

          <p
            className={`sigma-body-measure mb-8 text-sm text-[#d0d7df] text-pretty sm:mb-9 sm:text-[15px] md:text-[#aeb5bd] ${localeHeroSupporting(lang)}`}
          >
            {t.hero.supporting}
          </p>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <MagneticButton
              primary
              isRtl={isRtl}
              href={t.hero.primaryHref}
              fullWidthMobile
            >
              {t.hero.primaryCta}
            </MagneticButton>
            <MagneticButton
              isRtl={isRtl}
              href={t.hero.secondaryHref}
              fullWidthMobile
            >
              {t.hero.secondaryCta}
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 order-1 min-h-0 w-full min-w-0 max-w-full justify-self-stretch sm:order-2 md:max-w-[min(100%,28rem)] md:justify-self-center lg:order-none lg:max-w-none lg:justify-self-stretch lg:ps-4 xl:ps-5 lg:pe-7 xl:pe-9">
        <div className="relative min-h-[min(180px,30svh)] w-full sm:min-h-[min(260px,38vh)] md:min-h-[min(400px,50vh)] lg:min-h-[min(520px,62vh)]">
          <HeroVisual t={t} />
        </div>
      </div>
    </div>
  </section>
  );
};

const WhatIsSigmaSection = ({ t }: { t: SiteTranslations }) => {
  const pillars = t.whatIsSigma.pillars;
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);

  return (
    <section
      id="what-is-sigma"
      className="relative z-10 scroll-mt-24 border-t border-white/[0.04] bg-[#0a0c12]/90 px-5 py-16 backdrop-blur-sm sm:px-6 sm:py-20 md:scroll-mt-28 md:px-16 md:py-24 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 mx-auto max-w-[90rem]">
        <p
          className={`sigma-hero-eyebrow mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(language)}`}
        >
          {t.whatIsSigma.label}
        </p>
        <h2
          className={`max-w-full font-display text-[clamp(1.125rem,4.2vw,1.5rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight sm:leading-tight md:text-4xl lg:max-w-4xl ${localeHeading(language)}`}
        >
          {t.whatIsSigma.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:leading-relaxed md:text-[#b6bcc4]">
          {t.whatIsSigma.description}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group rounded-md border border-white/[0.06] bg-white/[0.02] px-6 py-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#1c39bb]/22 hover:bg-white/[0.035] hover:shadow-[0_0_36px_rgba(28,57,187,0.09)]"
            >
              <h3
                className={`font-display text-sm font-semibold uppercase tracking-[0.06em] text-[#e9ecef] md:text-[15px] md:tracking-[0.12em] ${localeCardTitle(language)}`}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c8d0d8] md:text-[15px] md:text-[#aeb5bd]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <SectionDeepLink href={H.whatIsSigma.href} label={H.whatIsSigma.label} openInNewTab />
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);

  return (
    <section
      id="about"
      className="relative z-10 flex min-h-0 scroll-mt-24 items-center justify-center px-5 py-16 sm:min-h-[70svh] sm:px-6 sm:py-24 md:min-h-screen md:scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 mx-auto min-w-0 max-w-4xl px-1 text-center sm:px-0">
        <p
          className={`sigma-hero-eyebrow mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-8 sm:text-[11px] ${localeEyebrow(language)}`}
        >
          {t.about.kicker}
        </p>
        <AnimatedText
          text={t.about.title}
          as="h3"
          className={`justify-center font-display text-[clamp(1.05rem,3.8vw,1.35rem)] font-semibold uppercase leading-[1.2] tracking-normal text-white max-md:leading-[1.2] sm:text-3xl sm:leading-[1.1] sm:tracking-tight md:text-5xl lg:text-6xl ${localeHeading(language)}`}
        />
        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-[#cfd6de] sm:mt-10 sm:text-base md:text-lg md:text-[#b6bcc4]"
        >
          {t.about.description}
        </motion.p>
        <div className="mt-8 flex justify-center sm:mt-10">
          <SectionDeepLink href={H.about.href} label={H.about.label} openInNewTab />
        </div>
      </div>
    </section>
  );
};

const SERVICE_ICON_MAP: Record<ServiceIconId, LucideIcon> = {
  activity: Activity,
  shield: Shield,
  cpu: Cpu,
  code2: Code2,
};

const DEFAULT_SERVICE_ICONS: ServiceIconId[] = [
  "activity",
  "shield",
  "cpu",
  "code2",
];

const ServicesSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const services = t.services.cards.map((card, i) => {
    const iconId =
      card.icon ??
      DEFAULT_SERVICE_ICONS[Math.min(i, DEFAULT_SERVICE_ICONS.length - 1)]!;
    const Icon = SERVICE_ICON_MAP[iconId];
    return {
      title: card.title,
      icon: Icon,
      desc: card.description,
    };
  });

  return (
    <section
      id="capabilities"
      className="relative z-10 min-h-0 scroll-mt-24 bg-[#212529]/50 px-5 py-16 backdrop-blur-sm sm:px-6 sm:py-24 md:scroll-mt-28 md:px-16 md:py-28 lg:px-24"
    >
      <div className="mx-auto min-w-0 max-w-7xl">
        <div className="mb-10 min-w-0 max-w-full md:mb-16">
          <p
            className={`mb-2 text-xs font-bold tracking-[0.18em] text-[#1c39bb] sm:text-sm md:tracking-widest ${localeEyebrow(language)}`}
          >
            {t.services.sectionLabel}
          </p>
          <AnimatedText
            text={t.services.headline}
            mobileWordStack
            as="h2"
            className={`font-display w-full min-w-0 max-w-full text-[clamp(1.3rem,5.8vw,1.85rem)] font-semibold uppercase leading-snug tracking-normal text-balance sm:text-4xl md:text-5xl md:tracking-tight ${localeHeading(language)}`}
          />
        </div>

        <div
          className="grid min-w-0 grid-cols-1 auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 1, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="h-full min-w-0 w-full max-w-full"
            >
              <TiltCard {...service} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center md:mt-14">
          <SectionDeepLink href={H.capabilities.href} label={H.capabilities.label} openInNewTab />
        </div>
      </div>
    </section>
  );
};

const SigmaProSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const bullets = t.sigmaPro.bullets;
  return (
    <section
      id="sigmapro"
      className="relative z-10 scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16 md:scroll-mt-28 md:px-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px max-w-4xl -translate-y-1/2 bg-gradient-to-r from-transparent via-[#1c39bb]/35 to-transparent opacity-60" />
      <div className="relative mx-auto min-w-0 max-w-5xl">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#10131a]/95 via-[#0a0c12] to-[#07090f] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8 md:p-12 md:ps-14 md:pe-14"
        >
          <div className="pointer-events-none absolute -end-24 -top-28 h-72 w-72 rounded-full bg-[#1c39bb]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -start-16 h-56 w-56 rounded-full bg-[#bde0fe]/[0.06] blur-3xl" />
          <div className="relative">
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#bde0fe]/25 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#bde0fe] sm:text-[11px] ${localeNav(language)}`}
            >
              <Sparkles className="size-3.5 shrink-0 text-[#bde0fe]" strokeWidth={2} />
              {t.sigmaPro.badge}
            </div>
            <h2
              className={`max-w-full font-display text-[clamp(1.15rem,4vw,1.65rem)] font-semibold tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight md:text-4xl lg:text-[2.5rem] ${localeHeading(language)}`}
            >
              {t.sigmaPro.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:leading-relaxed md:text-[#b6bcc4]">
              {t.sigmaPro.description}
            </p>
            <ul className="mt-10 max-w-2xl space-y-5">
              {bullets.map((line, idx) => (
                <li
                  key={idx}
                  className="flex gap-3.5 text-[#e8eaed] md:gap-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-[#1c39bb]/50 bg-[#1c39bb]/15">
                    <Check className="size-3.5 text-[#bde0fe]" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed md:text-[15px] md:leading-[1.65]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[#a0a8b2] md:text-[13px] md:text-[#868e96]">
              {t.sigmaPro.footnote}
            </p>
            <div className="mt-8 flex justify-center">
              <SectionDeepLink href={H.sigmaPro.href} label={H.sigmaPro.label} openInNewTab />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function readPublicEnvString(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  return (process.env as Record<string, string | undefined>)[name];
}

const CONTACT_SOCIAL_ORDER: SocialPlatformKey[] = [
  "x",
  "instagram",
  "telegram",
  "linkedin",
  "youtube",
  "whatsapp",
  "discord",
  "tiktok",
];

const SOCIAL_ICON_MAP: Record<
  SocialPlatformKey,
  ComponentType<{ className?: string }>
> = {
  x: FaXTwitter,
  instagram: FaInstagram,
  telegram: FaTelegram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  discord: FaDiscord,
  tiktok: FaTiktok,
};

const ContactSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const raw = readPublicEnvString("NEXT_PUBLIC_SOCIAL_EMAIL")?.trim();
  const mailto =
    raw && raw.length > 0
      ? raw.startsWith("mailto:")
        ? raw
        : `mailto:${raw.replace(/^mailto:/i, "")}`
      : t.contact.fallbackMailto;

  const sc = t.stayConnected;

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-24 border-t border-white/[0.06] bg-gradient-to-b from-[#0d1016] via-[#0a0c12] to-[#080a0f] px-5 py-16 sm:px-6 sm:py-20 md:scroll-mt-28 md:px-16 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px max-w-3xl bg-gradient-to-r from-transparent via-[#1c39bb]/40 to-transparent opacity-80" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`sigma-hero-eyebrow mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(language)}`}
          >
            {sc.kicker}
          </p>
          <h3
            className={`max-w-full font-display text-[clamp(1.125rem,4vw,1.65rem)] font-semibold uppercase tracking-normal text-balance text-white sm:text-3xl sm:tracking-tight md:text-4xl ${localeHeading(language)}`}
          >
            {sc.title}
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:text-[#b6bcc4]">
            {sc.description}
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <SectionDeepLink href={H.contact.href} label={H.contact.label} openInNewTab />
            <SectionDeepLink href={H.faq.href} label={H.faq.label} openInNewTab />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-xs text-[#aeb6c1] sm:text-sm md:text-[#8f98a3]">
            {sc.reachUsPrefix}{" "}
            <a
              href={`mailto:${socialContactEmail}`}
              className="font-medium text-[#d4e8ff] underline-offset-4 hover:underline"
            >
              {socialContactEmail}
            </a>
          </p>
          <div className="mt-10 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:mx-auto sm:flex-row sm:items-center sm:gap-4">
            <a
              href={mailto}
              className={`inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/20 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(28,57,187,0.25)] transition-[background,box-shadow,transform] hover:bg-[#1c39bb]/40 hover:shadow-[0_12px_40px_rgba(28,57,187,0.35)] active:scale-[0.99] sm:w-auto sm:px-8 ${localeCta(language)}`}
            >
              <Mail className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {t.contact.emailCta}
            </a>
            <Link
              href="/contact"
              className={`inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#e9ecef] transition-[background,border-color] hover:border-[#bde0fe]/35 hover:bg-white/[0.07] active:scale-[0.99] sm:w-auto sm:px-8 ${localeCta(language)}`}
            >
              {t.contact.socialCta}
              <ArrowUpRight className="size-4 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
          {CONTACT_SOCIAL_ORDER.map((key) => {
            const Icon = SOCIAL_ICON_MAP[key];
            const href = socialLinks[key].trim();
            const enabled = href.length > 0;
            const cardClass =
              "group flex min-h-[76px] items-center gap-2.5 rounded-xl border px-3 py-3 transition-[transform,border-color,box-shadow,background-color] duration-250 " +
              (enabled
                ? "border-white/[0.1] bg-white/[0.03] text-[#e3edf8] hover:scale-[1.06] hover:border-[#6ea8ff]/50 hover:bg-[#1c39bb]/[0.14] hover:shadow-[0_0_28px_rgba(28,57,187,0.25)]"
                : "cursor-not-allowed border-white/[0.06] bg-white/[0.015] text-[#6f7884] opacity-55");

            const label = sc.socialLabels[key];
            const content = (
              <>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#bde0fe] transition-colors group-hover:text-white">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className={`text-xs font-medium ${localeSmallLabelTrack(language)}`}>
                  {label}
                </span>
              </>
            );

            if (!enabled) {
              return (
                <div key={key} className={cardClass} aria-disabled>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ t }: { t: SiteTranslations }) => {
  const { lang } = useLanguage();
  return (
    <section
      id="connect"
      className="relative z-10 flex min-h-[min(68dvh,560px)] scroll-mt-24 flex-col items-center justify-center overflow-x-clip bg-gradient-to-t from-[#0a0c12] to-transparent px-5 py-14 sm:min-h-[min(80dvh,720px)] sm:px-6 sm:py-16 md:min-h-screen md:scroll-mt-28"
    >
      <motion.div
        initial={{ opacity: 1, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="group max-w-[min(100%,42rem)] cursor-pointer px-2 text-center"
      >
        <p className="sigma-cta-wordmark max-w-full break-words text-[clamp(1.85rem,11vw,4rem)] font-bold uppercase leading-[1.05] tracking-normal transition-[background-image] duration-500 sm:text-7xl sm:leading-none sm:tracking-tighter md:text-9xl">
          {t.cta.title}
        </p>
        <div className="mx-auto mt-4 h-1 w-0 bg-[#1c39bb] transition-all duration-700 ease-in-out group-hover:w-full" />
        <p
          className={`mt-6 max-w-full break-words text-xs text-[#c5ccd4] transition-colors group-hover:text-[#bde0fe] sm:mt-8 sm:text-sm md:text-[#adb5bd] ${localeWideMutedTrack(lang)}`}
        >
          {t.cta.description}
        </p>
      </motion.div>
    </section>
  );
};

type GlassNavId =
  | "about"
  | "capabilities"
  | "network"
  | "metrics"
  | "sigmapro"
  | "contact"
  | "connect";

const SECTION_ORDER: GlassNavId[] = [
  "about",
  "capabilities",
  "network",
  "sigmapro",
  "contact",
  "connect",
];

const NAV_SCROLL_GAP = 112;
const NAV_CLICK_SCROLL_LOCK_MS = 900;

const Navbar = () => {
  const { t, lang: currentLang, setLang: setCurrentLang, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [glassActive, setGlassActive] = useState<GlassNavId | null>(null);
  const navClickScrollingRef = useRef(false);
  const navClickTimerRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const primaryNav: {
    id: Exclude<GlassNavId, "connect">;
    icon: typeof Mail;
    label: string;
  }[] = [
    { id: "about", icon: Info, label: t.nav.system },
    { id: "capabilities", icon: LayoutGrid, label: t.nav.capabilities },
    { id: "network", icon: Network, label: t.nav.network },
    { id: "sigmapro", icon: Sparkles, label: t.nav.sigmaPro },
    { id: "contact", icon: Mail, label: t.nav.contact },
  ];

  const syncActiveFromScroll = useCallback(() => {
    if (navClickScrollingRef.current) return;
    const hero = document.getElementById("hero");
    if (hero) {
      const heroTop =
        hero.getBoundingClientRect().top + window.scrollY;
      const heroH = hero.offsetHeight;
      if (window.scrollY < heroTop + heroH - NAV_SCROLL_GAP) {
        setGlassActive(null);
        return;
      }
    }
    let current: GlassNavId | null = null;
    for (const id of SECTION_ORDER) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY + NAV_SCROLL_GAP >= top - 4) {
        current = id;
      }
    }
    if (current === "connect") {
      setGlassActive(null);
      return;
    }
    setGlassActive(current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        syncActiveFromScroll();
      });
    };

    syncActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
      if (scrollRafRef.current != null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      if (navClickTimerRef.current != null) {
        window.clearTimeout(navClickTimerRef.current);
        navClickTimerRef.current = null;
      }
    };
  }, [syncActiveFromScroll, currentLang]);

  const beginNavClickScrollLock = () => {
    navClickScrollingRef.current = true;
    if (navClickTimerRef.current != null) {
      window.clearTimeout(navClickTimerRef.current);
    }
    navClickTimerRef.current = window.setTimeout(() => {
      navClickScrollingRef.current = false;
      navClickTimerRef.current = null;
      syncActiveFromScroll();
    }, NAV_CLICK_SCROLL_LOCK_MS);
  };

  const goToSection = (id: GlassNavId) => {
    beginNavClickScrollLock();
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (id !== "connect") {
      setGlassActive(id);
    } else {
      setGlassActive(null);
    }
  };

  const scrollToTop = () => {
    beginNavClickScrollLock();
    setMobileOpen(false);
    setGlassActive(null);
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        dir="ltr"
        className="sigma-nav-shell fixed inset-x-0 top-0 z-[10000] flex justify-center pt-2 md:pt-5"
        onClick={(e) => {
          if (e.target === e.currentTarget) scrollToTop();
        }}
      >
        <div className="relative flex h-[72px] min-w-0 w-[min(100%,calc(100vw-0.75rem))] max-w-[1440px] shrink-0 items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#07090f]/70 px-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:w-[calc(100%-1.25rem)] sm:gap-3 sm:px-3.5 md:gap-4 md:px-5 lg:gap-5 lg:px-6">
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="relative z-10 flex h-full min-w-0 shrink-0 cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-start transition-opacity hover:opacity-90"
            aria-label={t.ui.navChrome.brandAria}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center font-display text-[1.65rem] font-semibold leading-none tracking-tight text-white drop-shadow-[0_0_12px_rgba(189,224,254,0.2)] transition-transform duration-300 hover:scale-[1.02]">
              Σ
            </span>
            <span
              className={`hidden font-display text-lg font-semibold tracking-[0.12em] text-[#c5ccd3] sm:inline ${localeWordmarkNav(currentLang)}`}
            >
              SIGMA
            </span>
          </button>

          <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center lg:hidden">
            <div className="pointer-events-auto">
              <LanguageSwitcherButton
                currentLang={currentLang}
                setLang={setCurrentLang}
                ariaLabel={t.ui.navChrome.languageMenuAria}
                compactLabel={t.ui.languageSwitcherCompact[currentLang]}
              />
            </div>
          </div>

          <div className="relative z-0 hidden min-h-0 min-w-0 flex-1 justify-center overflow-x-auto overflow-y-visible px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex">
            <div
              className="inline-flex h-14 w-max flex-nowrap items-center gap-2 rounded-full border border-white/[0.06] bg-[#05070c]/50 px-3 shadow-[0_2px_12px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:gap-2.5 sm:px-3.5 md:gap-3 md:px-4 lg:gap-3.5"
              dir="ltr"
            >
              {primaryNav.map(({ id, icon: Icon, label }) => {
                const isActive = glassActive === id;
                const isPro = id === "sigmapro";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToSection(id)}
                    className={`relative isolate box-border inline-flex h-14 min-h-14 max-h-14 shrink-0 items-center overflow-visible rounded-full border text-start transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c39bb]/45 focus-visible:ring-offset-1 focus-visible:ring-offset-[#07090f] ${
                      isActive
                        ? "min-w-0 border-transparent text-white"
                        : isPro
                          ? "min-w-max border-white/[0.12] bg-white/[0.04] text-[#dce2e8] hover:border-[#1c39bb]/45 hover:bg-white/[0.055] hover:text-white hover:shadow-[0_0_22px_rgba(28,57,187,0.14)]"
                          : "min-w-0 border-transparent text-[#8b939e] hover:bg-white/[0.045] hover:text-[#e6e9ed]"
                    } `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="sigma-glass-nav-pill"
                        className="pointer-events-none absolute inset-0 z-0 rounded-full border border-transparent bg-[#1c39bb]/95 shadow-[0_1px_12px_rgba(28,57,187,0.32)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10 inline-flex h-full min-h-0 items-center gap-1.5 px-2.5 sm:gap-2 sm:px-3 md:px-3.5">
                      <Icon
                        className={`size-[15px] shrink-0 md:size-4 ${
                          isPro && !isActive
                            ? "text-[#bde0fe]/85"
                            : "text-current opacity-[0.92]"
                        }`}
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span
                        className={`max-w-[9.5rem] truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] text-current sm:max-w-none sm:text-[13px] sm:leading-none sm:tracking-[0.07em] md:text-[14px] md:tracking-[0.08em] xl:whitespace-nowrap ${localeNav(currentLang)} ${
                          isPro && !isActive ? "shrink-0 text-[#dce2e8]" : ""
                        }`}
                        title={label}
                      >
                        {label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
            <InsightsOuterLink
              className={`hidden h-12 max-w-[min(11rem,32vw)] shrink-0 items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.03] px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dce2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background,border-color,box-shadow] hover:border-[#1c39bb]/40 hover:bg-white/[0.055] hover:text-white md:inline-flex md:h-14 md:max-w-[min(200px,28vw)] md:gap-2 md:px-3.5 md:text-[11px] lg:px-4 lg:text-[12px] ${localeNav(currentLang)}`}
            >
              <Newspaper
                className="size-[15px] shrink-0 text-[#bde0fe]/80"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0 truncate">{t.nav.insights}</span>
              <ArrowUpRight
                className="size-3.5 shrink-0 opacity-55"
                strokeWidth={2}
                aria-hidden
              />
            </InsightsOuterLink>

            <button
              type="button"
              onClick={() => goToSection("connect")}
              className={`hidden h-12 min-h-12 shrink-0 items-center whitespace-nowrap rounded-full border border-[#1c39bb]/48 bg-[linear-gradient(180deg,rgba(28,57,187,0.26)_0%,rgba(28,57,187,0.09)_100%)] px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_22px_rgba(28,57,187,0.14)] transition-[background,box-shadow,border-color,transform] hover:border-[#2a4acd]/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_28px_rgba(28,57,187,0.22)] active:scale-[0.99] md:inline-flex md:h-14 md:min-h-14 md:px-5 md:text-[13px] ${localeCta(currentLang)}`}
            >
              {t.nav.navCta}
            </button>

            <div className="hidden shrink-0 lg:block">
              <LanguageSwitcherButton
                currentLang={currentLang}
                setLang={setCurrentLang}
                ariaLabel={t.ui.navChrome.languageMenuAria}
                compactLabel={t.ui.languageSwitcherCompact[currentLang]}
              />
            </div>

            <button
              type="button"
              className="inline-flex h-12 min-h-12 w-12 min-w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#e9ecef] transition-colors hover:border-white/18 hover:bg-white/[0.06] active:scale-[0.98] lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen ? t.ui.navChrome.closeMenuAria : t.ui.navChrome.openMenuAria
              }
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="size-[18px]" strokeWidth={2} />
              ) : (
                <Menu className="size-[18px]" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <SigmaMobileNavPanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        goToSection={goToSection}
        glassActive={glassActive}
        mobileNav={t.ui.mobileNavSheet}
        isRtl={isRtl}
        labels={{
          about: t.nav.system,
          capabilities: t.nav.capabilities,
          network: t.nav.network,
          sigmapro: t.nav.sigmaPro,
          contact: t.nav.contact,
        }}
        aboutLabel={pickLang(aboutPageMetaByLang, currentLang).title}
        teamLabel={pickLang(teamPageMetaByLang, currentLang).title}
        workWithSigmaLabel={t.nav.navCta}
      />
    </>
  );
};

export default function SigmaLanding() {
  const { t, lang: currentLang, isRtl } = useLanguage();
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <div className="sigma-landing-root">
      <GlobalStyles />
      <WebGLBackground />

      <main
        key={currentLang}
        className="relative z-10 min-w-0 max-w-[100vw] overflow-x-clip font-body selection:bg-[#1c39bb] selection:text-white"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <SeoHiddenImages lang={currentLang} />
        <div className="origin-top">
          <HeroSection t={t} isRtl={isRtl} />
        </div>

        <CryptoMarketingSection />

        <WhatIsSigmaSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <ProofLayer />
        <MidConversionCta isRtl={isRtl} lang={currentLang} />
        <SigmaProSection t={t} />
        <CTASection t={t} />
        <ContactSection t={t} />
        <FinalConversionCta
          isRtl={isRtl}
          lang={currentLang}
          onBookCall={() => setBookCallOpen(true)}
        />
      </main>

      <MarketingFooter />

      <LiveSupportButton label={t.ui.liveSupport} panel={t.ui.liveSupportPanel} />

      <BookCallModal
        open={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
        isRtl={isRtl}
        lang={currentLang}
      />

      <Navbar />
    </div>
  );
}
