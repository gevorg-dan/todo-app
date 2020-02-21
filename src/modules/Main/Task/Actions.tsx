import React from "react";
import styled from "styled-components";
import { TaskStatus } from "../../../Interfaces";
import ModalWindow from "primitives/Modal";
import useBoolean from "../../../ownHooks/useBoolean";
import Tooltip from "../../../primitives/Tooltip";
import Button from "../../../primitives/Button";
import editIcon from "assets/images/edit.svg";
import deleteIcon from "assets/images/delete.svg";
import upStatusIcon from "assets/images/up-status.svg";
import checkIcon from "assets/images/check.svg";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  deleteTask: () => void;
  toggleTask: (newStatus: TaskStatus) => void;
  openEditor: () => void;
}) {
  const { className, status, openEditor, deleteTask, toggleTask } = props;
  const [modalOpened, openModal, closeModal] = useBoolean(false);
  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          <Tooltip label="Выполнить" isBtnTool={true}>
            <Button
              onClick={() => toggleTask(TaskStatus.finished)}
              icon={checkIcon}
            />
          </Tooltip>

          <Tooltip label="Отменить" isBtnTool={true}>
            <Button onClick={openModal} icon={deleteIcon} />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip label="Активировать" isBtnTool={true}>
            <Button
              onClick={() => toggleTask(TaskStatus.active)}
              icon={upStatusIcon}
            />
          </Tooltip>

          <Tooltip label="Удалить" isBtnTool={true}>
            <Button onClick={deleteTask} icon={deleteIcon} />
          </Tooltip>
        </>
      )}

      <Tooltip label="Изменить" isBtnTool={true}>
        <Button onClick={openEditor} icon={editIcon} />
      </Tooltip>
      <ModalWindow
        updateTasksState={() => toggleTask(TaskStatus.canceled)}
        isOpen={modalOpened}
        onClose={closeModal}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
`;
