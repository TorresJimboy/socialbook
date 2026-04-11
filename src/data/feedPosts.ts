export interface PostComment {
  id: number;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
}

export interface PostReactions {
  like: number;
  heart: number;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  mediaAssetId?: string;
  feeling?: string;
  timestamp: string;
  reactions: PostReactions;
  viewerReaction?: "like" | "heart" | null;
  commentItems: PostComment[];
  shares: number;
}

export const FEED_POSTS_STORAGE_KEY = "socialbook-feed-posts-v1";
const FEED_POSTS_DB_NAME = "socialbook-feed-db";
const FEED_POSTS_STORE_NAME = "feed";
const FEED_POSTS_RECORD_KEY = "posts";
const FEED_MEDIA_STORE_NAME = "media";
const FEED_UPDATE_EVENT = "socialbook-feed-updated";

export const initialFeedPosts: Post[] = [
  {
    id: 1,
    userId: 2,
    content: "Just finished an amazing hike in the mountains! The view from the top was absolutely breathtaking.",
    mediaUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    mediaType: "image",
    feeling: "grateful",
    timestamp: "2 hours ago",
    reactions: { like: 102, heart: 40 },
    viewerReaction: null,
    commentItems: [
      {
        id: 101,
        userName: "Paul Wilson",
        userAvatar: process.env.PUBLIC_URL + "/avatars/paul.jpg",
        message: "That view looks unreal. Saving this trail for my next trip.",
        timestamp: "1 hour ago",
      },
      {
        id: 102,
        userName: "Kate Anderson",
        userAvatar: process.env.PUBLIC_URL + "/avatars/kate.jpg",
        message: "This is exactly the reset I need this weekend.",
        timestamp: "45 minutes ago",
      },
    ],
    shares: 8,
  },
  {
    id: 2,
    userId: 3,
    content: "Game day! Our team just won the championship. So proud of every single player.",
    mediaUrl: process.env.PUBLIC_URL + "/posts/bascket.avif",
    mediaType: "image",
    feeling: "proud",
    timestamp: "4 hours ago",
    reactions: { like: 211, heart: 78 },
    viewerReaction: null,
    commentItems: [
      {
        id: 201,
        userName: "Sarah Johnson",
        userAvatar: process.env.PUBLIC_URL + "/avatars/sarah.avif",
        message: "Champions! You all earned this one.",
        timestamp: "3 hours ago",
      },
      {
        id: 202,
        userName: "Mark Martinez",
        userAvatar: process.env.PUBLIC_URL + "/avatars/mark.jpg",
        message: "The defense was locked in all game.",
        timestamp: "2 hours ago",
      },
    ],
    shares: 31,
  },
  {
    id: 3,
    userId: 4,
    content: "New design project going live today! Spent months on this and I could not be happier with how it turned out.",
    mediaUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    mediaType: "image",
    feeling: "excited",
    timestamp: "6 hours ago",
    reactions: { like: 145, heart: 53 },
    viewerReaction: null,
    commentItems: [
      {
        id: 301,
        userName: "Dorie Lee",
        userAvatar: process.env.PUBLIC_URL + "/avatars/dorie.avif",
        message: "The colors and layout are so clean. Congrats on the launch.",
        timestamp: "5 hours ago",
      },
    ],
    shares: 12,
  },
  {
    id: 4,
    userId: 5,
    content: "NYC never sleeps! Late night food crawl with the crew. Nothing beats street food at midnight.",
    mediaUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    mediaType: "image",
    feeling: "hungry",
    timestamp: "8 hours ago",
    reactions: { like: 61, heart: 26 },
    viewerReaction: null,
    commentItems: [
      {
        id: 401,
        userName: "Austin Kim",
        userAvatar: process.env.PUBLIC_URL + "/avatars/austin.jpg",
        message: "Street tacos after midnight always win.",
        timestamp: "7 hours ago",
      },
    ],
    shares: 5,
  },
  {
    id: 5,
    userId: 7,
    content: "Made a new pasta dish from scratch today. Homemade tagliatelle with truffle cream sauce. Recipe coming soon!",
    mediaUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80",
    mediaType: "image",
    feeling: "inspired",
    timestamp: "10 hours ago",
    reactions: { like: 248, heart: 86 },
    viewerReaction: null,
    commentItems: [
      {
        id: 501,
        userName: "Pauline Davis",
        userAvatar: process.env.PUBLIC_URL + "/avatars/pauline.jpg",
        message: "Please drop the recipe. This looks restaurant-level good.",
        timestamp: "9 hours ago",
      },
      {
        id: 502,
        userName: "Kate Anderson",
        userAvatar: process.env.PUBLIC_URL + "/avatars/kate.jpg",
        message: "I can almost smell this through the screen.",
        timestamp: "8 hours ago",
      },
    ],
    shares: 22,
  },
  {
    id: 6,
    userId: 6,
    content: "Morning yoga on the beach. Starting the day right. There is nothing more peaceful than this.",
    mediaUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    mediaType: "image",
    feeling: "calm",
    timestamp: "12 hours ago",
    reactions: { like: 162, heart: 49 },
    viewerReaction: null,
    commentItems: [
      {
        id: 601,
        userName: "Sarah Johnson",
        userAvatar: process.env.PUBLIC_URL + "/avatars/sarah.avif",
        message: "This is the energy I want for tomorrow morning.",
        timestamp: "11 hours ago",
      },
    ],
    shares: 17,
  },
];

export const loadStoredFeedPosts = (): Post[] => {
  try {
    const raw = window.localStorage.getItem(FEED_POSTS_STORAGE_KEY);
    if (!raw) return initialFeedPosts;

    const parsed = JSON.parse(raw) as Post[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialFeedPosts;
  } catch (error) {
    console.error("Failed to load stored feed posts:", error);
    return initialFeedPosts;
  }
};

export const saveStoredFeedPosts = (posts: Post[]) => {
  try {
    window.localStorage.setItem(FEED_POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to save feed posts:", error);
  }
};

const openFeedPostsDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open(FEED_POSTS_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FEED_POSTS_STORE_NAME)) {
        db.createObjectStore(FEED_POSTS_STORE_NAME);
      }
      if (!db.objectStoreNames.contains(FEED_MEDIA_STORE_NAME)) {
        db.createObjectStore(FEED_MEDIA_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const loadPersistedFeedPosts = async (): Promise<Post[]> => {
  try {
    const db = await openFeedPostsDb();
    const transaction = db.transaction(FEED_POSTS_STORE_NAME, "readonly");
    const store = transaction.objectStore(FEED_POSTS_STORE_NAME);

    const posts = await new Promise<Post[] | undefined>((resolve, reject) => {
      const request = store.get(FEED_POSTS_RECORD_KEY);
      request.onsuccess = () => resolve(request.result as Post[] | undefined);
      request.onerror = () => reject(request.error);
    });

    db.close();

    if (posts && posts.length > 0) {
      const hydratedPosts = await Promise.all(
        posts.map(async (post) => {
          if (!post.mediaAssetId) return post;

          const mediaBlob = await loadFeedMedia(post.mediaAssetId);
          if (!mediaBlob) return post;

          return {
            ...post,
            mediaUrl: URL.createObjectURL(mediaBlob),
          };
        })
      );

      saveStoredFeedPosts(hydratedPosts);
      return hydratedPosts;
    }
  } catch (error) {
    console.error("Failed to load persisted feed posts:", error);
  }

  return loadStoredFeedPosts();
};

export const savePersistedFeedPosts = async (posts: Post[]) => {
  saveStoredFeedPosts(posts);

  try {
    const db = await openFeedPostsDb();
    const transaction = db.transaction(FEED_POSTS_STORE_NAME, "readwrite");
    const store = transaction.objectStore(FEED_POSTS_STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.put(posts, FEED_POSTS_RECORD_KEY);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    db.close();
    window.dispatchEvent(new CustomEvent(FEED_UPDATE_EVENT));
  } catch (error) {
    console.error("Failed to save persisted feed posts:", error);
  }
};

export const saveFeedMedia = async (assetId: string, file: Blob) => {
  try {
    const db = await openFeedPostsDb();
    const transaction = db.transaction(FEED_MEDIA_STORE_NAME, "readwrite");
    const store = transaction.objectStore(FEED_MEDIA_STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.put(file, assetId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error("Failed to save feed media:", error);
  }
};

export const loadFeedMedia = async (assetId: string): Promise<Blob | undefined> => {
  try {
    const db = await openFeedPostsDb();
    const transaction = db.transaction(FEED_MEDIA_STORE_NAME, "readonly");
    const store = transaction.objectStore(FEED_MEDIA_STORE_NAME);

    const mediaBlob = await new Promise<Blob | undefined>((resolve, reject) => {
      const request = store.get(assetId);
      request.onsuccess = () => resolve(request.result as Blob | undefined);
      request.onerror = () => reject(request.error);
    });

    db.close();
    return mediaBlob;
  } catch (error) {
    console.error("Failed to load feed media:", error);
    return undefined;
  }
};

export const subscribeToFeedUpdates = (listener: () => void) => {
  const handler = () => listener();
  window.addEventListener(FEED_UPDATE_EVENT, handler);

  return () => window.removeEventListener(FEED_UPDATE_EVENT, handler);
};
