"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementsByTagName = exports.getElementsByName = exports.getElementsByClassName = exports.getElementById = exports.getElements = exports.testElement = void 0;
const querying_1 = require("./querying");
const node_types_1 = require("../node-types");
/* eslint-disable @typescript-eslint/camelcase */
const Checks = {
    tag_name(name) {
        if (typeof name === "function") {
            return (elem) => node_types_1.isElementNode(elem) && name(elem.localName);
        }
        else if (name === "*") {
            return node_types_1.isElementNode;
        }
        else {
            return (elem) => node_types_1.isElementNode(elem) && elem.localName === name;
        }
    },
    tag_contains(data) {
        if (typeof data === "function") {
            return (elem) => node_types_1.isTextNode(elem) && data(elem.nodeValue);
        }
        else {
            return (elem) => node_types_1.isTextNode(elem) && elem.nodeValue === data;
        }
    },
};
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return (elem) => node_types_1.isElementNode(elem) && value(elem.attribs[attrib]);
    }
    else {
        return (elem) => node_types_1.isElementNode(elem) && elem.attribs[attrib] === value;
    }
}
function combineFuncs(a, b) {
    return (elem) => a(elem) || b(elem);
}
function compileTest(options) {
    const funcs = Object.keys(options).map((key) => {
        const value = options[key];
        return key in Checks
            ? Checks[key](value)
            : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options, element) {
    const test = compileTest(options);
    return test ? test(element) : true;
}
exports.testElement = testElement;
function getElements(options, element, recurse, limit = Infinity) {
    const test = compileTest(options);
    return test ? querying_1.filter(test, element, recurse, limit) : [];
}
exports.getElements = getElements;
function getElementById(id, element, recurse = true) {
    if (!Array.isArray(element))
        element = [element];
    return querying_1.findOne(getAttribCheck("id", id), element, recurse);
}
exports.getElementById = getElementById;
function getElementsByClassName(names, element, recurse = true, limit = Infinity) {
    return querying_1.filter(getAttribCheck("class", (value) => value && value.includes(names)), element, recurse, limit);
}
exports.getElementsByClassName = getElementsByClassName;
function getElementsByName(name, element, recurse = true, limit = Infinity) {
    return querying_1.filter(getAttribCheck("name", name), element, recurse, limit);
}
exports.getElementsByName = getElementsByName;
function getElementsByTagName(name, element, recurse, limit = Infinity) {
    return querying_1.filter(Checks.tag_name(name), element, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
