import S from './store.js';
import * as K from './consts.js';
import Pi from './pi.js';
import { observable, computed } from "mobx"

class Cluster {
    @observable dict = new Map()

    @computed get n() {
        return Object.keys(this.dict).length;
    }

    async scan() {
        try {
            console.log("Requesting Bluetooth Device...");
            let device = await navigator.bluetooth.requestDevice({
                filters: [{ name: K.CLUSTER_PI_DEVICE_NAME }],
                optionalServices: [K.UART_SERVICE_UUID],
            });
            let pi = new Pi(device);
            this.dict.set(pi.device.id, pi);
            pi.init();
        } catch (error) {
            console.log(error);
        }
    }

    async send() {
        for (let pi of this.dict.values()) {
            pi.send(S.script);
        }
    }

    async disconnect() {
        for (let id in this.dict) {
            let pi = this.dict[id];
            if (pi.gatt.connected) {
                pi.gatt.disconnect();
                console.log("Disconnected");
            }
        }
    }
}

export default Cluster;
