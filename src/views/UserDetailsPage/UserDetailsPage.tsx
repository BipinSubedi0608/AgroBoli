import { Avatar } from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserModel } from "../../models/userModel";
import { getUserById } from "../../services/firebaseUserServices";

export default function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserModel | null>(null);

  const getUserDetails = async () => {
    const userToSet: UserModel | null = await getUserById(userId!);
    setUser(userToSet);
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center space-y-6 w-full max-w-lg">
          {/* User Avatar */}
          <Avatar
            alt={user?.displayName}
            src={user?.avatar}
            sx={{ width: 150, height: 150, fontSize: "100px" }}
          />

          {/* User Verification Status */}
          <span className="flex justify-center items-center gap-1 mb-2 text-center">
            {user?.isVerified ? (
              <>
                <VerifiedIcon className="text-primary" />
                <p className="text-sm font-medium">Verified</p>
              </>
            ) : (
              <>
                <DangerousIcon className="text-red-500" />
                <p className="text-sm font-medium">Not Verified</p>
              </>
            )}
          </span>

          <div className="text-start">
            {/* User Full Name */}
            <span className="flex items-center gap-4 mb-2">
              <DriveFileRenameOutlineIcon />
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
            </span>

            {/* User Location */}
            <span className="flex items-center gap-4 mb-2">
              <PlaceIcon />
              <p className="text-gray-600">
                {user?.location || "Location Not Set"}
              </p>
            </span>

            {/* User Email Address */}
            <span className="flex items-center gap-4 mb-2">
              <EmailIcon />
              <a
                className="text-gray-600 underline"
                href={`mailto:${user?.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user?.email}
              </a>
            </span>

            {/* User Phone Number */}
            <span className="flex items-center gap-4 mb-2">
              <PhoneIcon />
              <p className="text-gray-600">
                {user?.phone || "Phone Number Not Provided"}
              </p>
            </span>

            {/* User Role */}
            <span className="flex items-center gap-4 mb-2">
              <AdminPanelSettingsIcon />
              <p className="text-gray-600">
                This user is a{" "}
                <span className="font-semibold text-black">{user?.role}</span>
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
