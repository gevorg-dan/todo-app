import React from "react";
import styled from "styled-components";

import { colors } from "../colors";

import Typography, { TypographyVariant } from "./Typography";

import OnClickOutside from "./OnClickOutside";

import useBoolean from "../ownHooks/useBoolean";

interface SelectOptionsInterface<T = string> {
  title: string;
  code: T;
}

interface SelectInterface<T = string> {
  className?: string;
  label?: string;
  options: SelectOptionsInterface<T>[];
  currentValue: T;
  onChange: (value: T) => void;
}

function Select<T>(props: SelectInterface<T>) {
  const { className, label, currentValue, options, onChange } = props;
  const [open, setOpenInTrue, setOpenInFalse] = useBoolean(false);
  const currentValueText = options.find(option => option.code === currentValue)
    .title;
  const changeSelectValue = (value: T) => {
    return () => {
      onChange(value);
      setOpenInFalse();
    };
  };
  return (
    <div className={className}>
      <button onClick={setOpenInTrue}>
        {currentValueText}
        <svg
          className="select-icons"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && (
        <OnClickOutside onClick={setOpenInFalse}>
          <StyledCollapsedOptionsList
            options={options}
            currentValue={currentValue}
            changeSelectValue={changeSelectValue}
          />
        </OnClickOutside>
      )}
      <Typography variant={TypographyVariant.caption} className="select-label">
        {label}
      </Typography>
    </div>
  );
}

function CollapsedOptionsList<T>(props: {
  className?: string;
  options: SelectOptionsInterface<T>[];
  currentValue: T;
  changeSelectValue: (value: T) => () => void;
}) {
  const { className, options, currentValue, changeSelectValue } = props;
  return (
    <div className={className}>
      <ul>
        {options.map((option, index) => {
          return (
            <li
              key={index}
              className={option.code === currentValue ? "selected" : ""}
              onClick={changeSelectValue(option.code)}
            >
              {option.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const StyledCollapsedOptionsList = styled(CollapsedOptionsList)`
  width: 100%;
  min-width: 120px;
  position: absolute;
  opacity: 1;
  transform: none;
  transition: opacity 267ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 178ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  top: -50px;
  transform-origin: 0px 26px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  z-index: 3;

  & ul {
    list-style: none;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  & ul > li {
    text-decoration: none;
    width: auto;
    overflow: hidden;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    white-space: nowrap;
    letter-spacing: 0.00938em;
    padding: 6px 16px;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &.selected {
      background-color: rgba(0, 0, 0, 0.08);
    }
    :not(.selected):hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
` as typeof CollapsedOptionsList;

export default styled(Select)`
  position: relative;
  width: 20%;
  min-width: 200px;
  height: 35px;
  cursor: pointer;
  & .select-label {
    position: absolute;
    top: -50%;
    left: 0px;
    font-size: 0.7rem;
    cursor: default;
  }
  & .select-icons {
    position: absolute;
    top: calc(50% - 12px);
    right: 0px;
    width: 24px;
    height: 24px;
  }
  button {
    width: 100%;
    text-align: left;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875em;
    letter-spacing: 0.00938em;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 6px 24px 7px 0px;
    border: none;
    background: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    :hover {
      padding-bottom: 6px;
      border-bottom: 2px solid ${colors.black};
    }
    &:focus {
      outline: none;
    }
  }
` as typeof Select;
