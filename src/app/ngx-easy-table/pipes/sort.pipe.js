/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { FiltersService } from '../services/filters.service';
export class SortPipe {
    /**
     * @param {?} aV
     * @param {?} bV
     * @return {?}
     */
    static isNaN(aV, bV) {
        return (isNaN(parseFloat(aV)) || !isFinite(aV)) || (isNaN(parseFloat(bV)) || !isFinite(bV));
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} key
     * @return {?}
     */
    static compare(a, b, key) {
        /** @type {?} */
        const split = key.split('.');
        /** @type {?} */
        const aPath = FiltersService.getPath(split, a);
        /** @type {?} */
        const bPath = FiltersService.getPath(split, b);
        /** @type {?} */
        const aValue = (aPath + '').toLowerCase();
        /** @type {?} */
        const bValue = (bPath + '').toLowerCase();
        if (SortPipe.isNaN(aPath, bPath)) {
            return aValue.localeCompare(bValue);
        }
        else {
            if (parseFloat(aPath) < parseFloat(bPath)) {
                return -1;
            }
            if (parseFloat(aPath) > parseFloat(bPath)) {
                return 1;
            }
        }
        return 0;
    }
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    transform(value, args) {
        if (!args.key || args.key === '') {
            return value;
        }
        if (args.order === 'asc') {
            return value.sort((a, b) => SortPipe.compare(a, b, args.key));
        }
        else {
            return value.sort((a, b) => SortPipe.compare(b, a, args.key));
        }
    }
}
SortPipe.decorators = [
    { type: Pipe, args: [{
                name: 'sort',
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVhc3ktdGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL25neC1lYXN5LXRhYmxlL3BpcGVzL3NvcnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSzdELE1BQU07Ozs7OztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBR3RGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBUSxFQUFFLENBQVEsRUFBRSxHQUFXOztRQUNwRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUM3QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7UUFDL0MsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBQy9DLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUMxQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ1g7WUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7U0FDRjtRQUVELE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0lBR1gsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFTO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0tBQ0Y7OztZQXJDRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLE1BQU07YUFDYiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVycy5zZXJ2aWNlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc29ydCcsXG59KVxuZXhwb3J0IGNsYXNzIFNvcnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHByaXZhdGUgc3RhdGljIGlzTmFOKGFWLCBiVikge1xuICAgIHJldHVybiAoaXNOYU4ocGFyc2VGbG9hdChhVikpIHx8ICFpc0Zpbml0ZShhVikpIHx8IChpc05hTihwYXJzZUZsb2F0KGJWKSkgfHwgIWlzRmluaXRlKGJWKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjb21wYXJlKGE6IGFueVtdLCBiOiBhbnlbXSwga2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IHNwbGl0ID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgY29uc3QgYVBhdGggPSBGaWx0ZXJzU2VydmljZS5nZXRQYXRoKHNwbGl0LCBhKTtcbiAgICBjb25zdCBiUGF0aCA9IEZpbHRlcnNTZXJ2aWNlLmdldFBhdGgoc3BsaXQsIGIpO1xuICAgIGNvbnN0IGFWYWx1ZSA9IChhUGF0aCArICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGJWYWx1ZSA9IChiUGF0aCArICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChTb3J0UGlwZS5pc05hTihhUGF0aCwgYlBhdGgpKSB7XG4gICAgICByZXR1cm4gYVZhbHVlLmxvY2FsZUNvbXBhcmUoYlZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcnNlRmxvYXQoYVBhdGgpIDwgcGFyc2VGbG9hdChiUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgaWYgKHBhcnNlRmxvYXQoYVBhdGgpID4gcGFyc2VGbG9hdChiUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJnczogYW55KTogYW55W10ge1xuICAgIGlmICghYXJncy5rZXkgfHwgYXJncy5rZXkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChhcmdzLm9yZGVyID09PSAnYXNjJykge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvcnQoKGEsIGIpID0+IFNvcnRQaXBlLmNvbXBhcmUoYSwgYiwgYXJncy5rZXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlLnNvcnQoKGEsIGIpID0+IFNvcnRQaXBlLmNvbXBhcmUoYiwgYSwgYXJncy5rZXkpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==