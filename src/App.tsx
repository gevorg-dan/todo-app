import React from "react";
import styled from "styled-components";
import { EditButton, SuccessButton, TrashButton } from "./primitives/Button";
const App = (props: { className?: string }) => {
  return (
    <div className={props.className}>
      <EditButton onClick={() => console.log} />
      <SuccessButton onClick={() => console.log} />
      <TrashButton onClick={() => console.log} />
    </div>
  );
};

export default styled(App)`
  width: 200px;
  display: flex;
  flex-direction: row;
`;
