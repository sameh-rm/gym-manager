import React from "react";
import SidebarItem from "./SidebarItem/SidebarItem.component";
import { sidebarItems } from "./sidebar_items";
import "./sidebar.styles.scss";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_wrapper">
        <div className="brand">
          <h2 className="text-center py-3">
            <span style={{ color: "#1fe086" }}>Gym</span> <span>Manager</span>
          </h2>
        </div>
        <hr style={{ borderTop: "1px solid white", width: "80%" }} />
        <div className="body">
          {sidebarItems.map((item, idx) => (
            <SidebarItem
              key={idx + 1}
              eventKey={idx}
              title={item.title}
              icon={item.icon}
              url={item.url}
              subitems={item.subitems}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
