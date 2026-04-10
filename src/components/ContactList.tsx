import React from "react";
import ContactItem from "./ContactItem";
import GroupConversationItem from "./GroupConversationItem";
import { contacts, groupConversations } from "../data/contacts";

const ContactList: React.FC = () => {
  return (
    <aside
      className="position-sticky d-flex flex-column"
      style={{ top: 68, height: "calc(100vh - 68px)", overflowY: "auto", paddingBottom: 20 }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between px-2 mb-1">
        <h6 className="fw-semibold text-dark mb-0" style={{ fontSize: 17 }}>
          Contacts
        </h6>
        <div className="d-flex gap-1">
          <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
            <i className="bi bi-camera-video text-dark"></i>
          </button>
          <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
            <i className="bi bi-search text-dark"></i>
          </button>
          <button className="btn btn-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}>
            <i className="bi bi-three-dots text-dark"></i>
          </button>
        </div>
      </div>

      {/* Contacts */}
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}

      {/* Group Conversations */}
      <div className="mt-3">
        <p className="text-muted fw-semibold px-2 mb-1" style={{ fontSize: 17 }}>
          Group Conversations
        </p>
        {groupConversations.map((group) => (
          <GroupConversationItem key={group.id} name={group.name} icon={group.icon} />
        ))}
      </div>
    </aside>
  );
};

export default ContactList;
