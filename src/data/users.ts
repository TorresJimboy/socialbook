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
    avatar: "/avatars/jim.png",
    bio: "Software Developer",
    location: "Quezon City, Philippines",
    friendsCount: 342,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.avif",
    bio: "Hiking, travel and coffee lover ☕",
    location: "Denver, CO",
    friendsCount: 518,
  },
  {
    id: 3,
    name: "Paul Wilson",
    avatar: "/avatars/paul.jpg",
    bio: "Basketball coach | Weekend hiker",
    location: "Chicago, IL",
    friendsCount: 204,
  },
  {
    id: 4,
    name: "Pauline Davis",
    avatar: "avatars/pauline.jpg",
    bio: "Designer | Dog mom 🐶",
    location: "Austin, TX",
    friendsCount: 671,
  },
  {
    id: 5,
    name: "Dude Brown",
    avatar: "/avatars/dude.jpg",
    bio: "Entrepreneur | Foodie",
    location: "New York, NY",
    friendsCount: 290,
  },
  {
    id: 6,
    name: "Kate Anderson",
    avatar: "/avatars/kate.jpg",
    bio: "Nurse | Yoga instructor 🧘",
    location: "Seattle, WA",
    friendsCount: 413,
  },
  {
    id: 7,
    name: "Mark Martinez",
    avatar: "/avatars/mark.jpg",
    bio: "Chef & food blogger 🍳",
    location: "Miami, FL",
    friendsCount: 189,
  },
  {
    id: 8,
    name: "Dorie Lee",
    avatar: "/avatars/dorie.avif",
    bio: "Artist | Dreamer",
    location: "Portland, OR",
    friendsCount: 356,
  },
  {
    id: 9,
    name: "Austin Kim",
    avatar: "/avatars/autine.jpg",
    bio: "Tech startup founder | Gamer",
    location: "San Jose, CA",
    friendsCount: 501,
  },
];

export const currentUser = users[0];
