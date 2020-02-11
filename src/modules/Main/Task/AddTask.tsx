import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AddButton } from "../../../primitives/Button";
import { colors } from "../../../colors";
import { TasksInterface, TaskStatus } from "Interfaces";
import moment from "moment";

function AddTask(props: {
  className?: string;
  addNewTask: (taskState: TasksInterface) => void;
}) {
  const { className, addNewTask } = props;
  const [textValue, setTextValue] = useState("");
  const [dateValue, setDateValue] = useState(moment());
  const newTask = useRef<TasksInterface>(null);

  function onClick() {
    addNewTask(newTask.current);
    setTextValue("");
    setDateValue(moment());
  }
  useEffect(() => {
    const text = textValue.split(/\n/);

    newTask.current = {
      id: "id",
      title: text[0],
      desc: text.slice(1).join(""),
      date: dateValue.format("D MMMM YYYY"),
      status: TaskStatus.active
    };
  }, [textValue, dateValue]);

  return (
    <div className={className}>
      <textarea
        name="new-task-text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        placeholder="Что вы хотите сделать?"
      />
      <input
        type="date"
        name="new-task-date"
        value={dateValue.format("YYYY-MM-DD")}
        onChange={e => setDateValue(moment(e.target.value))}
      />
      <AddButton onClick={() => onClick()} />
    </div>
  );
}

export default styled(AddTask)`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 5px;
  color: ${colors.gray};
  background-color: ${colors.w};
  width: 100%;
  textarea {
    resize: none;
    width: 55%;
    color: ${colors.dark};
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    padding: 10px;
    background: none;
    animation-name: mui-auto-fill-cancel;
    overflow: hidden;
    height: 95px;
    :hover {
      border-color: ${colors.darkGray};
    }
    :focus {
      padding: 9px;
      outline: none;
      border: 2px solid rgb(25, 118, 210);
      box-sizing: border-box;
    }
  }
  input[type="date"] {
    position: relative;
    border: none;
    border-bottom: 1px solid ${colors.gray};
    padding: 18px 0 3px;
    transition: all 0.4s ease;
    :after {
      position: absolute;
      content: "Выберите дату";
      color: ${colors.gray};
      font-size: 0.63rem;
      left: 0;
      top: 0;
    }
    :hover {
      border-bottom: 2px solid ${colors.darkGray};
      padding-bottom: 2px;
    }
    :focus {
      outline: none;
      padding-bottom: 2px;
      border-bottom: 2px solid rgb(25, 118, 210);
      :after {
        color: rgb(25, 118, 210);
      }
    }
  }
`;
