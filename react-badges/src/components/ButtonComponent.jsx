import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({ variant, color, handleClick, sx, content, size }) => {
  return (
    <Button variant={variant} color={color} onClick={handleClick} sx={sx} size={size}>
      {content}
    </Button>
  );
};

export default ButtonComponent;
