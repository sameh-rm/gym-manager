import styled, { css } from "styled-components";

export const expand = css`
  height: ${({ expanded, height }) => {
    return height && expanded ? height + "px" : 0;
  }};
`;
const selectItem = css`
  background-color: rgba(120, 120, 120, 0.4);
  border-radius: 10px;
`;
export const SubMenuContainer = styled.div`
  width: 100%;
  transition: all 300ms ease-in;
  overflow: hidden;
  .menu-container {
    background: rgba(100, 100, 100, 0.3);
    border-radius: 5px;
    padding: 1rem;
  }

  height: ${({ expanded, height }) => {
    return height ? (expanded ? height + "px" : 0) : "auto";
  }};
`;

export const ItemContainer = styled.div`
  ${({ selected }) => selected && selectItem}
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  &:hover {
    background-color: rgba(10, 10, 10, 0.3);
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
`;
