import React from "react";
import styled from "styled-components";
import { colors } from "../colors";
import editIcon from "./images/edit.svg";
import deleteIcon from "./images/delete.svg";
import checkIcon from "./images/check.svg";
import plusIcon from "./images/plus.svg";
import upStatusIcon from "./images/up-status.svg";
import closeIcon from "./images/close.svg";

interface ButtonInterface {
  label: string;
  className?: string;
  disabled?: "disabled" | null;
  onClick: () => void;
}

function ButtonBasic({ className, onClick, label }: ButtonInterface) {
  return (
    <a className={className} onClick={onClick} role="button">
      <span className="button-tooltip">
        <i>{label}</i>
      </span>
    </a>
  );
}

const StyledButton = styled(ButtonBasic)`
  display: block;
  position: relative;
  width: 48px;
  height: 48px;
  border: none;
  cursor: pointer;
  background-size: 40%;
  background-color: inherit;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  margin: 0 4px;
  padding: 12px;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  :hover {
    background-color: ${colors.lightGray}55;
    .button-tooltip {
      display: flex;
    }
  }
  .button-tooltip {
    display: none;
    justify-content: center;
    width: 130px;
    position: absolute;
    bottom: calc(0px - 30px);
    left: calc(0px - 37px);
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
`;

export const TrashButton = styled(StyledButton)`
  background-image: url(${deleteIcon});
`;

export const SuccessButton = styled(StyledButton)`
  background-image: url(${checkIcon});
`;

export const EditButton = styled(StyledButton)`
  background-image: url(${editIcon});
`;

export const AddButton = styled(StyledButton)`
  background-image: url(${plusIcon});
`;

export const UpStatusButton = styled(StyledButton)`
  background-image: url(${upStatusIcon});
`;

export const CloseButton = styled(StyledButton)`
  background-image: url(${closeIcon});
`;
