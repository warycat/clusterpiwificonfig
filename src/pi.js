import * as K from './consts.js';
import { observable } from "mobx"


class Pi {
    @observable connected = false;
    @observable log = "";

    constructor(device) {
        this.device = device;
    }

    async init() {
        try {
            this.server = await this.device.gatt.connect();
            this.connected = this.device.gatt.connected;
            this.service = await this.server.getPrimaryService(K.UART_SERVICE_UUID);
            this.tx = await this.service.getCharacteristic(K.UART_TX_CHARACTERISTIC_UUID);
            this.tx.startNotifications();
            this.tx.addEventListener("characteristicvaluechanged", (e) => this.onTx(e.target.value));
            this.rx = await this.service.getCharacteristic(K.UART_RX_CHARACTERISTIC_UUID);
            return this;
        } catch (error) {
            console.log("error");
            console.log(error);
        }
    }

    onTx(value) {
        let receivedData = [];
        for (var i = 0; i < value.byteLength; i++) {
            receivedData[i] = value.getUint8(i);
        }

        const receivedString = String.fromCharCode.apply(null, receivedData);
        this.log += receivedString;
        console.log(receivedString);
    }

    send(script) {
        try {
            let encoder = new TextEncoder();
            this.rx.writeValue(encoder.encode(script));
        } catch (error) {
            console.log(error);
        }
    }
}

export default Pi;  