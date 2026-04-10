export interface Shortcut {
  id: number;
  name: string;
  icon: string;
  image?: string;
}

export const shortcuts: Shortcut[] = [
  {
    id: 1,
    name: "Web Developers",
    icon: "bi-code-slash",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&q=80",
  },
  {
    id: 2,
    name: "Photography Club",
    icon: "bi-camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80",
  },
];
