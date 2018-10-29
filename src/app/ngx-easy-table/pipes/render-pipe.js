/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { FiltersService } from '../services/filters.service';
export class RenderPipe {
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    transform(row, key) {
        /** @type {?} */
        const split = key.split('.');
        return FiltersService.getPath(split, row);
    }
}
RenderPipe.decorators = [
    { type: Pipe, args: [{
                name: 'render',
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvcGlwZXMvcmVuZGVyLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU03RCxNQUFNOzs7Ozs7SUFDSixTQUFTLENBQUMsR0FBUSxFQUFFLEdBQVc7O1FBQzdCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMzQzs7O1lBVEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpbHRlcnMuc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3JlbmRlcicsXG59KVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0ocm93OiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBrZXkuc3BsaXQoJy4nKTtcblxuICAgIHJldHVybiBGaWx0ZXJzU2VydmljZS5nZXRQYXRoKHNwbGl0LCByb3cpO1xuICB9XG59XG4iXX0=