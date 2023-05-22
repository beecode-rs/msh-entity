"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCacheMemory = void 0;
const time_util_1 = require("@beecode/msh-util/lib/time-util");
const Subject_1 = require("rxjs/internal/Subject");
const operators_1 = require("rxjs/operators");
class EntityCacheMemory {
    constructor() {
        this._memory = {};
        this._subject = new Subject_1.Subject();
    }
    getById(id) {
        const memo = this._memory[id];
        if (!memo) {
            this._memory[id] = {};
            return { needToFetch: true };
        }
        const needToFetch = this._timeoutExpired(memo.timeoutMs);
        return { entity: memo.entity, needToFetch };
    }
    set(params, timeoutOffsetMs) {
        const { id, entity } = params;
        const timeoutMs = this._calculateTimeout(timeoutOffsetMs);
        this._memory[id] = { entity, timeoutMs };
        this._subject.next({ entity, id });
    }
    subscribeById(id, callback) {
        return this._subject.pipe((0, operators_1.filter)((o) => o.id === id)).subscribe(callback);
    }
    _calculateTimeout(timeoutOffsetMs) {
        if (timeoutOffsetMs === undefined) {
            return undefined;
        }
        const timeUtil = new time_util_1.TimeUtil();
        return timeUtil.dateToUnix(timeUtil.now()) + timeoutOffsetMs;
    }
    _timeoutExpired(timeoutMs) {
        if (timeoutMs === undefined) {
            return false;
        }
        const timeUtil = new time_util_1.TimeUtil();
        return timeUtil.dateToUnix(timeUtil.now()) > timeoutMs;
    }
}
exports.EntityCacheMemory = EntityCacheMemory;
//# sourceMappingURL=memory.js.map