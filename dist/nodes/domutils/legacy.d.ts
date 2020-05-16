import { Node } from "../node";
import { Element } from "../element";
interface TestElementOpts {
    tag_name?: string | ((name: string) => boolean);
    tag_contains?: string | ((data?: string) => boolean);
    [attributeName: string]: undefined | string | ((attributeValue: string) => boolean);
}
export declare function testElement(options: TestElementOpts, element: Node): boolean;
export declare function getElements(options: TestElementOpts, element: Node | Node[], recurse: boolean, limit?: number): Node[];
export declare function getElementById(id: string | ((id: string) => boolean), element: Node | Node[], recurse?: boolean): Element | null;
export declare function getElementsByClassName(names: string, element: Node | Node[], recurse?: boolean, limit?: number): Element[];
export declare function getElementsByName(name: string, element: Node | Node[], recurse?: boolean, limit?: number): Element[];
export declare function getElementsByTagName(name: string | ((name: string) => boolean), element: Node | Node[], recurse: boolean, limit?: number): Element[];
export {};
