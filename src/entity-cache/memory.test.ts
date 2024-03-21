import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

import { EntityCacheMemory, EntityCacheSubscription } from '#src/entity-cache/memory'

describe('EntityCacheMemory', () => {
	const fakeMomentExpired = new Date('2022-01-01T00:00:00.000Z')
	const fakeMomentExpiredUnix = fakeMomentExpired.getTime()

	const fakeMomentNow = new Date('2022-01-01T01:00:00.000Z')
	const fakeMomentNowUnix = fakeMomentNow.getTime()

	const fakeMomentNotExpired = new Date('2022-01-01T02:00:00.000Z')
	const fakeMomentNotExpiredUnix = fakeMomentNotExpired.getTime()

	const entity_1 = { id: 1, value: 'test' }
	const timeoutOffsetMs = 1000 * 60 * 60 // 1h
	const fakeMomentOffsetUnix = fakeMomentNowUnix + timeoutOffsetMs

	let entityCacheMemoryInstance: EntityCacheMemory<any> // eslint-disable-line @typescript-eslint/no-explicit-any

	beforeEach(() => {
		entityCacheMemoryInstance = new EntityCacheMemory<any>() // eslint-disable-line @typescript-eslint/no-explicit-any
		jest.useFakeTimers({ now: fakeMomentNow.getTime() })
	})

	afterEach(() => {
		jest.resetAllMocks()
	})
	afterAll(() => {
		jest.useRealTimers()
	})

	describe('getById', () => {
		it('should return needToFetch flag if entity not in collection', () => {
			expect(entityCacheMemoryInstance.getById('1')).toEqual({ needToFetch: true })
		})

		it('should return entity with false needToFetch flag if entity did not expire', () => {
			entityCacheMemoryInstance['_memory'] = { '1': { entity: entity_1, timeoutMs: fakeMomentNotExpiredUnix } }
			expect(entityCacheMemoryInstance.getById('1')).toEqual({ entity: entity_1, needToFetch: false })
		})

		it('should return entity with needToFetch flag if entity has expired', () => {
			entityCacheMemoryInstance['_memory'] = { '1': { entity: entity_1, timeoutMs: fakeMomentExpiredUnix } }
			expect(entityCacheMemoryInstance.getById('1')).toEqual({ entity: entity_1, needToFetch: true })
		})

		it('should return entity with false needToFetch flag if timeoutMs is not set', () => {
			entityCacheMemoryInstance['_memory'] = { '1': { entity: entity_1 } }
			expect(entityCacheMemoryInstance.getById('1')).toEqual({ entity: entity_1, needToFetch: false })
		})
	})

	describe('set', () => {
		it('should set new entity to memory with no timout', () => {
			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() })
			expect(entityCacheMemoryInstance['_memory']).toEqual({ '1': { entity: entity_1 } })
		})
		it('should set new entity to memory with timout', () => {
			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() }, timeoutOffsetMs)
			expect(entityCacheMemoryInstance['_memory']).toEqual({ '1': { entity: entity_1, timeoutMs: fakeMomentOffsetUnix } })
		})
	})

	describe('subscribeById', () => {
		let subscriptions: EntityCacheSubscription[]
		beforeEach(() => {
			subscriptions = []
		})

		afterEach(() => {
			subscriptions.forEach((s) => s.unsubscribe())
		})

		it('should trigger subscription on set entity by the same Id that we are listening to', () => {
			const fake_fn1 = jest.fn()
			const fake_fn2 = jest.fn()
			const fake_fn3 = jest.fn()

			subscriptions.push(entityCacheMemoryInstance.subscribeById('1', fake_fn1))
			subscriptions.push(entityCacheMemoryInstance.subscribeById('2', fake_fn2))
			subscriptions.push(entityCacheMemoryInstance.subscribeById('3', fake_fn3))

			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() })

			expect(fake_fn1).toHaveBeenCalledTimes(1)
			expect(fake_fn1).toHaveBeenCalledWith({ entity: entity_1, id: '1' })
			expect(fake_fn2).not.toHaveBeenCalled()
			expect(fake_fn3).not.toHaveBeenCalled()

			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() })

			expect(fake_fn1).toHaveBeenCalledTimes(2)
			expect(fake_fn1).toHaveBeenNthCalledWith(2, { entity: entity_1, id: '1' })
			expect(fake_fn2).not.toHaveBeenCalled()
			expect(fake_fn3).not.toHaveBeenCalled()
		})

		it('should not call subscribed function after it is unsubscribed', () => {
			const fake_fn1_1 = jest.fn()
			const fake_fn1_2 = jest.fn()

			subscriptions.push(entityCacheMemoryInstance.subscribeById('1', fake_fn1_1))
			const subs2 = entityCacheMemoryInstance.subscribeById('1', fake_fn1_2)

			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() })
			expect(fake_fn1_1).toHaveBeenCalledTimes(1)
			expect(fake_fn1_2).toHaveBeenCalledTimes(1)

			subs2.unsubscribe()

			entityCacheMemoryInstance.set({ entity: entity_1, id: entity_1.id.toString() })
			expect(fake_fn1_1).toHaveBeenCalledTimes(2)
			expect(fake_fn1_2).toHaveBeenCalledTimes(1)
		})
	})
})
