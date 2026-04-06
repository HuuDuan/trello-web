import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
import { useHorizontalScroll } from "~/customHooks";
import BoardUserGroup from "./BoardUserGroup";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  borderRadius: "4px",
  " .MuiSvgIcon-root": { color: "white" },
  "&:hover": { bgcolor: "primary.50" },
};
function BoardBar({ board }) {
  const scrollRef = useHorizontalScroll();
  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: 2,
        gap: 1,
        overflowX: "auto",
        "&::-webkit-scrollbar-track": { m: 2 },
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1679d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>

        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>
        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </Box>
    </Box>
  );
}

export default BoardBar;
