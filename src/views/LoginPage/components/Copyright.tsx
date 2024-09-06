import { Link, Typography } from "@mui/material";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        href="https://bipinsubedi1.com.np"
        rel="noopener noreferrer"
        target="_blank"
      >
        Bipin Subedi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
