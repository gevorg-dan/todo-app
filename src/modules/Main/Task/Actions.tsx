import React from "react";
import styled from "styled-components";

import editIcon from "assets/images/edit.svg";
import deleteIcon from "assets/images/delete.svg";
import upStatusIcon from "assets/images/up-status.svg";
import checkIcon from "assets/images/check.svg";

import ModalWindow from "primitives/Modal/Index";
import Tooltip, { TooltipThemesVariant } from "primitives/Tooltip";
import Button from "primitives/Button";
import ButtonCircularProgress from "primitives/ButtonCircularProgress";

import { TaskModalActions } from "./TaskModalActions";

import useBoolean from "ownHooks/useBoolean";

import { TaskStatus } from "Interfaces";

function ActionsButton(props: {
  className?: string;
  status: TaskStatus;
  modalOpened: boolean;
  updateLoader: boolean;
  deleteLoader: boolean;
  openModal: () => void;
  closeModal: () => void;
  setUpdateLoader: () => void;
  setDeleteLoader: () => void;
  deleteTask: () => void;
  toggleTaskStatus: (status: TaskStatus) => void;
  openEditor: () => void;
}) {
  const {
    className,
    status,
    modalOpened,
    updateLoader,
    deleteLoader,
    openModal,
    closeModal,
    setUpdateLoader,
    setDeleteLoader,
    openEditor,
    deleteTask,
    toggleTaskStatus
  } = props;

  const [loader, setLoader] = useBoolean(false);

  return (
    <div className={className}>
      {status === TaskStatus.active ? (
        <>
          {updateLoader ? (
            <ButtonCircularProgress />
          ) : (
            <Tooltip label="Выполнить" theme={TooltipThemesVariant.button}>
              <Button
                onClick={() => {
                  setUpdateLoader();
                  toggleTaskStatus(TaskStatus.finished);
                }}
                icon={checkIcon}
                disabled={updateLoader || deleteLoader}
              />
            </Tooltip>
          )}

          <Tooltip label="Отменить" theme={TooltipThemesVariant.button}>
            <Button
              onClick={openModal}
              icon={deleteIcon}
              disabled={updateLoader || deleteLoader}
            />
          </Tooltip>
        </>
      ) : (
        <>
          {updateLoader ? (
            <ButtonCircularProgress />
          ) : (
            <Tooltip label="Активировать" theme={TooltipThemesVariant.button}>
              <Button
                onClick={() => {
                  setUpdateLoader();
                  toggleTaskStatus(TaskStatus.active);
                }}
                icon={upStatusIcon}
                disabled={updateLoader || deleteLoader}
              />
            </Tooltip>
          )}
          {deleteLoader ? (
            <ButtonCircularProgress />
          ) : (
            <Tooltip label="Удалить" theme={TooltipThemesVariant.button}>
              <Button
                onClick={() => {
                  setDeleteLoader();
                  deleteTask();
                }}
                icon={deleteIcon}
                disabled={updateLoader || deleteLoader}
              />
            </Tooltip>
          )}
        </>
      )}

      <Tooltip label="Изменить" theme={TooltipThemesVariant.button}>
        <Button
          onClick={openEditor}
          icon={editIcon}
          disabled={updateLoader || deleteLoader}
        />
      </Tooltip>
      <ModalWindow
        isOpen={modalOpened}
        loader={loader}
        title="Что вы хотите сделать?"
        desc="Выберите в какой статус вы хотите перевести текущую задачу."
        onClose={closeModal}
      >
        <TaskModalActions
          loader={loader}
          setLoader={setLoader}
          cancelTask={() => toggleTaskStatus(TaskStatus.canceled)}
          deleteTask={deleteTask}
        />
      </ModalWindow>
    </div>
  );
}

export default styled(ActionsButton)`
  display: flex;
  align-items: flex-end;
  height: ${({ updateLoader, deleteLoader }) =>
    updateLoader || deleteLoader ? "55px" : "0"};
  overflow: hidden;
  transition: all 0.2s;
`;
