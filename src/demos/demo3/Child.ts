import debounce from "lodash/debounce";
import { Parent } from "./Base.ts";

export class Derived extends Parent {
    buffer: string;

    constructor() {
        super();
        // eslint-disable-next-line @typescript-eslint/unbound-method -- bound by @boundMethod on Parent
        this.execute = debounce(super.execute, 100);
        this.buffer = new Array(1000000).join("data");
    }
}
