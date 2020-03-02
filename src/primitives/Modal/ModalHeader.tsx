import React from "react";
import styled from "styled-components";

import Typography, { TypographyVariant } from "../Typography";

import closeIcon from "assets/images/close.svg";

export const ModalHeader = styled(
  ({ className, title, onClose }: { className?: string; title: string; onClose: () => void }) => {
    return (
      <div className={className}>
        <Typography variant={TypographyVariant.subtitle}>
          {title}
        </Typography>
        <button onClick={() => onClose()} className="close" />
      </div>
    );
  }
)`
  display: flex;
  padding: 16px 24px;
  flex: 0 0 auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & .close {
    width: 15px;
    height: 15px;
    background: url(${closeIcon}) no-repeat center/ cover;
  }
`;
