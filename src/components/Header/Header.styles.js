import styled, { css } from "styled-components";

const collapseRTL = () => css`
  position: relative;
  left: 10px;
  margin-right: 20px !important;
  margin-left: 10px !important;
  .burger {
    position: relative;
    left: 20px;
  }
`;

const collapseLTR = () => css`
  position: relative;
  right: 10px;
  margin-right: 10px !important;
  margin-left: 10px !important;
  .burger {
    position: relative;
    right: 20px;
  }
`;
const collapseCSS = (dir) => css`
  width: 60px;
  ${dir === "rtl" ? collapseRTL() : collapseLTR()}
  .title {
    width: 0px;
  }
`;
export const BrandContainer = styled.div`
  width: 265px;
  font-family: "Courgette" sans-serif;
  font-size: 1.3rem;
  justify-content: space-between;
  transition: all ease 300ms;
  align-items: center;
  ${({ collapse, dir }) => collapse && collapseCSS(dir)}

  ${({ dir }) =>
    dir === "ltr"
      ? css`
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        `
      : css`
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        `}

  .title {
    white-space: nowrap;
    overflow: hidden;
    padding-top: 0.5rem;
  }
  .burger {
    width: 50px;
    border-radius: 10px;
    font-size: 1.8rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;
