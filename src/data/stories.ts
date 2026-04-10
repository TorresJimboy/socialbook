export interface Story {
  id: number;
  userId: number;
  image: string;
}

export const stories: Story[] = [
  {
    id: 1,
    userId: 2,
    image: process.env.PUBLIC_URL + "/avatars/sarah.avif",
  },
  {
    id: 2,
    userId: 3,
    image: process.env.PUBLIC_URL + "/avatars/paul.jpg",
  },
  {
    id: 3,
    userId: 4,
    image: process.env.PUBLIC_URL + "/avatars/pauline.jpg",
  },
  {
    id: 4,
    userId: 5,
    image: process.env.PUBLIC_URL + "/avatars/dude.jpg",
  },
  {
    id: 5,
    userId: 6,
    image: process.env.PUBLIC_URL + "/avatars/kate.jpg",
  },
  {
    id: 6,
    userId: 7,
    image: process.env.PUBLIC_URL + "/avatars/mark.jpg",
  },
];
