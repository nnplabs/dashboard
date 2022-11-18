import { CheckCircle, PanoramaFishEye } from "@mui/icons-material";
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { blue } from "@mui/material/colors";
import { AppData } from "../../../types/api/app";

export interface SimpleDialogProps {
    open: boolean;
    selectedApp?: AppData;
    appList?: AppData[];
    onClose: (value: AppData) => void;
  }
  
function SwitchApps(props: SimpleDialogProps) {
    const { onClose, selectedApp, appList, open } = props;
    
    const handleClose = () => {
      onClose(selectedApp!);
    };
  
    const handleListItemClick = (value: AppData) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className="w-96">Switch App</DialogTitle>
        <List sx={{ pt: 0 }}>
          {appList?.map((app) => (
            <ListItem button onClick={() => handleListItemClick(app)} key={app.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {selectedApp?.id === app.id ? <CheckCircle color="success" /> : <PanoramaFishEye />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={app.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
}

export default SwitchApps