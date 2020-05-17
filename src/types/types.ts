export interface GenericObjectType<T> {
    [key: string]: T
}

export interface Options {
    url?: string;
    parser?: Parsers
}

export enum Parsers {
    parse5 = "parse5"
}
