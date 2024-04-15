export interface IMultipleSelect {
    options: string[];
    label: string;
    onChange: (value: string | string[]) => any;
}
