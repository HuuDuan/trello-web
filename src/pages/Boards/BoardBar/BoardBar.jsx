import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  borderRadius: "4px",
  " .MuiSvgIcon-root": { color: "white" },
  "&:hover": { bgcolor: "primary.50" },
};
function BoardBar({ board }) {
  return (
    <Box
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
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
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
        <AvatarGroup
          max={6}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              fontSize: 15,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="huuduan">
            <Avatar alt="huuduan" src="https://i.imgur.com/0y0y0y0.jpg" />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/men/75.jpg"
            />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/women/44.jpg"
            />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar alt="huuduan" src="https://i.imgur.com/0y0y0y0.jpg" />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/men/75.jpg"
            />
          </Tooltip>
          <Tooltip title="huuduan">
            <Avatar
              alt="huuduan"
              src="https://randomuser.me/api/portraits/women/44.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
