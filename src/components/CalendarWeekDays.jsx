import React from "react";

export const CalendarWeekDays = ({ mode }) => {
  return (
    <>
      <div
        className={`row 
                    align-items-center 
                    justify-content-center
                    fs-4
                    ${mode}`}
      >
        <div className="cal-weekday col">Sun</div>
        <div className="cal-weekday col">Mon</div>
        <div className="cal-weekday col">Tue</div>
        <div className="cal-weekday col">Wed</div>
        <div className="cal-weekday col">Thu</div>
        <div className="cal-weekday col">Fri</div>
        <div className="cal-weekday col">Sat</div>
      </div>
    </>
  );
};
