"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _promiseService = require("./entity-cache/promise-service.js");
Object.keys(_promiseService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promiseService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _promiseService[key];
    }
  });
});
var _memory = require("./entity-cache/memory.js");
Object.keys(_memory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _memory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _memory[key];
    }
  });
});