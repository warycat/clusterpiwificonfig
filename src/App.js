import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import * as K from './consts.js';
import Cluster from './cluster.js';
import Pi from './pi.js';

let cluster = new Cluster();

async function scanButtonPressed() {
  await cluster.scan();
}


async function sendButtonPressed() {
  await cluster.send();
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [curSsid, setCurSsid] = React.useState("Office");
  const [curPassword, setCurPassword] = React.useState("12345678");
  const [newSsid, setNewSsid] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handleClickOpen = () => {
    setNewSsid(curSsid);
    setNewPassword(curPassword);
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleConfirm = (e) => {
    setCurSsid(newSsid);
    setCurPassword(newPassword);
    setOpen(false);
  };

  const handleScan = async (e) => {
    await scanButtonPressed();
  }

  const handleSend = async (e) => {
    await sendButtonPressed();
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Cluster Pi WiFi Config
          </Typography>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button variant="outlined" color="inherit" onClick={handleSend} >Config Send</Button>
            <Button variant="outlined" color="inherit" onClick={handleScan} >BLE Scan</Button>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen}>WiFi Config</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Dialog id="dialog" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">WiFi</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="ssid"
            label="SSID"
            type="text"
            fullWidth
            value={newSsid}
            onChange={(e) => setNewSsid(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="PASSWORD"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
