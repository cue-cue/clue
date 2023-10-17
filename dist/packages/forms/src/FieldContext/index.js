import { Context } from '@cluue/utils';
export class FieldContext extends Context {
    constructor() {
        super('clueFieldContext');
    }
}
export const fieldContext = new FieldContext();
