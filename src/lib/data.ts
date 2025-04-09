
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  downloadLink?: string;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    title: "Premium Photoshop Actions",
    description: "A collection of 50 professional Photoshop actions to enhance your photography workflow.",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Design",
    featured: true,
    downloadLink: "https://example.com/download/premium-actions"
  },
  {
    id: "2",
    title: "Social Media Marketing eBook",
    description: "Learn how to grow your business on social media with this comprehensive guide.",
    price: 19.99,
    image: "/placeholder.svg",
    category: "Marketing",
    featured: true,
    downloadLink: "https://example.com/download/marketing-ebook"
  },
  {
    id: "3",
    title: "Ultimate Productivity Templates",
    description: "Boost your productivity with these 20 templates for planning and organization.",
    price: 14.99,
    image: "/placeholder.svg",
    category: "Productivity",
    featured: false,
    downloadLink: "https://example.com/download/productivity-templates"
  },
  {
    id: "4",
    title: "Web Development Crash Course",
    description: "Learn to build responsive websites from scratch with this comprehensive video course.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Education",
    featured: true,
    downloadLink: "https://example.com/download/web-dev-course"
  },
  {
    id: "5",
    title: "Resume Templates Bundle",
    description: "Stand out with these 10 professionally designed resume templates.",
    price: 9.99,
    image: "/placeholder.svg",
    category: "Design",
    featured: false,
    downloadLink: "https://example.com/download/resume-templates"
  },
  {
    id: "6",
    title: "Financial Planning Spreadsheets",
    description: "Track your finances and plan for the future with these pre-built spreadsheets.",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Finance",
    featured: false,
    downloadLink: "https://example.com/download/finance-sheets"
  }
];
