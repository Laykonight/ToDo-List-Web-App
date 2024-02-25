import React from "react";
import { StyledButton } from "./StyledButton";
import {
  colorDipDarkBlue,
  colorBoneWhite,
  colorRed,
  colorLightRed,
} from "./Utils";

export const SignOutButton = ({ mode, handleSignOut, className }) => {
  return (
    <>
      {mode === "dark-mode" ? (
        <StyledButton // Button in Dark Mode
          className={`px-4 mb-4 fw-bolder fs-4 rounded-4 ${className}`}
          buttonStyle="danger"
          backgroundColor={`${colorRed}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          onClick={handleSignOut}
          text="Sign Out"
        />
      ) : (
        <StyledButton // Button in Light Mode
          className={`px-4 mb-4 fw-bolder fs-4 rounded-4 ${className}`}
          buttonStyle="danger"
          backgroundColor={`${colorLightRed}`}
          color={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          onClick={handleSignOut}
          text="Sign Out"
        />
      )}
    </>
  );
};
