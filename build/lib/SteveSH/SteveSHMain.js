"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteveSHMain = void 0;
const http = require("request");
class SteveSHMain {
    constructor(adapter) {
        this.adapter = adapter;
    }
    init() {
        this.adapter.setObjectNotExistsAsync("lamp", {
            type: "state",
            common: {
                name: "lamp",
                type: "boolean",
                role: "switch.light",
                read: true,
                write: true,
            },
            native: {},
        });
    }
    unload() {
        return;
    }
    onStateChange(id, state) {
        if ((state === null || state === void 0 ? void 0 : state.val) == true) {
            http.get("http://192.168.2.139:51/lamp?turn=on");
        }
        else {
            http.get("http://192.168.2.139:51/lamp?turn=off");
        }
        // this.adapter.log.debug(id);
        // this.adapter.log.debug(state?.val as string);
        return;
    }
}
exports.SteveSHMain = SteveSHMain;
