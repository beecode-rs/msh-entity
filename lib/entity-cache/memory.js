"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityCacheMemory = void 0;
var _timeUtil = require("@beecode/msh-util/time-util");
var _Subject = require("rxjs/internal/Subject");
var _operators = require("rxjs/operators");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EntityCacheMemory = exports.EntityCacheMemory = /*#__PURE__*/function () {
  function EntityCacheMemory() {
    _classCallCheck(this, EntityCacheMemory);
    _defineProperty(this, "_memory", {});
    _defineProperty(this, "_subject", new _Subject.Subject());
  }
  return _createClass(EntityCacheMemory, [{
    key: "getById",
    value: function getById(id) {
      var memo = this._memory[id];
      if (!memo) {
        this._memory[id] = {};
        return {
          needToFetch: true
        };
      }
      var needToFetch = this._timeoutExpired(memo.timeoutMs);
      return {
        entity: memo.entity,
        needToFetch: needToFetch
      };
    }
  }, {
    key: "set",
    value: function set(params, timeoutOffsetMs) {
      var id = params.id,
        entity = params.entity;
      var timeoutMs = this._calculateTimeout(timeoutOffsetMs);
      this._memory[id] = {
        entity: entity,
        timeoutMs: timeoutMs
      };
      this._subject.next({
        entity: entity,
        id: id
      });
    }
  }, {
    key: "subscribeById",
    value: function subscribeById(id, callback) {
      return this._subject.pipe((0, _operators.filter)(function (o) {
        return o.id === id;
      })).subscribe(function (p) {
        callback(p);
      });
    }
  }, {
    key: "_calculateTimeout",
    value: function _calculateTimeout(timeoutOffsetMs) {
      if (timeoutOffsetMs === undefined) {
        return undefined;
      }
      var timeUtil = new _timeUtil.TimeUtil();
      return timeUtil.dateToUnix(timeUtil.now()) + timeoutOffsetMs;
    }
  }, {
    key: "_timeoutExpired",
    value: function _timeoutExpired(timeoutMs) {
      if (timeoutMs === undefined) {
        return false;
      }
      var timeUtil = new _timeUtil.TimeUtil();
      return timeUtil.dateToUnix(timeUtil.now()) > timeoutMs;
    }
  }]);
}();