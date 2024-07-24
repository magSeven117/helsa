'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var stepper_1 = require("@/libs/ducen-ui/components/stepper");
var button_1 = require("@/libs/shadcn-ui/button");
var select_type_1 = require("./select-type");
var principal_info_1 = require("./principal-info");
var steps = [
    { label: "Tipo de usuario", component: React.createElement(select_type_1["default"], null) },
    { label: "Datos básicos", component: React.createElement(principal_info_1["default"], null) },
    { label: "Complementar" },
], satisfies, StepItem, _a = void 0;
function CompleteForm() {
    return (React.createElement("div", { className: "flex w-full flex-col gap-2" },
        React.createElement(stepper_1.Stepper, { initialStep: 0, steps: steps },
            steps.map(function (stepProps, index) {
                return (React.createElement(stepper_1.Step, __assign({ key: stepProps.label }, stepProps), stepProps.component ? stepProps.component : React.createElement("div", null,
                    "Step ",
                    index + 1)));
            }),
            React.createElement(Footer, null))));
}
exports["default"] = CompleteForm;
var Footer = function () {
    var _a = stepper_1.useStepper(), nextStep = _a.nextStep, prevStep = _a.prevStep, resetSteps = _a.resetSteps, hasCompletedAllSteps = _a.hasCompletedAllSteps, isLastStep = _a.isLastStep, isOptionalStep = _a.isOptionalStep, isDisabledStep = _a.isDisabledStep;
    return (React.createElement(React.Fragment, null,
        hasCompletedAllSteps && (React.createElement("div", { className: "h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md" },
            React.createElement("h1", { className: "text-xl" }, "Woohoo! All steps completed! \uD83C\uDF89"))),
        React.createElement("div", { className: "w-full flex justify-end gap-2 mb-2" }, hasCompletedAllSteps ? (React.createElement(button_1.Button, { size: "sm", onClick: resetSteps }, "Reset")) : (React.createElement(React.Fragment, null,
            React.createElement(button_1.Button, { disabled: isDisabledStep, onClick: prevStep, size: "sm", variant: "secondary" }, "Prev"),
            React.createElement(button_1.Button, { size: "sm", onClick: nextStep }, isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"))))));
};
