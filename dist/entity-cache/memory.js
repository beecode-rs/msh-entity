import { TimeUtil } from '@beecode/msh-util/time-util';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/operators';
export class EntityCacheMemory {
    _memory = {};
    _subject = new Subject();
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
        return this._subject.pipe(filter((o) => o.id === id)).subscribe(callback);
    }
    _calculateTimeout(timeoutOffsetMs) {
        if (timeoutOffsetMs === undefined) {
            return undefined;
        }
        const timeUtil = new TimeUtil();
        return timeUtil.dateToUnix(timeUtil.now()) + timeoutOffsetMs;
    }
    _timeoutExpired(timeoutMs) {
        if (timeoutMs === undefined) {
            return false;
        }
        const timeUtil = new TimeUtil();
        return timeUtil.dateToUnix(timeUtil.now()) > timeoutMs;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VudGl0eS1jYWNoZS9tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFRdkMsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixPQUFPLEdBQTZELEVBQUUsQ0FBQTtJQUN0RSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUE7SUFFdkQsT0FBTyxDQUFDLEVBQVU7UUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUVyQixPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUE7SUFDNUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUEyQixFQUFFLGVBQXdCO1FBQ3hELE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFVLEVBQUUsUUFBNEM7UUFDckUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVTLGlCQUFpQixDQUFDLGVBQXdCO1FBQ25ELElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ25DLE9BQU8sU0FBUyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBRS9CLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUE7SUFDN0QsQ0FBQztJQUVTLGVBQWUsQ0FBQyxTQUFrQjtRQUMzQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM3QixPQUFPLEtBQUssQ0FBQTtRQUNiLENBQUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBRS9CLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7SUFDdkQsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZVV0aWwgfSBmcm9tICdAYmVlY29kZS9tc2gtdXRpbC90aW1lLXV0aWwnXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9pbnRlcm5hbC9TdWJqZWN0J1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbmV4cG9ydCB0eXBlIEVudGl0eUNhY2hlPEVOVElUWT4gPSB7IGlkOiBzdHJpbmc7IGVudGl0eTogRU5USVRZIH1cblxuZXhwb3J0IHR5cGUgRW50aXR5Q2FjaGVDYWxsQmFjazxFTlRJVFk+ID0gKGNiUGFyYW1zOiBFbnRpdHlDYWNoZTxFTlRJVFk+KSA9PiB2b2lkXG5cbmV4cG9ydCB0eXBlIEVudGl0eUNhY2hlU3Vic2NyaXB0aW9uID0geyB1bnN1YnNjcmliZTogKCkgPT4gdm9pZCB9XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlDYWNoZU1lbW9yeTxFTlRJVFk+IHtcblx0cHJvdGVjdGVkIF9tZW1vcnk6IHsgW2s6IHN0cmluZ106IHsgZW50aXR5PzogRU5USVRZOyB0aW1lb3V0TXM/OiBudW1iZXIgfSB9ID0ge31cblx0cHJvdGVjdGVkIF9zdWJqZWN0ID0gbmV3IFN1YmplY3Q8RW50aXR5Q2FjaGU8RU5USVRZPj4oKVxuXG5cdGdldEJ5SWQoaWQ6IHN0cmluZyk6IHsgbmVlZFRvRmV0Y2g/OiBib29sZWFuOyBlbnRpdHk/OiBFTlRJVFkgfSB7XG5cdFx0Y29uc3QgbWVtbyA9IHRoaXMuX21lbW9yeVtpZF1cblxuXHRcdGlmICghbWVtbykge1xuXHRcdFx0dGhpcy5fbWVtb3J5W2lkXSA9IHt9XG5cblx0XHRcdHJldHVybiB7IG5lZWRUb0ZldGNoOiB0cnVlIH1cblx0XHR9XG5cblx0XHRjb25zdCBuZWVkVG9GZXRjaCA9IHRoaXMuX3RpbWVvdXRFeHBpcmVkKG1lbW8udGltZW91dE1zKVxuXG5cdFx0cmV0dXJuIHsgZW50aXR5OiBtZW1vLmVudGl0eSwgbmVlZFRvRmV0Y2ggfVxuXHR9XG5cblx0c2V0KHBhcmFtczogRW50aXR5Q2FjaGU8RU5USVRZPiwgdGltZW91dE9mZnNldE1zPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgeyBpZCwgZW50aXR5IH0gPSBwYXJhbXNcblx0XHRjb25zdCB0aW1lb3V0TXMgPSB0aGlzLl9jYWxjdWxhdGVUaW1lb3V0KHRpbWVvdXRPZmZzZXRNcylcblx0XHR0aGlzLl9tZW1vcnlbaWRdID0geyBlbnRpdHksIHRpbWVvdXRNcyB9XG5cdFx0dGhpcy5fc3ViamVjdC5uZXh0KHsgZW50aXR5LCBpZCB9KVxuXHR9XG5cblx0c3Vic2NyaWJlQnlJZChpZDogc3RyaW5nLCBjYWxsYmFjazogKHBhcjogRW50aXR5Q2FjaGU8RU5USVRZPikgPT4gdm9pZCk6IEVudGl0eUNhY2hlU3Vic2NyaXB0aW9uIHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViamVjdC5waXBlKGZpbHRlcigobykgPT4gby5pZCA9PT0gaWQpKS5zdWJzY3JpYmUoY2FsbGJhY2spXG5cdH1cblxuXHRwcm90ZWN0ZWQgX2NhbGN1bGF0ZVRpbWVvdXQodGltZW91dE9mZnNldE1zPzogbnVtYmVyKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAodGltZW91dE9mZnNldE1zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdFx0Y29uc3QgdGltZVV0aWwgPSBuZXcgVGltZVV0aWwoKVxuXG5cdFx0cmV0dXJuIHRpbWVVdGlsLmRhdGVUb1VuaXgodGltZVV0aWwubm93KCkpICsgdGltZW91dE9mZnNldE1zXG5cdH1cblxuXHRwcm90ZWN0ZWQgX3RpbWVvdXRFeHBpcmVkKHRpbWVvdXRNcz86IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGlmICh0aW1lb3V0TXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdGNvbnN0IHRpbWVVdGlsID0gbmV3IFRpbWVVdGlsKClcblxuXHRcdHJldHVybiB0aW1lVXRpbC5kYXRlVG9Vbml4KHRpbWVVdGlsLm5vdygpKSA+IHRpbWVvdXRNc1xuXHR9XG59XG4iXX0=