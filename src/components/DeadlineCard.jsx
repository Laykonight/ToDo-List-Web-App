import React from "react";
import { ElementSelect } from "./ElementSelect";

import { NormalButton } from "./NormalButton";

export const DeadlineCard = ({
  mode,
  deadline,
  setDeadline,
  renderYearOptions,
  renderMonthOptions,
  renderDayOptions,
  handleSetDeadline,
  handleSetNoDeadline,
}) => {
  return (
    <>
      <div // Deadline Card
        className={`card rounded-4 my-3 ${mode}`}
        style={{ filter: "drop-shadow(0 0 5px #b2bec3)" }}
      >
        <div className={`card-body`}>
          <h2 // Title
            className="text-center"
          >
            Select Deadline
          </h2>
          <div className="row align-items-center justify-content-center my-2 fs-4">
            <ElementSelect // setting Year
              className="col-4 text-end"
              labelText="Year:"
              mode={mode}
              value={deadline.year}
              onChange={(e) =>
                setDeadline({
                  ...deadline,
                  year: parseInt(e.target.value),
                })
              }
              content={renderYearOptions()}
            />
            <ElementSelect // setting Month
              className="col-4 text-center"
              labelText="Month:"
              mode={mode}
              value={deadline.month}
              onChange={(e) =>
                setDeadline({
                  ...deadline,
                  month: parseInt(e.target.value),
                })
              }
              content={renderMonthOptions()}
            />
            <ElementSelect // setting day
              className="col-4 text-start"
              labelText="Day:"
              mode={mode}
              value={deadline.day}
              onChange={(e) =>
                setDeadline({
                  ...deadline,
                  day: parseInt(e.target.value),
                })
              }
              content={renderDayOptions()}
            />
          </div>
          <div className="row justify-content-evenly pt-2">
            <NormalButton // Set Deadline Button
              mode={mode}
              onClickHandle={handleSetDeadline}
              darkColor="outline-light"
              lightColor="outline-dark"
              className="col-4 fs-4"
            >
              Set Deadline
            </NormalButton>
            <NormalButton // No Deadline Button
              mode={mode}
              onClickHandle={handleSetNoDeadline}
              darkColor="outline-danger"
              lightColor="outline-danger"
              className="col-4 fs-4"
            >
              No Deadline
            </NormalButton>
          </div>
        </div>
      </div>
    </>
  );
};
