export interface GenericObjectType<T> {
    [key: string]: T
}

export interface Options {
    url?: string;
    parser?: Parsers
}

export enum Parsers {
    htmlparser2 = "htmlparser2",
    parse5 = "parse5"
}
