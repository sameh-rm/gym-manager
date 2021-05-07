import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  CardHeaderContainer,
  CustomMenuContainer,
  MenuHeaderContainer,
} from "./CustomMenu.styled";
/**
 *
 * @param {parentRef} parentRef is required to calculate the position of the menu
 * @returns
 */
const CustomMenu = ({
  description = "Lorem ipsum dolor sit amet.",
  header = "Menu Header",
  bg_color = "rgba(48, 167, 236, 0.5)",
  size = "sm",
  image = "/default_menu_image.jpg",
  expand,
  expandHandler,
  children,
  parentRef,
}) => {
  const mRef = useRef();
  const [parentElement, setParentElement] = useState();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setParentElement(mRef.current.parentElement);
    setHeight(mRef.current.scrollHeight - 8);
    function handleClickOutside(event) {
      console.log(mRef.current.contains(event.target));
      if (
        mRef.current &&
        !mRef.current.contains(event.target) &&
        !mRef.current.parentElement.parentElement.contains(event.target) &&
        expandHandler
      ) {
        expandHandler(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <CustomMenuContainer
        expand={expand}
        parentElement={parentElement}
        size={size}
        className="p-0 paper_elevation"
        ref={mRef}
        height={height}
      >
        <Card className="rounded">
          <CardHeaderContainer
            parentRef={parentRef}
            imageUrl={image}
            bg_color={bg_color}
          >
            <div className="menu_header_wrapper">
              <MenuHeaderContainer className="bg-transparent text-white text-center menu-header">
                {header}
                {description && (
                  <p className="header_description">{description}</p>
                )}
              </MenuHeaderContainer>
            </div>
          </CardHeaderContainer>
          <Card.Body>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
            <h3>asd</h3>
          </Card.Body>
          <Card.Footer className="bg-white text-center">
            Menu Footer
          </Card.Footer>
        </Card>
      </CustomMenuContainer>
    </div>
  );
};
CustomMenu.defaultProps = {
  header: "Menu Header",
  bg_color: "rgba(48, 167, 236, 0.5)",
  size: "sm",
  image: "/default_menu_image.jpg",
};
CustomMenu.propTypes = {
  description: PropTypes.string,
  bg_color: PropTypes.string,
  size: PropTypes.string,
  image: PropTypes.string,
};
export default CustomMenu;
