import React from "react";
import styled from "styled-components";

export const ModalFooter = styled(
  (props: {
    className?: string;
    canceledTask: () => void;
    onClose: () => void;
    deleteTask: () => void;
  }) => {
    const { className, canceledTask, onClose, deleteTask } = props;
    return (
      <div className={className}>
        <button
          onClick={() => {
            canceledTask();
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
    );
  }
)`
  flex: 0 0 auto;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  button.canceled,
  button.delete {
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
  button.delete {
    color: rgba(255, 1, 0, 0.6);
    :hover {
      background-color: rgba(255, 1, 0, 0.03);
    }
  }
`;
