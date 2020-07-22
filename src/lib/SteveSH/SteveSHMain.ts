import * as core from "@iobroker/adapter-core";
import * as http from "request";

export class SteveSHMain {
    adapter: core.AdapterInstance;

    public constructor(adapter: core.AdapterInstance) {
        this.adapter = adapter;
    }

    public init(): void {
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

    public unload(): void {
        return;
    }

    public onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if ((state?.val as boolean) == true) {
            http.get("http://192.168.2.139:51/lamp?turn=on");
        } else {
            http.get("http://192.168.2.139:51/lamp?turn=off");
        }
        // this.adapter.log.debug(id);
        // this.adapter.log.debug(state?.val as string);
        return;
    }
}
