"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementsByTagName = exports.getElementsByName = exports.getElementsByClassName = exports.getElementById = exports.getElements = exports.testElement = void 0;
const querying_1 = require("./querying");
const node_types_1 = require("../tree-adapter/node-types");
/* eslint-disable @typescript-eslint/camelcase */
const Checks = {
    tag_name(name) {
        if (typeof name === "function") {
            return (elem) => (0, node_types_1.isElementNode)(elem) && name(elem.localName);
        }
        else if (name === "*") {
            return node_types_1.isElementNode;
        }
        else {
            return (elem) => (0, node_types_1.isElementNode)(elem) && elem.localName === name;
        }
    },
    tag_contains(data) {
        if (typeof data === "function") {
            return (elem) => (0, node_types_1.isTextNode)(elem) && data(elem.nodeValue);
        }
        else {
            return (elem) => (0, node_types_1.isTextNode)(elem) && elem.nodeValue === data;
        }
    },
};
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return (elem) => (0, node_types_1.isElementNode)(elem) && value(elem.attribs[attrib]);
    }
    else {
        return (elem) => (0, node_types_1.isElementNode)(elem) && elem.attribs[attrib] === value;
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
    return test ? (0, querying_1.filter)(test, element, recurse, limit) : [];
}
exports.getElements = getElements;
function getElementById(id, element, recurse = true) {
    if (!Array.isArray(element))
        element = [element];
    return (0, querying_1.findOne)(getAttribCheck("id", id), element, recurse);
}
exports.getElementById = getElementById;
function getElementsByClassName(names, element, recurse = true, limit = Infinity) {
    return (0, querying_1.filter)(getAttribCheck("class", (values) => {
        if (values && names) {
            const valuesArray = values.split(' '); // 10
            const namesArray = names.split(' '); // 2
            for (const name of namesArray) {
                if (!name) {
                    continue;
                }
                if (valuesArray.indexOf(name) === -1) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }), element, recurse, limit);
}
exports.getElementsByClassName = getElementsByClassName;
function getElementsByName(name, element, recurse = true, limit = Infinity) {
    return (0, querying_1.filter)(getAttribCheck("name", name), element, recurse, limit);
}
exports.getElementsByName = getElementsByName;
function getElementsByTagName(name, element, recurse, limit = Infinity) {
    return (0, querying_1.filter)(Checks.tag_name(name), element, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
