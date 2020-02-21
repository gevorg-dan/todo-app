import React from "react";
import styled from "styled-components";
import { Moment } from "moment";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import closeIcon from "assets/images/close.svg";
import checkIcon from "assets/images/check.svg";

import Button from "primitives/Button";
import Tooltip from "primitives/Tooltip";

function TaskEditorContainer(props: {
  value: string;
  dateValue: Moment;
  className?: string;
  setValue: (newValue: string) => void;
  setDateValue: (newDate: Moment) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  openEditor: () => void;
}) {
  const {
    value,
    dateValue,
    className,
    setValue,
    setDateValue,
    saveChanges,
    cancelChanges,
    openEditor
  } = props;
  return (
    <div className={className}>
      <textarea
        name="new-task-text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className="date-picker">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Изменить дату"
            format="DD.MM.YYYY"
            value={dateValue}
            onChange={date => setDateValue(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="edit-actions">
        <Tooltip label="Сбросить" isBtnTool={true}>
          <Button
            onClick={() => {
              cancelChanges();
              openEditor();
            }}
            icon={closeIcon}
          />
        </Tooltip>
        <Tooltip label="Изменить" isBtnTool={true}>
          <Button
            onClick={() => {
              saveChanges();
              openEditor();
            }}
            icon={checkIcon}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default styled(TaskEditorContainer)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  .date-picker {
    max-width: 30%;
  }
  .edit-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
`;
