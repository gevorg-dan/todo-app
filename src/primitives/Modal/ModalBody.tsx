import React from "react";
import styled from "styled-components";

import Typography from "../Typography";

export const ModalBody = styled(
  ({ className, desc }: { className?: string; desc?: string }) => {
    return (
      <div className={className}>
        <Typography>{desc}</Typography>
      </div>
    );
  }
)`
  flex: 1 1 auto;
  padding: 8px 24px;
  overflow-y: auto;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  margin-bottom: 12px;
`;
