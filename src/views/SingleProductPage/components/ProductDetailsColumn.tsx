import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Divider, ListItem, Rating, Stack } from "@mui/material";
import { BidModel, ProductModel } from "../../../models/productModel";
import { useEffect, useState } from "react";
import { UserModel } from "../../../models/userModel";
import { getUserById } from "../../../services/firebaseUserServices";
import useCountdown from "../../../hooks/useCountdown";
import { ListOfBidsModal } from "./ListOfBidsModal";

function FarmerDetails({ farmerId }: { farmerId: string }) {
  const [farmer, setFarmer] = useState<UserModel | null>(null);

  useEffect(() => {
    const getFarmerDetails = async () => {
      try {
        const userToGet: UserModel | null = await getUserById(farmerId);
        if (userToGet) {
          setFarmer(userToGet);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFarmerDetails();
  }, []);

  return (
    <div className="flex gap-2">
      <Avatar
        alt={farmer?.displayName}
        sx={{ width: 52, height: 52 }}
        src={farmer?.avatar}
      />
      <span className="flex flex-col">
        <h6 className="font-bold text-lg pl-2 underline">
          {farmer?.displayName ?? "FARMER_NAME"}
        </h6>

        <span className="flex flex-row">
          <PlaceIcon />
          <p className="font-semibold">{farmer?.location ?? "LOCATION"}</p>
        </span>
      </span>
    </div>
  );
}

function BidDetails({
  minimumBid,
  highestBid,
  numberOfBids,
  bids,
}: {
  minimumBid: number;
  highestBid: number;
  numberOfBids: number;
  bids: BidModel[];
}) {
  const [openListOfBids, setOpenListOfBids] = useState(false);

  const handleOpenListOfBids = () => setOpenListOfBids(true);
  const handleCloseListOfBids = () => setOpenListOfBids(false);

  return (
    <>
      <div className="md:text-3xl text-xl font-light flex justify-between mb-1">
        {/* Minimum Bidding */}
        <Stack>
          <ListItem>
            Rs.{" "}
            <span className="md:text-5xl text-3xl font-semibold">{minimumBid ?? 0}</span>
          </ListItem>
          <ListItem>
            <p className="text-gray-800 text-lg">Min Bid</p>
          </ListItem>
        </Stack>

        <Divider orientation="vertical" flexItem className="bg-black" />

        {/* Highest Bid */}
        <Stack>
          <ListItem>
            Rs.{" "}
            <span className="md:text-5xl text-3xl font-semibold">{highestBid ?? 0}</span>
          </ListItem>
          <ListItem>
            <p className="text-gray-800 text-lg">Highest Bid</p>
          </ListItem>
        </Stack>
      </div>

      {/* Number of bids */}
      <div
        className="mb-6 px-4 underline cursor-pointer"
        onClick={handleOpenListOfBids}
      >
        <span className="font-medium text-xl">{numberOfBids ?? 0}</span> bids
      </div>

      <ListOfBidsModal
        open={openListOfBids}
        handleClose={handleCloseListOfBids}
        bids={bids}
      />
    </>
  );
}

export function ProductDetailsColumn({ product }: { product: ProductModel }) {
  const {
    title,
    rating,
    numberOfRatings,
    vendorId,
    deadlineUnixTime,
    highestBid,
    // isOpen,
    bids,
    minimumBid,
    numberOfBids,
  } = product;

  const timeLeft = useCountdown(deadlineUnixTime!);

  return (
    <>
      <h1 className="text-3xl font-semibold leading-tight mb-2">{title}</h1>
      <span className="flex flex-row gap-4">
        <Rating name="read-only" precision={0.5} value={rating} readOnly />
        <span className="self-center">({numberOfRatings ?? 0} ratings)</span>
      </span>

      <Divider sx={{ mt: 2, mb: 3 }} />

      <FarmerDetails farmerId={vendorId} />

      <p className="bg-gray-200 rounded-full px-3 mt-2">
        <span className="me-4 font-semibold text-xl">
          {timeLeft ?? "00:00:00"}
        </span>
        <span className="text-slate-600">Left</span>
      </p>

      <Divider sx={{ my: 3 }} />

      <BidDetails
        highestBid={highestBid}
        minimumBid={minimumBid}
        numberOfBids={numberOfBids}
        bids={bids}
      />
    </>
  );
}
