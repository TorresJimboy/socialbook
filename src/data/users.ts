export interface User {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  friendsCount?: number;
}

export const users: User[] = [
  {
    id: 1,
    name: "Jim Torres",
    avatar: process.env.PUBLIC_URL + "/avatars/jim.png",
    bio: "Software Developer",
    location: "Quezon City, Philippines",
    friendsCount: 342,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: process.env.PUBLIC_URL + "/avatars/sarah.avif",
    bio: "Hiking, travel and coffee lover ☕",
    location: "Denver, CO",
    friendsCount: 518,
  },
  {
    id: 3,
    name: "Paul Wilson",
    avatar: process.env.PUBLIC_URL + "/avatars/paul.jpg",
    bio: "Basketball coach | Weekend hiker",
    location: "Chicago, IL",
    friendsCount: 204,
  },
  {
    id: 4,
    name: "Pauline Davis",
    avatar: process.env.PUBLIC_URL + "/avatars/pauline.jpg",
    bio: "Designer | Dog mom 🐶",
    location: "Austin, TX",
    friendsCount: 671,
  },
  {
    id: 5,
    name: "Dude Brown",
    avatar: process.env.PUBLIC_URL + "/avatars/dude.jpg",
    bio: "Entrepreneur | Foodie",
    location: "New York, NY",
    friendsCount: 290,
  },
  {
    id: 6,
    name: "Kate Anderson",
    avatar: process.env.PUBLIC_URL + "/avatars/kate.jpg",
    bio: "Nurse | Yoga instructor 🧘",
    location: "Seattle, WA",
    friendsCount: 413,
  },
  {
    id: 7,
    name: "Mark Martinez",
    avatar: process.env.PUBLIC_URL + "/avatars/mark.jpg",
    bio: "Chef & food blogger 🍳",
    location: "Miami, FL",
    friendsCount: 189,
  },
  {
    id: 8,
    name: "Dorie Lee",
    avatar: process.env.PUBLIC_URL + "/avatars/dorie.avif",
    bio: "Artist | Dreamer",
    location: "Portland, OR",
    friendsCount: 356,
  },
  {
    id: 9,
    name: "Austin Kim",
    avatar: process.env.PUBLIC_URL + "/avatars/autine.jpg",
    bio: "Tech startup founder | Gamer",
    location: "San Jose, CA",
    friendsCount: 501,
  },
];

export const currentUser = users[0];
