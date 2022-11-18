import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
import { useEventContext } from '../../../context/EventContext';
import { useNavigate } from 'react-router-dom';
import SettingsBoxContent from './SettingsBoxContent';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {
  const navigate = useNavigate()
  return (
    <div>
      <Dialog
        fullScreen
        open={true}
        // onClose={() => navigate('..')}
        TransitionComponent={Transition}
      >
        <AppBar color='transparent' sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate('..')}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <Box className="flex w-full mx-auto h-full bg-gray-100">
            <SettingsBoxContent />
        </Box>
      </Dialog>
    </div>
  );
}