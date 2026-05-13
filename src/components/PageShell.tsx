"use client";

import { useReveal, useParallax } from "./hooks";
import BackgroundLayer from "./BackgroundLayer";
import TopNav from "./TopNav";
import Hero from "./Hero";
import Gallery from "./Gallery";
import About from "./About";
import Awards from "./Awards";
import Contact from "./Contact";
import SparkleClick from "./SparkleClick";

export default function PageShell() {
  useReveal();
  const parallax = useParallax();

  return (
    <>
      <SparkleClick />
      <div className="bg-canvas" />
      <div className="bg-grain" />
      <BackgroundLayer parallax={parallax} />
      <TopNav />
      <Hero parallax={parallax} />
      <Gallery />
      <About />
      <Awards />
      <Contact />
    </>
  );
}
