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
      height: 100%;
    }
  }
  .bubble {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    background-color: ${colors.gray};
    border: 8px solid ${colors.w};
    color: ${colors.white};
    font-size: 0.75rem;
    cursor: pointer;
    z-index: 2;
    .tooltip {
      display: none;
      position: absolute;
      bottom: calc(0px + 70px);
      left: calc(0px + 70px);
      padding: 4px 8px;
      max-width: 170px;
      background-color: rgba(97, 97, 97, 0.9);
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
    left: calc(0px + 39px - 1px);
    width: 2px;
    height: calc(100% + 50px);
    background-color: ${colors.gray};
  }
`;
