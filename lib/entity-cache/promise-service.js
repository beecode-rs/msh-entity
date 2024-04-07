"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityCachePromiseService = void 0;
var _memory = require("../entity-cache/memory.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EntityCachePromiseService = exports.EntityCachePromiseService = /*#__PURE__*/function () {
  function EntityCachePromiseService(dao) {
    _classCallCheck(this, EntityCachePromiseService);
    this._dao = dao !== null && dao !== void 0 ? dao : new _memory.EntityCacheMemory();
  }

  /**
   * Subscribe to entity cache change and retrieve cached value if not undefined
   * @param {ID} id - entity unique identifier
   * @param {EntityCacheCallBack<ENTITY>} callback -
   * @returns {EntityCacheSubscription}
   */
  return _createClass(EntityCachePromiseService, [{
    key: "subscribeToEntityChangeById",
    value: function subscribeToEntityChangeById(id, callback) {
      var idString = id.toString();
      var subscription = this._dao.subscribeById(idString, callback);
      var _this$_dao$getById = this._dao.getById(idString),
        entity = _this$_dao$getById.entity,
        _this$_dao$getById$ne = _this$_dao$getById.needToFetch,
        needToFetch = _this$_dao$getById$ne === void 0 ? false : _this$_dao$getById$ne;
      if (entity !== undefined) {
        callback({
          entity: entity,
          id: idString
        });
      }
      if (needToFetch) {
        this.forceRefresh(id);
      }
      return subscription;
    }
  }, {
    key: "forceRefresh",
    value: function forceRefresh(id) {
      var _this = this;
      this._entityAsync(id).then(function (entity) {
        return _this._dao.set({
          entity: entity,
          id: id.toString()
        }, _this._timeoutOffsetMs);
      });
    }
  }]);
}();