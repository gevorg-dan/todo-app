import React, { ReactNode } from "react";
import styled from "styled-components";

import { colors } from "../colors";

export enum TooltipThemesVariant {
  default = "default",
  button = "button"
}

const tooltipThemes: Record<
  TooltipThemesVariant,
  { width: string; bottom: string; left: string }
> = {
  [TooltipThemesVariant.default]: {
    width: "170px",
    bottom: "70px",
    left: "70px"
  },
  [TooltipThemesVariant.button]: {
    width: "130px",
    bottom: "-30px",
    left: "-37px"
  }
};

interface TooltipInterface {
  className?: string;
  theme?: TooltipThemesVariant;
  label: string | number;
  children: ReactNode;
}

function Tooltip({ className, label, children }: TooltipInterface) {
  return (
    <div className={className}>
      {children}
      <span className="tooltip">
        <i className="tooltip-label">{label}</i>
      </span>
    </div>
  );
}

const StyledTooltip = styled(Tooltip)`
  position: relative;
  .tooltip {
    display: none;
    position: absolute;
    justify-content: center;
    width: ${({ theme }: TooltipInterface) => tooltipThemes[theme].width};
    bottom: ${({ theme }: TooltipInterface) => tooltipThemes[theme].bottom};
    left: ${({ theme }: TooltipInterface) => tooltipThemes[theme].left};
    .tooltip-label {
      font-style: normal;
      padding: 4px 8px;
      background-color: rgb(97, 97, 97);
      color: ${colors.w};
      border-radius: 5px;
      font-size: 0.7rem;
      z-index: 3;
    }
  }
  :hover {
    .tooltip {
      display: flex;
    }
  }
`;

StyledTooltip.defaultProps = {
  theme: TooltipThemesVariant.default
};

export default StyledTooltip;
