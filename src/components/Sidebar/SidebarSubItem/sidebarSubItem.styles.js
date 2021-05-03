import styled, { css } from "styled-components";

export const expand = css`
  height: ${({ expanded, height }) => {
    return height && expanded ? height + "px" : 0;
  }};
`;
export const SubMenuContainer = styled.div`
  width: 100%;
  transition: all 300ms ease-in;

  overflow: hidden;
  .menu-container {
    background: rgba(155, 155, 155, 0.1);
    border-radius: 5px;
    padding: 1rem;
  }
  .item {
    cursor: pointer;
    display: flex;
    font-size: 0.8rem;
    &:hover {
      background-color: rgba(222, 222, 222, 0.3);
      border-radius: 10px;
      text-decoration: underline;
    }
    .iconContainer {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      width: 25px !important;
      display: inline;
    }
  }
  height: ${({ expanded, height }) => {
    return height ? (expanded ? height + "px" : 0) : "auto";
  }};
`;
