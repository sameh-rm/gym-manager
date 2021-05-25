import React from "react";
import Loader from "../Loader";
import Message from "../Message";
/**
 * @param loading shows Loader Component if its true.
 * @param error shows <Message>{error}</Message> Error message if any.
 * @param children the body to render inside after loading
 */
const AsyncComponent = ({ loading, error, children, className }) => {
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>{children}</>
  );
};

export default AsyncComponent;
