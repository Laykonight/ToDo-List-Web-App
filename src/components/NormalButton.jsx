import React from "react";
import { StyledButton } from "./StyledButton";
import { colorDipDarkBlue, colorBoneWhite } from "./Utils";

export const NormalButton = ({
  mode,
  onClickHandle,
  darkColor,
  lightColor,
  children,
  className,
}) => {
  return (
    <>
      {mode === "dark-mode" ? (
        <StyledButton // Button in Dark Mode
          className={`rounded-3 ${className}`}
          buttonStyle={`${darkColor}`}
          backgroundColor={`${colorDipDarkBlue}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          onClick={onClickHandle}
          text={children}
        />
      ) : (
        <StyledButton // Button in Light Mode
          className={`rounded-3 ${className}`}
          buttonStyle={`${lightColor}`}
          backgroundColor="white"
          color={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          onClick={onClickHandle}
          text={children}
        />
      )}
    </>
  );
};
