import styled, { css } from "styled-components";

export const rotate90 = css`
  transform: rotate(90deg);
`;
export const rotate90toTheRight = css`
  transform: rotate(-90deg);
`;

export const ItemHeaderContainer = styled.div`
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  cursor: pointer;
  margin-top: 10px;
  .chev {
    transition: all ease 300ms;
    ${({ expanded, direction }) => {
      return expanded && (direction === "rtl" ? rotate90 : rotate90toTheRight);
    }}
  }
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

export const IconContainer = styled.div`
  width: 25px;
  display: inline-block;
`;
