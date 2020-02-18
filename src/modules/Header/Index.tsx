import React from "react";
import Select from "../../primitives/Select";
import styled from "styled-components";
import {
  SelectDates,
  SelectStatus
} from "../../reducers/visibilityFiltersReducer";

export const selectDatesMap = {
  [SelectDates.SHOW_TODAY]: "Сегодня",
  [SelectDates.SHOW_TOMORROW]: "Завтра",
  [SelectDates.SHOW_WEEK]: "На неделю",
  [SelectDates.SHOW_NEXT_WEEK]: "На след. неделю",
  [SelectDates.SHOW_MONTH]: "На месяц",
  [SelectDates.SHOW_NEXT_MONTH]: "На след. месяц",
  [SelectDates.SHOW_All]: "Все"
};
export const SelectStatusMap = {
  [SelectStatus.SHOW_ACTIVE]: "Активные",
  [SelectStatus.SHOW_FINISHED]: "Выполненные",
  [SelectStatus.SHOW_CANCELED]: "Отмененные",
  [SelectStatus.SHOW_ALL]: "Все"
};

function Header(props: {
  currentDate: SelectDates;
  currentStatus: SelectStatus;
  setFilterByDate: (filter: string) => void;
  setFilterByStatus: (filter: string) => void;
  className?: string;
}) {
  const {
    currentDate,
    currentStatus,
    setFilterByDate,
    setFilterByStatus,
    className
  } = props;
  return (
    <div className={className}>
      <Select
        label="Выберите дату"
        labelId="date-selector"
        currentValue={selectDatesMap[currentDate]}
        onChange={setFilterByDate}
        options={Object.entries(selectDatesMap).map(filter => {
          return { title: filter[1], code: filter[0] };
        })}
      />
      <Select
        label="Выберите статус"
        labelId="status-selector"
        currentValue={SelectStatusMap[currentStatus]}
        onChange={setFilterByStatus}
        options={Object.entries(SelectStatusMap).map(filter => {
          return { title: filter[1], code: filter[0] };
        })}
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
