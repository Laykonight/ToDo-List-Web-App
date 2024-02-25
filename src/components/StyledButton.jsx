import React from "react";

export const StyledButton = ({
  className,
  buttonStyle,
  backgroundColor,
  color,
  onMouseOverColor,
  onClick,
  text,
}) => {
  return (
    <>
      <button
        type="buton"
        className={`btn btn-${buttonStyle} ${className}`}
        style={{
          backgroundColor: backgroundColor,
          color: color,
          transition: "box-shadow 0.3s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.boxShadow = `0 0 10px ${onMouseOverColor}`)
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};
