import { ListItem, Stack } from "@mui/material";
import { useState } from "react";

export function ImageGroup({
  b64Images,
  onActiveImageChange,
}: {
  b64Images: string[];
  onActiveImageChange: (index: number) => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    onActiveImageChange(index);
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      component="ul"
      className="overflow-x-auto overflow-y-hidden lg:!flex-col lg:overflow-x-hidden lg:overflow-y-auto h-32 lg:h-auto w-full lg:w-64"
    >
      {b64Images.map((b64, index) => (
        <ListItem key={index} className="!w-24 !h-24 !px-1 flex-shrink-0">
          <img
            src={b64}
            className={`${
              activeImageIndex === index
                ? "border-2 hover:border-2"
                : "border-0"
            } object-cover h-full w-full rounded-lg shadow-2xl p-0.5 border-black hover:border`}
            onClick={() => handleImageClick(index)}
          />
        </ListItem>
      ))}
    </Stack>
  );
}
