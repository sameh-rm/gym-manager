import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { selectItemByUrl } from "../../redux/coreReducers/sidenaveReducer/sidenav.actions";

const CustomContainer = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(location);
    dispatch(selectItemByUrl(location.pathname));
  }, [location, dispatch]);
  return <>{children}</>;
};

export default CustomContainer;
