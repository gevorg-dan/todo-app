import React from "react";
import styled from "styled-components";

import ButtonCircularProgress from "primitives/ButtonCircularProgress";

export const TaskModalActions = styled(
  (props: {
    className?: string;
    loader: boolean;
    setLoader: () => void;
    cancelTask: () => void;
    deleteTask: () => void;
  }) => {
    const { className, loader, setLoader, cancelTask, deleteTask } = props;

    return (
      <div className={className}>
        {loader ? <ButtonCircularProgress /> : null}
        <button
          onClick={() => {
            setLoader();
            cancelTask();
          }}
          disabled={loader}
          className="canceled"
        >
          Отменить
        </button>
        <button
          onClick={() => {
            setLoader();
            deleteTask();
          }}
          className="delete"
          disabled={loader}
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
  height: 50px;

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
    :disabled {
      display: none;
    }
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
