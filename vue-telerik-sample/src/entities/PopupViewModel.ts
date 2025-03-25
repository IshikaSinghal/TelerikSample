
// Field class
export class Field {
    constructor(
        public type: string,
        public label: string,
        public value?: string,
        public checked?: boolean
    ) { }
}

export default class PopupViewModel {
    public static createEmpty() {
        return new PopupViewModel('','','','');
    }
    constructor(
        public title: string,
        public description: string,
        public confirmButton: string,
        public cancelButton: string,
        public fields: Field[] = []
    ) { }
}
