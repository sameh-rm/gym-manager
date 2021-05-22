import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Footer from "../Footer/Footer.component";
import Header from "../Header/Header.component";
import Sidebar from "../Sidebar/Sidebar.component";
import "./mainContainer.scss";
const MainContainer = ({ children }) => {
  const userInfo = useSelector((state) => state.core.login.userInfo);
  const history = useHistory();
  // redirect to login if no userInfo
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <>
      <div
        className="content"
        style={{
          height: "100vh",
          textAlign: document.dir === "rtl" ? "right" : "left",
        }}
      >
        <div className="mainContent">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="main">
              <main className="p-3 pagesContainer h-100">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContainer;
