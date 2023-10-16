import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { createRoom, deleteMember, modifyMember } from "../../../apis/room";

export function DeleteMember({ open, handleClose, roomId, email }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await deleteMember(roomId, email);
    setLoading(false);
    if (res) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <DialogTitle>Delete Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {email}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={loading} type="submit">
            Submit
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
