import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { ProductModel } from "../../../models/productModel";
import { updateProduct } from "../../../services/firebaseProductServices";

export function PlaceBidModal({
  open,
  handleClose,
  product,
}: {
  open: boolean;
  handleClose: () => void;
  product: ProductModel;
}) {
  const [bid, setBid] = useState(0);
  const { currentUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();
    const productToUpdate: ProductModel = {
      ...product,
      highestBid: bid > product.highestBid ? bid : product.highestBid,
      numberOfBids: product.numberOfBids + 1,
      bids: [
        ...product.bids,
        {
          bidAmount: bid,
          bidderId: currentUser?.userId!,
          bidUnixTime: moment().unix(),
        },
      ],
    };
    try {
      await updateProduct(productToUpdate);

      Swal.fire({
        icon: "success",
        title: "Bid Placed Successfully",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        customClass: {
          container: "z-max",
        },
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "An Error Occurred",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        customClass: {
          container: "z-max",
        },
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
      }}
    >
      <DialogTitle>Place your bid</DialogTitle>
      <DialogContent>
        <p>
          Minimum Bid:{" "}
          <span className="font-medium"> {product.minimumBid ?? 0}</span>
        </p>
        <p>
          Highest Bid:{" "}
          <span className="font-medium"> {product.highestBid ?? 0}</span>
        </p>
        <FormControl fullWidth required className="!mt-6">
          <InputLabel htmlFor="outlined-adornment-bid">Bid Amount</InputLabel>
          <OutlinedInput
            inputProps={{ min: product.minimumBid ?? 0 }}
            size="small"
            type="number"
            id="outlined-adornment-bid"
            startAdornment={
              <InputAdornment position="start">Rs.</InputAdornment>
            }
            label="Bid Amount"
            value={bid || ""}
            onChange={(e) => setBid(parseInt(e.target.value))}
          />
        </FormControl>
      </DialogContent>
      <DialogActions className="flex !justify-center">
        <Button type="submit" className="!text-primary !font-semibold">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
