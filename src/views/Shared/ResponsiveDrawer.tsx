import { Drawer } from "@mui/material";
import { SideBar } from "../HomePage/components/Sidebar";
import { SearchBar } from "./Navbar";

export function ResponsiveDrawer({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      classes={{ paper: "w-72" }}
    >
      <div className="flex md:hidden">
        <SearchBar />
      </div>

      <div className="relative py-4">
        <SideBar />
      </div>
    </Drawer>
  );
}
