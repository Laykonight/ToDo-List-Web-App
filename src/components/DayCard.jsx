import React from "react";
import { StyledCard } from "./StyledCard";
import { colorDipDarkBlue, colorBoneWhite } from "./Utils";

export const DayCard = ({ mode, children, className }) => {
  return (
    <>
      {mode === "dark-mode" ? (
        <StyledCard
          backgroundColor={`${colorDipDarkBlue}`}
          color={`${colorBoneWhite}`}
          onMouseOverColor={`${colorBoneWhite}`}
          className={`${className}`}
          borderColor="white"
          content={children}
        />
      ) : (
        <StyledCard
          backgroundColor="white"
          color={`${colorDipDarkBlue}`}
          borderColor={`${colorDipDarkBlue}`}
          onMouseOverColor={`${colorDipDarkBlue}`}
          className={`${className}`}
          content={children}
        />
      )}
    </>
  );
};
