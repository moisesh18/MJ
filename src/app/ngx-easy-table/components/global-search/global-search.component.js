/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output } from '@angular/core';
/**
 * From version 5.0 GlobalSearchComponent will be deprecated,
 * and from version 6.0 moved to GlobalSearchComponent plugin
 */
export class GlobalSearchComponent {
    constructor() {
        this.globalUpdate = new EventEmitter();
    }
}
GlobalSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'global-search',
                template: "<label for=\"search\">\n  <input type=\"text\"\n         id=\"search\"\n         class=\"ngx-table__header-search\"\n         #input\n         (input)=\"globalUpdate.emit({value: input.value})\"\n         placeholder=\"Search\"/>\n</label>\n"
            }] }
];
GlobalSearchComponent.propDecorators = {
    globalUpdate: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    GlobalSearchComponent.prototype.globalUpdate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvY29tcG9uZW50cy9nbG9iYWwtc2VhcmNoL2dsb2JhbC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEU7Ozs7QUFTQSxNQUFNOzs0QkFDcUIsSUFBSSxZQUFZLEVBQUU7Ozs7WUFWNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6Qiw2UEFBbUM7YUFDcEM7OzsyQkFPRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnbG9iYWwtc2VhcmNoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dsb2JhbC1zZWFyY2guaHRtbCcsXG59KVxuXG4vKipcbiAqIEZyb20gdmVyc2lvbiA1LjAgR2xvYmFsU2VhcmNoQ29tcG9uZW50IHdpbGwgYmUgZGVwcmVjYXRlZCxcbiAqIGFuZCBmcm9tIHZlcnNpb24gNi4wIG1vdmVkIHRvIEdsb2JhbFNlYXJjaENvbXBvbmVudCBwbHVnaW5cbiAqL1xuZXhwb3J0IGNsYXNzIEdsb2JhbFNlYXJjaENvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBnbG9iYWxVcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=