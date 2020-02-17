import React from "react";
import styled from "styled-components";
import { Moment } from "moment";
import { CloseButton, SuccessButton } from "../../../primitives/Button";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

function TaskEditorContainer(props: {
  value: string;
  dateValue: Moment;
  className?: string;
  setValue: (newValue: string) => void;
  setDateValue: (newDate: Moment) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  editor: () => void;
}) {
  const {
    value,
    dateValue,
    className,
    setValue,
    setDateValue,
    saveChanges,
    cancelChanges,
    editor
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
        <CloseButton
          label="Сбросить"
          onClick={() => {
            cancelChanges();
            editor();
          }}
        />
        <SuccessButton
          label="Изменить"
          onClick={() => {
            saveChanges();
            editor();
          }}
        />
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
