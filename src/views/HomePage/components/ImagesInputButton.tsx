import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { ChangeEvent } from "react";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export function ImageUploadButton({
  images,
  setImages,
}: {
  images: File[];
  setImages: (images: File[]) => void;
}) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    if (selectedFiles.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cannot upload more than 5 images.",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: "#0A7123",
        customClass: {
          container: "z-max",
        },
      });
      return;
    }

    const compressedFiles: File[] = await Promise.all(
      selectedFiles.map(async (file) => {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        return compressedFile;
      })
    );

    setImages(compressedFiles);
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        color="success"
        className="!mb-2"
      >
        Upload images
        <VisuallyHiddenInput
          name="image"
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleFileChange}
        />
      </Button>
      {images.length > 0 && (
        <div>
          <p>{images.length} file(s) selected:</p>
          <ul>
            {images.map((image, index) => (
              <li key={index} className="font-medium">
                {image.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
