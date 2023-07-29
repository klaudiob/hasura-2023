import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ColorChips = ({ label, color }) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <Chip label={label} color={color} />
      </Stack>
    </Stack>
  );
};

export default ColorChips;
