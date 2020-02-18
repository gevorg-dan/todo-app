import React, { useState } from "react";
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
  deleteTask: () => void;
  toggleTask: (newStatus: TaskStatus) => void;
  editor: () => void;
}) {
  const {
    className,
    status,
    editor,
    deleteTask,
    toggleTask
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          <SuccessButton
            label="Выполнить"
            onClick={() => toggleTask(TaskStatus.finished)}
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
            onClick={() => toggleTask(TaskStatus.active)}
          />
          <TrashButton label="Удалить" onClick={() => deleteTask()} />
        </>
      )}

      <EditButton label="Изменить" onClick={() => editor()} />
      <ModalWindow
        updateTasksState={() => toggleTask(TaskStatus.canceled)}
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
