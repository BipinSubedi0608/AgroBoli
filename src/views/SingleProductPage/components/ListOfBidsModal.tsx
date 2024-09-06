import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTimeAgo } from "../../../hooks/useTimeAgo";
import { BidModel } from "../../../models/productModel";
import { UserModel } from "../../../models/userModel";
import { getUserById } from "../../../services/firebaseUserServices";
import { Link } from "react-router-dom";

function BidDetails({ bid }: { bid: BidModel }) {
  const [bidderDetails, setBidderDetails] = useState<UserModel | null>(null);

  const timeAgoString = useTimeAgo(bid.bidUnixTime);

  useEffect(() => {
    const fetchBidderDetails = async () => {
      try {
        const user: UserModel | null = await getUserById(bid.bidderId);
        if (user) {
          setBidderDetails(user);
        } else {
          throw new Error("User Not Found");
        }
      } catch (e: any) {
        console.log(e);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
          confirmButtonColor: "#0A7123",
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            container: "z-max",
          },
        });
      }
    };

    fetchBidderDetails();
  }, [bid.bidderId]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemButton component={Link} to={`/users/${bid.bidderId}`}>
        <ListItemAvatar>
          <Avatar
            alt={bidderDetails?.displayName}
            src={bidderDetails?.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <span>
              <span className="font-semibold">
                {bidderDetails?.displayName}
              </span>{" "}
              bid Rs.
              <span className="font-semibold">{bid.bidAmount}</span>
            </span>
          }
          secondary={
            <span className="flex justify-between w-full">
              <span className="flex items-center">
                <PlaceIcon fontSize="small" />
                <span>{bidderDetails?.location || "Unknown"}</span>
              </span>
              <span className="text-3xl mx-2">•</span>
              <span className="flex items-center">
                <AccessTimeFilledIcon fontSize="small" />
                <span>{timeAgoString}</span>
              </span>
            </span>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export function ListOfBidsModal({
  open,
  handleClose,
  bids,
}: {
  open: boolean;
  handleClose: () => void;
  bids: BidModel[];
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>List Of Bids</DialogTitle>
      <DialogContent>
        {bids.length === 0 ? (
          <div>No Bids</div>
        ) : (
          <List className="w-full">
            {bids.map((bid, index) => (
              <div key={index}>
                <BidDetails bid={bid} />
                {index !== bids.length - 1 && <Divider component="li" />}
              </div>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
