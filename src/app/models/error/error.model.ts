import { ButtonModel } from "../button/button.model";

export class ErrorModel {
    message: string;
    button: ButtonModel;
    image: {
        path: string,
        alt: string
    };

    constructor(init?: Partial<ErrorModel>) {
        Object.assign(this, init);
    }
}