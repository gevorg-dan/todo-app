import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AddButton } from "../../../primitives/Button";
import { colors } from "../../../colors";
import { TasksInterface, TaskStatus } from "Interfaces";
import moment from "moment";

function AddTask(props: {
  nextTaskID: number;
  className?: string;
  addNewTask: (taskState: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}) {
  const { className, addNewTask, nextTaskID } = props;
  const [textValue, setTextValue] = useState("");
  const [dateValue, setDateValue] = useState(moment());
  const newTask = useRef<TasksInterface>(null);

  function onClick() {
    addNewTask({ action: "addNew", newState: newTask.current });
    setTextValue("");
    setDateValue(moment());
  }
  useEffect(() => {
    const text = textValue.split(/\n/);

    newTask.current = {
      id: nextTaskID,
      title: text[0],
      desc: text.slice(1).join(""),
      date: dateValue,
      createdDate: moment(),
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
`;
