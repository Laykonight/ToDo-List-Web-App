import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { NormalButton } from "./NormalButton";

export const YearCard = ({ mode, selectedYear, onChange, onClose, onSave }) => {
  const [inputYear, setInputYear] = useState(selectedYear);
  //----------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    setInputYear(parseInt(e.target.value));
  };
  //----------------------------------------------------------------------------------
  const handleSaveClick = () => {
    onChange(inputYear);
    onSave();
  };
  //----------------------------------------------------------------------------------
  return (
    <>
      <Card
        className={`${mode} fs-5`}
        style={{ filter: "drop-shadow(0 0 5px #b2bec3)" }}
      >
        <Card.Header className={`${mode}`} style={{ border: "none" }}>
          <Card.Title className={`${mode} fs-4 mt-2`}>Select Year</Card.Title>
        </Card.Header>
        <Card.Body className={`${mode}`} style={{ border: "none" }}>
          <input
            className={`${mode}`}
            type="number"
            value={inputYear}
            onChange={handleInputChange}
          />
        </Card.Body>
        <Card.Footer className={`${mode}`} style={{ border: "none" }}>
          <NormalButton
            mode={mode}
            onClickHandle={onClose}
            darkColor="outline-light"
            lightColor="outline-dark"
            className="me-2 fs-5 mb-2"
          >
            Cancel
          </NormalButton>
          <NormalButton
            mode={mode}
            onClickHandle={handleSaveClick}
            darkColor="outline-light"
            lightColor="outline-dark"
            className="ms-2 fs-5 mb-2"
          >
            Set Year
          </NormalButton>
        </Card.Footer>
      </Card>
    </>
  );
};
