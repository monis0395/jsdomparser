import { filter, findOne } from "./querying";
import { isElementNode as isTag, isTextNode } from "../node-types";
import { Node } from "../node";
import { Element } from "../element";

type TestType = (elem: Node) => boolean;

interface TestElementOpts {
    tag_name?: string | ((name: string) => boolean);
    tag_contains?: string | ((data?: string) => boolean);

    [attributeName: string]:
        | undefined
        | string
        | ((attributeValue: string) => boolean);
}

/* eslint-disable @typescript-eslint/camelcase */
const Checks = {
    tag_name(name: string | ((name: string) => boolean)): TestType {
        if (typeof name === "function") {
            return (elem: Node) => isTag(elem) && name(elem.localName);
        } else if (name === "*") {
            return isTag;
        } else {
            return (elem: Node) => isTag(elem) && elem.localName === name;
        }
    },
    tag_contains(data: string | ((data?: string) => boolean)): TestType {
        if (typeof data === "function") {
            return (elem: Node) => isTextNode(elem) && data(elem.nodeValue);
        } else {
            return (elem: Node) => isTextNode(elem) && elem.nodeValue === data;
        }
    },
};

function getAttribCheck(
    attrib: string,
    value: undefined | string | ((value: string) => boolean),
): TestType {
    if (typeof value === "function") {
        return (elem: Node) => isTag(elem) && value(elem.attribs[attrib]);
    } else {
        return (elem: Node) => isTag(elem) && elem.attribs[attrib] === value;
    }
}

function combineFuncs(a: TestType, b: TestType): TestType {
    return (elem: Node) => a(elem) || b(elem);
}

function compileTest(options: TestElementOpts): TestType | null {
    const funcs = Object.keys(options).map((key) => {
        const value = options[key];
        return key in Checks
            ? (Checks as Record<string, Function>)[key](value)
            : getAttribCheck(key, value);
    });

    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}

export function testElement(options: TestElementOpts, element: Node): boolean {
    const test = compileTest(options);
    return test ? test(element) : true;
}

export function getElements(
    options: TestElementOpts,
    element: Node | Node[],
    recurse: boolean,
    limit = Infinity,
): Node[] {
    const test = compileTest(options);
    return test ? filter(test, element, recurse, limit) : [];
}

export function getElementById(
    id: string | ((id: string) => boolean),
    element: Node | Node[],
    recurse = true,
): Element | null {
    if (!Array.isArray(element)) element = [element];
    return findOne(
        getAttribCheck("id", id),
        element,
        recurse,
    ) as Element | null;
}

export function getElementsByClassName(
    names: string,
    element: Node | Node[],
    recurse = true,
    limit = Infinity,
): Element[] {
    return filter(
        getAttribCheck("class", (value) => value && value.includes(names)),
        element,
        recurse,
        limit,
    ) as Element[];
}

export function getElementsByName(
    name: string,
    element: Node | Node[],
    recurse = true,
    limit = Infinity,
): Element[] {
    return filter(getAttribCheck("name", name),
        element,
        recurse,
        limit,
    ) as Element[];
}

export function getElementsByTagName(
    name: string | ((name: string) => boolean),
    element: Node | Node[],
    recurse: boolean,
    limit = Infinity,
): Element[] {
    return filter(Checks.tag_name(name), element, recurse, limit) as Element[];
}
