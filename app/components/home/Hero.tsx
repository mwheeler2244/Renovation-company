"use client";
import React, { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CarouselItem } from "@/app/types";

interface HeroProps {
  carouselItems: CarouselItem[];
  isMobile: boolean;
}

const Hero: React.FC<HeroProps> = ({ carouselItems, isMobile }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handleCarouselAction = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    heroSection: {
      height: "100vh",
      position: "relative" as const,
      overflow: "hidden",
      marginTop: "-80px",
    } as CSSProperties,
    heroSlide: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
    } as CSSProperties,
    heroContent: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      right: 0,
      color: "#ffffff",
      textAlign: "left",
      padding: "3rem 5%",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    } as CSSProperties,
    heroTextContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "flex-end",
      gap: "2rem",
      maxWidth: "1300px",
      margin: "0 auto",
      width: "100%",
      padding: isMobile ? "0 1rem" : 0,
    } as CSSProperties,
    button: {
      backgroundColor: "var(--accent-color)",
      color: "white",
      border: "none",
      padding: ".5rem 1rem",
      fontSize: "1rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      alignSelf: "flex-start",
      cursor: "pointer",
      borderRadius: "0.375rem",
      transition: "all 0.3s ease",
    } as CSSProperties,
  };

  return (
    <section id="home" style={styles.heroSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            ...styles.heroSlide,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${carouselItems[currentSlide].image})`,
          }}
        >
          <div style={styles.heroContent}>
            <div style={styles.heroTextContainer}>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: isMobile ? "1.5rem" : "3rem",
                  fontWeight: "300",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                  flex: "0 0 auto",
                  maxWidth: "35%",
                }}
              >
                {carouselItems[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: isMobile ? ".75rem" : "1rem",
                  lineHeight: "1.6",
                  opacity: 0.9,
                  flex: "1",
                  paddingBottom: "0.5rem",
                }}
              >
                {carouselItems[currentSlide].description}
              </motion.p>
            </div>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleCarouselAction}
              style={styles.button}
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--accent-hover)",
              }}
            >
              {carouselItems[currentSlide].cta}
              <ArrowRight size={10} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: index === currentSlide ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "999px",
              backgroundColor:
                index === currentSlide
                  ? "var(--accent-color)"
                  : "rgba(255,255,255,0.5)",
              border: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
