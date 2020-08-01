import * as K from './consts.js';
import Pi from './pi.js';

class Cluster {
    constructor() {
        this.dict = {};
        this.script = "ls";
    }

    add(id, pi) {
        this.dict[id] = pi;
    }

    async scan() {
        try {
            console.log("Requesting Bluetooth Device...");
            let device = await navigator.bluetooth.requestDevice({
                filters: [{ name: K.CLUSTER_PI_DEVICE_NAME }],
                optionalServices: [K.UART_SERVICE_UUID],
            });
            let pi = await new Pi(device).init();
            this.add(pi.id, pi);
        } catch (error) {
            console.log(error);
        }
    }

    async send() {
        for (let id in this.dict) {
            let pi = this.dict[id];
            try {
                let encoder = new TextEncoder();
                pi.rx.writeValue(encoder.encode(this.script));
            } catch (error) {
                console.log(error);
            }
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
