export const getFirstChild = function (node) {
    return node.firstChild;
};

export const getChildNodes = function (node) {
    return node.childNodes;
};

export const getParentNode = function (node) {
    return node.parentNode;
};

export const getAttrList = function (element) {
    const attrList = [];

    for (const name in element.attribs) {
        attrList.push({
            name: name,
            value: element.attribs[name],
        });
    }

    return attrList;
};
