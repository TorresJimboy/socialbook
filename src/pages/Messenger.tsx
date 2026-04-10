import React, { useState, useRef, useEffect } from "react";
import { contacts } from "../data/contacts";
import { Contact } from "../data/contacts";

interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

const initialMessages: Record<number, Message[]> = {
  1: [
    { from: "them", text: "Hey! How are you? 👋", time: "10:30 AM" },
    { from: "me", text: "I'm great, thanks! What's up?", time: "10:31 AM" },
    { from: "them", text: "Just checking in. Wanna hang out this weekend? 😊", time: "10:32 AM" },
    { from: "me", text: "Sure! Sounds fun, let me check my schedule", time: "10:33 AM" },
    { from: "them", text: "Nice! Saturday works best for me", time: "10:35 AM" },
  ],
  2: [
    { from: "them", text: "Did you see the game last night?! 🏀", time: "9:00 AM" },
    { from: "me", text: "Yes! That was insane!", time: "9:05 AM" },
  ],
  3: [
    { from: "them", text: "Loved your latest design work!", time: "Yesterday" },
    { from: "me", text: "Thank you so much 🙏", time: "Yesterday" },
    { from: "them", text: "Let me know if you want feedback anytime", time: "Yesterday" },
  ],
};

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const Messenger: React.FC = () => {
  const [selected, setSelected] = useState<Contact>(contacts[0]);
  const [conversations, setConversations] = useState<Record<number, Message[]>>(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = conversations[selected.id] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selected]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Message = { from: "me", text, time: getTime() };
    setConversations((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));
    setInput("");

    // Simulate reply
    setTimeout(() => {
      const replies = ["Got it! 😊", "Sounds great!", "Haha, nice!", "Let me think about that...", "Sure thing! 👍"];
      const reply: Message = {
        from: "them",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: getTime(),
      };
      setConversations((prev) => ({
        ...prev,
        [selected.id]: [...(prev[selected.id] || []), reply],
      }));
    }, 1200);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const lastMsg = (id: number) => {
    const msgs = conversations[id];
    return msgs && msgs.length > 0 ? msgs[msgs.length - 1] : null;
  };

  return (
    <div className="d-flex bg-white" style={{ height: "calc(100vh - 58px)", overflow: "hidden" }}>
      {/* Left sidebar */}
      <div
        className="border-end d-flex flex-column"
        style={{ width: 360, flexShrink: 0, overflowY: "auto" }}
      >
        <div className="p-3 border-bottom">
          <h4 className="fw-bold mb-3" style={{ fontSize: 24 }}>Chats</h4>
          <div className="position-relative">
            <i
              className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"
              style={{ fontSize: 14 }}
            ></i>
            <input
              className="form-control rounded-pill border-0 bg-light ps-5"
              placeholder="Search Messenger"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: 15, padding: "10px 16px 10px 40px" }}
            />
          </div>
        </div>

        {filteredContacts.map((c) => {
          const last = lastMsg(c.id);
          return (
            <div
              key={c.id}
              className={`d-flex align-items-center gap-3 px-3 py-2 border-0 ${
                selected.id === c.id ? "bg-primary bg-opacity-10" : "hover-bg"
              }`}
              style={{ cursor: "pointer", transition: "background 0.15s" }}
              onClick={() => setSelected(c)}
            >
              <div className="position-relative flex-shrink-0">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="rounded-circle"
                  style={{ width: 52, height: 52, objectFit: "cover" }}
                />
                {c.online && (
                  <span
                    className="position-absolute bg-success rounded-circle border border-2 border-white"
                    style={{ width: 14, height: 14, bottom: 2, right: 2 }}
                  />
                )}
              </div>
              <div className="flex-grow-1 overflow-hidden">
                <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 15 }}>
                  {c.name}
                </p>
                <p
                  className="mb-0 text-muted text-truncate"
                  style={{ fontSize: 13, maxWidth: 200 }}
                >
                  {last
                    ? `${last.from === "me" ? "You: " : ""}${last.text}`
                    : c.online
                    ? "Active now"
                    : "Offline"}
                </p>
              </div>
              <div className="text-muted" style={{ fontSize: 12, flexShrink: 0 }}>
                {last?.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat window */}
      <div className="flex-grow-1 d-flex flex-column" style={{ overflow: "hidden" }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom shadow-sm bg-white">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <img
                src={selected.avatar}
                alt={selected.name}
                className="rounded-circle"
                style={{ width: 44, height: 44, objectFit: "cover" }}
              />
              {selected.online && (
                <span
                  className="position-absolute bg-success rounded-circle border border-2 border-white"
                  style={{ width: 13, height: 13, bottom: 1, right: 1 }}
                />
              )}
            </div>
            <div>
              <p className="mb-0 fw-bold text-dark" style={{ fontSize: 16 }}>
                {selected.name}
              </p>
              <p
                className={`mb-0 ${selected.online ? "text-success" : "text-muted"}`}
                style={{ fontSize: 13 }}
              >
                {selected.online ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
          <div className="d-flex gap-1">
            {["bi-telephone-fill", "bi-camera-video-fill", "bi-info-circle"].map((icon) => (
              <button
                key={icon}
                className="btn btn-light rounded-circle d-flex align-items-center justify-content-center text-primary"
                style={{ width: 38, height: 38 }}
              >
                <i className={`bi ${icon} fs-5`}></i>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-grow-1 px-4 py-3 d-flex flex-column gap-2"
          style={{ overflowY: "auto", background: "#f0f2f5" }}
        >
          {/* Profile header in chat */}
          <div className="text-center mb-3">
            <img
              src={selected.avatar}
              alt={selected.name}
              className="rounded-circle mb-2"
              style={{ width: 72, height: 72, objectFit: "cover" }}
            />
            <p className="fw-bold mb-0" style={{ fontSize: 16 }}>
              {selected.name}
            </p>
            <p className="text-muted" style={{ fontSize: 13 }}>
              You're connected on Socialbook
            </p>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`d-flex align-items-end gap-2 ${
                m.from === "me" ? "justify-content-end" : ""
              }`}
            >
              {m.from === "them" && (
                <img
                  src={selected.avatar}
                  alt=""
                  className="rounded-circle flex-shrink-0"
                  style={{ width: 28, height: 28, objectFit: "cover" }}
                />
              )}
              <div>
                <div
                  className={`px-3 py-2 ${
                    m.from === "me" ? "msg-bubble-me" : "msg-bubble-them"
                  }`}
                  style={{ maxWidth: 380, fontSize: 15, display: "inline-block" }}
                >
                  {m.text}
                </div>
                <p
                  className={`mb-0 text-muted mt-1 ${m.from === "me" ? "text-end" : ""}`}
                  style={{ fontSize: 11 }}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="d-flex align-items-center gap-2 px-4 py-3 border-top bg-white">
          <button
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center text-primary"
            style={{ width: 38, height: 38, flexShrink: 0 }}
          >
            <i className="bi bi-plus-lg fs-5"></i>
          </button>
          <button
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center text-primary"
            style={{ width: 38, height: 38, flexShrink: 0 }}
          >
            <i className="bi bi-image fs-5"></i>
          </button>
          <button
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center text-primary"
            style={{ width: 38, height: 38, flexShrink: 0 }}
          >
            <i className="bi bi-emoji-smile fs-5"></i>
          </button>
          <input
            className="form-control rounded-pill border-0 bg-light"
            placeholder="Aa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            style={{ fontSize: 15, padding: "10px 18px" }}
          />
          <button
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 38, height: 38, flexShrink: 0 }}
            onClick={send}
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
