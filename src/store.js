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
        return `
S="${this.curSsid}"
P="${this.curPassword}"
F="/etc/wpa_supplicant/wpa_supplicant.conf"
TS=$(wpa_passphrase $S $P | sed -n "/ssid=\\"[^\\"]*\\"/p")
FS=$(cat $F | sed -n "/ssid=\\"[^\\"]*\\"/p")
TP=$(wpa_passphrase $S $P | sed "/#psk=\\"[^\\"]*\\"/d" | sed -n "/psk/p")
FP=$(cat $F | sed "/#psk=\\"[^\\"]*\\"/d" | sed -n "/psk/p")
sed -i "s/$FS/$TS/" $F
sed -i "s/$FP/$TP/" $F
cat $F
wpa_cli -i wlan0 reconfigure
hostname -I                
`;
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
