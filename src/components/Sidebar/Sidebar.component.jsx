import React from "react";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem/SidebarItem.component";

import "./sidebar.styles.scss";
const Sidebar = () => {
  const sidenav = useSelector((state) => state.sidenav);
  const sidebarItems = sidenav.sidebarItems;
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
              expanded={item.expanded}
              selected={item.selected}
              height={item.height}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
