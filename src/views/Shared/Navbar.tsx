import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, Box, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { ResponsiveDrawer } from "./ResponsiveDrawer";

export const SearchBar = () => (
  <Box className="flex items-end px-2 py-4 md:px-12 md:py-0 w-full">
    <TextField
      id="input-with-sx"
      className="bg-white rounded-lg"
      label="Search for fresh organics"
      size="small"
      variant="filled"
      fullWidth
    />
  </Box>
);

export function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const handleProfileButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    navigate("/profile");
  };

  const handleNotiButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log("Notifications button clicked");
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/");
  };

  const handleMenuOpen = () => setOpenMenu(true);
  const handleMenuClose = () => setOpenMenu(false);

  return (
    <nav className="bg-primary fixed w-full left-0 top-0 z-100 text-white flex items-center justify-between p-4">
      <ResponsiveDrawer open={openMenu} handleClose={handleMenuClose} />

      {currentUser && (
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          className="!flex lg:!hidden"
        >
          <MenuIcon />
        </IconButton>
      )}

      <div
        className={`flex items-center ms-6 me-12 sm:ms-12 sm:me-6 ${
          currentUser ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={currentUser ? handleLogoClick : () => {}}
      >
        <img
          src="/logo.jpeg"
          alt="AgroBoli"
          className="h-10 w-10 mr-2 rounded-full"
        />
        <span className="text-xl font-bold">AgroBoli</span>
      </div>

      {currentUser && (
        <>
          <div className="flex-1 w-full hidden md:flex lg:mx-4 md:mx-2">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4 me-12 ms-6">
            <IconButton sx={{ color: "white" }} onClick={handleNotiButtonClick}>
              <Badge color="error" badgeContent={16}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              sx={{ color: "white" }}
              onClick={handleProfileButtonClick}
            >
              <Avatar
                alt={currentUser?.displayName}
                src={currentUser?.avatar}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </div>
        </>
      )}
    </nav>
  );
}
