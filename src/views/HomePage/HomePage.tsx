import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useListenerToAllProducts } from "../../hooks/useListener";
import { LoadingIndicator } from "../Shared/LoadingIndicator";
import { AddProductFormModal } from "./components/AddProductFormModal";
import { ProductCard } from "./components/ProductCard";
import { SideBar } from "./components/Sidebar";

export default function HomePage() {
  const { products, loading } = useListenerToAllProducts();

  const { currentUser } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="flex flex-row w-screen pb-4 absolute left-0">
      <div className="hidden lg:block relative basis-1/4 mr-6">
        <SideBar />
      </div>

      <div className="container mx-auto flex mt-6 justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((item) => (
            <ProductCard
              key={item.productId}
              productId={item.productId}
              firstImage={item.images[0]}
              title={item.title}
              highestBid={item.highestBid}
              deadlineUnixTime={item.deadlineUnixTime}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      {currentUser?.role == "seller" && (
        <Fab
          color="success"
          aria-label="add"
          className="!fixed bottom-10 right-10"
          onClick={handleOpenModal}
        >
          <AddIcon />
        </Fab>
      )}

      <AddProductFormModal open={modalOpen} handleClose={handleCloseModal} />
    </main>
  );
}
