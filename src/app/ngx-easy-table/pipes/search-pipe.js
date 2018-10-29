/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { FiltersService } from '../services/filters.service';
export class SearchPipe {
    constructor() {
        this.filters = {};
    }
    /**
     * @param {?} array
     * @param {?=} filter
     * @return {?}
     */
    transform(array, filter) {
        if (typeof array === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined') {
            return array;
        }
        this.filters[filter.key] = filter.value.toString().toLocaleLowerCase();
        if (Object.keys(filter).length === 0 || filter.value === '') {
            delete this.filters[filter.key];
        }
        return array.filter((obj) => {
            return Object.keys(this.filters)
                .every((c) => {
                /** @type {?} */
                const split = c.split('.');
                /** @type {?} */
                const val = FiltersService.getPath(split, obj);
                /** @type {?} */
                const element = (typeof val === 'object') ? JSON.stringify(val) : val.toString().toLocaleLowerCase();
                return element.indexOf(this.filters[c]) > -1;
            });
        });
    }
}
SearchPipe.decorators = [
    { type: Pipe, args: [{
                name: 'search',
            },] }
];
if (false) {
    /** @type {?} */
    SearchPipe.prototype.filters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvcGlwZXMvc2VhcmNoLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU03RCxNQUFNOzt1QkFDaUMsRUFBRTs7Ozs7OztJQUV2QyxTQUFTLENBQUMsS0FBWSxFQUFFLE1BQXVDO1FBQzdELElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1lBQ2hDLE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ2pDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDM0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUM3QixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ1gsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBQzNCLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztnQkFDL0MsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JHLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO0tBQ0o7OztZQTNCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7YUFDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVycy5zZXJ2aWNlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGZpbHRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBmaWx0ZXI/OiB7IHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nIH0pOiBhbnlbXSB7XG4gICAgaWYgKHR5cGVvZiBhcnJheSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICAgIHRoaXMuZmlsdGVyc1tmaWx0ZXIua2V5XSA9IGZpbHRlci52YWx1ZS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgaWYgKE9iamVjdC5rZXlzKGZpbHRlcikubGVuZ3RoID09PSAwIHx8IGZpbHRlci52YWx1ZSA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlcnNbZmlsdGVyLmtleV07XG4gICAgfVxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZmlsdGVycylcbiAgICAgICAgLmV2ZXJ5KChjKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3BsaXQgPSBjLnNwbGl0KCcuJyk7XG4gICAgICAgICAgY29uc3QgdmFsID0gRmlsdGVyc1NlcnZpY2UuZ2V0UGF0aChzcGxpdCwgb2JqKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHZhbCkgOiB2YWwudG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmluZGV4T2YodGhpcy5maWx0ZXJzW2NdKSA+IC0xO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19