import React from "react";
import styled from "styled-components";
import { TaskStatus } from "../../../Interfaces";
import {
  EditButton,
  SuccessButton,
  TrashButton
} from "../../../primitives/Button";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  updateTasksState: (newStatus: TaskStatus) => void;
  editor: () => void
}) {
  const { className, status, updateTasksState, editor } = props;
  return (
    <>
      {status === TaskStatus.active ? (
        <div className={className}>
          <SuccessButton
            onClick={() => updateTasksState(TaskStatus.finished)}
          />
          <TrashButton onClick={() => updateTasksState(TaskStatus.canceled)} />
          <EditButton onClick={() => editor()} />
        </div>
      ) : null}
    </>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
`;
