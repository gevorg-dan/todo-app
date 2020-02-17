import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TaskStatus } from "../../../Interfaces";
import {
  EditButton,
  SuccessButton,
  TrashButton,
  UpStatusButton
} from "../../../primitives/Button";
import ModalWindow from "primitives/Modal";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  updateTasksState: (newStatus: TaskStatus) => void;
  deleteTask: () => void;
  editor: () => void;
}) {
  const { className, status, updateTasksState, editor, deleteTask } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          <SuccessButton
            label="Выполнить"
            onClick={() => updateTasksState(TaskStatus.finished)}
          />
          <TrashButton
            label="Отменить"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </>
      ) : (
        <>
          <UpStatusButton
            label="Активировать"
            onClick={() => updateTasksState(TaskStatus.active)}
          />
          <TrashButton label="Удалить" onClick={() => deleteTask()} />
        </>
      )}

      <EditButton label="Изменить" onClick={() => editor()} />
      <ModalWindow
        updateTasksState={updateTasksState}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        deleteTask={() => deleteTask()}
      />
    </div>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
`;
