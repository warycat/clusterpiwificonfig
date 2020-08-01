import { observable, computed } from "mobx"
import Cluster from './cluster.js';

class Store {
    @observable open = false;
    @observable curSsid = "Office";
    @observable curPassword = "12345678";
    @observable newSsid = "";
    @observable newPassword = "";
    @observable cluster = new Cluster();

    @computed get script() {
        return `wpa_passphrase ${this.curSsid} ${this.curPassword}`;
    }

    handleClickOpen = () => {
        this.newSsid = this.curSsid;
        this.newPassword = this.curPassword;
        this.open = true;
    };

    handleClose = (e) => {
        this.open = false;
    };

    handleConfirm = (e) => {
        this.curSsid = this.newSsid;
        this.curPassword = this.newPassword;
        this.open = false;
    };

    handleScan = async (e) => {
        await this.cluster.scan();
    }

    handleSend = async (e) => {
        await this.cluster.send();
    }
}

let S = new Store();
window.S = S;
export default S;
