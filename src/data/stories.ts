export interface Story {
  id: number;
  userId: number;
  image: string;
}

export const stories: Story[] = [
  {
    id: 1,
    userId: 2,
    image: "/avatars/sarah.avif",
  },
  {
    id: 2,
    userId: 3,
    image: "/avatars/paul.jpg",
  },
  {
    id: 3,
    userId: 4,
    image: "/avatars/pauline.jpg",
  },
  {
    id: 4,
    userId: 5,
    image: "/avatars/dude.jpg",
  },
  {
    id: 5,
    userId: 6,
    image: "/avatars/kate.jpg",
  },
  {
    id: 6,
    userId: 7,
    image: "/avatars/mark.jpg",
  },
];
