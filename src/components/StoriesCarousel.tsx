import React, { useRef, useState, useEffect } from "react";
import StoryCard, { CreateStoryCard } from "./StoryCard";
import { stories } from "../data/stories";

const CARD_WIDTH = 112;
const GAP = 8;
const SCROLL_AMOUNT = (CARD_WIDTH + GAP) * 3;

const StoriesCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="position-relative mb-3">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="btn bg-white shadow d-flex align-items-center justify-content-center position-absolute rounded-circle"
          style={{
            width: 36,
            height: 36,
            left: -12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            border: "1px solid #e4e6eb",
          }}
        >
          <i className="bi bi-chevron-left fw-bold text-dark"></i>
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="d-flex gap-2 pb-1"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <CreateStoryCard />
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="btn bg-white shadow d-flex align-items-center justify-content-center position-absolute rounded-circle"
          style={{
            width: 36,
            height: 36,
            right: -12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            border: "1px solid #e4e6eb",
          }}
        >
          <i className="bi bi-chevron-right fw-bold text-dark"></i>
        </button>
      )}
    </div>
  );
};

export default StoriesCarousel;