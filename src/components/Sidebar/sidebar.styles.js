import styled, { css } from "styled-components";
const collapseRTL = () => css``;

const collapseLTR = () => css``;
const collapseCSS = (dir) => css`
  width: 88px;
  min-width: 88px;

  ${dir === "rtl" ? collapseRTL() : collapseLTR()}
`;

export const SidebarContainer = styled.div`
  width: 280px;
  min-width: 280px;
  height: calc(100vh - 60px);
  background-size: cover;
  margin: 0;
  color: #fff;
  transition: all 300ms ease-in;
  z-index: 1000;
  ${({ collapse, dir }) => collapse && collapseCSS(dir)}
  .sidebar_wrapper {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    .brand {
      font-size: 2rem;
      text-transform: uppercase;
    }
    .body {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      overflow: scroll;
      height: 99%;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
