import React from "react";
import styled from "styled-components";

import { colors } from "colors";

interface ButtonInterface {
  icon?: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

function ButtonBasic({ className, onClick }: ButtonInterface) {
  return <button className={className} onClick={onClick} />;
}

export default styled(ButtonBasic)`
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
  background-image: url(${props => props.icon});
  border-radius: 50%;
  margin: 0 4px;
  padding: 12px;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${colors.lightGray}55;
  }
`;
