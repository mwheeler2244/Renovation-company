import { Product, Service, Testimonial, CarouselItem } from "../types";

export const products: Product[] = [
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
];

export const services: Service[] = [
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

export const carouselItems: CarouselItem[] = [
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

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.pexels.com/photos/3768901/pexels-photo-3768901.jpeg",
    text: "The quality of products and installation service exceeded my expectations. Highly recommended!",
    rating: 5,
    company: "Johnson Designs",
    logo: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Interior Designer",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    text: "As a designer, I appreciate their wide range of modern fixtures and excellent customer service.",
    rating: 5,
    company: "Chen Interiors",
    logo: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Contractor",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    text: "Their professional installation team makes my job easier. Great products and reliable service.",
    rating: 4,
    company: "Rodriguez Construction",
    logo: "https://via.placeholder.com/150",
  },
];
