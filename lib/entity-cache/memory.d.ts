import { Subject } from 'rxjs/internal/Subject';
export type EntityCache<ENTITY> = {
    id: string;
    entity: ENTITY;
};
export type EntityCacheCallBack<ENTITY> = (cbParams: EntityCache<ENTITY>) => void;
export type EntityCacheSubscription = {
    unsubscribe: () => void;
};
export declare class EntityCacheMemory<ENTITY> {
    protected _memory: Record<string, {
        entity?: ENTITY;
        timeoutMs?: number;
    }>;
    protected _subject: Subject<EntityCache<ENTITY>>;
    getById(id: string): {
        needToFetch?: boolean;
        entity?: ENTITY;
    };
    set(params: EntityCache<ENTITY>, timeoutOffsetMs?: number): void;
    subscribeById(id: string, callback: (par: EntityCache<ENTITY>) => void): EntityCacheSubscription;
    protected _calculateTimeout(timeoutOffsetMs?: number): number | undefined;
    protected _timeoutExpired(timeoutMs?: number): boolean;
}
//# sourceMappingURL=memory.d.ts.map