import React from "react";

export const StyledCard = ({
  className,
  borderColor,
  backgroundColor,
  color,
  onMouseOverColor,
  content,
}) => {
  return (
    <>
      <div
        className={`card rounded-4 ${className}`}
        style={{
          backgroundColor: backgroundColor,
          color: color,
          transition: "box-shadow 0.3s",
          border: `1px solid ${borderColor}`,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.boxShadow = `0 0 10px ${onMouseOverColor}`)
        }
        onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div className="my-2">{content}</div>
      </div>
    </>
  );
};
