import {
  AdminPanelSettingsOutlined,
  ContentCopyOutlined,
  SettingsOutlined,
  SettingsEthernetOutlined,
  ArrowRightOutlined,
} from "@mui/icons-material";
import {
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../context/AppContext";
import sliceString from "../utils/sliceString";

export function SelectAppMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const app = useAppContext();

  return (
    <div>
      <SelectAppButton
        appName={app?.selectedApp?.name ?? ""}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 300, maxWidth: "100%" },
        }}
      >
        <SelectAppOptions />
      </Menu>
    </div>
  );
}

export function SelectAppButton({
  appName,
  onClick,
}: {
  appName: string;
  onClick: (event: any) => void;
}) {
  return (
    <div
      onClick={onClick}
      className="h-full flex flex-row px-3 border-gray-400 border-[1.5px] rounded-md mr-5 justify-between items-center cursor-pointer"
    >
      <div className="flex flex-col mr-10">
        <div className="font-normal text-xs text-gray-500">{"Current App"}</div>
        <div className="font-medium text-base text-gray-800">{appName}</div>
      </div>
      <div className="flex flex-col">
        <i className="fa fa-angle-down text-2xl"></i>
      </div>
    </div>
  );
}

export function SelectAppOptions() {
  const app = useAppContext();
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>
          <AdminPanelSettingsOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          <div className="flex-col">
            <div className="text-xs text-gray-500 font-bold">App ID</div>
            <div>{sliceString(app?.selectedApp?.id)}</div>
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
        <ListItemText>App Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <SettingsEthernetOutlined fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Switch to different app</ListItemText>
        <ListItemIcon>
          <ArrowRightOutlined fontSize="medium" />
        </ListItemIcon>
      </MenuItem>
    </MenuList>
  );
}
