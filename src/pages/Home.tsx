import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StoriesCarousel from "../components/StoriesCarousel";
import PostInputBox from "../components/PostInputBox";
import FeedPostCard from "../components/FeedPostCard";
import ContactList from "../components/ContactList";
import {
  loadPersistedFeedPosts,
  loadStoredFeedPosts,
  Post,
  saveFeedMedia,
  savePersistedFeedPosts,
} from "../data/feedPosts";

interface NewPostPayload {
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  mediaFile?: File;
  feeling?: string;
}

type FeedEntry =
  | { kind: "post"; post: Post }
  | { kind: "deleted"; post: Post };

const Home: React.FC = () => {
  const [feedEntries, setFeedEntries] = useState<FeedEntry[]>(() =>
    loadStoredFeedPosts().map((post) => ({ kind: "post" as const, post }))
  );

  const persistFeedEntries = (entries: FeedEntry[]) => {
    void savePersistedFeedPosts(
      entries
        .filter((entry): entry is { kind: "post"; post: Post } => entry.kind === "post")
        .map((entry) => entry.post)
    );
  };

  useEffect(() => {
    void loadPersistedFeedPosts().then((posts) => {
      setFeedEntries(posts.map((post) => ({ kind: "post" as const, post })));
    });
  }, []);

  useEffect(() => {
    persistFeedEntries(feedEntries);
  }, [feedEntries]);

  const handleNewPost = async ({ content, mediaUrl, mediaType, mediaFile, feeling }: NewPostPayload) => {
    const mediaAssetId = mediaFile ? `post-media-${Date.now()}` : undefined;
    if (mediaAssetId && mediaFile) {
      await saveFeedMedia(mediaAssetId, mediaFile);
    }

    const newPost: Post = {
      id: Date.now(),
      userId: 1,
      content,
      mediaUrl,
      mediaType,
      mediaAssetId,
      feeling,
      timestamp: "Just now",
      reactions: {
        like: 0,
        heart: 0,
      },
      viewerReaction: null,
      commentItems: [],
      shares: 0,
    };
    setFeedEntries((currentEntries) => {
      const nextEntries = [{ kind: "post" as const, post: newPost }, ...currentEntries];
      persistFeedEntries(nextEntries);
      return nextEntries;
    });
  };

  const handleDeletePost = (postId: number) => {
    setFeedEntries((currentEntries) =>
      {
        const nextEntries: FeedEntry[] = currentEntries.map((entry) =>
        entry.kind === "post" && entry.post.id === postId
          ? { kind: "deleted" as const, post: entry.post }
          : entry
        );
        persistFeedEntries(nextEntries);
        return nextEntries;
      }
    );
  };

  const handleUndoDelete = (postId: number) => {
    setFeedEntries((currentEntries) =>
      {
        const nextEntries: FeedEntry[] = currentEntries.map((entry) =>
        entry.kind === "deleted" && entry.post.id === postId
          ? { kind: "post" as const, post: entry.post }
          : entry
        );
        persistFeedEntries(nextEntries);
        return nextEntries;
      }
    );
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setFeedEntries((currentEntries) => {
      const nextEntries: FeedEntry[] = currentEntries.map((entry) =>
        entry.post.id === updatedPost.id
          ? { ...entry, post: updatedPost }
          : entry
      );
      persistFeedEntries(nextEntries);
      return nextEntries;
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Left Sidebar */}
        <div className="col-lg-3 d-none d-lg-block px-3 pt-3">
          <Sidebar />
        </div>

        {/* Main Feed */}
        <div
          className="col-12 col-lg-6 px-2 px-lg-4 pt-3 mx-auto"
          style={{ maxWidth: 680 }}
        >
          {/* Stories Carousel */}
          <StoriesCarousel />

          {/* Post Input */}
          <PostInputBox onPost={handleNewPost} />

          {/* Feed */}
          {feedEntries.map((entry) =>
            entry.kind === "post" ? (
              <FeedPostCard
                key={entry.post.id}
                post={entry.post}
                onDelete={entry.post.userId === 1 ? () => handleDeletePost(entry.post.id) : undefined}
                onUpdate={handleUpdatePost}
              />
            ) : (
              <div key={entry.post.id} className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body px-4 py-4 d-flex align-items-center justify-content-between gap-3">
                  <div>
                    <p className="mb-1 fw-semibold text-dark">Post deleted</p>
                    <p className="mb-0 text-muted" style={{ fontSize: 14 }}>
                      Your post was removed from the feed.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-pill px-3"
                    onClick={() => handleUndoDelete(entry.post.id)}
                  >
                    Undo
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Right Contacts */}
        <div className="col-lg-2 d-none d-lg-block px-3 pt-3">
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default Home;
