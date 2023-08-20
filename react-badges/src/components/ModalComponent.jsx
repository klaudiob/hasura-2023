import React, { useEffect } from "react";
import { Box, Grid, Modal, Fade, Typography, Backdrop, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import ButtonComponent from "./ButtonComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 320,
  bgcolor: "background.paper",
  border: "3px solid #1976d2",
  borderRadius: "25px",
  boxShadow:
    "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)",
  p: 4
};

const ModalComponent = ({ setOpen, open, onDisapproveClick, itemId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    mode: "onChange"
  });

  const onSubmitClick = () => {
    const motivation = getValues("motivation");
    onDisapproveClick(itemId, motivation);
  };

  const handleClose = () => {
    reset({ motivation: "" });
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" align="center" mb={2} fontSize="20px">
            Add a disapproval motivation
          </Typography>
          <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <TextField
                label="Disapproval Motivation"
                name="motivation"
                {...register("motivation", {
                  required: "This field is required!",
                  minLength: {
                    value: 5,
                    message: "It should contain at least 5 characters!"
                  },
                  maxLength: {
                    value: 150,
                    message: "Max 150 characters allowed!"
                  }
                })}
                error={!!errors.motivation}
                helperText={errors.motivation?.message}
                multiline
                rows={4}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                    width: "60vh",
                    height: "20vh",
                    transition: "border-color 0.3s",
                    "&:hover, &:focus": {
                      borderColor: "blue"
                    }
                  }
                }}
              />
            </Grid>
            <Grid item>
              <ButtonComponent
                type="submit"
                variant="contained"
                color="success"
                handleClick={handleSubmit(onSubmitClick)}
                content="Submit"
                size="large"
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
