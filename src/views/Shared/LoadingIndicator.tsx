import { Backdrop, CircularProgress } from "@mui/material";

export function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen w-screen z-50">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
}
