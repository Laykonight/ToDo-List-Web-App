import React from "react";
import { NormalButton } from "./NormalButton";

export const CalendarMonthsSelector = ({
  mode,
  onClickHandleBack,
  onClickHandleForward,
  children,
  className,
}) => {
  return (
    <>
      <div
        className="month
                  row
                  justify-content-center"
      >
        <NormalButton // Month Back Button
          mode={mode}
          onClickHandle={onClickHandleBack}
          darkColor="outline-light"
          lightColor="outline-dark"
          className="col-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </NormalButton>
        {children}
        <NormalButton
          mode={mode}
          onClickHandle={onClickHandleForward}
          darkColor="outline-light"
          lightColor="outline-dark"
          className="col-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </NormalButton>
      </div>
    </>
  );
};
