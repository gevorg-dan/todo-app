import React from "react";
import Select from "../../primitives/Select";
import styled from "styled-components";
import {
  SelectDates,
  SelectStatus
} from "../../reducers/visibilityFiltersReducer";

export const selectDatesMap = new Map([
  [SelectDates.SHOW_TODAY, "Сегодня"],
  [SelectDates.SHOW_TOMORROW, "Завтра"],
  [SelectDates.SHOW_WEEK, "На неделю"],
  [SelectDates.SHOW_NEXT_WEEK, "На след. неделю"],
  [SelectDates.SHOW_MONTH, "На месяц"],
  [SelectDates.SHOW_NEXT_MONTH, "На след. месяц"],
  [SelectDates.SHOW_All, "Все"]
]);
export const selectStatusMap = new Map([
  [SelectStatus.SHOW_ACTIVE, "Активные"],
  [SelectStatus.SHOW_FINISHED, "Выполненные"],
  [SelectStatus.SHOW_CANCELED, "Отмененные"],
  [SelectStatus.SHOW_ALL, "Все"]
]);

function getSelectOptions<T>(map: Map<T, string>) {
  const result = [];
  for (let [key, value] of map.entries()) {
    result.push({ title: value, code: key });
  }
  return result;
}

function Header(props: {
  currentDate: SelectDates;
  currentStatus: SelectStatus;
  setFilterByDate: (value: SelectDates) => void;
  setFilterByStatus: (value: SelectStatus) => void;
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
        currentValue={currentDate}
        onChange={setFilterByDate}
        options={getSelectOptions(selectDatesMap)}
      />
      <Select
        label="Выберите статус"
        labelId="status-selector"
        currentValue={currentStatus}
        onChange={setFilterByStatus}
        options={getSelectOptions(selectStatusMap)}
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
