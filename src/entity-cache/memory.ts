import { TimeUtil } from '@beecode/msh-util/lib/time-util'
import { Subject } from 'rxjs/internal/Subject'
import { filter } from 'rxjs/operators'

export type EntityCache<ENTITY> = { id: string; entity: ENTITY }

export type EntityCacheCallBack<ENTITY> = (cbParams: EntityCache<ENTITY>) => void

export type EntityCacheSubscription = { unsubscribe: () => void }

export class EntityCacheMemory<ENTITY> {
	protected _memory: { [k: string]: { entity?: ENTITY; timeoutMs?: number } } = {}
	protected _subject = new Subject<EntityCache<ENTITY>>()

	getById(id: string): { needToFetch?: boolean; entity?: ENTITY } {
		const memo = this._memory[id]

		if (!memo) {
			this._memory[id] = {}

			return { needToFetch: true }
		}

		const needToFetch = this._timeoutExpired(memo.timeoutMs)

		return { entity: memo.entity, needToFetch }
	}

	set(params: EntityCache<ENTITY>, timeoutOffsetMs?: number): void {
		const { id, entity } = params
		const timeoutMs = this._calculateTimeout(timeoutOffsetMs)
		this._memory[id] = { entity, timeoutMs }
		this._subject.next({ entity, id })
	}

	subscribeById(id: string, callback: (par: EntityCache<ENTITY>) => void): EntityCacheSubscription {
		return this._subject.pipe(filter((o) => o.id === id)).subscribe(callback)
	}

	protected _calculateTimeout(timeoutOffsetMs?: number): number | undefined {
		if (timeoutOffsetMs === undefined) {
			return undefined
		}
		const timeUtil = new TimeUtil()

		return timeUtil.dateToUnix(timeUtil.now()) + timeoutOffsetMs
	}

	protected _timeoutExpired(timeoutMs?: number): boolean {
		if (timeoutMs === undefined) {
			return false
		}
		const timeUtil = new TimeUtil()

		return timeUtil.dateToUnix(timeUtil.now()) > timeoutMs
	}
}
