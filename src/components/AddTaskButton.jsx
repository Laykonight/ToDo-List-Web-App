import React from "react";
import { StyledButton } from "./StyledButton";
import {
  colorDipDarkBlue,
  colorBoneWhite,
  colorBlue,
  colorLightBlue,
} from "./Utils";

export const AddTaskButton = ({ mode, handleAddTask, className }) => {
  return (
    <>
      {mode === "dark-mode" ? (
        <StyledButton // Button in Dark Mode
          className={`px-4 my-3 fw-bolder fs-4 rounded-4 ${className}`}
          buttonStyle="primary"
          backgroundColor={`${colorBlue}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          onClick={(e) => {
            handleAddTask(e.target.value);
          }}
          text="Add Task"
        />
      ) : (
        <StyledButton // Button in Light Mode
          className={`px-4 my-3 fw-bolder fs-4 rounded-4 ${className}`}
          buttonStyle="primary"
          backgroundColor={`${colorLightBlue}`}
          color={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          onClick={(e) => {
            handleAddTask(e.target.value);
          }}
          text="Add Task"
        />
      )}
    </>
  );
};
