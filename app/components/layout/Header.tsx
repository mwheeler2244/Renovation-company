"use client";
import React, { useState } from "react";
import { ShowerHead, Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const styles = {
    header: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      padding: "1.5rem",
      backgroundColor: isScrolled ? "var(--bg-primary)" : "transparent",
      zIndex: 50,
      transition: "all 0.3s ease",
      boxShadow: isScrolled ? "var(--shadow)" : "none",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1300px",
      margin: "0 auto",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      gap: "2rem",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    },
    transparentButton: {
      backgroundColor: "transparent",
      color: isScrolled ? "var(--text-primary)" : "#ffffff",
      padding: 0,
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "none",
    },
    transparentButtonHover: {
      color: "#949494",
      transform: "translateX(4px)",
    },
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              ...styles.transparentButton,
              display: isMobile ? "block" : "none",
            }}
          >
            <Menu />
          </button>
          <ShowerHead />
          <span style={{ fontWeight: "300" }}>SaniWare</span>
        </div>

        <div style={styles.navLinks}>
          {["home", "products", "services", "contact"].map((section) => (
            <button
              key={section}
              onMouseEnter={() => setHoveredButton(section)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => scrollToSection(section)}
              style={{
                ...styles.transparentButton,
                ...(hoveredButton === section && styles.transparentButtonHover),
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ gap: "1rem", alignItems: "center" }}>
          <button
            onClick={toggleTheme}
            style={{
              ...styles.transparentButton,
              display: !isMobile ? "block" : "none",
            }}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 49,
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "tween" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "var(--bg-primary)",
          padding: "2rem",
          width: "80%",
          maxWidth: "300px",
          zIndex: 50,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShowerHead />
            <span style={{ fontWeight: "600" }}>SaniWare</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            <X />
          </button>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {["home", "products", "services", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                ...styles.transparentButton,
                fontSize: "1.25rem",
                padding: "0.5rem 0",
                color: "var(--text-primary)",
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            padding: "2rem 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              ...styles.transparentButton,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-primary)",
            }}
          >
            {theme === "light" ? (
              <>
                <Moon size={20} /> Dark Mode
              </>
            ) : (
              <>
                <Sun size={20} /> Light Mode
              </>
            )}
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
