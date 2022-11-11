import {
    HashedObject,
    MeshNode,
    MutableReference,
    Resources,
    SpaceEntryPoint,
} from "@hyper-hyper-space/core";
import { TodoItem } from "./Todo";

export class HHSTodoList extends HashedObject implements SpaceEntryPoint {
    static className = "HHSTodo";
    items: MutableReference<Array<TodoItem>>;

    _node?: MeshNode;

    constructor() {
        super();

        this.items = new MutableReference();
    }
    getName(): string | MutableReference<string> | undefined {
        throw new Error("Method not implemented.");
    }

    init(): void {
        return;
    }

    getClassName(): string {
        return HHSTodoList.className;
    }

    validate(): Promise<boolean> {
        return Promise.resolve(true);
    }

    startSync(): Promise<void> {
        if (this._node === undefined) {
            this._node = new MeshNode(this.getResources() as Resources);
            this._node.sync(this);
            this._node.broadcast(this);
        }

        return Promise.resolve();
    }

    stopSync(): Promise<void> {
        if (this._node !== undefined) {
            this._node.stopSync(this);
            this._node.stopBroadcast(this);
            this._node = undefined;
        }

        return Promise.resolve();
    }
}
