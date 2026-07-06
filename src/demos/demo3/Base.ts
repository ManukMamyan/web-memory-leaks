import { boundMethod } from "autobind-decorator";

export class Parent {
    @boundMethod
    execute(): void {
        // do something
    }
}
