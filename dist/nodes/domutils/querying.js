"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
const node_types_1 = require("../node-types");
/**
 * Search a node and its children for nodes passing a test function.
 *
 * @param test Function to test nodes on.
 * @param node Element to search. Will be included in the result set if it matches.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 */
function filter(test, node, recurse = true, limit = Infinity) {
    if (!Array.isArray(node))
        node = [node];
    return find(test, node, recurse, limit);
}
exports.filter = filter;
/**
 * Like `filter`, but only works on an array of nodes.
 *
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 */
function find(test, nodes, recurse, limit) {
    const result = [];
    for (const elem of nodes) {
        if (test(elem)) {
            result.push(elem);
            if (--limit <= 0)
                break;
        }
        if (recurse && elem.childNodes && elem.childNodes.length > 0) {
            const children = find(test, elem.childNodes, recurse, limit);
            result.push(...children);
            limit -= children.length;
            if (limit <= 0)
                break;
        }
    }
    return result;
}
exports.find = find;
/**
 * Finds the first element inside of an array that matches a test function.
 *
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 */
function findOneChild(test, nodes) {
    return nodes.find(test);
}
exports.findOneChild = findOneChild;
/**
 * Finds one element in a tree that passes a test.
 *
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @param recurse Also consider child nodes.
 */
function findOne(test, nodes, recurse = true) {
    let elem = null;
    for (let i = 0; i < nodes.length && !elem; i++) {
        const checked = nodes[i];
        if (!node_types_1.isElementNode(checked)) {
            continue;
        }
        else if (test(checked)) {
            elem = checked;
        }
        else if (recurse && checked.childNodes.length > 0) {
            elem = findOne(test, checked.childNodes);
        }
    }
    return elem;
}
exports.findOne = findOne;
/**
 * Returns whether a tree of nodes contains at least one node passing a test.
 *
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 */
function existsOne(test, nodes) {
    return nodes.some((checked) => node_types_1.isElementNode(checked) &&
        (test(checked) ||
            (checked.childNodes.length > 0 &&
                existsOne(test, checked.childNodes))));
}
exports.existsOne = existsOne;
/**
 * Search and array of nodes and its children for nodes passing a test function.
 *
 * Same as `find`, only with less options, leading to reduced complexity.
 *
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 */
function findAll(test, nodes) {
    var _a;
    const result = [];
    const stack = nodes.filter(node_types_1.isElementNode);
    let elem;
    while ((elem = stack.shift())) {
        const children = (_a = elem.childNodes) === null || _a === void 0 ? void 0 : _a.filter(node_types_1.isElementNode);
        if (children && children.length > 0) {
            stack.unshift(...children);
        }
        if (test(elem))
            result.push(elem);
    }
    return result;
}
exports.findAll = findAll;
