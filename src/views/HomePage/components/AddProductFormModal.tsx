import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { addProduct } from "../../../services/firebaseProductServices";
import { uploadImage } from "../../../services/firebaseStorageServices";
import { ImageUploadButton } from "./ImagesInputButton";

interface AddProductFormModalProps {
  open: boolean;
  handleClose: () => void;
}

export function AddProductFormModal({
  open,
  handleClose,
}: AddProductFormModalProps) {
  const [description, setDescription] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [openUntil, setOpenUntil] = useState<Moment | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const [vendorId, setVendorId] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setVendorId(currentUser.userId!);
    }
  }, [currentUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Must upload at least 1 image",
        confirmButtonColor: "#0A7123",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const imageUploadPromises = images.map((image) => uploadImage(image));
      const imageUrls = await Promise.all(imageUploadPromises);

      await addProduct({
        title: description,
        minimumBid,
        images: imageUrls,
        vendorId,
        deadlineUnixTime: moment(openUntil).unix(),
      });

      handleClose();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product. Please try again.",
        confirmButtonColor: "#0A7123",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        className: "overflow-visible",
      }}
    >
      <DialogTitle>Enter the product details</DialogTitle>

      <DialogContent className="overflow-y-auto max-h-144">
        <Grid container spacing={2}>
          {/* Images Input */}
          <Grid item xs={12}>
            <ImageUploadButton images={images} setImages={setImages} />
          </Grid>

          {/* Description Input */}
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Description of the product"
              fullWidth
              variant="outlined"
              size="small"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          {/* Minimum Bid Input */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="outlined-adornment-minimum-bid">
                Minimum Bid
              </InputLabel>
              <OutlinedInput
                size="small"
                type="number"
                id="outlined-adornment-minimum-bid"
                startAdornment={
                  <InputAdornment position="start">Rs.</InputAdornment>
                }
                label="Minimum Bid"
                value={minimumBid}
                onChange={(e) => setMinimumBid(parseInt(e.target.value))}
              />
            </FormControl>
          </Grid>

          {/* Open Until Input */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Bidding Open Until"
                minDate={moment()}
                maxDate={moment().add(7, "days")}
                slots={{
                  textField: (params) => (
                    <TextField {...params} size="small" fullWidth />
                  ),
                }}
                className="w-full"
                value={openUntil}
                onChange={(newValue) => setOpenUntil(newValue)}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button type="submit" color="success">
          Make Open For Bidding
        </Button>
      </DialogActions>
    </Dialog>
  );
}
