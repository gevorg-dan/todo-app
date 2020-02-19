import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { TaskStatus } from "../Interfaces";
import closeIcon from "./images/close.svg";
import OnClickOutside from "./OnClickOutside";

function ModalWindow(props: {
  isOpen: boolean;
  className?: string;
  updateTasksState: (newStatus: TaskStatus) => void;
  deleteTask: () => void;
  onClose: () => void;
}) {
  const { isOpen, className, updateTasksState, onClose, deleteTask } = props;

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = "17px";
    }
    return () => {
      body.style.overflow = "auto";
      body.style.paddingRight = "0";
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div className={className}>
          <OnClickOutside onClick={() => onClose()}>
            <div className="box-dialog">
              <div className="box-header">
                <h4 className="box-title">Что вы хотите сделать?</h4>
                <button onClick={() => onClose()} className="close" />
              </div>
              <div className="box-body">
                <p className="box-desc">
                  Выберите в какой статус вы хотите перевести текущую задачу.
                </p>
              </div>
              <div className="box-footer">
                <button
                  onClick={() => {
                    updateTasksState(TaskStatus.canceled);
                    onClose();
                  }}
                  className="canceled"
                >
                  Отменить
                </button>
                <button
                  onClick={() => {
                    deleteTask();
                    onClose();
                  }}
                  className="delete"
                >
                  Удалить
                </button>
              </div>
            </div>
          </OnClickOutside>
        </div>
      )}
    </>,
    document.getElementById("root")
  );
}

export default styled(ModalWindow)`
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  position: fixed;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  & .box-dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 40%;
    max-width: 700px;
    background-color: white;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    & button {
      outline: none;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .box-header {
      display: flex;
      padding: 16px 24px;
      flex: 0 0 auto;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .body-title {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.6;
        letter-spacing: 0.0075em;
      }
      button.close {
        width: 10px;
        height: 10px;
        background: url(${closeIcon}) no-repeat center/ cover;
      }
    }

    .box-body {
      flex: 1 1 auto;
      padding: 8px 24px;
      overflow-y: auto;
      .box-desc {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.54);
      }
    }

    .box-footer {
      flex: 0 0 auto;
      display: flex;
      padding: 8px;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      & button {
        font-size: 0.8rem;
        min-width: 64px;
        padding: 6px 8px;
        color: #1976d2;
        margin-left: 8px;
        background: none;
        border: none;
        font-weight: 600;
        border-radius: 4px;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        :hover {
          background-color: #f6fafd;
        }
      }
      & button.delete {
        color: rgba(255, 1, 0, 0.6);
        :hover {
          background-color: rgba(255, 1, 0, 0.03);
        }
      }
    }
  }
`;
