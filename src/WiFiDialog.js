import S from './store.js';
import { observer } from "mobx-react"
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const WiFiDialog = observer(() =>
    <Dialog id="dialog" open={S.open} onClose={() => { S.open = false }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">WiFi</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="ssid"
                label="SSID"
                type="text"
                fullWidth
                value={S.newSsid}
                onChange={(e) => { S.newSsid = e.target.value }}
            />
            <TextField
                margin="dense"
                id="password"
                label="PASSWORD"
                type="password"
                fullWidth
                value={S.newPassword}
                onChange={(e) => { S.newPassword = e.target.value }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => { S.open = false }} color="primary">
                Cancel
          </Button>
            <Button onClick={() => { S.open = false }} color="primary">
                Confirm
          </Button>
        </DialogActions>
    </Dialog>
)

export default WiFiDialog;