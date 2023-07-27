import { jest } from '@jest/globals'
import { EntityCacheSubscription } from 'src/entity-cache/memory'
import { EntityCachePromiseService } from 'src/entity-cache/promise-service'

describe('EntityCachePromiseService', () => {
	const fakeMomentNow = new Date('2022-01-01T01:00:00.000Z')
	let subscriptions: EntityCacheSubscription[]

	class PromiseServiceImplementation extends EntityCachePromiseService<{ id: number; value: number }, number> {
		// eslint-disable-next-line @typescript-eslint/no-useless-constructor
		constructor() {
			super()
		}

		protected async _entityAsync(id: number): Promise<{ id: number; value: number }> {
			const dummyCollection: { id: number; value: number }[] = [
				{ id: 1, value: 10 },
				{ id: 2, value: 20 },
				{ id: 3, value: 30 },
				{ id: 4, value: 40 },
				{ id: 5, value: 50 },
				{ id: 6, value: 60 },
				{ id: 7, value: 70 },
				{ id: 8, value: 80 },
				{ id: 9, value: 90 },
			]
			const foundOne = dummyCollection.find((d) => d.id === id)
			if (!foundOne) {
				throw new Error('Not found')
			}

			return foundOne
		}

		protected readonly _timeoutOffsetMs = 1000 * 60 * 60 // 1h
	}

	let promiseServiceInstance: PromiseServiceImplementation

	beforeEach(() => {
		subscriptions = []
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		jest.useFakeTimers('modern' as any)
		jest.setSystemTime(fakeMomentNow.getTime())
		promiseServiceInstance = new PromiseServiceImplementation()
	})

	afterEach(() => {
		subscriptions.forEach((s) => s.unsubscribe())
		jest.resetAllMocks()
	})
	afterAll(() => jest.useRealTimers())

	describe('subscribeToEntityChangeById', () => {
		it('should not call callback if entity not in memory', () => {
			const fakeCallback = jest.fn()
			subscriptions.push(promiseServiceInstance.subscribeToEntityChangeById(1, fakeCallback))
			expect(fakeCallback).not.toHaveBeenCalled()
		})
		it('should call callback if entity in memory', () => {
			const fakeCallback = jest.fn()
			promiseServiceInstance['_dao']['_memory'] = { '1': { entity: { id: 1, value: 10 } } }
			subscriptions.push(promiseServiceInstance.subscribeToEntityChangeById(1, fakeCallback))
			expect(fakeCallback).toHaveBeenCalledTimes(1)
		})
		it('should call callback if entity not in memory, but call is coming after async forceRefresh', async () => {
			const fakeCallback = jest.fn()
			subscriptions.push(promiseServiceInstance.subscribeToEntityChangeById(1, fakeCallback))
			expect(fakeCallback).not.toHaveBeenCalled()
			await Promise.resolve()
			expect(fakeCallback).toHaveBeenCalledTimes(1)
		})
	})
	describe('forceRefresh', () => {
		it('should trigger subscribed callback on force refresh', async () => {
			const fakeCallback = jest.fn()
			subscriptions.push(promiseServiceInstance.subscribeToEntityChangeById(1, fakeCallback))
			await Promise.resolve()
			fakeCallback.mockReset()
			promiseServiceInstance.forceRefresh(1)
			await Promise.resolve()
			expect(fakeCallback).toHaveBeenCalledTimes(1)
		})
		it('should not trigger subscribed callback on force refresh if we have unsubscribed', async () => {
			const fakeCallback = jest.fn()
			const sub = promiseServiceInstance.subscribeToEntityChangeById(1, fakeCallback)
			await Promise.resolve()
			fakeCallback.mockReset()
			sub.unsubscribe()
			promiseServiceInstance.forceRefresh(1)
			await Promise.resolve()
			expect(fakeCallback).not.toHaveBeenCalled()
		})
	})
})
