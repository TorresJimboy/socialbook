export interface Post {
  id: number;
  userId: number;
  content: string;
  image: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export const posts: Post[] = [
  {
    id: 1,
    userId: 2,
    content:
      "Just finished an amazing hike in the mountains! The view from the top was absolutely breathtaking. 🏔️",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    timestamp: "2 hours ago",
    likes: 142,
    comments: 23,
    shares: 8,
  },
  {
    id: 2,
    userId: 3,
    content:
      "Game day! Our team just won the championship. So proud of every single player 🏀🏆",
    image: "/posts/bascket.avif",
    timestamp: "4 hours ago",
    likes: 289,
    comments: 47,
    shares: 31,
  },
  {
    id: 3,
    userId: 4,
    content:
      "New design project going live today! Spent months on this and I couldn't be happier with how it turned out ✨",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    timestamp: "6 hours ago",
    likes: 198,
    comments: 34,
    shares: 12,
  },
  {
    id: 4,
    userId: 5,
    content:
      "NYC never sleeps! Late night food crawl with the crew. Nothing beats street food at midnight 🌮🍕",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    timestamp: "8 hours ago",
    likes: 87,
    comments: 15,
    shares: 5,
  },
  {
    id: 5,
    userId: 7,
    content:
      "Made a new pasta dish from scratch today. Homemade tagliatelle with truffle cream sauce 🍝 Recipe coming soon!",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80",
    timestamp: "10 hours ago",
    likes: 334,
    comments: 61,
    shares: 22,
  },
  {
    id: 6,
    userId: 6,
    content:
      "Morning yoga on the beach. Starting the day right 🧘‍♀️ There's nothing more peaceful than this.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    timestamp: "12 hours ago",
    likes: 211,
    comments: 28,
    shares: 17,
  },
];
