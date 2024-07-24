'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var nutritionist_png_1 = require("@/assets/images/nutritionist.png");
var ophthalmology_png_1 = require("@/assets/images/ophthalmology.png");
var updateUserRole_1 = require("@/modules/user/presentation/actions/updateUserRole");
var nextjs_1 = require("@clerk/nextjs");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var SelectType = function () {
    var _a = react_1.useState('PATIENT'), userType = _a[0], setUserType = _a[1];
    var user = nextjs_1.useUser().user;
    var router = navigation_1.useRouter();
    var onContinue = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, updateUserRole_1.updateRole(userType)];
                case 1:
                    res = _a.sent();
                    if (res.error) {
                        react_hot_toast_1["default"].error(res.error);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.reload())];
                case 2:
                    _a.sent();
                    router.push("/onboarding-complete-" + userType.toLowerCase());
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1["default"].error('An error occurred');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "h-full w-full flex flex-col justify-center items-center box-border p-3 mb-3" },
        React.createElement("div", { className: "w-3/4 mb-8" },
            React.createElement("p", { className: "text-xl font-bold text-center" }, "Are you a doctor or a patient?")),
        React.createElement("div", { className: "w-3/4 flex flex-col gap-3 justify-center items-center sm:flex-row sm:mb-16" },
            React.createElement("div", { className: "flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out " + (userType === 'DOCTOR' ? 'bg-primary' : ''), onClick: function () { return setUserType('DOCTOR'); } },
                React.createElement("img", { src: nutritionist_png_1["default"].src, className: "h-14", alt: "" }),
                React.createElement("p", { className: "text-lg font-bold" }, "Doctor"),
                React.createElement("p", { className: "text-center" }, "Professional health personnel, determined to improve and save lives")),
            React.createElement("div", { className: "flex justify-center items-center flex-col h-[300px] w-1/2 p-4 border-2 border-primary rounded-lg gap-3 cursor-pointer transition-all ease-in-out delay-75 " + (userType === 'PATIENT' ? 'bg-primary' : ''), onClick: function () { return setUserType('PATIENT'); } },
                React.createElement("img", { src: ophthalmology_png_1["default"].src, className: "h-14", alt: "" }),
                React.createElement("p", { className: "text-lg font-bold" }, "Patient"),
                React.createElement("p", { className: "text-center" }, "I need help to improve my health")))));
};
exports["default"] = SelectType;
