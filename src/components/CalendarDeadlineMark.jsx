import React from "react";

export const CalendarDeadlineMark = ({ mode, isInThePast }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50"
        fill={
          isInThePast()
            ? mode === "dark-mode"
              ? "#b02a37"
              : "#ea868f"
            : mode === "dark-mode"
            ? "#0a58ca"
            : "#6ea8fe"
        }
        className="bi bi-dot ms-1 mt-1 position-absolute start-0 top-0"
        viewBox="5 5 16 16"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      </svg>
    </>
  );
};
