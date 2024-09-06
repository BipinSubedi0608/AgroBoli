import { useState } from "react";
import { useParams } from "react-router-dom";
import { useListenerToProductWithId } from "../../hooks/useListener";
import { LoadingIndicator } from "../Shared/LoadingIndicator";
import { ImageGroup } from "./components/ImageGroup";
import { PlaceBidModal } from "./components/PlaceBidModal";
import { ProductDetailsColumn } from "./components/ProductDetailsColumn";

export default function SingleProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useListenerToProductWithId(productId!);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openBidModal, setOpenBidModal] = useState(false);

  const handleImageChange = (index: number) => setSelectedImageIndex(index);
  const handleOpenBidModal = () => setOpenBidModal(true);
  const handleCloseBidModal = () => setOpenBidModal(false);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="container py-6 mx-auto">
      <div className="grid grid-cols-12 gap-2 w-full">
        {/* Image group column (visible on lg screens) */}
        <section className="hidden lg:block col-span-2">
          <ImageGroup
            b64Images={product?.images!}
            onActiveImageChange={handleImageChange}
          />
        </section>

        {/* Main image column */}
        <section className="col-span-12 md:col-span-6 lg:col-span-5 overflow-hidden">
          <img
            src={product?.images[selectedImageIndex]}
            alt="Product"
            className="h-auto w-full object-contain rounded-lg"
          />

          {/* Image group row (visible upto lg screens) */}
          <div className="lg:hidden col-span-12 mb-4">
            <ImageGroup
              b64Images={product?.images!}
              onActiveImageChange={handleImageChange}
            />
          </div>
        </section>

        {/* Title and description column */}
        <section className="col-span-12 md:col-span-6 lg:col-span-5 md:pl-8 lg:px-8">
          <ProductDetailsColumn product={product!} />

          <button
            onClick={handleOpenBidModal}
            className={`w-full my-3 p-3 transition ease-in-out duration-500 text-white font-semibold rounded-full 
              ${product?.isOpen ? "bg-primary hover:bg-opacity-80" : "bg-gray-600 cursor-not-allowed"}`}
            disabled={!product?.isOpen}
          >
            {product?.isOpen ? "Place Bid" : "The Bid Is Closed"}
          </button>
        </section>

        <PlaceBidModal
          product={product!}
          open={openBidModal}
          handleClose={handleCloseBidModal}
        />
      </div>
    </main>
  );
}
