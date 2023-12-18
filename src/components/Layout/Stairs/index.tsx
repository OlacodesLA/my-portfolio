import { FC, ReactNode } from "react";
import { Variants, motion } from "framer-motion";
import { opacity, expand } from "./anim";

interface LayoutProps {
  children: ReactNode;
  backgroundColor: string;
}

const Layout: FC<LayoutProps> = ({ children, backgroundColor }) => {
  const anim = (variants: Variants, custom: number | null = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;
  return (
    <div className="page stairs" style={{ backgroundColor }}>
      <motion.div {...anim(opacity)} className="transition-background" />
      <div className="transition-container">
        {[...Array(nbOfColumns)].map((_, i: number) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>
      {children}
    </div>
  );
};

export default Layout;
