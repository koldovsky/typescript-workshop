"use strict";
function DOMElement(value) {
    return function (target, propertyKey, descriptor) {
        var oldMethod = target[propertyKey];
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return "<" + value + ">" + oldMethod.apply(this, args) + "</" + value + ">";
        };
        return descriptor;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DOMElement;
//# sourceMappingURL=dom-element.js.map