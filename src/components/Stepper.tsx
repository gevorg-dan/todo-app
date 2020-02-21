import React, { ReactNode } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import Typography, { TypographyVariant } from "primitives/Typography";
import Tooltip from "primitives/Tooltip";

import { colors } from "colors";

function Stepper(props: {
  date: Moment;
  tooltipLabel: string;
  className?: string;
  children?: ReactNode;
}) {
  const { date, tooltipLabel, className, children } = props;
  return (
    <div className={className}>
      <Tooltip label={tooltipLabel}>
        <Typography variant={TypographyVariant.caption} className="bubble">
          {date.format("D MMM")}
        </Typography>
      </Tooltip>
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
    cursor: default;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    transition: all 0.1s ease-in;
    z-index: 2;
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
