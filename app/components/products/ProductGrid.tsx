"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/app/types";

interface ProductGridProps {
  products: Product[];
  isMobile: boolean;
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isMobile,
  onProductSelect,
}) => {
  const styles = {
    section: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "4rem 1rem",
    },
    header: {
      display: "flex",
      flexDirection: (isMobile ? "column" : "row") as "row" | "column",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      marginBottom: "2rem",
      gap: isMobile ? "1rem" : "2rem",
    },
    title: {
      fontSize: isMobile ? "2rem" : "2.5rem",
      fontWeight: "600",
    },
    description: {
      maxWidth: isMobile ? "100%" : "400px",
      textAlign: (isMobile ? "left" : "right") as "left" | "right",
      color: "var(--text-secondary)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
      gridTemplateRows: isMobile ? "repeat(5, auto)" : "auto auto",
      gap: "1.5rem",
    },
  };

  const getGridSpan = (index: number) => {
    if (isMobile) return {};
    switch (index) {
      case 0:
        return { gridColumn: "span 4" };
      case 1:
        return { gridColumn: "5 / span 4", gridRow: "1 / span 2" };
      case 2:
        return { gridColumn: "9 / span 4" };
      case 3:
        return { gridColumn: "1 / span 4", gridRow: "2" };
      case 4:
        return { gridColumn: "9 / span 4", gridRow: "2" };
      default:
        return {};
    }
  };

  return (
    <section id="products" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Explore Our Collection</h2>
        <p style={styles.description}>
          SaniWare will showcase its vision of contemporary architecture,
          interior design trends, and innovative living at Salone del Mobile
          Milano 2024.
        </p>
      </div>

      <div style={styles.grid}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              ...getGridSpan(index),
              borderRadius: "0.5rem",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              minHeight: isMobile ? "300px" : "auto",
            }}
            onClick={() => onProductSelect(product)}
          >
            <div
              style={{
                width: "100%",
                paddingTop: isMobile ? "0" : index === 1 ? "200%" : "100%",
                height: isMobile ? "300px" : "auto",
                position: isMobile ? "relative" : "static",
              }}
            >
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
                  src={product.imageUrl}
                  alt={product.name}
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
                    {product.name}
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
