import React from "react";
import styled from "styled-components";
import { colors } from "../colors";
import editIcon from "./images/edit.svg";
import deleteIcon from "./images/delete.svg";
import checkIcon from "./images/check.svg";
import plusIcon from "./images/plus.svg";

function ButtonBasic(props: { onClick: () => void; className?: string }) {
  return (
    <a
      className={props.className}
      onClick={() => props.onClick()}
      role="button"
    />
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
  :hover {
    background-color: ${colors.lightGray}55;
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
