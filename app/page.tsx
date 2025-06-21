"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShowerHead,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Send,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Menu,
  ArrowRight,
} from "lucide-react";

import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const products = [
  {
    id: 1,
    name: "Modern Basin Faucet",
    description:
      "Sleek stainless steel single-handle basin faucet with a brushed nickel finish.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1595515107258-ce1e4ea1ba59?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "bathroom",
    badge: "Best Seller",
    details:
      "Premium quality basin faucet featuring ceramic disc cartridge, easy installation, and water-saving aerator. Comes with a 5-year warranty.",
    specifications: [
      "Material: Stainless Steel 304",
      "Finish: Brushed Nickel",
      "Flow Rate: 1.2 GPM",
      "Installation: Single Hole",
      "Handle Type: Single Lever",
    ],
  },
  {
    id: 2,
    name: "Kitchen Countertop",
    description:
      "Complete countertop system for all your needs, includes a countertop and backsplash.",
    price: 199.99,
    imageUrl:
      "https://i.pinimg.com/736x/90/10/95/901095d180d68748ad270eab69b5ac95.jpg",
    category: "bathroom",
    badge: "New",
    details:
      "Complete countertop system for all your needs, includes a countertop and backsplash.",
    specifications: [
      "Material: Marble",
      "Finish: White",
      "Size: 120x60 inches",
      "Mounting: Wall-mounted",
      "Includes: Countertop and Backsplash",
    ],
  },
  {
    id: 3,
    name: "Kitchen Sink Mixer",
    description:
      "Pull-down kitchen faucet with dual spray function. Has spot resistant finish and easy installation system.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1641501064862-7926f3999416?q=80&w=2505&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "kitchen",
    details:
      "Modern kitchen faucet with pull-down sprayer and dual function mode. Features spot-resistant finish and easy installation system.",
    specifications: [
      "Material: Brass",
      "Finish: Spot Resistant Stainless",
      "Spray Modes: 2",
      "Mount Type: Deck Mount",
      "Spout Height: 15.5 inches",
    ],
  },
  {
    id: 4,
    name: "Modern Bathroom Vanity",
    description: "Contemporary bathroom vanity with integrated LED lighting.",
    price: 899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1621215065447-28744f6b9e87?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "bathroom",
    details:
      "Modern bathroom vanity featuring integrated LED lighting, soft-close drawers, and premium materials.",
    specifications: [
      "Material: Solid Wood & Glass",
      "Finish: Matte Black",
      "Size: 48 inches",
      "Storage: 4 drawers",
      "Lighting: LED integrated",
    ],
  },
  {
    id: 5,
    name: "Wall-Mounted Shower Set",
    description:
      "Premium wall-mounted storage solution with minimalist design.",
    price: 599.99,
    imageUrl:
      "https://i.pinimg.com/736x/6a/27/a5/6a27a5d9c8698394d69edba6710672d2.jpg",
    category: "storage",
    details:
      "Wall-mounted storage system with adjustable shelving and hidden mounting hardware.",
    specifications: [
      "Material: Aluminum & Glass",
      "Finish: Brushed Steel",
      "Mounting: Wall-mounted",
      "Adjustable Shelves: Yes",
      "Max Weight: 100 lbs",
    ],
  },
  {
    id: 6,
    name: "Nirnia",
    description: "Modular shelving system with customizable configuration.",
    price: 449.99,
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "storage",
    details:
      "Versatile modular shelving system that can be configured in multiple ways to suit your space.",
    specifications: [
      "Material: Steel & Wood",
      "Finish: Natural Oak & Black",
      "Assembly: Tool-free",
      "Modules: 6 pieces",
      "Weight Capacity: 50 lbs per shelf",
    ],
  },
];

const services = [
  {
    id: 1,
    title: "Professional Installation",
    description:
      "Expert installation services by certified technicians ensuring perfect fit and functionality.",
    iconName: "Hammer",
    color: "#FF6B6B",
    benefits: [
      "Certified technicians",
      "Warranty coverage",
      "Quality assurance",
      "Post-installation support",
    ],
  },
  {
    id: 2,
    title: "Maintenance & Repair",
    description:
      "Comprehensive maintenance and repair services to keep your fixtures in perfect condition.",
    iconName: "PenTool",
    color: "#4ECDC4",
    benefits: [
      "24/7 emergency service",
      "Preventive maintenance",
      "Genuine spare parts",
      "Expert diagnostics",
    ],
  },
  {
    id: 3,
    title: "Design Consultation",
    description:
      "Professional design advice to help you create your dream space with us very soon in the city.",
    iconName: "Droplets",
    color: "#45B7D1",
    benefits: [
      "3D visualization",
      "Material selection",
      "Color coordination",
      "Budget planning",
    ],
  },
  {
    id: 4,
    title: "Custom Solutions",
    description:
      "Tailored solutions designed to meet unique requirements and challenging spaces for complete satisfaction.",
    iconName: "Settings",
    color: "#FFD166",
    benefits: [
      "Personalized approach",
      "Space optimization",
      "Innovative materials",
      "Sustainable options",
    ],
  },
];

const carouselItems = [
  {
    id: 1,
    title: "Premium Bathroom Fixtures",
    description:
      "Discover our collection of luxury bathroom fixtures that combine style and functionality",
    image:
      "https://plus.unsplash.com/premium_photo-1661901403017-33d1c0252ac9?q=80&w=3081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Explore Collection",
  },
  {
    id: 2,
    title: "Modern Kitchen Solutions",
    description:
      "Transform your kitchen with our contemporary fixtures and accessories",
    image: "https://images.pexels.com/photos/6312072/pexels-photo-6312072.jpeg",
    cta: "View Kitchen Range",
  },
  {
    id: 3,
    title: "Professional Installation",
    description: "Expert installation services by certified professionals",
    image:
      "https://images.unsplash.com/photo-1696986681436-f5ee12981bc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Learn More",
  },
];

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const subscribeForm = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleProductView = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
  };

  const handleEnquire = () => {
    setSelectedProduct(null);
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
    form.setValue("subject", "Product Inquiry");
  };

  const onSubmit = () => {
    if (form.formState.isValid) {
      toast.success(
        "Message sent successfully! We&apos;ll get back to you soon."
      );
      form.reset();
    }
  };

  const handleCarouselAction = () => {
    scrollToSection("products");
  };
  const handleWishlist = () => {
    toast.info("Added to wishlist");
  };

  const onSubscribe = () => {
    toast.success("Subscribed successfully!");
    subscribeForm.reset();
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const themeStyles = {
      light: {
        "--bg-primary": "#ffffff",
        "--bg-secondary": "#f8f9fa",
        "--text-primary": "#1a1a1a",
        "--text-secondary": "#6c757d",
        "--accent-color": "#00483e",
        "--accent-hover": "#00483e",
        "--border-color": "#dee2e6",
        "--card-bg": "#ffffff",
        "--input-bg": "#ffffff",
        "--shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      dark: {
        "--bg-primary": "#1a1a1a",
        "--bg-secondary": "#2d2d2d",
        "--text-primary": "#ffffff",
        "--text-secondary": "#ced4da",
        "--accent-color": "#00483e",
        "--accent-hover": "#00483e",
        "--border-color": "#404040",
        "--card-bg": "#2d2d2d",
        "--input-bg": "#333333",
        "--shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
      },
    };

    const root = document.documentElement;
    Object.entries(themeStyles[theme as keyof typeof themeStyles]).forEach(
      ([property, value]) => {
        root.style.setProperty(property, value as string);
      }
    );
  }, [theme]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "var(--bg-primary)",
      color: "var(--text-primary)",
      transition: "all 0.3s ease",
    } as React.CSSProperties,

    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      padding: "1.5rem",
      backgroundColor: isScrolled ? "var(--bg-primary)" : "transparent",
      zIndex: 50,
      transition: "all 0.3s ease",
      boxShadow: isScrolled ? "var(--shadow)" : "none",
    } as React.CSSProperties,

    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1300px",
      margin: "0 auto",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    } as React.CSSProperties,

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    } as React.CSSProperties,

    navLinks: {
      display: isMobile ? "none" : "flex",
      gap: "2rem",
      color: isScrolled ? "var(--accent-color)" : "#ffffff",
    } as React.CSSProperties,

    mobileMenu: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: "var(--bg-primary)",
      padding: "2rem",
      transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.3s ease",
      zIndex: 51,
      width: "80%",
      maxWidth: "300px",
      boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
    } as React.CSSProperties,

    mobileMenuOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      opacity: isMenuOpen ? 1 : 0,
      visibility: isMenuOpen ? "visible" : "hidden",
      transition: "opacity 0.3s ease, visibility 0.3s ease",
      zIndex: 50,
    } as React.CSSProperties,

    grid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      padding: "2rem 0",
    } as React.CSSProperties,

    heroTextContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "flex-end",
      gap: "2rem",
      maxWidth: "1300px",
      margin: "0 auto",
      width: "100%",
      padding: isMobile ? "0 1rem" : 0,
    } as React.CSSProperties,

    section: {
      padding: "4rem 1rem",
      maxWidth: "1300px",
      margin: "0 auto",
    } as React.CSSProperties,

    card: {
      backgroundColor: "var(--card-bg)",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      boxShadow: "var(--shadow)",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid var(--border-color)",
      backgroundColor: "var(--input-bg)",
      color: "var(--text-primary)",
      marginBottom: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid var(--border-color)",
      backgroundColor: "var(--input-bg)",
      color: "var(--text-primary)",
      marginBottom: "1rem",
      minHeight: "150px",
    },
    footer: {
      backgroundColor: "var(--bg-secondary)",
      padding: "4rem 1rem",
      marginTop: "4rem",
    },
    modal: {
      position: "fixed" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--card-bg)",
      padding: "2rem",
      borderRadius: "0.5rem",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      zIndex: 100,
    },
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 99,
    },

    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      backgroundColor: "var(--accent-color)",
      color: "#ffffff",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    } as React.CSSProperties,

    transparentButton: {
      backgroundColor: "transparent",
      color: isScrolled ? "var(--text-primary)" : "#ffffff",
      padding: 0,
      transition: "all 0.3s ease",
      cursor: "pointer",
    } as React.CSSProperties,

    transparentButtonHover: {
      color: "#949494",
      transform: "translateX(4px)",
    } as React.CSSProperties,

    socialButton: {
      backgroundColor: "transparent",
      color: "var(--text-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    } as React.CSSProperties,

    socialButtonHover: {
      color: "var(--accent-color)",
      transform: "translateY(-2px)",
    } as React.CSSProperties,

    outlineButton: {
      backgroundColor: "transparent",
      border: "2px solid var(--accent-color)",
      color: "var(--accent-color)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    } as React.CSSProperties,

    outlineButtonHover: {
      backgroundColor: "var(--accent-color)",
      color: "#ffffff",
    } as React.CSSProperties,

    mobileMenuButton: {
      display: isMobile ? "block" : "none",
      cursor: "pointer",
    } as React.CSSProperties,

    heroSection: {
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      marginTop: "-80px",
    } as React.CSSProperties,

    heroSlide: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
    } as React.CSSProperties,

    heroContent: {
      position: "absolute",
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
    } as React.CSSProperties,
  };

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [testimonialPage, setTestimonialPage] = useState(0);

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-progress-bar {
          animation: progress 5s linear forwards;
        }
      `}</style>

      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                color: isScrolled ? "var(--text-primary)" : "#ffffff",
                display: isMobile ? "block" : "none",
                transition: "color 0.3s ease",
              }}
            >
              <Menu />
            </button>
            <ShowerHead />
            <span style={{ fontWeight: "300" }}>SaniWare</span>
          </div>

          <div style={styles.navLinks}>
            <button
              onMouseEnter={() => setHoveredButton("home")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => scrollToSection("home")}
              style={{
                ...styles.transparentButton,
                ...(hoveredButton === "home" && styles.transparentButtonHover),
              }}
            >
              Home
            </button>
            <button
              onMouseEnter={() => setHoveredButton("products")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => scrollToSection("products")}
              style={{
                ...styles.transparentButton,
                ...(hoveredButton === "products" &&
                  styles.transparentButtonHover),
              }}
            >
              Products
            </button>
            <button
              onMouseEnter={() => setHoveredButton("services")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => scrollToSection("services")}
              style={{
                ...styles.transparentButton,
                ...(hoveredButton === "services" &&
                  styles.transparentButtonHover),
              }}
            >
              Services
            </button>
            <button
              onMouseEnter={() => setHoveredButton("contact")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => scrollToSection("contact")}
              style={{
                ...styles.transparentButton,
                ...(hoveredButton === "contact" &&
                  styles.transparentButtonHover),
              }}
            >
              Contact Us
            </button>
          </div>

          <div style={{ gap: "1rem", alignItems: "center" }}>
            <button
              onClick={toggleTheme}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                color: isScrolled ? "var(--text-primary)" : "#ffffff",
                display: !isMobile ? "block" : "none",
              }}
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div
            style={styles.mobileMenuOverlay as React.CSSProperties}
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div style={styles.mobileMenu}>
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              right: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ShowerHead />
              <span
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                SaniWare
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              <X />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginTop: "4rem",
            }}
          >
            <button
              onClick={() => scrollToSection("home")}
              style={{
                ...styles.transparentButton,
                fontSize: "1.25rem",
                padding: "0.5rem 0",
                color: "var(--text-primary)",
              }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("products")}
              style={{
                ...styles.transparentButton,
                fontSize: "1.25rem",
                padding: "0.5rem 0",
                color: "var(--text-primary)",
              }}
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("services")}
              style={{
                ...styles.transparentButton,
                fontSize: "1.25rem",
                padding: "0.5rem 0",
                color: "var(--text-primary)",
              }}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              style={{
                ...styles.transparentButton,
                fontSize: "1.25rem",
                padding: "0.5rem 0",
                color: "var(--text-primary)",
              }}
            >
              Contact Us
            </button>
          </div>

          <div
            style={{
              marginTop: "auto",
              padding: "2rem 0",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={toggleTheme}
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
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
        </div>
      </header>

      <main>
        <section id="home" style={styles.heroSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                ...(styles.heroSlide as React.CSSProperties),
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${carouselItems[currentSlide].image})`,
              }}
            >
              <div style={styles.heroContent as React.CSSProperties}>
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
                  style={{
                    ...styles.button,
                    padding: ".5rem 1rem",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    alignSelf: "flex-start",
                  }}
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

        <section
          id="products"
          style={{ ...styles.section, maxWidth: "1300px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              marginBottom: "2rem",
              gap: isMobile ? "1rem" : "2rem",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.5rem",
                fontWeight: "600",
              }}
            >
              Explore Our Collection
            </h2>
            <p
              style={{
                maxWidth: isMobile ? "100%" : "400px",
                textAlign: isMobile ? "left" : "right",
                color: "var(--text-secondary)",
              }}
            >
              SaniWare will showcase its vision of contemporary architecture,
              interior design trends, and innovative living at Salone del Mobile
              Milano 2024.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
              gridTemplateRows: isMobile ? "repeat(5, auto)" : "auto auto",
              gap: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1" : "span 4",
                borderRadius: "0.5rem",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                minHeight: isMobile ? "300px" : "auto",
              }}
              onClick={() => handleProductView(products[0])}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: isMobile ? "0" : "100%",
                  height: isMobile ? "300px" : "auto",
                  position: isMobile ? "relative" : "static",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src={products[0].imageUrl}
                  alt={products[0].name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "1rem" : "1.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Modern Basin Faucet
                  </h3>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "absolute",
                      right: isMobile ? "1rem" : "1.5rem",
                      bottom: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1" : "5 / span 4",
                gridRow: isMobile ? "auto" : "1 / span 2",
                borderRadius: "0.5rem",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                minHeight: isMobile ? "300px" : "auto",
              }}
              onClick={() => handleProductView(products[1])}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: isMobile ? "0" : "200%",
                  height: isMobile ? "300px" : "auto",
                  position: isMobile ? "relative" : "static",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src={products[1].imageUrl}
                  alt={products[1].name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "1rem" : "1.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Kitchen Countertop
                  </h3>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "absolute",
                      right: isMobile ? "1rem" : "1.5rem",
                      bottom: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1" : "9 / span 4",
                borderRadius: "0.5rem",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                minHeight: isMobile ? "300px" : "auto",
              }}
              onClick={() => handleProductView(products[2])}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: isMobile ? "0" : "100%",
                  height: isMobile ? "300px" : "auto",
                  position: isMobile ? "relative" : "static",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src={products[2].imageUrl}
                  alt={products[2].name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "1rem" : "1.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Kitchen Sink Mixer
                  </h3>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "absolute",
                      right: isMobile ? "1rem" : "1.5rem",
                      bottom: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1" : "1 / span 4",
                gridRow: isMobile ? "auto" : "2",
                borderRadius: "0.5rem",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                minHeight: isMobile ? "300px" : "auto",
              }}
              onClick={() => handleProductView(products[3])}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: isMobile ? "0" : "100%",
                  height: isMobile ? "300px" : "auto",
                  position: isMobile ? "relative" : "static",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src={products[3].imageUrl}
                  alt={products[3].name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "1rem" : "1.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Modern Bathroom Vanity
                  </h3>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "absolute",
                      right: isMobile ? "1rem" : "1.5rem",
                      bottom: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1" : "9 / span 4",
                gridRow: isMobile ? "auto" : "2",
                borderRadius: "0.5rem",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                minHeight: isMobile ? "300px" : "auto",
              }}
              onClick={() => handleProductView(products[4])}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: isMobile ? "0" : "100%",
                  height: isMobile ? "300px" : "auto",
                  position: isMobile ? "relative" : "static",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Image
                  src={products[4].imageUrl}
                  alt={products[4].name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "1rem" : "1.5rem",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.25rem" : "1.5rem",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Wall-Mounted Shower Set
                  </h3>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "absolute",
                      right: isMobile ? "1rem" : "1.5rem",
                      bottom: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="services"
          style={{ ...styles.section, maxWidth: "1300px", margin: "0 auto" }}
        >
          <div style={{ marginBottom: isMobile ? "2rem" : "3rem" }}>
            <h4
              style={{
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: "0.75rem",
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            >
              Services
            </h4>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.5rem",
                marginBottom: isMobile ? "1rem" : "1.5rem",
                lineHeight: "1.2",
              }}
            >
              Design that Colors
              <br />
              Your Home
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                maxWidth: isMobile ? "100%" : "400px",
                marginBottom: isMobile ? "1.5rem" : "2rem",
                fontSize: isMobile ? "0.875rem" : "1rem",
                lineHeight: "1.6",
              }}
            >
              We build your home with the best materials and the latest
              technology
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "2rem" : "3rem",
              alignItems: "start",
            }}
          >
            <div
              style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                height: isMobile ? "300px" : "550px",
                width: "100%",
              }}
            >
              <Image
                src="https://i.pinimg.com/736x/22/c7/13/22c7130e43375ad4126fa945c234c20a.jpg"
                alt="kitchen"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "1.5rem" : "2rem",
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  style={{
                    borderBottom:
                      !isMobile && index < 2
                        ? "1px solid var(--border-color)"
                        : "none",
                    paddingBottom: !isMobile && index < 2 ? "2rem" : 0,
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.125rem" : "1.25rem",
                      marginBottom: isMobile ? "0.5rem" : "0.75rem",
                      fontWeight: "300",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: isMobile ? "1rem" : "1.5rem",
                      fontSize: isMobile ? "0.875rem" : "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {service.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <a
                      href="#contact"
                      className="learn-more-link hover:scale-105"
                      style={{
                        fontWeight: "300",
                        transition: "all 0.3s ease",
                        fontSize: isMobile ? "0.875rem" : "1rem",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </a>
                    <div
                      style={{
                        backgroundColor: "var(--accent-color)",
                        width: isMobile ? "24px" : "28px",
                        height: isMobile ? "24px" : "28px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight
                        size={isMobile ? 14 : 16}
                        style={{ color: "white" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{ padding: "4rem 1rem", position: "relative" as const }}
        >
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              <p
                style={{
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                THOUSANDS TRUST FAIRSTONE
              </p>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                }}
              >
                Don&apos;t take our word for it,
                <br />
                see what our clients say
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  maxWidth: "700px",

                  lineHeight: "1.6",
                  textAlign: "left",
                }}
              >
                We&apos;re honored by the feedback, and it fuels our commitment
                to delivering exceptional financial services. Read the reviews
                to hear firsthand how Fairstone is making a positive impact on
                people&apos;s lives. Your trust is our greatest achievement.
              </p>
            </div>

            {(() => {
              const testimonialData = [
                [
                  {
                    text: "A thorough report was done on our financial situation of what insurance covers etc existing. Better deals were found. These were processed on our behalf, which took a lot of stress away. Updates were given as required and outstanding responses chased after.",
                    name: "Jeannie Grant",
                    date: "June 01, 2023",
                  },
                  {
                    text: "I have been a client of Fairstone for 8 years now and have always found the advice provided by Ernie Brown excellent. Ernie always takes the time to explain things really clearly to me and ensures I understand and am well informed and therefore able to make appropriate decisions.",
                    name: "Derval Russell",
                    date: "November 09, 2023",
                  },
                  {
                    text: "Claire has been outstanding in her care and management of our portfolio. Every contact, every meeting, every phone conversation is conducted at a very high level. Her professionalism is highly appreciated and her decisions are always right on target. We couldn&apos;t ask for more.",
                    name: "Sophie Turner",
                    date: "October 15, 2023",
                  },
                ],
                [
                  {
                    text: "I&apos;ve been with Fairstone for over 5 years now. Their financial advice has helped me secure my retirement and plan for the future. The team always puts my needs first.",
                    name: "Robert Johnson",
                    date: "April 22, 2023",
                  },
                  {
                    text: "The attention to detail that Fairstone provides is phenomenal. They took the time to understand my complex financial situation and provided tailored solutions that have significantly improved my portfolio.",
                    name: "Mary Williams",
                    date: "September 14, 2023",
                  },
                  {
                    text: "Working with Fairstone has been a game-changer for my business. Their strategic advice helped us navigate a challenging financial period with confidence and success.",
                    name: "David Chen",
                    date: "July 30, 2023",
                  },
                ],
                [
                  {
                    text: "Fairstone's team consistently delivers honest, transparent advice. I appreciate how they explain complex concepts in simple terms, making me feel empowered in my financial decisions.",
                    name: "Emma Thompson",
                    date: "March 17, 2023",
                  },
                  {
                    text: "After working with several financial advisors over the years, I can confidently say that Fairstone provides the most comprehensive and personalized service I&apos;ve experienced.",
                    name: "Michael Garcia",
                    date: "August 05, 2023",
                  },
                  {
                    text: "The proactive approach of Fairstone&apos;s advisors has saved me from potential financial pitfalls multiple times. They don&apos;t just react to problems - they anticipate and prevent them.",
                    name: "Sarah Patel",
                    date: "December 03, 2023",
                  },
                ],
              ];

              const totalPages = testimonialData.length;

              const goToPrevTestimonialPage = () => {
                setTestimonialPage((prev) =>
                  prev === 0 ? totalPages - 1 : prev - 1
                );
              };

              const goToNextTestimonialPage = () => {
                setTestimonialPage((prev) =>
                  prev === totalPages - 1 ? 0 : prev + 1
                );
              };

              const currentTestimonials = testimonialData[testimonialPage];

              return (
                <>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      marginTop: "3rem",
                      minHeight: "320px",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`testimonial-page-${testimonialPage}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          display: "grid",
                          gridTemplateColumns: isMobile
                            ? "1fr"
                            : "repeat(3, 1fr)",
                          gap: "1.5rem",
                        }}
                      >
                        {currentTestimonials.map((testimonial, index) => (
                          <motion.div
                            key={`testimonial-${testimonialPage}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              borderRadius: "0.5rem",
                              padding: "2rem",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div style={{ marginBottom: "1rem" }}>
                              <div
                                style={{
                                  display: "flex",
                                  marginBottom: "1rem",
                                }}
                              >
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      size={20}
                                      style={{
                                        color: "var(--accent-color)",
                                        fill: "var(--accent-color)",
                                        strokeWidth: 0,
                                      }}
                                    />
                                  ))}
                              </div>
                              <p
                                style={{
                                  fontSize: "1rem",
                                  lineHeight: "1.6",
                                  color: "var(--text-primary)",
                                  marginBottom: "1.5rem",
                                }}
                              >
                                {testimonial.text}
                              </p>
                            </div>
                            <div style={{ marginTop: "auto" }}>
                              <p
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "0.25rem",
                                }}
                              >
                                {testimonial.name}
                              </p>
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {testimonial.date}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "3rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginRight: isMobile ? "0" : "2rem",
                        marginBottom: isMobile ? "1.5rem" : "0",
                      }}
                    >
                      {Array(totalPages)
                        .fill(null)
                        .map((_, i) => (
                          <motion.button
                            key={`page-${i}`}
                            onClick={() => setTestimonialPage(i)}
                            whileHover={{ scale: 1.2 }}
                            style={{
                              width: testimonialPage === i ? "2rem" : "0.5rem",
                              height: "0.5rem",
                              borderRadius: "9999px",
                              backgroundColor:
                                testimonialPage === i
                                  ? "var(--accent-color)"
                                  : "var(--border-color)",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                            }}
                            aria-label={`Go to testimonial page ${i + 1}`}
                          />
                        ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Image
                        src="https://www.trustpilot.com/favicon.ico"
                        alt="Trustpilot logo"
                        width={24}
                        height={24}
                        style={{
                          color: "var(--accent-color)",
                        }}
                      />
                      <p>Trustpilot</p>
                      <div style={{ display: "flex", marginBottom: "0.25rem" }}>
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              style={{
                                color: "white",
                                fill: "white",
                                strokeWidth: 0,
                                padding: "0.25rem",
                                backgroundColor: "var(--accent-color)",
                                marginLeft: "0.25rem",
                              }}
                            />
                          ))}
                      </div>
                      <span
                        style={{
                          fontWeight: "600",
                          marginLeft: "0.5rem",
                        }}
                      >
                        Excellent
                      </span>
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        4.9 Rating based on 7,772 reviews
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginLeft: "auto",
                        gap: "1rem",
                      }}
                    >
                      <motion.button
                        onClick={goToPrevTestimonialPage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid var(--border-color)",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ChevronLeft size={16} />
                      </motion.button>
                      <motion.button
                        onClick={goToNextTestimonialPage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Next"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid var(--border-color)",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ChevronRight size={16} />
                      </motion.button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        <section
          id="contact"
          style={{
            backgroundColor: "var(--card-bg)",
            padding: 0,
            margin: "0 auto",
            maxWidth: "1300px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            maxHeight: isMobile ? "none" : "800px",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: isMobile ? "2rem 1.5rem" : "1.5rem",
              display: "flex",
              flexDirection: "column",
              maxWidth: isMobile ? "100%" : "50%",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.75rem" : "2rem",
                marginBottom: "1rem",
                fontWeight: "700",
              }}
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Let&apos;s work together
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                lineHeight: "1.5",
              }}
            >
              We&apos;d love to hear from you! Send us a message using the form
              opposite, or email us.
            </p>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontWeight: "500",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    First name
                  </label>
                  <input
                    placeholder=""
                    required
                    style={{
                      ...styles.input,
                      marginBottom: "0.5rem",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontWeight: "500",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    Last name
                  </label>
                  <input
                    placeholder=""
                    required
                    style={{
                      ...styles.input,
                      marginBottom: "0.25rem",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Email
                </label>
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder=""
                  required
                  style={{
                    ...styles.input,
                    marginBottom: "0.5rem",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #e5e7eb",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Phone
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    {...form.register("phone")}
                    placeholder=""
                    required
                    style={{
                      ...styles.input,
                      marginBottom: "0.5rem",
                      padding: "0.75rem",
                      borderRadius: "0.25rem",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  How can we help you?
                </label>
                <textarea
                  {...form.register("message")}
                  placeholder=""
                  style={{
                    ...styles.textarea,
                    marginBottom: "0.5rem",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #e5e7eb",
                    minHeight: "80px",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    Max. 500 characters
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Expected budget
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      id="budget1"
                      name="budget"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        accentColor: "var(--accent-color)",
                      }}
                    />
                    <label htmlFor="budget1">Less than $25K</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      id="budget2"
                      name="budget"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        accentColor: "var(--accent-color)",
                      }}
                    />
                    <label htmlFor="budget2">$25K - $50K</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      id="budget3"
                      name="budget"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        accentColor: "var(--accent-color)",
                      }}
                    />
                    <label htmlFor="budget3">$50K - $100K</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      id="budget4"
                      name="budget"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        accentColor: "var(--accent-color)",
                      }}
                    />
                    <label htmlFor="budget4">$100K +</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setHoveredButton("submit")}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  backgroundColor:
                    hoveredButton === "submit"
                      ? "darkgreen"
                      : "var(--accent-color)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: isMobile ? "0" : "auto",
                  width: isMobile ? "100%" : "auto",
                  display: "block",
                  transition: "background-color 0.3s ease",
                }}
              >
                Submit
              </button>
            </form>
          </div>

          <div
            style={{
              flex: 1,
              backgroundImage: `url("https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=3059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: isMobile ? "300px" : "auto",
              minHeight: isMobile ? "300px" : "unset",
            }}
          />
        </section>

        <footer
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "4rem 1rem 2rem",
            marginTop: "4rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <div
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              gap: "2.5rem",
            }}
          >
            <div style={{ maxWidth: isMobile ? "100%" : "400px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <ShowerHead size={24} />
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    letterSpacing: "-0.02em",
                  }}
                >
                  SaniWare
                </span>
              </div>

              <form
                onSubmit={subscribeForm.handleSubmit(onSubscribe)}
                style={{ marginBottom: "1.5rem", width: "100%" }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                    fontWeight: "500",
                  }}
                >
                  Subscribe for updates
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--border-color)",
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <input
                    {...subscribeForm.register("email")}
                    type="email"
                    placeholder="Your email"
                    style={{
                      flex: 1,
                      border: "none",
                      padding: "0.75rem 1rem",
                      backgroundColor: "transparent",
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      width: "100%",
                      minWidth: "250px",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                      border: "none",
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
                {subscribeForm.formState.errors.email && (
                  <span
                    style={{
                      color: "var(--accent-color)",
                      fontSize: "0.75rem",
                      display: "block",
                      marginTop: "0.5rem",
                    }}
                  >
                    {subscribeForm.formState.errors.email.message}
                  </span>
                )}
              </form>
            </div>

            <div
              style={{
                display: "flex",
                gap: isMobile ? "2rem" : "4rem",
                flexWrap: "wrap",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                  }}
                >
                  Navigation
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => scrollToSection("home")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("products")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Products
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                  }}
                >
                  Legal
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() =>
                      toast.info("Privacy Policy will be available soon!", {
                        position: "bottom-center",
                        autoClose: 3000,
                      })
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() =>
                      toast.info("Terms of Service will be available soon!", {
                        position: "bottom-center",
                        autoClose: 3000,
                      })
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    Terms of Service
                  </button>
                  <button
                    onClick={() =>
                      toast.info("All rights reserved", {
                        position: "bottom-center",
                        autoClose: 3000,
                      })
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      padding: 0,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    All rights reserved
                  </button>
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  Contact
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin
                      size={14}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>
                      123 Design Street, NY
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <Mail
                      size={14}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>
                      hello@saniware.com
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "center",
                    }}
                  >
                    <Phone
                      size={14}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>
                      +1 (555) 123-4567
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : "center",
              maxWidth: "1300px",
              margin: "3rem auto 0",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-color)",
              gap: "1rem",
            }}
          >
            {isMounted && (
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                }}
              >
                © 2025 SaniWare. All rights reserved.
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-color)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-color)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-color)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-color)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </footer>

        {selectedProduct && (
          <div
            style={styles.overlay as React.CSSProperties}
            onClick={() => setSelectedProduct(null)}
          >
            <div
              style={styles.modal as React.CSSProperties}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: "absolute",
                  top: ".75rem",
                  right: ".75rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                <X />
              </button>

              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                width={600}
                height={300}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                  marginBottom: "1.5rem",
                }}
              />

              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                {selectedProduct.name}
              </h3>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "var(--accent-color)",
                  marginBottom: "1rem",
                }}
              >
                ${selectedProduct.price}
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                  Description
                </h4>
                <p style={{ color: "var(--text-secondary)" }}>
                  {selectedProduct.details}
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                  Specifications
                </h4>
                <ul style={{ color: "var(--text-secondary)" }}>
                  {selectedProduct.specifications.map(
                    (spec: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.25rem" }}>
                        • {spec}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={handleEnquire}
                  style={{
                    ...styles.button,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Mail size={16} />
                  Enquire Now
                </button>
                <button
                  onClick={handleWishlist}
                  onMouseEnter={() => setHoveredButton("wishlist")}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    ...styles.outlineButton,
                    ...(hoveredButton === "wishlist" &&
                      styles.outlineButtonHover),
                    padding: "0.5rem 1rem",
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />

      <style jsx>{`
        .learn-more-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
