import React from "react";
import { StyledButton } from "./StyledButton";
import {
  colorDipDarkBlue,
  colorBoneWhite,
  colorGreen,
  colorLightGreen,
} from "./Utils";

export const SaveButton = ({ mode, handleSaveTask, className }) => {
  return (
    <>
      {mode === "dark-mode" ? (
        <StyledButton // Button in Dark Mode
          className={`btn-sm ms-5 px-3 fs-4 rounded-3 ${className}`}
          buttonStyle="outline-success"
          backgroundColor={`${colorGreen}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          onClick={(e) => {
            handleSaveTask(e.target.value);
          }}
          text="Save"
        />
      ) : (
        <StyledButton // Button in Light Mode
          className={`btn-sm ms-5 px-3 fs-4 rounded-3 ${className}`}
          buttonStyle="outline-success"
          backgroundColor={`${colorLightGreen}`}
          color={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          onClick={(e) => {
            handleSaveTask(e.target.value);
          }}
          text="Save"
        />
      )}
    </>
  );
};
