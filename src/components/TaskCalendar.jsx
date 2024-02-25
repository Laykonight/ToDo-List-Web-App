import React, { useState } from "react";

import { NormalButton } from "./NormalButton";
import { DayCard } from "./DayCard";

import { CalendarWeekDays } from "./CalendarWeekDays";
import { CalendarMonthsSelector } from "./CalendarMonthsSelector";
import { YearCard } from "./YearCard";
import { CalendarDeadlineMark } from "./CalendarDeadlineMark";
import { currentDate, isInThePast, hasDeadline } from "./Utils";

export const TaskCalendar = ({ mode, className, tasks }) => {
  //---------------------------------------------------------------------------------------
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [showYearCard, setShowYearCard] = useState(false);
  //---------------------------------------------------------------------------------------
  const toggleYearCard = () => {
    setShowYearCard(!showYearCard);
  };
  //---------------------------------------------------------------------------------------
  const changeMonth = (increment) => {
    const newMonth = (selectedMonth + increment + 12) % 12; // Ensure it wraps around
    const newYear = selectedYear + Math.floor((selectedMonth + increment) / 12);

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  //---------------------------------------------------------------------------------------
  const getDaysInMonth = () => {
    // Creates a Date object representing the first day of the selected month.
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    // Creates a Date object representing the last day of the selected month by setting the day to 0 of the next month.
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
    // giving the total number of days in the selected month.
    const daysInMonth = lastDayOfMonth.getDate();
    // Retrieves the day of the week (0 for Sunday, 1 for Monday, and so on) for the first day of the selected month.
    const startingDayOfWeek = firstDayOfMonth.getDay();
    return { daysInMonth, startingDayOfWeek };
  };
  //---------------------------------------------------------------------------------------
  const generateWeek = (days, rowIndex, startingDayOfWeek) => {
    const week = [];

    // Fill the gap at the beginning of the row with empty days
    for (let i = 0; i < startingDayOfWeek; i++) {
      week.push(<div key={`empty-${i}`} className={`col m-1 empty`}></div>);
    }

    // Fill the rest of the week with real or empty days
    for (let i = 0; i < 7 - startingDayOfWeek; i++) {
      if (days.length > 0) {
        const day = days.shift();
        // console.log(day);
        week.push(
          hasDeadline(tasks, day, selectedMonth, selectedYear) ? (
            <DayCard
              key={`day-${rowIndex}-${i}`}
              mode={mode}
              className="col m-1 fs-5 position-relative"
            >
              <CalendarDeadlineMark // Calendar Deadline mark
                mode={mode}
                isInThePast={() =>
                  isInThePast(day, selectedMonth, selectedYear)
                }
              />
              {day}
            </DayCard>
          ) : (
            <DayCard
              key={`day-${rowIndex}-${i}`}
              mode={mode}
              className="col m-1 fs-5 position-relative"
            >
              {day}
            </DayCard>
          )
        );
      } else {
        week.push(<div key={`empty-${i}`} className={`col m-1 empty`}></div>);
      }
    }

    return (
      <div
        key={`week-${rowIndex}`}
        className="row align-items-center justify-content-center text-center"
      >
        {week}
      </div>
    );
  };
  //---------------------------------------------------------------------------------------
  const renderDays = () => {
    // Get the number of days in the selected month and the starting day of the week
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth();

    // Create an array of days from 1 to `daysInMonth`
    let days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Determine the number of full rows needed
    const fullRows = Math.ceil((days.length + startingDayOfWeek) / 7);

    // Create an array to represent the rows
    const rows = [];

    // Fill the first week with empty days and actual days
    rows.push(generateWeek(days, 0, startingDayOfWeek));

    // Loop to fill weeks with days
    for (let rowIndex = 1; rowIndex < fullRows; rowIndex++) {
      if (days.length === 0) break; // Stop if there are no more days
      rows.push(generateWeek(days, rowIndex, 0));
    }

    return <div className="cal-days container">{rows}</div>;
  };
  //---------------------------------------------------------------------------------------
  return (
    <div
      className={`${className}`}
      style={{
        width: "800px",
        maxWidth: "100%",
      }}
    >
      <div
        className={`container p-4 me-5 align-items-start justify-content-center`}
      >
        <div
          className={`card shadow rounded-4 ${mode}`}
          style={{ filter: "drop-shadow(0 0 5px #b2bec3)" }}
        >
          <div className="d-grid gap-1">
            <div className={`cal container text-center `}>
              <div
                className="row justify-content-center mb-2"
                style={{ position: "relative" }}
              >
                <NormalButton //Year Selection Button
                  mode={mode}
                  onClickHandle={toggleYearCard}
                  darkColor="outline-dark"
                  lightColor="outline-light"
                  className="col-auto fs-5 mt-3 fw-bold"
                  style={{ border: "none" }}
                >
                  {selectedYear}
                </NormalButton>
                {showYearCard && (
                  <YearCard
                    mode={mode}
                    selectedYear={selectedYear}
                    onChange={setSelectedYear}
                    onClose={toggleYearCard}
                    onSave={toggleYearCard}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                      width: "100%",
                    }}
                  />
                )}
              </div>

              <CalendarMonthsSelector // Month Selector
                mode={mode}
                onClickHandleBack={() => changeMonth(-1)}
                onClickHandleForward={() => changeMonth(1)}
              >
                <strong className={`cal-month-name col-auto fs-4 ${mode}`}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                  }).format(new Date(selectedYear, selectedMonth, 1))}
                </strong>
              </CalendarMonthsSelector>
              <CalendarWeekDays mode={mode} className="" />
              <div className="my-3">{renderDays()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
