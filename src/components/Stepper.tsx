import React, { ReactNode } from "react";
import styled from "styled-components";
import { Moment } from "moment";
import { colors } from "../colors";
import Typography, { TypographyVariant } from "../primitives/Typography";

function Stepper(props: {
  date: Moment;
  tooltipLabel: string;
  className?: string;
  children?: ReactNode;
}) {
  const { date, tooltipLabel, className, children } = props;
  return (
    <div className={className}>
      <Typography variant={TypographyVariant.caption} className="bubble">
        {date.format("D MMM")}
        <span className="tooltip">{tooltipLabel}</span>
      </Typography>
      {children}
    </div>
  );
}

export default styled(Stepper)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 30px;
  :first-of-type {
    &:after {
      height: 0;
    }
  }
  .bubble {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${colors.gray};
    color: ${colors.white};
    font-size: 0.75rem;
    cursor: pointer;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    z-index: 2;

    .tooltip {
      display: none;
      position: absolute;
      bottom: calc(0px + 70px);
      left: calc(0px + 70px);
      padding: 4px 8px;
      max-width: 170px;
      background-color: rgb(97, 97, 97);
      color: ${colors.w};
      border-radius: 5px;
      font-size: 0.7rem;
      z-index: 3;
    }
    :hover {
      .tooltip {
        display: block;
      }
    }
  }
  &:after {
    position: absolute;
    content: "";
    left: calc(0px + 35px);
    top: calc(0px - 20px);
    width: 1.5px;
    height: calc(100% - 60px);
    background-color: ${colors.gray};
  }
`;
