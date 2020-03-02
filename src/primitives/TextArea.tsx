import React from "react";
import styled from "styled-components";

import { colors } from "../colors";

function TextArea({
  className,
  value,
  disabled = false,
  placeholder,
  onChange
}: {
  className?: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (newValue: string) => void;
}) {
  return (
    <textarea
      className={className}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default styled(TextArea)`
  resize: none;
  width: 55%;
  color: ${colors.dark};
  border: 1px
    ${({ disabled }) =>
      disabled ? "dotted rgba(0, 0, 0, 0.38)" : `solid ${colors.gray}`};
  border-radius: 4px;
  padding: 10px;
  background-color: inherit;
  overflow: hidden;
  height: 95px;
  :hover {
    border-color: ${({ disabled }) =>
      disabled ? "rgba(0, 0, 0, 0.38)" : `${colors.darkGray}`};
  }
  :focus {
    padding: 9px;
    outline: none;
    border: 2px solid rgb(25, 118, 210);
    box-sizing: border-box;
  }
`;
