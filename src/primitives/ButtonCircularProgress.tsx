import React from "react";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

function ButtonCircularProgress({ className }: { className?: string }) {
  return (
    <div className={className}>
      <CircularProgress />
    </div>
  );
}

export default styled(ButtonCircularProgress)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 48px;
`;
