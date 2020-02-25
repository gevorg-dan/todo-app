import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import { colors } from "colors";
import addIcon from "assets/images/plus.svg";

import Tooltip from "primitives/Tooltip";
import Button from "primitives/Button";

export interface AddNewTaskInterface {
  (title: string, desc: string, date: Moment): void;
}
const newTaskInitialVal = { title: "", desc: "", date: moment() };
function AddTask(props: {
  className?: string;
  addNewTask: AddNewTaskInterface;
}) {
  const { className, addNewTask } = props;
  const newTask = useRef(newTaskInitialVal);// todo drop
  const [textValue, setTextValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());//TODO оптимизировать

  const addTask = () => {
    const { title, desc, date } = newTask.current;
    addNewTask(title, desc, date);
    setTextValue("");
    setSelectedDate(moment());
  };

  useEffect(() => {
    const text = textValue.split(/\n/);
    newTask.current = {
      title: text[0],
      desc: text.slice(1).join(""),
      date: selectedDate
    };
  }, [textValue, selectedDate]);

  return (
    <div className={className}>
      <textarea
        name="new-task-text"
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
        placeholder="Что вы хотите сделать?"
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Запланировать дату"
          format="DD.MM.YYYY"
          value={selectedDate}
          onChange={date => setSelectedDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
      <Tooltip label="Создать" isBtnTool={true}>
        <Button onClick={addTask} disabled={!textValue} icon={addIcon} />
      </Tooltip>
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
  margin-top: 50px;
`;
