import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
        width: "100vw",
      }}
    >
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  );
}

export default PageLoadingSpinner;
