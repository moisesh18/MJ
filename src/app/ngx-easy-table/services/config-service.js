/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class ConfigService {
}
ConfigService.config = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: true,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: false,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    tableLayout: {
        style: 'normal',
        theme: 'light',
        borderless: false,
        hover: true,
        striped: false,
    },
};
ConfigService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ConfigService.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvc2VydmljZXMvY29uZmlnLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTTs7dUJBQzJCO0lBQzdCLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixhQUFhLEVBQUUsS0FBSztJQUNwQixVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsS0FBSztJQUNoQixTQUFTLEVBQUUsS0FBSztJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixJQUFJLEVBQUUsRUFBRTtJQUNSLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixTQUFTLEVBQUUsS0FBSztJQUNoQixlQUFlLEVBQUUsS0FBSztJQUN0QixTQUFTLEVBQUUsS0FBSztJQUNoQixzQkFBc0IsRUFBRSxJQUFJO0lBQzVCLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFlBQVksRUFBRSxLQUFLO0lBQ25CLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixTQUFTLEVBQUUsS0FBSztJQUNoQixNQUFNLEVBQUUsS0FBSztJQUNiLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsaUJBQWlCLEVBQUUsQ0FBQztJQUNwQixXQUFXLEVBQUU7UUFDWCxLQUFLLEVBQUUsUUFBUTtRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsVUFBVSxFQUFFLEtBQUs7UUFDakIsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0Y7O1lBdkNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9tb2RlbC9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgY29uZmlnOiBDb25maWcgPSB7XG4gICAgc2VhcmNoRW5hYmxlZDogZmFsc2UsXG4gICAgaGVhZGVyRW5hYmxlZDogdHJ1ZSxcbiAgICBvcmRlckVuYWJsZWQ6IHRydWUsXG4gICAgb3JkZXJFdmVudE9ubHk6IGZhbHNlLFxuICAgIGdsb2JhbFNlYXJjaEVuYWJsZWQ6IGZhbHNlLFxuICAgIHBhZ2luYXRpb25FbmFibGVkOiB0cnVlLFxuICAgIGV4cG9ydEVuYWJsZWQ6IGZhbHNlLFxuICAgIGNsaWNrRXZlbnQ6IHRydWUsXG4gICAgc2VsZWN0Um93OiBmYWxzZSxcbiAgICBzZWxlY3RDb2w6IGZhbHNlLFxuICAgIHNlbGVjdENlbGw6IGZhbHNlLFxuICAgIHJvd3M6IDEwLFxuICAgIGFkZGl0aW9uYWxBY3Rpb25zOiBmYWxzZSxcbiAgICBzZXJ2ZXJQYWdpbmF0aW9uOiBmYWxzZSxcbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIGRldGFpbHNUZW1wbGF0ZTogZmFsc2UsXG4gICAgZ3JvdXBSb3dzOiBmYWxzZSxcbiAgICBwYWdpbmF0aW9uUmFuZ2VFbmFibGVkOiB0cnVlLFxuICAgIGNvbGxhcHNlQWxsUm93czogZmFsc2UsXG4gICAgY2hlY2tib3hlczogZmFsc2UsXG4gICAgcmVzaXplQ29sdW1uOiBmYWxzZSxcbiAgICBmaXhlZENvbHVtbldpZHRoOiBmYWxzZSxcbiAgICBob3Jpem9udGFsU2Nyb2xsOiBmYWxzZSxcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIGxvZ2dlcjogZmFsc2UsXG4gICAgc2hvd0RldGFpbHNBcnJvdzogZmFsc2UsXG4gICAgc2hvd0NvbnRleHRNZW51OiBmYWxzZSxcbiAgICBwZXJzaXN0U3RhdGU6IGZhbHNlLFxuICAgIHBhZ2luYXRpb25NYXhTaXplOiA1LFxuICAgIHRhYmxlTGF5b3V0OiB7XG4gICAgICBzdHlsZTogJ25vcm1hbCcsXG4gICAgICB0aGVtZTogJ2xpZ2h0JyxcbiAgICAgIGJvcmRlcmxlc3M6IGZhbHNlLFxuICAgICAgaG92ZXI6IHRydWUsXG4gICAgICBzdHJpcGVkOiBmYWxzZSxcbiAgICB9LFxuICB9O1xufVxuIl19