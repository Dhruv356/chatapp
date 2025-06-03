import React from "react";
import { Users } from "lucide-react";
import "./SidebarSkeleton.css";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Users className="sidebar-icon" />
          <span className="sidebar-label">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="sidebar-body">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="skeleton-contact">
            <div className="avatar-skeleton-wrapper">
              <div className="skeleton avatar-skeleton" />
            </div>
            <div className="user-info-skeleton">
              <div className="skeleton name-skeleton" />
              <div className="skeleton status-skeleton" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
