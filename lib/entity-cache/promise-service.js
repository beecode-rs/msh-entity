"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCachePromiseService = void 0;
const memory_1 = require("../entity-cache/memory");
class EntityCachePromiseService {
    constructor(dao) {
        this._dao = dao !== null && dao !== void 0 ? dao : new memory_1.EntityCacheMemory();
    }
    /**
     * Subscribe to entity cache change and retrieve cached value if not undefined
     * @param {ID} id - entity unique identifier
     * @param {EntityCacheCallBack<ENTITY>} callback -
     * @returns {EntityCacheSubscription}
     */
    subscribeToEntityChangeById(id, callback) {
        const idString = id.toString();
        const subscription = this._dao.subscribeById(idString, callback);
        const { entity, needToFetch = false } = this._dao.getById(idString);
        if (entity !== undefined) {
            callback({ id: idString, entity });
        }
        if (needToFetch) {
            this.forceRefresh(id);
        }
        return subscription;
    }
    forceRefresh(id) {
        this._entityAsync(id).then((entity) => {
            return this._dao.set({ id: id.toString(), entity }, this._timeoutOffsetMs);
        });
    }
}
exports.EntityCachePromiseService = EntityCachePromiseService;
//# sourceMappingURL=promise-service.js.map