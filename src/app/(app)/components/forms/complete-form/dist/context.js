"use strict";
exports.__esModule = true;
exports.useComplete = exports.CompleteProvider = exports.CompleteContext = void 0;
var react_1 = require("react");
exports.CompleteContext = react_1.createContext(null);
exports.CompleteProvider = function (_a) {
    var children = _a.children;
    return React.createElement(exports.CompleteContext.Provider, { value: {} }, children);
};
exports.useComplete = function () { return react_1.useContext(exports.CompleteContext); };
