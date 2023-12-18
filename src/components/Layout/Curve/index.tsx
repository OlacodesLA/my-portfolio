import { FC, ReactNode, useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { text, curve, translate } from "./anim";

interface LayoutProps {
  children: ReactNode;
}

// Routes for different pages
const routes = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
};

// Animation settings
const anim = (variants: Variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

// The Curve component
const Curve: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState<any>({
    width: null,
    height: null,
  });

  // Handle window resize event
  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="page curve">
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="background"
      />
      <motion.p className="route" {...anim(text)}>
        {routes[router.route as keyof typeof routes]}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions} />}
      {children}
    </div>
  );
};

// The SVG component
const SVG: FC<{ height: number; width: number }> = ({ height, width }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

export default Curve;
