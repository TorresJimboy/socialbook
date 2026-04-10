import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StoriesCarousel from "../components/StoriesCarousel";
import PostInputBox from "../components/PostInputBox";
import PostCard from "../components/PostCard";
import ContactList from "../components/ContactList";
import { posts as initialPosts, Post } from "../data/posts";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      userId: 1,
      content,
      image: "",
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
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
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
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
