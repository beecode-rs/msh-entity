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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VudGl0eS1jYWNoZS9tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFRdkMsTUFBTSxPQUFPLGlCQUFpQjtJQUNuQixPQUFPLEdBQTRELEVBQUUsQ0FBQTtJQUNyRSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQXVCLENBQUE7SUFFdkQsT0FBTyxDQUFDLEVBQVU7UUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUVyQixPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFBO1FBQzdCLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUE7SUFDNUMsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUEyQixFQUFFLGVBQXdCO1FBQ3hELE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFVLEVBQUUsUUFBNEM7UUFDckUsT0FBTyxJQUFJLENBQUMsUUFBUTthQUNsQixJQUFJLENBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWixPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNGO2FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRVMsaUJBQWlCLENBQUMsZUFBd0I7UUFDbkQsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbkMsT0FBTyxTQUFTLENBQUE7UUFDakIsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7UUFFL0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQTtJQUM3RCxDQUFDO0lBRVMsZUFBZSxDQUFDLFNBQWtCO1FBQzNDLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sS0FBSyxDQUFBO1FBQ2IsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7UUFFL0IsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQTtJQUN2RCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaW1lVXRpbCB9IGZyb20gJ0BiZWVjb2RlL21zaC11dGlsL3RpbWUtdXRpbCdcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL2ludGVybmFsL1N1YmplY3QnXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcblxuZXhwb3J0IHR5cGUgRW50aXR5Q2FjaGU8RU5USVRZPiA9IHsgaWQ6IHN0cmluZzsgZW50aXR5OiBFTlRJVFkgfVxuXG5leHBvcnQgdHlwZSBFbnRpdHlDYWNoZUNhbGxCYWNrPEVOVElUWT4gPSAoY2JQYXJhbXM6IEVudGl0eUNhY2hlPEVOVElUWT4pID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgRW50aXR5Q2FjaGVTdWJzY3JpcHRpb24gPSB7IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkIH1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUNhY2hlTWVtb3J5PEVOVElUWT4ge1xuXHRwcm90ZWN0ZWQgX21lbW9yeTogUmVjb3JkPHN0cmluZywgeyBlbnRpdHk/OiBFTlRJVFk7IHRpbWVvdXRNcz86IG51bWJlciB9PiA9IHt9XG5cdHByb3RlY3RlZCBfc3ViamVjdCA9IG5ldyBTdWJqZWN0PEVudGl0eUNhY2hlPEVOVElUWT4+KClcblxuXHRnZXRCeUlkKGlkOiBzdHJpbmcpOiB7IG5lZWRUb0ZldGNoPzogYm9vbGVhbjsgZW50aXR5PzogRU5USVRZIH0ge1xuXHRcdGNvbnN0IG1lbW8gPSB0aGlzLl9tZW1vcnlbaWRdXG5cblx0XHRpZiAoIW1lbW8pIHtcblx0XHRcdHRoaXMuX21lbW9yeVtpZF0gPSB7fVxuXG5cdFx0XHRyZXR1cm4geyBuZWVkVG9GZXRjaDogdHJ1ZSB9XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmVlZFRvRmV0Y2ggPSB0aGlzLl90aW1lb3V0RXhwaXJlZChtZW1vLnRpbWVvdXRNcylcblxuXHRcdHJldHVybiB7IGVudGl0eTogbWVtby5lbnRpdHksIG5lZWRUb0ZldGNoIH1cblx0fVxuXG5cdHNldChwYXJhbXM6IEVudGl0eUNhY2hlPEVOVElUWT4sIHRpbWVvdXRPZmZzZXRNcz86IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IHsgaWQsIGVudGl0eSB9ID0gcGFyYW1zXG5cdFx0Y29uc3QgdGltZW91dE1zID0gdGhpcy5fY2FsY3VsYXRlVGltZW91dCh0aW1lb3V0T2Zmc2V0TXMpXG5cdFx0dGhpcy5fbWVtb3J5W2lkXSA9IHsgZW50aXR5LCB0aW1lb3V0TXMgfVxuXHRcdHRoaXMuX3N1YmplY3QubmV4dCh7IGVudGl0eSwgaWQgfSlcblx0fVxuXG5cdHN1YnNjcmliZUJ5SWQoaWQ6IHN0cmluZywgY2FsbGJhY2s6IChwYXI6IEVudGl0eUNhY2hlPEVOVElUWT4pID0+IHZvaWQpOiBFbnRpdHlDYWNoZVN1YnNjcmlwdGlvbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3N1YmplY3Rcblx0XHRcdC5waXBlKFxuXHRcdFx0XHRmaWx0ZXIoKG8pID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gby5pZCA9PT0gaWRcblx0XHRcdFx0fSlcblx0XHRcdClcblx0XHRcdC5zdWJzY3JpYmUoKHApID0+IHtcblx0XHRcdFx0Y2FsbGJhY2socClcblx0XHRcdH0pXG5cdH1cblxuXHRwcm90ZWN0ZWQgX2NhbGN1bGF0ZVRpbWVvdXQodGltZW91dE9mZnNldE1zPzogbnVtYmVyKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAodGltZW91dE9mZnNldE1zID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdFx0Y29uc3QgdGltZVV0aWwgPSBuZXcgVGltZVV0aWwoKVxuXG5cdFx0cmV0dXJuIHRpbWVVdGlsLmRhdGVUb1VuaXgodGltZVV0aWwubm93KCkpICsgdGltZW91dE9mZnNldE1zXG5cdH1cblxuXHRwcm90ZWN0ZWQgX3RpbWVvdXRFeHBpcmVkKHRpbWVvdXRNcz86IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdGlmICh0aW1lb3V0TXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdGNvbnN0IHRpbWVVdGlsID0gbmV3IFRpbWVVdGlsKClcblxuXHRcdHJldHVybiB0aW1lVXRpbC5kYXRlVG9Vbml4KHRpbWVVdGlsLm5vdygpKSA+IHRpbWVvdXRNc1xuXHR9XG59XG4iXX0=