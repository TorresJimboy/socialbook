import React from "react";
import { Contact } from "../data/contacts";

interface ContactItemProps {
  contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (
    <div
      className="d-flex align-items-center gap-2 px-2 py-2 rounded-3 sidebar-item"
      style={{ cursor: "pointer" }}
    >
      <div className="position-relative flex-shrink-0">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="rounded-circle"
          style={{ width: 36, height: 36, objectFit: "cover" }}
        />
        {contact.online && (
          <span
            className="position-absolute bg-success rounded-circle border border-2 border-white"
            style={{ width: 12, height: 12, bottom: 1, right: 1 }}
          />
        )}
      </div>
      <span className="text-dark" style={{ fontSize: 15 }}>
        {contact.name}
      </span>
    </div>
  );
};

export default ContactItem;
