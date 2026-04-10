export interface Contact {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
}

export const contacts: Contact[] = [
  { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=47", online: true },
  { id: 2, name: "Mike Wilson", avatar: "https://i.pravatar.cc/150?img=12", online: true },
  { id: 3, name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=44", online: true },
  { id: 4, name: "Alex Brown", avatar: "https://i.pravatar.cc/150?img=33", online: false },
  { id: 5, name: "Lisa Anderson", avatar: "https://i.pravatar.cc/150?img=25", online: true },
  { id: 6, name: "Tom Martinez", avatar: "https://i.pravatar.cc/150?img=15", online: false },
  { id: 7, name: "Rachel Lee", avatar: "https://i.pravatar.cc/150?img=48", online: false },
  { id: 8, name: "David Kim", avatar: "https://i.pravatar.cc/150?img=18", online: true },
];

export const groupConversations = [
  { id: 1, name: "Design Team", icon: "bi-people-fill" },
  { id: 2, name: "Web Developers", icon: "bi-code-slash" },
  { id: 3, name: "Photography Club", icon: "bi-camera" },
];
