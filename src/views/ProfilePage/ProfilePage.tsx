import { Avatar, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { logout, verifyEmail } from "../../services/firebaseAuthServices";
import { LoadingIndicator } from "../Shared/LoadingIndicator";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import VerifiedIcon from "@mui/icons-material/Verified";

import Swal from "sweetalert2";

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  const handleVerify = async () => {
    try {
      await verifyEmail();
      Swal.fire({
        icon: "success",
        title: "Verification email has been sent to your email account.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Some error occurred. Please try again later.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center space-y-6 w-full max-w-lg">
          {/* User Avatar */}
          <Avatar
            alt={currentUser?.displayName}
            src={currentUser?.avatar}
            sx={{ width: 150, height: 150, fontSize: "100px" }}
          />

          {/* User Verification Status */}
          <span className="flex justify-center items-center gap-1 mb-2 text-center">
            {currentUser?.isVerified ? (
              <>
                <VerifiedIcon className="text-primary" />
                <p className="text-sm font-medium">Verified</p>
              </>
            ) : (
              <>
                <DangerousIcon className="text-red-500" />
                <p className="text-sm font-medium">Not Verified</p>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  onClick={handleVerify}
                  className="!ms-6"
                >
                  Verify Now
                </Button>
              </>
            )}
          </span>

          <div className="text-start">
            {/* User Full Name */}
            <span className="flex items-center gap-4 mb-2">
              <DriveFileRenameOutlineIcon />
              <h2 className="text-2xl font-bold">{currentUser?.displayName}</h2>
            </span>

            {/* User Location */}
            <span className="flex items-center gap-4 mb-2">
              <PlaceIcon />
              <p className="text-gray-600">
                {currentUser?.location || "Location Not Set"}
              </p>
            </span>

            {/* User Email Address */}
            <span className="flex items-center gap-4 mb-2">
              <EmailIcon />
              <a
                className="text-gray-600 underline"
                href={`mailto:${currentUser?.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentUser?.email}
              </a>
            </span>

            {/* User Phone Number */}
            <span className="flex items-center gap-4 mb-2">
              <PhoneIcon />
              <p className="text-gray-600">
                {currentUser?.phone || "Phone Number Not Provided"}
              </p>
            </span>

            {/* User Role */}
            <span className="flex items-center gap-4 mb-2">
              <AdminPanelSettingsIcon />
              <p className="text-gray-600">
                You are a{" "}
                <span className="font-semibold text-black">
                  {currentUser?.role}
                </span>
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => logout()}
          color="error"
          variant="contained"
          endIcon={<LogoutIcon />}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
