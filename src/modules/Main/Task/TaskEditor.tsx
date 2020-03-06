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
import ButtonCircularProgress from "primitives/ButtonCircularProgress";

import {dateFormat} from "state/main/requests";

function TaskEditorContainer(props: {
  className?: string;
  value: string;
  dateValue: Moment;
  editLoader: boolean;
  setValue: (newValue: string) => void;
  setDateValue: (newDate: Moment) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  disableEdit: () => void;
}) {
  const {
    className,
    value,
    dateValue,
    editLoader,
    setValue,
    setDateValue,
    saveChanges,
    cancelChanges,
    disableEdit
  } = props;
  return (
    <div className={className}>
      <TextArea
        value={value}
        onChange={setValue}
        placeholder="Измените задачу..."
        disabled={editLoader}
      />
      <DatePicker
        dateValue={dateValue}
        setDateValue={setDateValue}
        disabled={editLoader}
      />
      <EditActions
        editLoader={editLoader}
        cancelChanges={cancelChanges}
        disableEdit={disableEdit}
        saveChanges={saveChanges}
      />
    </div>
  );
}

const DatePicker = styled(
  (props: {
    className?: string;
    dateValue: Moment;
    disabled?: boolean;
    setDateValue: (newDate: Moment) => void;
  }) => {
    const { className, disabled, dateValue, setDateValue } = props;
    return (
      <div className={className}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Изменить дату"
            format={dateFormat}
            value={dateValue}
            onChange={date => setDateValue(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            disabled={disabled}
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
    editLoader: boolean;
    cancelChanges: () => void;
    disableEdit: () => void;
    saveChanges: () => void;
  }) => {
    const {
      className,
      editLoader,
      saveChanges,
      cancelChanges,
      disableEdit
    } = props;
    return (
      <div className={className}>
        {editLoader ? (
          <ButtonCircularProgress />
        ) : (
          <>
            <Tooltip label="Сбросить" theme={TooltipThemesVariant.button}>
              <Button
                onClick={() => {
                  cancelChanges();
                  disableEdit();
                }}
                icon={closeIcon}
              />
            </Tooltip>
            <Tooltip label="Изменить" theme={TooltipThemesVariant.button}>
              <Button
                onClick={() => {
                  saveChanges();
                }}
                icon={checkIcon}
              />
            </Tooltip>
          </>
        )}
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
