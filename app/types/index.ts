export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  badge?: string;
  details: string;
  specifications: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  iconName: string;
  color: string;
  benefits: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  company: string;
  logo: string;
}

export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
}

export interface TestimonialData {
  text: string;
  name: string;
  date: string;
}
