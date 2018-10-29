/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class FiltersService {
    /**
     * @param {?} p
     * @param {?} o
     * @return {?}
     */
    static getPath(p, o) {
        /** @type {?} */
        const result = p.reduce((xs, x) => (xs && typeof xs[x] !== 'undefined') ? xs[x] : null, o);
        return result;
    }
}
FiltersService.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVhc3ktdGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL25neC1lYXN5LXRhYmxlL3NlcnZpY2VzL2ZpbHRlcnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNOzs7Ozs7SUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDOztRQUdqQixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNGLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7OztZQVBGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWx0ZXJzU2VydmljZSB7XG4gIHN0YXRpYyBnZXRQYXRoKHAsIG8pIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGhlcmdlcy9uZy1wYWNrYWdyL2lzc3Vlcy82OTZcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICBjb25zdCByZXN1bHQgPSBwLnJlZHVjZSgoeHMsIHgpID0+ICh4cyAmJiB0eXBlb2YgeHNbeF0gIT09ICd1bmRlZmluZWQnKSA/IHhzW3hdIDogbnVsbCwgbyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19