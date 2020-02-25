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
import Tooltip, { TooltipThemesVariant } from "primitives/Tooltip";
import TextArea from "primitives/TextArea";

function TaskEditorContainer(props: {
  className?: string;
  value: string;
  dateValue: Moment;
  setValue: (newValue: string) => void;
  setDateValue: (newDate: Moment) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  openEditor: () => void;
}) {
  const {
    className,
    value,
    dateValue,
    setValue,
    setDateValue,
    saveChanges,
    cancelChanges,
    openEditor
  } = props;
  return (
    <div className={className}>
      <TextArea
        value={value}
        onChange={setValue}
        placeholder="Измените задачу..."
      />
      <DatePicker dateValue={dateValue} setDateValue={setDateValue} />
      <EditActions
        cancelChanges={cancelChanges}
        openEditor={openEditor}
        saveChanges={saveChanges}
      />
    </div>
  );
}

const DatePicker = styled(
  (props: {
    className?: string;
    dateValue: Moment;
    setDateValue: (newDate: Moment) => void;
  }) => {
    const { className, dateValue, setDateValue } = props;
    return (
      <div className={className}>
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
    );
  }
)`
  max-width: 30%;
`;

const EditActions = styled(
  (props: {
    className?: string;
    cancelChanges: () => void;
    openEditor: () => void;
    saveChanges: () => void;
  }) => {
    const { className, saveChanges, cancelChanges, openEditor } = props;
    return (
      <div className={className}>
        <Tooltip label="Сбросить" theme={TooltipThemesVariant.button}>
          <Button
            onClick={() => {
              cancelChanges();
              openEditor();
            }}
            icon={closeIcon}
          />
        </Tooltip>
        <Tooltip label="Изменить" theme={TooltipThemesVariant.button}>
          <Button
            onClick={() => {
              saveChanges();
              openEditor();
            }}
            icon={checkIcon}
          />
        </Tooltip>
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default styled(TaskEditorContainer)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;
