export interface IMultipleSelect {
    default?: any;
    options: any[];
    label: string;
    onChange: (value: any) => any;
    basic_select?: boolean;
}

export interface IBasicSelect {
    label: string;
    onChange: (value: string) => any;
    options: string[] | number[];
    default: string | number;
}
