import React from "react";
import styled from "styled-components";
import edit from "./images/edit.svg";
import trash from "./images/trash.svg";
import checkmark from "./images/checkmark.svg";
function ButtonBasic(props: { onClick: () => {}; className?: string }) {
  return <a className={props.className} onClick={() => props.onClick()} />;
}

const StyledButton = styled(ButtonBasic)`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background-size: 60%;
  background-color: rgba(255, 255, 255, 0);
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.5s ease 0s;

  border-radius: 50%;
`;

export const TrashButton = styled(StyledButton)`
  background-image: url(${trash});
  :hover {
    background-color: rgba(214, 214, 214, 0.7);
  }
`;

export const SuccessButton = styled(StyledButton)`
  background-image: url(${checkmark});
  background-color: #3fa5fb;
  :hover {
    background-color: rgb(46, 133, 251);
  }
`;

export const EditButton = styled(StyledButton)`
  background-image: url(${edit});

  :hover {
    background-color: rgba(214, 214, 214, 0.7);
  }
`;
