import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { slide, opacity, perspective } from "./anim";
import { Variants } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

// Animation settings
const anim = (variants: Variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="inner">
      <motion.div className="slide" {...anim(slide)} />
      <motion.div className="page" {...anim(perspective)}>
        <motion.div {...anim(opacity)}>
          <div className="header">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Layout;
