import React from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { EditButton } from "../../../primitives/Button";

function TaskEditorContainer(props: {
    value: string;
    dateValue: Moment;
    className?: string;
    setValue: (newValue: string) => void;
    setDateValue: (newDate: Moment) => void;
    saveChanges: () => void;
    editor: () => void;
}) {
    const {
        value,
        dateValue,
        className,
        setValue,
        setDateValue,
        saveChanges,
        editor
    } = props;
    return (
        <div className={className}>
      <textarea
          name="new-task-text"
          value={value}
          onChange={e => setValue(e.target.value)}
      />
            <input
                type="date"
                name="new-task-date"
                value={dateValue.format("YYYY-MM-DD")}
                onChange={e => setDateValue(moment(e.target.value))}
            />
            <EditButton
                onClick={() => {
                    saveChanges();
                    editor();
                }}
            />
        </div>
    );
}

export default styled(TaskEditorContainer)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;