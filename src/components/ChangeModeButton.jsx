import React from "react";
import { StyledButton } from "./StyledButton";
import { colorDipDarkBlue, colorBoneWhite } from "./Utils";

export const ChangeModeButton = ({
  mode,
  onClickHandle,
  darkModeContent,
  lightModeContent,
  className,
}) => {
  return (
    <>
      {mode == "dark-mode" ? (
        <StyledButton // Button in Dark Mode
          className={`rounded-3 ${className}`}
          buttonStyle="outline-light"
          backgroundColor={`${colorDipDarkBlue}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          onClick={onClickHandle}
          text={darkModeContent}
        />
      ) : (
        <StyledButton // Button in Dark Mode
          className={`rounded-3 ${className}`}
          buttonStyle="outline-dark"
          backgroundColor="white"
          color={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          onClick={onClickHandle}
          text={lightModeContent}
        />
      )}
    </>
  );
};
