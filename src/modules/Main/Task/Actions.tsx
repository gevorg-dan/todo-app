import React from "react";
import styled from "styled-components";

import editIcon from "assets/images/edit.svg";
import deleteIcon from "assets/images/delete.svg";
import upStatusIcon from "assets/images/up-status.svg";
import checkIcon from "assets/images/check.svg";

import ModalWindow from "primitives/Modal/Index";
import Tooltip, { TooltipThemesVariant } from "primitives/Tooltip";
import Button from "primitives/Button";

import useBoolean from "ownHooks/useBoolean";

import { TaskStatus } from "Interfaces";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  deleteTask: () => void;
  toggleTaskStatus: (newStatus: TaskStatus) => void;
  openEditor: () => void;
}) {
  const { className, status, openEditor, deleteTask, toggleTaskStatus } = props;
  const [modalOpened, openModal, closeModal] = useBoolean(false);
  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          <Tooltip label="Выполнить" theme={TooltipThemesVariant.button}>
            <Button
              onClick={() => toggleTaskStatus(TaskStatus.finished)}
              icon={checkIcon}
            />
          </Tooltip>

          <Tooltip label="Отменить" theme={TooltipThemesVariant.button}>
            <Button onClick={openModal} icon={deleteIcon} />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip label="Активировать" theme={TooltipThemesVariant.button}>
            <Button
              onClick={() => toggleTaskStatus(TaskStatus.active)}
              icon={upStatusIcon}
            />
          </Tooltip>

          <Tooltip label="Удалить" theme={TooltipThemesVariant.button}>
            <Button onClick={deleteTask} icon={deleteIcon} />
          </Tooltip>
        </>
      )}

      <Tooltip label="Изменить" theme={TooltipThemesVariant.button}>
        <Button onClick={openEditor} icon={editIcon} />
      </Tooltip>
      <ModalWindow
        canceledTask={() => toggleTaskStatus(TaskStatus.canceled)}
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
