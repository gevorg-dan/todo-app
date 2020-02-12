import React, { ReactNode } from "react";
import styled from "styled-components";
import { Moment } from "moment";
import { colors } from "../colors";

function Stepper(props: {
  date: Moment;
  className?: string;
  children?: ReactNode;
}) {
  const { date, className, children } = props;
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default styled(Stepper)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .stepper {
    display: flex;
    justify-content: center;
    align-items: center;
    top: -7px;
    left: calc(0px - 50px - 60px);
    content: "";
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #9e9e9e;
    border: 7px solid ${colors.body};
    z-index: 3;
    color: ${colors.white};
    font-size: 1.3rem;
  }
  &:after {
    position: absolute;
    content: "";
    left: calc(0px - 50px - 30px);
    top: -100%;
    width: 2px;
    height: 100%;
    background-color: #9e9e9e;
  }
`;
