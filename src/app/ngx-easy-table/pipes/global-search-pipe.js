/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class GlobalSearchPipe {
    /**
     * @param {?} dataArr
     * @param {?=} filter
     * @return {?}
     */
    transform(dataArr, filter) {
        if (typeof dataArr === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter === '') {
            return dataArr;
        }
        return dataArr.filter((row) => {
            /** @type {?} */
            const element = JSON.stringify(row);
            return element.toLocaleLowerCase().indexOf(filter.value.toLocaleLowerCase()) !== -1;
        });
    }
}
GlobalSearchPipe.decorators = [
    { type: Pipe, args: [{
                name: 'global',
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXNlYXJjaC1waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWVhc3ktdGFibGUvIiwic291cmNlcyI6WyJzcmMvYXBwL25neC1lYXN5LXRhYmxlL3BpcGVzL2dsb2JhbC1zZWFyY2gtcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFNcEQsTUFBTTs7Ozs7O0lBQ0osU0FBUyxDQUFDLE9BQVksRUFBRSxNQUFZO1FBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQ3RGLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsT0FBTyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDckYsQ0FBQyxDQUFDO0tBQ0o7OztZQWhCRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7YUFDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnZ2xvYmFsJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBHbG9iYWxTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShkYXRhQXJyOiBhbnksIGZpbHRlcj86IGFueSkge1xuICAgIGlmICh0eXBlb2YgZGF0YUFyciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICd1bmRlZmluZWQnIHx8IE9iamVjdC5rZXlzKGZpbHRlcikubGVuZ3RoID09PSAwIHx8IGZpbHRlciA9PT0gJycpIHtcbiAgICAgIHJldHVybiBkYXRhQXJyO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YUFyci5maWx0ZXIoKHJvdykgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IEpTT04uc3RyaW5naWZ5KHJvdyk7XG4gICAgICByZXR1cm4gZWxlbWVudC50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyLnZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpICE9PSAtMTtcbiAgICB9KTtcbiAgfVxufVxuIl19