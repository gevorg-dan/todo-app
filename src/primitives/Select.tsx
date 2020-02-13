import React, { useState } from "react";
import styled from "styled-components";
import Typography, { TypographyVariant } from "./Typography";
import { colors } from "../colors";

export enum SelectDates {
  today = "Сегодня",
  tomorrow = "Завтра",
  week = "На неделю",
  nextWeek = "На след. неделю",
  month = "На месяц",
  nextMonth = "На след. месяц",
  all = "Все"
}

export enum SelectStatus {
  active = "Активные",
  finished = "Выполненные",
  canceled = "Не выполненные",
  all = "Все"
}

function Select(props: {
  label: string;
  labelId: string;
  options: string[];
  value?: string;
  className?: string;
  //TODO
  onChange: (selectValue: any) => void;
}) {
  const { label, labelId, value, options, className, onChange } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={className} id={labelId}>
      <button onClick={() => setOpen(!open)}>
        {value}
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
        <div className="collapsed-list">
          {
            <ul>
              {options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className={option === value ? "selected" : ""}
                    onClick={e => {
                      onChange(e.currentTarget.textContent);
                      setOpen(!open);
                    }}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          }
        </div>
      )}
      <Typography variant={TypographyVariant.caption} className="select-label">
        {label}
      </Typography>
    </div>
  );
}

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
  & .collapsed-list {
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
  }
`;
