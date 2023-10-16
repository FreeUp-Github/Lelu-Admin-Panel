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
import { createRoom, modifyMember } from "../../../apis/room";

export function CreateMember({ open, handleClose, roomId }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const res = await modifyMember(
      roomId,
      data.get("email") as string,
      !!data.get("is_admin")
    );
    setLoading(false);
    if (res) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <DialogTitle>Create New Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                autoFocus
                id="email"
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                name="is_admin"
                control={<Checkbox />}
                label="Admin"
              />
            </Grid>
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
