import { EntityCacheCallBack, EntityCacheMemory, EntityCacheSubscription } from '#src/entity-cache/memory'

export abstract class EntityCachePromiseService<ENTITY, ID extends string | number = string> {
	protected readonly _dao: EntityCacheMemory<ENTITY>

	protected abstract readonly _timeoutOffsetMs?: number
	protected abstract _entityAsync(id: ID): Promise<ENTITY>

	protected constructor(dao?: EntityCacheMemory<ENTITY>) {
		this._dao = dao ?? new EntityCacheMemory<ENTITY>()
	}

	/**
	 * Subscribe to entity cache change and retrieve cached value if not undefined
	 * @param {ID} id - entity unique identifier
	 * @param {EntityCacheCallBack<ENTITY>} callback -
	 * @returns {EntityCacheSubscription}
	 */
	async subscribeToEntityChangeById(id: ID, callback: EntityCacheCallBack<ENTITY>): Promise<EntityCacheSubscription> {
		const idString = id.toString()
		const subscription = this._dao.subscribeById(idString, callback)
		const { entity, needToFetch = false } = this._dao.getById(idString)
		if (entity !== undefined) {
			callback({ entity, id: idString })
		}
		if (needToFetch) {
			await this.forceRefresh(id)
		}

		return subscription
	}

	async forceRefresh(id: ID): Promise<void> {
		await this._entityAsync(id).then((entity) => {
			return this._dao.set({ entity, id: id.toString() }, this._timeoutOffsetMs)
		})
	}
}
