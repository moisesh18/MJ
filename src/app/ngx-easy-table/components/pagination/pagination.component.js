/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { ConfigService } from '../../services/config-service';
/**
 * @record
 */
export function PaginationObject() { }
/** @type {?} */
PaginationObject.prototype.page;
/** @type {?} */
PaginationObject.prototype.limit;
export class PaginationComponent {
    constructor() {
        this.updateRange = new EventEmitter();
        this.ranges = [5, 10, 25, 50, 100];
        this.limit = ConfigService.config.rows;
        this.showRange = false;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    onPageChange(page) {
        this.updateRange.emit({
            page,
            limit: this.limit,
        });
    }
    /**
     * @param {?} limit
     * @return {?}
     */
    changeLimit(limit) {
        this.showRange = !this.showRange;
        this.limit = limit;
        this.updateRange.emit({
            page: 1,
            limit,
        });
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'pagination',
                template: "<div class=\"ngx-pagination-wrapper\"\n     [class.ngx-table__table--dark-pagination-wrapper]=\"config.tableLayout.theme === 'dark'\">\n  <div class=\"ngx-pagination-steps\">\n    <pagination-controls\n      [class.ngx-pagination-style]=\"config.tableLayout.theme !== 'dark'\"\n      [class.ngx-table__table--dark-pagination]=\"config.tableLayout.theme === 'dark'\"\n      id=\"pagination-controls\"\n      [id]=\"id\"\n      [maxSize]=\"config.paginationMaxSize || 5\"\n      [previousLabel]=\"''\"\n      [nextLabel]=\"''\"\n      (pageChange)=\"onPageChange($event)\">\n    </pagination-controls>\n  </div>\n  <div class=\"ngx-pagination-range\"\n       [class.ngx-table__table--dark-pagination-range]=\"config.tableLayout.theme === 'dark'\"\n       *ngIf=\"config.paginationRangeEnabled\">\n    <div class=\"ngx-dropdown ngx-pagination-range-dropdown\"\n         [class.ngx-active]=\"showRange\"\n         id=\"rowAmount\">\n      <div class=\"ngx-btn-group\">\n        <div class=\"ngx-pagination-range-dropdown-button\"\n             (click)=\"showRange = !showRange\">\n          {{limit}} <i class=\"ngx-icon ngx-icon-arrow-down\"></i>\n        </div>\n        <ul class=\"ngx-menu\">\n          <li class=\"ngx-pagination-range-dropdown-button-item\"\n              (click)=\"changeLimit(limit)\"\n              *ngFor=\"let limit of ranges\">\n            <span>{{limit}}</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
PaginationComponent.propDecorators = {
    pagination: [{ type: Input }],
    config: [{ type: Input }],
    id: [{ type: Input }],
    updateRange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PaginationComponent.prototype.pagination;
    /** @type {?} */
    PaginationComponent.prototype.config;
    /** @type {?} */
    PaginationComponent.prototype.id;
    /** @type {?} */
    PaginationComponent.prototype.updateRange;
    /** @type {?} */
    PaginationComponent.prototype.ranges;
    /** @type {?} */
    PaginationComponent.prototype.limit;
    /** @type {?} */
    PaginationComponent.prototype.showRange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxHQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7OztBQWE5RCxNQUFNOzsyQkFJb0QsSUFBSSxZQUFZLEVBQUU7c0JBQzFELENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztxQkFDYixhQUFhLENBQUMsTUFBTSxDQUFDLElBQUk7eUJBQzdCLEtBQUs7Ozs7OztJQUV4QixZQUFZLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJO1lBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSztTQUNOLENBQUMsQ0FBQztLQUNKOzs7WUE3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0Qix3OENBQWdDO2dCQUNoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O3lCQUdFLEtBQUs7cUJBQ0wsS0FBSztpQkFDTCxLQUFLOzBCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZy1zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0aW9uT2JqZWN0IHtcbiAgcGFnZTogbnVtYmVyO1xuICBsaW1pdDogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcblxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBwYWdpbmF0aW9uO1xuICBASW5wdXQoKSBjb25maWc6IENvbmZpZztcbiAgQElucHV0KCkgaWQ7XG4gIEBPdXRwdXQoKSB1cGRhdGVSYW5nZTogRXZlbnRFbWl0dGVyPFBhZ2luYXRpb25PYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgcmFuZ2VzID0gWzUsIDEwLCAyNSwgNTAsIDEwMF07XG4gIHB1YmxpYyBsaW1pdDogbnVtYmVyID0gQ29uZmlnU2VydmljZS5jb25maWcucm93cztcbiAgcHVibGljIHNob3dSYW5nZSA9IGZhbHNlO1xuXG4gIG9uUGFnZUNoYW5nZShwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVJhbmdlLmVtaXQoe1xuICAgICAgcGFnZSxcbiAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTGltaXQobGltaXQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2hvd1JhbmdlID0gIXRoaXMuc2hvd1JhbmdlO1xuICAgIHRoaXMubGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLnVwZGF0ZVJhbmdlLmVtaXQoe1xuICAgICAgcGFnZTogMSxcbiAgICAgIGxpbWl0LFxuICAgIH0pO1xuICB9XG59XG4iXX0=