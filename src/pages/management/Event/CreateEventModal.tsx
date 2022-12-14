import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CreateEventSteps from './CreateEventSteps';
import { Box } from '@mui/material';
import { useEventContext } from '../../../context/EventContext';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateEventModal({ open, handleClickOpen, handleClose }: { open: boolean, handleClickOpen: () => void, handleClose: () => void }) {
  const {data} = useEventContext()!;
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {!data.currentEvent ? 'Create' : 'Update'} Event
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className="flex flex-col items-center justify-center p-10 w-full mx-auto h-full px-[10%] bg-gray-100">
            <CreateEventSteps onFinish={() => handleClose()}/>
        </Box>
      </Dialog>
    </div>
  );
}