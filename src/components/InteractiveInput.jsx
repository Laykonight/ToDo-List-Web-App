import React from "react";

export const InteractiveInput = ({
  mode,
  onChangeMethod,
  type,
  placeholder,
  value,
}) => {
  return (
    <input
      className={`interactive form-control rounded-4 display-5 fs-3 ${mode}`}
      style={{ filter: "drop-shadow(0 0 5px #b2bec3)" }}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeMethod}
    />
  );
};
