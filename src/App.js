import S from './store.js';
import { observer } from "mobx-react";
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

import WiFiDialog from "./WiFiDialog.js";
import ClusterView from "./ClusterView.js";

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


const App = observer(() => {
  const classes = useStyles();
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
            <Button variant="outlined" color="inherit" onClick={S.handleSend} >Send All</Button>
            <Button variant="outlined" color="inherit" onClick={S.handleScan} >BLE Scan</Button>
            <Button variant="outlined" color="inherit" onClick={S.handleClickOpen}>WiFi Config</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <WiFiDialog />
      <ClusterView />
    </>
  )
}
)

export default App;
