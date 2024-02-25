import React from "react";
import { NormalButton } from "./NormalButton";

export const PriorityButton = ({
  mode,
  name,
  selectLowPriority,
  selectmidPriority,
  selectHighPriority,
  darkColorButton,
  lightColorButton,
  case1,
  case2,
  case3,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div className="dropdown">
        {mode == "dark-mode" ? (
          <>
            <button // Dropdown Button
              type="button"
              className={`btn btn-${darkColorButton} dropdown-toggle px-4 my-3 fw-bolder fs-4 rounded-4`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: "#2d3250",
                color: "#f5e8c7",
                transition: "box-shadow 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 10px #f5e8c7")
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {name}
            </button>
            <ul
              className={`dropdown-menu custom-dropdown-width text-center ${mode}`}
              style={{
                filter: "drop-shadow(0 0 8px #b2bec3)",
              }}
            >
              <li>
                <NormalButton // low priority button
                  mode={mode}
                  onClickHandle={selectLowPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 mx-3"
                >
                  {case1}
                </NormalButton>
              </li>
              <li>
                <NormalButton // middle priority button
                  mode={mode}
                  onClickHandle={selectmidPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 my-3 mx-3"
                >
                  {case2}
                </NormalButton>
              </li>
              <li>
                <NormalButton // high priority button
                  mode={mode}
                  onClickHandle={selectHighPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 mx-3"
                >
                  {case3}
                </NormalButton>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`btn btn-${lightColorButton} dropdown-toggle px-4 my-3 fw-bolder fs-4 rounded-4`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: "white",
                color: "#2d3250",
                transition: "box-shadow 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 10px #2d3250")
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {name}
            </button>
            <ul
              className={`dropdown-menu custom-dropdown-width text-center ${mode}`}
              style={{
                filter: "drop-shadow(0 0 8px #b2bec3)",
              }}
            >
              <li>
                <NormalButton // low priority button
                  mode={mode}
                  onClickHandle={selectLowPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 mx-3"
                >
                  {case1}
                </NormalButton>
              </li>
              <li>
                <NormalButton // middle priority button
                  mode={mode}
                  onClickHandle={selectmidPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 my-3 mx-3"
                >
                  {case2}
                </NormalButton>
              </li>
              <li>
                <NormalButton // high priority button
                  mode={mode}
                  onClickHandle={selectHighPriority}
                  darkColor="outline-light"
                  lightColor="outline-dark"
                  className="fs-4 mx-3"
                >
                  {case3}
                </NormalButton>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
