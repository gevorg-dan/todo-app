import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../colors";

function Tooltip(props: {
  label: string | number;
  children: ReactNode;
  isBtnTool?: boolean;
  className?: string;
}) {
  return (
    <div className={props.className}>
      {props.children}
      <span className="tooltip">
        <i>{props.label}</i>
      </span>
    </div>
  );
}

export default styled(Tooltip)`
  position: relative;
  .tooltip {
    display: none;
    position: absolute;
    justify-content: center;
    width: ${({ isBtnTool }) => (isBtnTool ? "130px" : "170px")};
    bottom: ${({ isBtnTool }) =>
      isBtnTool ? "calc(0px - 30px)" : "calc(0px + 70px)"};
    left: ${({ isBtnTool }) =>
      isBtnTool ? "calc(0px - 37px)" : "calc(0px + 70px)"};
    i {
      font-style: normal;
      padding: 4px 8px;
      background-color: rgb(97, 97, 97);
      color: ${colors.w};
      border-radius: 5px;
      font-size: 0.7rem;
      z-index: 3;
    }
  }
  :hover {
    .tooltip {
      display: flex;
    }
  }
`;
