import "@/styles/globals.css";
import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div className="main">
      <div className="fixed w-full flex justify-between items-center top-0 left-0 h-12 p-12">
        <div className="">&lt;Olacodes/&gt;</div>
        <div className="header">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}
