import styled, { css } from "styled-components";
import menuImage from "../../assets/images/default_menu_image.jpg";

const smallMenu = () => {
  return css`
    width: 230px;

    font-size: 0.8rem !important;
  `;
};
const mediumMenu = () => {
  return css`
    width: 280px;
    font-size: 0.8rem !important;
  `;
};
const largeMenu = () => {
  return css`
    width: 360px;
    font-size: 1rem;
    .header_description {
      font-size: 0.8rem;
    }
  `;
};
const drawMenu = (parentElement, size, height) => {
  //   const height = mRef ? mRef : 0;
  const { top, bottom, left, right } = getParentBounds(parentElement) || [
    70, 0, 10, 0,
  ];
  const sizes = {
    sm: 230,
    md: 280,
    lg: 360,
  };
  const leftOrRight =
    left - sizes[size] < 0
      ? left - sizes[size] > sizes[size]
        ? css`
            left: ${left + sizes[size] + 10}px;
          `
        : css`
            left: ${left + 15}px;
          `
      : right + sizes[size] > window.innerWidth
      ? css`
          left: ${right - sizes[size]}px;
        `
      : css`
          left: ${right - 50}px;
        `;

  const topOrBottom =
    top + height < window.outerHeight
      ? css`
          top: ${top + 25}px;
        `
      : css`
          bottom: ${bottom - top + 15}px;
        `;
  return css`
    height: ${({ expand }) => (expand ? height : 0)}px;
    transition: all ease 300ms;
    overflow: hidden;
    ${leftOrRight}
    ${topOrBottom}
  `;
};
const getParentBounds = (parentElement) =>
  parentElement && parentElement.getBoundingClientRect();

export const CustomMenuContainer = styled.div`
  z-index: 5000;
  background: white;
  border-radius: 5px !important;

  position: absolute;
  ${({ parentElement, size, height }) => drawMenu(parentElement, size, height)}
  ${({ size }) =>
    size === "sm" ? smallMenu() : size === "md" ? mediumMenu() : largeMenu()}
  .rounded {
    border-radius: 5px !important;
  }
`;

export const CardHeaderContainer = styled.div`
  background: url(${menuImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .menu_header_wrapper {
    background: ${({ bg_color }) => bg_color};

    .header_description {
      font-weight: normal;
      margin: 0;
    }
  }
`;

export const MenuHeaderContainer = styled.div`
  padding: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgb(80, 80, 80);
`;
