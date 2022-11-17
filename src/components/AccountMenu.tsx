import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import {
  ContentCopyOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AccountBoxOutlined,
} from "@mui/icons-material";
import { MenuList, ListItemText, rgbToHex } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import sliceString from "../utils/sliceString";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40, backgroundColor: "#6B7280"}}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 300,
            maxWidth: "100%",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <AccountMenuOptions />
      </Menu>
    </React.Fragment>
  );
}

export function AccountMenuOptions() {
  const app = useAppContext();
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <AccountBoxOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          <div className="flex-col">
            <div className="text-xs text-gray-500 font-bold">Account</div>
            <div>Akshay</div>
          </div>
        </ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <VpnKeyOutlinedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          <div className="flex-col">
            <div className="text-xs text-gray-500 font-bold">API Key</div>
            <div>{sliceString(app?.account.apiKey)}</div>
          </div>
        </ListItemText>
        <ListItemIcon>
          <ContentCopyOutlined fontSize="medium" />
        </ListItemIcon>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Account Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <LogoutOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </MenuList>
  );
}
