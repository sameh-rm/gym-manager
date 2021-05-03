import styled from "styled-components";

export const SidebarItemContainer = styled.div``;
export const ItemHeaderContainer = styled.div`
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  cursor: pointer;
  &:hover {
    background-color: rgba(222, 222, 222, 0.3);
    border-radius: 10px;
  }
`;

export const TitleContainer = styled.span`
  vertical-align: middle;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
`;
