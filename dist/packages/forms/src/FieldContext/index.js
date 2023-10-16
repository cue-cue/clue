import { Context } from '@clue/utils';
export class FieldContext extends Context {
    constructor() {
        super('clueFieldContext');
    }
}
export const fieldContext = new FieldContext();
