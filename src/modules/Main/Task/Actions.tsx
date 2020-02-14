import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TaskStatus } from "../../../Interfaces";
import {
  EditButton,
  SuccessButton,
  TrashButton
} from "../../../primitives/Button";
import ModalWindow from "primitives/Modal";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  updateTasksState: (newStatus: TaskStatus) => void;
  editor: () => void;
}) {
  const { className, status, updateTasksState, editor } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={className}>
      {status === TaskStatus.active && (
        <>
          <SuccessButton
            onClick={() => updateTasksState(TaskStatus.finished)}
          />
          <TrashButton onClick={() => setIsModalOpen(!isModalOpen)} />
        </>
      )}

      <EditButton onClick={() => editor()} />
      <ModalWindow
        updateTasksState={updateTasksState}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </div>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
`;
