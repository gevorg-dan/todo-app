import React from "react";
import Select, { SelectDates, SelectStatus } from "../../primitives/Select";
import styled from "styled-components";

function Header(props: {
  selectedDate: string;
  setSelectedDate: (newDate: SelectDates) => void;
  selectedStatus: string;
  setSelectedStatus: (newStatus: SelectStatus) => void;
  className?: string;
}) {
  const {
    selectedDate,
    setSelectedDate,
    selectedStatus,
    setSelectedStatus,
    className
  } = props;
  return (
    <div className={className}>
      {/*TODO*/}
      <Select
        label="Выберите дату"
        labelId="date-selector"
        value={selectedDate}
        onChange={(newValue: SelectDates) => setSelectedDate(newValue)}
        options={Object.values(SelectDates)}
      />
      {/*TODO*/}
      <Select
        label="Выберите статус"
        labelId="status-selector"
        value={selectedStatus}
        onChange={(newStatus: SelectStatus) => setSelectedStatus(newStatus)}
        options={Object.values(SelectStatus)}
      />
    </div>
  );
}
export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
  padding: 40px 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
`;
