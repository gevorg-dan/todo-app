import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import { colors } from "colors";
import addIcon from "assets/images/plus.svg";

import ButtonCircularProgress from "primitives/ButtonCircularProgress";
import Tooltip, { TooltipThemesVariant } from "primitives/Tooltip";
import Button from "primitives/Button";
import TextArea from "primitives/TextArea";

import { setTaskTextAndDate } from "./setTaskTextAndDate";
import { CreateTaskActionType } from "state/main/requests";

const todayDate = moment();
const newTask = { title: "", desc: "", date: todayDate };

function AddTask(props: {
  className?: string;
  createLoading: boolean;
  createTask: (payload: CreateTaskActionType) => void;
}) {
  const { className, createLoading, createTask } = props;
  const [textValue, setTextValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Moment>(todayDate);

  const addTask = () => {
    const { title, desc, date } = newTask;
    createTask({ title, desc, date: date.format("DD.MM.YYYY") });
    setTextValue("");
    setSelectedDate(todayDate);
  };

  useEffect(() => {
    setTaskTextAndDate(newTask, textValue, selectedDate);
  }, [textValue, selectedDate]);

  return (
    <div className={className}>
      <TextArea
        value={textValue}
        onChange={setTextValue}
        disabled={createLoading}
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
          disabled={createLoading}
        />
      </MuiPickersUtilsProvider>
      {createLoading ? (
        <ButtonCircularProgress />
      ) : (
        <Tooltip label="Создать" theme={TooltipThemesVariant.button}>
          <Button onClick={addTask} disabled={!textValue} icon={addIcon} />
        </Tooltip>
      )}
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
