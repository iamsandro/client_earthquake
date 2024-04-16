export interface IMultipleSelect {
    options: string[];
    label: string;
    onChange: (value: string | string[]) => any;
}

export interface IBasicSelect {
    label: string;
    onChange: (value: string) => any;
    options: string[] | number[];
    default: string | number;
}
