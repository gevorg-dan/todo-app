import React from "react";
import styled from "styled-components";
import { TaskStatus } from "../../../Interfaces";
import {
  EditButton,
  SuccessButton,
  TrashButton,
  ActiveTaskButton
} from "../../../primitives/Button";
import ModalWindow from "primitives/Modal";
import useBoolean from "../../../ownHooks/useBoolean";
import Tooltip from "../../../primitives/Tooltip";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  deleteTask: () => void;
  toggleTask: (newStatus: TaskStatus) => void;
  openEditor: () => void;
}) {
  const { className, status, openEditor, deleteTask, toggleTask } = props;
  const [isModalOpen, setIsModalOpenInTrue, setIsModalOpenInFalse] = useBoolean(
    false
  );
  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          <Tooltip label="Выполнить" isBtnTool={true}>
            <SuccessButton onClick={() => toggleTask(TaskStatus.finished)} />
          </Tooltip>

          <Tooltip label="Отменить" isBtnTool={true}>
            <TrashButton onClick={setIsModalOpenInTrue} />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip label="Активировать" isBtnTool={true}>
            <ActiveTaskButton onClick={() => toggleTask(TaskStatus.active)} />
          </Tooltip>

          <Tooltip label="Удалить" isBtnTool={true}>
            <TrashButton onClick={deleteTask} />
          </Tooltip>
        </>
      )}

      <Tooltip label="Изменить" isBtnTool={true}>
        <EditButton onClick={openEditor} />
      </Tooltip>
      <ModalWindow
        updateTasksState={() => toggleTask(TaskStatus.canceled)}
        isOpen={isModalOpen}
        onClose={setIsModalOpenInFalse}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
`;
