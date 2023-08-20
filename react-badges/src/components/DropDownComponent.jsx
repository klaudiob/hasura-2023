import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const DropDownComponent = ({ handleShowPending, handleShowOngoing, handleShowDisapproved }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);

    switch (e.target.value) {
      case "pending":
        handleShowPending();
        break;
      case "ongoing":
        handleShowOngoing();
        break;
      case "disapproved":
        handleShowDisapproved();
        break;
      default:
        alert("Not a valid option!");
    }
  };

  return (
    <Select value={selectedOption} displayEmpty onChange={handleDropdownChange}>
      <MenuItem value="" disabled>
        Filter by status
      </MenuItem>
      <MenuItem value="pending">Pending Proposals</MenuItem>
      <MenuItem value="ongoing">Ongoing Candidatures</MenuItem>
      <MenuItem value="disapproved">Disapproved Candidatures</MenuItem>
    </Select>
  );
};

export default DropDownComponent;
