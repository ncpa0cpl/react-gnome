"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/handle-program-error.ts
var handle_program_error_exports = {};
__export(handle_program_error_exports, {
  handleProgramError: () => handleProgramError
});
module.exports = __toCommonJS(handle_program_error_exports);
var import_chalk = __toESM(require("chalk"));
var handleProgramError = (e) => {
  const isObject = (o) => typeof o === "object" && o != null;
  const isValidationError = (e2) => {
    return isObject(e2) && e2 instanceof Error && "fieldPath" in e2 || false;
  };
  if (isValidationError(e)) {
    console.error(
      import_chalk.default.redBright(
        `Config file is invalid. Property "${import_chalk.default.yellowBright(
          e.fieldPath
        )}" is incorrect.`
      )
    );
  } else if (isObject(e) && e instanceof Error) {
    console.error("Build failed due to an error: ", import_chalk.default.redBright(e.message));
  } else {
    console.error(import_chalk.default.redBright("Build failed due to an unknown error."));
  }
  process.exit(1);
};
