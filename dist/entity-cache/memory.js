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
        return this._subject
            .pipe(filter((o) => {
            return o.id === id;
        }))
            .subscribe((p) => {
            callback(p);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VudGl0eS1jYWNoZS9tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFRdkMsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixPQUFPLEdBQTZELEVBQUUsQ0FBQTtJQUN0RSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUE7SUFFdkQsT0FBTyxDQUFDLEVBQVU7UUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUVyQixPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUE7SUFDNUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUEyQixFQUFFLGVBQXdCO1FBQ3hELE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFVLEVBQUUsUUFBNEM7UUFDckUsT0FBTyxJQUFJLENBQUMsUUFBUTthQUNsQixJQUFJLENBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNGO2FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRVMsaUJBQWlCLENBQUMsZUFBd0I7UUFDbkQsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbkMsT0FBTyxTQUFTLENBQUE7UUFDakIsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7UUFFL0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQTtJQUM3RCxDQUFDO0lBRVMsZUFBZSxDQUFDLFNBQWtCO1FBQzNDLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7UUFFL0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQTtJQUN2RCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lVXRpbCB9IGZyb20gJ0BiZWVjb2RlL21zaC11dGlsL3RpbWUtdXRpbCdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL2ludGVybmFsL1N1YmplY3QnXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuZXhwb3J0IHR5cGUgRW50aXR5Q2FjaGU8RU5USVRZPiA9IHsgaWQ6IHN0cmluZzsgZW50aXR5OiBFTlRJVFkgfVxuXG5leHBvcnQgdHlwZSBFbnRpdHlDYWNoZUNhbGxCYWNrPEVOVElUWT4gPSAoY2JQYXJhbXM6IEVudGl0eUNhY2hlPEVOVElUWT4pID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgRW50aXR5Q2FjaGVTdWJzY3JpcHRpb24gPSB7IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkIH1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUNhY2hlTWVtb3J5PEVOVElUWT4ge1xuXHRwcm90ZWN0ZWQgX21lbW9yeTogeyBbazogc3RyaW5nXTogeyBlbnRpdHk/OiBFTlRJVFk7IHRpbWVvdXRNcz86IG51bWJlciB9IH0gPSB7fVxuXHRwcm90ZWN0ZWQgX3N1YmplY3QgPSBuZXcgU3ViamVjdDxFbnRpdHlDYWNoZTxFTlRJVFk+PigpXG5cblx0Z2V0QnlJZChpZDogc3RyaW5nKTogeyBuZWVkVG9GZXRjaD86IGJvb2xlYW47IGVudGl0eT86IEVOVElUWSB9IHtcblx0XHRjb25zdCBtZW1vID0gdGhpcy5fbWVtb3J5W2lkXVxuXG5cdFx0aWYgKCFtZW1vKSB7XG5cdFx0XHR0aGlzLl9tZW1vcnlbaWRdID0ge31cblxuXHRcdFx0cmV0dXJuIHsgbmVlZFRvRmV0Y2g6IHRydWUgfVxuXHRcdH1cblxuXHRcdGNvbnN0IG5lZWRUb0ZldGNoID0gdGhpcy5fdGltZW91dEV4cGlyZWQobWVtby50aW1lb3V0TXMpXG5cblx0XHRyZXR1cm4geyBlbnRpdHk6IG1lbW8uZW50aXR5LCBuZWVkVG9GZXRjaCB9XG5cdH1cblxuXHRzZXQocGFyYW1zOiBFbnRpdHlDYWNoZTxFTlRJVFk+LCB0aW1lb3V0T2Zmc2V0TXM/OiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7IGlkLCBlbnRpdHkgfSA9IHBhcmFtc1xuXHRcdGNvbnN0IHRpbWVvdXRNcyA9IHRoaXMuX2NhbGN1bGF0ZVRpbWVvdXQodGltZW91dE9mZnNldE1zKVxuXHRcdHRoaXMuX21lbW9yeVtpZF0gPSB7IGVudGl0eSwgdGltZW91dE1zIH1cblx0XHR0aGlzLl9zdWJqZWN0Lm5leHQoeyBlbnRpdHksIGlkIH0pXG5cdH1cblxuXHRzdWJzY3JpYmVCeUlkKGlkOiBzdHJpbmcsIGNhbGxiYWNrOiAocGFyOiBFbnRpdHlDYWNoZTxFTlRJVFk+KSA9PiB2b2lkKTogRW50aXR5Q2FjaGVTdWJzY3JpcHRpb24ge1xuXHRcdHJldHVybiB0aGlzLl9zdWJqZWN0XG5cdFx0XHQucGlwZShcblx0XHRcdFx0ZmlsdGVyKChvKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG8uaWQgPT09IGlkXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0XHQuc3Vic2NyaWJlKChwKSA9PiB7XG5cdFx0XHRcdGNhbGxiYWNrKHApXG5cdFx0XHR9KVxuXHR9XG5cblx0cHJvdGVjdGVkIF9jYWxjdWxhdGVUaW1lb3V0KHRpbWVvdXRPZmZzZXRNcz86IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHRpbWVvdXRPZmZzZXRNcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGNvbnN0IHRpbWVVdGlsID0gbmV3IFRpbWVVdGlsKClcblxuXHRcdHJldHVybiB0aW1lVXRpbC5kYXRlVG9Vbml4KHRpbWVVdGlsLm5vdygpKSArIHRpbWVvdXRPZmZzZXRNc1xuXHR9XG5cblx0cHJvdGVjdGVkIF90aW1lb3V0RXhwaXJlZCh0aW1lb3V0TXM/OiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRpZiAodGltZW91dE1zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHRjb25zdCB0aW1lVXRpbCA9IG5ldyBUaW1lVXRpbCgpXG5cblx0XHRyZXR1cm4gdGltZVV0aWwuZGF0ZVRvVW5peCh0aW1lVXRpbC5ub3coKSkgPiB0aW1lb3V0TXNcblx0fVxufVxuIl19