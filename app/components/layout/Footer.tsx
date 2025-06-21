"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import {
  ShowerHead,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

interface FooterProps {
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Using theme for conditional styling
  const isDark = theme === "dark";

  React.useEffect(() => {
    setIsMounted(true);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const subscribeForm = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubscribe = () => {
    toast.success("Subscribed successfully!");
    subscribeForm.reset();
  };

  return (
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
          </form>
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? "2rem" : "4rem",
            flexWrap: "wrap",
            justifyContent: "center",
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
              }}
            >
              {["Home", "Products", "Services", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    padding: 0,
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
                  {item}
                </button>
              ))}
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
              Contact
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MapPin size={14} style={{ color: "var(--text-secondary)" }} />
                <span style={{ fontSize: "0.875rem" }}>
                  123 Design Street, NY
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail size={14} style={{ color: "var(--text-secondary)" }} />
                <span style={{ fontSize: "0.875rem" }}>hello@saniware.com</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Phone size={14} style={{ color: "var(--text-secondary)" }} />
                <span style={{ fontSize: "0.875rem" }}>+1 (555) 123-4567</span>
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {[
            { Icon: Facebook, url: "https://facebook.com" },
            { Icon: Instagram, url: "https://instagram.com" },
            { Icon: Twitter, url: "https://twitter.com" },
            { Icon: Linkedin, url: "https://linkedin.com" },
          ].map(({ Icon, url }) => (
            <a
              key={url}
              href={url}
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
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
