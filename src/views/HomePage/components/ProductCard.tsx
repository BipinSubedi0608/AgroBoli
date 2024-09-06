import { Card, CardContent, CardMedia, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCountdown from "../../../hooks/useCountdown";
import { ProductCardReadDto } from "../../../models/productModel";

export function ProductCard(props: ProductCardReadDto) {
  const { productId, firstImage, title, deadlineUnixTime, highestBid, rating } =
    props;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${productId}`);
  };

  const timeLeft = useCountdown(deadlineUnixTime);

  return (
    <Card
      onClick={handleCardClick}
      raised
      className="w-full sm:w-full md:w-full lg:w-64 xl:64 cursor-pointer"
    >
      {/* Product Image */}
      <CardMedia
        component={"img"}
        className="h-60 aspect-square"
        src={firstImage}
        title={title}
      />

      <CardContent>
        {/* Product Bidding Deadline */}
        <p className="bg-gray-200 rounded-full px-3 mb-2">
          <span className="me-4 font-semibold text-xl">{timeLeft}</span>
          <span className="text-slate-600">Left</span>
        </p>

        {/* Product Highest Bid Amount */}
        <p className="w-full flex justify-between mb-6">
          <span className="text-slate-600">Highest Bid:</span>
          <span className="text-right pe-2 font-bold">Rs. {highestBid}</span>
        </p>

        {/* Product Rating */}
        <Rating precision={0.5} name="read-only" value={rating} readOnly />

        {/* Product Title */}
        <p className="text-xl leading-tight mb-2">{title}</p>

        {/* Product Location */}
        {/* <p className="text-sm">
          From <span className="font-semibold text-lg">{location}</span>
        </p> */}
      </CardContent>
    </Card>
  );
}
