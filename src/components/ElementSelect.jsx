import React from "react";

export const ElementSelect = ({
  className,
  labelText,
  mode,
  value,
  onChange,
  content,
}) => {
  return (
    <>
      <div className={`${className}`}>
        <label className="pe-3">{`${labelText}`}</label>
        <br />
        <select className={`${mode}`} value={value} onChange={onChange}>
          {content}
        </select>
      </div>
    </>
  );
};
