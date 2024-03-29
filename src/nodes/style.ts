/**
 * TextNode to contain a text element in DOM tree.
 * @param {string} value [description]
 */
import { Element } from "./element";

// todo: support cssText, priority eg: !important
// todo: rename to CSSStyleDeclaration
export class Style {
    private node: Element;

    constructor(node: Element) {
        this.node = node;
    }

    public getPropertyValue(property: string): string {
        const attr = this.node.getAttribute('style');
        if (!attr)
            return '';

        const styles = attr.split(';');
        for (const style of styles) {
            const [name, value] = style.split(':');
            if (name === property)
                return value.trim();
        }

        return '';
    }

    setProperty(propertyName: string, value: string) {
        let _value = this.node.getAttribute('style') || '';
        let index = 0;
        do {
            const next = _value.indexOf(';', index) + 1;
            const length = next - index - 1;
            const style = (length > 0 ? _value.substr(index, length) : _value.substr(index));
            if (style.substr(0, style.indexOf(':')).trim() === propertyName) {
                _value = _value.substr(0, index).trim() + (next ? ' ' + _value.substr(next).trim() : '');
                break;
            }
            index = next;
        } while (index);

        _value += ' ' + propertyName + ': ' + value + ';';
        this.node.setAttribute('style', _value.trim());
    }
}

// When a style is set in JS, map it to the corresponding CSS attribute
const styleMap: Record<string, string> = {
    'alignmentBaseline': 'alignment-baseline',
    'background': 'background',
    'backgroundAttachment': 'background-attachment',
    'backgroundClip': 'background-clip',
    'backgroundColor': 'background-color',
    'backgroundImage': 'background-image',
    'backgroundOrigin': 'background-origin',
    'backgroundPosition': 'background-position',
    'backgroundPositionX': 'background-position-x',
    'backgroundPositionY': 'background-position-y',
    'backgroundRepeat': 'background-repeat',
    'backgroundRepeatX': 'background-repeat-x',
    'backgroundRepeatY': 'background-repeat-y',
    'backgroundSize': 'background-size',
    'baselineShift': 'baseline-shift',
    'border': 'border',
    'borderBottom': 'border-bottom',
    'borderBottomColor': 'border-bottom-color',
    'borderBottomLeftRadius': 'border-bottom-left-radius',
    'borderBottomRightRadius': 'border-bottom-right-radius',
    'borderBottomStyle': 'border-bottom-style',
    'borderBottomWidth': 'border-bottom-width',
    'borderCollapse': 'border-collapse',
    'borderColor': 'border-color',
    'borderImage': 'border-image',
    'borderImageOutset': 'border-image-outset',
    'borderImageRepeat': 'border-image-repeat',
    'borderImageSlice': 'border-image-slice',
    'borderImageSource': 'border-image-source',
    'borderImageWidth': 'border-image-width',
    'borderLeft': 'border-left',
    'borderLeftColor': 'border-left-color',
    'borderLeftStyle': 'border-left-style',
    'borderLeftWidth': 'border-left-width',
    'borderRadius': 'border-radius',
    'borderRight': 'border-right',
    'borderRightColor': 'border-right-color',
    'borderRightStyle': 'border-right-style',
    'borderRightWidth': 'border-right-width',
    'borderSpacing': 'border-spacing',
    'borderStyle': 'border-style',
    'borderTop': 'border-top',
    'borderTopColor': 'border-top-color',
    'borderTopLeftRadius': 'border-top-left-radius',
    'borderTopRightRadius': 'border-top-right-radius',
    'borderTopStyle': 'border-top-style',
    'borderTopWidth': 'border-top-width',
    'borderWidth': 'border-width',
    'bottom': 'bottom',
    'boxShadow': 'box-shadow',
    'boxSizing': 'box-sizing',
    'captionSide': 'caption-side',
    'clear': 'clear',
    'clip': 'clip',
    'clipPath': 'clip-path',
    'clipRule': 'clip-rule',
    'color': 'color',
    'colorInterpolation': 'color-interpolation',
    'colorInterpolationFilters': 'color-interpolation-filters',
    'colorProfile': 'color-profile',
    'colorRendering': 'color-rendering',
    'content': 'content',
    'counterIncrement': 'counter-increment',
    'counterReset': 'counter-reset',
    'cursor': 'cursor',
    'direction': 'direction',
    'display': 'display',
    'dominantBaseline': 'dominant-baseline',
    'emptyCells': 'empty-cells',
    'enableBackground': 'enable-background',
    'fill': 'fill',
    'fillOpacity': 'fill-opacity',
    'fillRule': 'fill-rule',
    'filter': 'filter',
    'cssFloat': 'float',
    'floodColor': 'flood-color',
    'floodOpacity': 'flood-opacity',
    'font': 'font',
    'fontFamily': 'font-family',
    'fontSize': 'font-size',
    'fontStretch': 'font-stretch',
    'fontStyle': 'font-style',
    'fontVariant': 'font-variant',
    'fontWeight': 'font-weight',
    'glyphOrientationHorizontal': 'glyph-orientation-horizontal',
    'glyphOrientationVertical': 'glyph-orientation-vertical',
    'height': 'height',
    'imageRendering': 'image-rendering',
    'kerning': 'kerning',
    'left': 'left',
    'letterSpacing': 'letter-spacing',
    'lightingColor': 'lighting-color',
    'lineHeight': 'line-height',
    'listStyle': 'list-style',
    'listStyleImage': 'list-style-image',
    'listStylePosition': 'list-style-position',
    'listStyleType': 'list-style-type',
    'margin': 'margin',
    'marginBottom': 'margin-bottom',
    'marginLeft': 'margin-left',
    'marginRight': 'margin-right',
    'marginTop': 'margin-top',
    'marker': 'marker',
    'markerEnd': 'marker-end',
    'markerMid': 'marker-mid',
    'markerStart': 'marker-start',
    'mask': 'mask',
    'maxHeight': 'max-height',
    'maxWidth': 'max-width',
    'minHeight': 'min-height',
    'minWidth': 'min-width',
    'opacity': 'opacity',
    'orphans': 'orphans',
    'outline': 'outline',
    'outlineColor': 'outline-color',
    'outlineOffset': 'outline-offset',
    'outlineStyle': 'outline-style',
    'outlineWidth': 'outline-width',
    'overflow': 'overflow',
    'overflowX': 'overflow-x',
    'overflowY': 'overflow-y',
    'padding': 'padding',
    'paddingBottom': 'padding-bottom',
    'paddingLeft': 'padding-left',
    'paddingRight': 'padding-right',
    'paddingTop': 'padding-top',
    'page': 'page',
    'pageBreakAfter': 'page-break-after',
    'pageBreakBefore': 'page-break-before',
    'pageBreakInside': 'page-break-inside',
    'pointerEvents': 'pointer-events',
    'position': 'position',
    'quotes': 'quotes',
    'resize': 'resize',
    'right': 'right',
    'shapeRendering': 'shape-rendering',
    'size': 'size',
    'speak': 'speak',
    'src': 'src',
    'stopColor': 'stop-color',
    'stopOpacity': 'stop-opacity',
    'stroke': 'stroke',
    'strokeDasharray': 'stroke-dasharray',
    'strokeDashoffset': 'stroke-dashoffset',
    'strokeLinecap': 'stroke-linecap',
    'strokeLinejoin': 'stroke-linejoin',
    'strokeMiterlimit': 'stroke-miterlimit',
    'strokeOpacity': 'stroke-opacity',
    'strokeWidth': 'stroke-width',
    'tableLayout': 'table-layout',
    'textAlign': 'text-align',
    'textAnchor': 'text-anchor',
    'textDecoration': 'text-decoration',
    'textIndent': 'text-indent',
    'textLineThrough': 'text-line-through',
    'textLineThroughColor': 'text-line-through-color',
    'textLineThroughMode': 'text-line-through-mode',
    'textLineThroughStyle': 'text-line-through-style',
    'textLineThroughWidth': 'text-line-through-width',
    'textOverflow': 'text-overflow',
    'textOverline': 'text-overline',
    'textOverlineColor': 'text-overline-color',
    'textOverlineMode': 'text-overline-mode',
    'textOverlineStyle': 'text-overline-style',
    'textOverlineWidth': 'text-overline-width',
    'textRendering': 'text-rendering',
    'textShadow': 'text-shadow',
    'textTransform': 'text-transform',
    'textUnderline': 'text-underline',
    'textUnderlineColor': 'text-underline-color',
    'textUnderlineMode': 'text-underline-mode',
    'textUnderlineStyle': 'text-underline-style',
    'textUnderlineWidth': 'text-underline-width',
    'top': 'top',
    'unicodeBidi': 'unicode-bidi',
    'unicodeRange': 'unicode-range',
    'vectorEffect': 'vector-effect',
    'verticalAlign': 'vertical-align',
    'visibility': 'visibility',
    'whiteSpace': 'white-space',
    'widows': 'widows',
    'width': 'width',
    'wordBreak': 'word-break',
    'wordSpacing': 'word-spacing',
    'wordWrap': 'word-wrap',
    'writingMode': 'writing-mode',
    'zIndex': 'z-index',
    'zoom': 'zoom'
};

// For each item in styleMap, define a getter and setter on the style property.
Object.keys(styleMap).forEach((jsName) => {
    const cssName = styleMap[jsName];
    Object.defineProperty(Style.prototype, jsName, {
        get(): string | undefined {
            return this.getPropertyValue(cssName);
        },
        set(value: string): void {
            this.setProperty(cssName, value);
        },
        enumerable: false,
        configurable: true
    });
})
