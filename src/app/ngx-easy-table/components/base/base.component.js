/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { from } from 'rxjs';
import { flatMap, groupBy, reduce } from 'rxjs/operators';
import { Event } from '../..';
import { ConfigService } from '../../services/config-service';
import { UtilsService } from '../../services/utils-service';
/** @typedef {?} */
var KeyType;
export class BaseComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        this.cdr = cdr;
        this.grouped = [];
        this.menuActive = false;
        this.isSelected = false;
        this.page = 1;
        this.count = null;
        this.sortBy = {
            key: '',
            order: 'asc',
        };
        this.sortByIcon = {
            key: '',
            order: 'asc',
        };
        this.selectedDetailsTemplateRowId = new Set();
        this.loadingHeight = '30px';
        this.event = new EventEmitter();
        this.id = UtilsService.randomId();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set configuration(value) {
        this.config = value;
    }
    /**
     * @return {?}
     */
    get configuration() {
        return this.config;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.columns) {
            console.error('[columns] property required!');
        }
        if (this.configuration) {
            ConfigService.config = this.configuration;
        }
        this.config = ConfigService.config;
        this.limit = this.config.rows;
        if (this.groupRowsBy) {
            this.doGroupRows();
        }
        this.doDecodePersistedState();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const data = changes["data"];
        /** @type {?} */
        const pagination = changes["pagination"];
        /** @type {?} */
        const groupRowsBy = changes["groupRowsBy"];
        this.toggleRowIndex = changes["toggleRowIndex"];
        if (data && data.currentValue) {
            this.doApplyData(data);
        }
        if (pagination && pagination.currentValue) {
            this.count = pagination.currentValue.count;
        }
        if (groupRowsBy && groupRowsBy.currentValue) {
            this.doGroupRows();
        }
        if (this.toggleRowIndex && this.toggleRowIndex.currentValue) {
            /** @type {?} */
            const row = this.toggleRowIndex.currentValue;
            this.collapseRow(row.index);
        }
    }
    /**
     * @param {?} column
     * @return {?}
     */
    isOrderEnabled(column) {
        /** @type {?} */
        const columnOrderEnabled = column.orderEnabled === undefined ? true : !!column.orderEnabled;
        return ConfigService.config.orderEnabled && columnOrderEnabled;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    orderBy(column) {
        if (typeof column.orderEnabled !== 'undefined' && !column.orderEnabled) {
            return;
        }
        /** @type {?} */
        const key = column.key;
        if (!ConfigService.config.orderEnabled || key === '') {
            return;
        }
        this.sortByIcon.key = key;
        if (this.sortByIcon.order === 'asc') {
            this.sortByIcon.order = 'desc';
        }
        else {
            this.sortByIcon.order = 'asc';
        }
        if (!ConfigService.config.orderEventOnly && !column.orderEventOnly) {
            this.sortBy.key = this.sortByIcon.key;
            this.sortBy.order = this.sortByIcon.order;
        }
        else {
            this.sortBy.key = '';
            this.sortBy.order = '';
        }
        if (!ConfigService.config.serverPagination) {
            this.data = [...this.data];
        }
        /** @type {?} */
        const value = {
            key,
            order: this.sortByIcon.order,
        };
        this.emitEvent(Event.onOrder, value);
    }
    /**
     * @param {?} $event
     * @param {?} row
     * @param {?} key
     * @param {?} colIndex
     * @param {?} rowIndex
     * @return {?}
     */
    onClick($event, row, key, colIndex, rowIndex) {
        if (ConfigService.config.selectRow) {
            this.selectedRow = rowIndex;
        }
        if (ConfigService.config.selectCol && colIndex) {
            this.selectedCol = colIndex;
        }
        if (ConfigService.config.selectCell && colIndex) {
            this.selectedRow = rowIndex;
            this.selectedCol = colIndex;
        }
        if (ConfigService.config.clickEvent) {
            /** @type {?} */
            const value = {
                event: $event,
                row,
                key,
                rowId: rowIndex,
                colId: colIndex,
            };
            this.emitEvent(Event.onClick, value);
        }
    }
    /**
     * @param {?} $event
     * @param {?} row
     * @param {?} key
     * @param {?} colIndex
     * @param {?} rowIndex
     * @return {?}
     */
    onDoubleClick($event, row, key, colIndex, rowIndex) {
        /** @type {?} */
        const value = {
            event: $event,
            row,
            key,
            rowId: rowIndex,
            colId: colIndex,
        };
        this.emitEvent(Event.onDoubleClick, value);
    }
    /**
     * @param {?} $event
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    onCheckboxSelect($event, row, rowIndex) {
        /** @type {?} */
        const value = {
            event: $event,
            row,
            rowId: rowIndex,
        };
        this.emitEvent(Event.onCheckboxSelect, value);
    }
    /**
     * @return {?}
     */
    onSelectAll() {
        this.isSelected = !this.isSelected;
        this.emitEvent(Event.onSelectAll, this.isSelected);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSearch($event) {
        if (!ConfigService.config.serverPagination) {
            this.term = $event;
        }
        this.emitEvent(Event.onSearch, $event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onGlobalSearch($event) {
        if (!ConfigService.config.serverPagination) {
            this.globalSearchTerm = $event;
        }
        this.emitEvent(Event.onGlobalSearch, $event);
    }
    /**
     * @param {?} pagination
     * @return {?}
     */
    onPagination(pagination) {
        this.page = pagination.page;
        this.limit = pagination.limit;
        this.emitEvent(Event.onPagination, pagination);
    }
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    emitEvent(event, value) {
        this.event.emit({ event, value });
        if (this.config.persistState) {
            localStorage.setItem(event, JSON.stringify(value));
        }
        if (this.config.logger) {
            console.log({ event, value });
        }
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    collapseRow(rowIndex) {
        if (this.selectedDetailsTemplateRowId.has(rowIndex)) {
            this.selectedDetailsTemplateRowId.delete(rowIndex);
            this.emitEvent(Event.onRowCollapsedHide, rowIndex);
        }
        else {
            this.selectedDetailsTemplateRowId.add(rowIndex);
            this.emitEvent(Event.onRowCollapsedShow, rowIndex);
        }
    }
    /**
     * @return {?}
     */
    doDecodePersistedState() {
        if (!this.config.persistState) {
            return;
        }
        /** @type {?} */
        const pagination = localStorage.getItem(Event.onPagination);
        /** @type {?} */
        const sort = localStorage.getItem(Event.onOrder);
        /** @type {?} */
        const search = localStorage.getItem(Event.onSearch);
        if (pagination) {
            this.onPagination(JSON.parse(pagination));
        }
        if (sort) {
            const { key, order } = JSON.parse(sort);
            this.sortBy.key = key;
            this.sortBy.order = order;
            this.data = [...this.data];
        }
        if (search) {
            this.term = JSON.parse(search);
        }
    }
    /**
     * @return {?}
     */
    doGroupRows() {
        this.grouped = [];
        from(this.data).pipe(groupBy((row) => row[this.groupRowsBy]), flatMap((group) => group.pipe(reduce((acc, curr) => [...acc, curr], [])))).subscribe((row) => this.grouped.push(row));
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    isRowCollapsed(rowIndex) {
        if (this.config.collapseAllRows) {
            return true;
        }
        return this.selectedDetailsTemplateRowId.has(rowIndex);
    }
    /**
     * @param {?} event
     * @param {?} th
     * @return {?}
     */
    onMouseDown(event, th) {
        if (!this.config.resizeColumn) {
            return;
        }
        this.th = th;
        this.startOffset = th.offsetWidth - event.pageX;
        this.emitEvent(Event.onColumnResizeMouseDown, event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
        if (!this.config.resizeColumn) {
            return;
        }
        if (this.th && this.th.style) {
            this.th.style.width = this.startOffset + event.pageX + 'px';
            this.th.style.cursor = 'col-resize';
            this.th.style['user-select'] = 'none';
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseUp(event) {
        if (!this.config.resizeColumn) {
            return;
        }
        this.emitEvent(Event.onColumnResizeMouseUp, event);
        this.th.style.cursor = 'default';
        this.th = undefined;
    }
    /**
     * @return {?}
     */
    get isLoading() {
        /** @type {?} */
        const table = document.getElementById('table');
        if (table && table['rows'] && table['rows'].length > 3) {
            this.getLoadingHeight(table['rows']);
        }
        return this.config.isLoading;
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    getLoadingHeight(rows) {
        /** @type {?} */
        const searchEnabled = this.config.searchEnabled ? 1 : 0;
        /** @type {?} */
        const headerEnabled = this.config.headerEnabled ? 1 : 0;
        /** @type {?} */
        const borderTrHeight = 1;
        /** @type {?} */
        const borderDivHeight = 2;
        this.loadingHeight = (rows.length - searchEnabled - headerEnabled) * (rows[3].offsetHeight - borderTrHeight) - borderDivHeight + 'px';
    }
    /**
     * @param {?} column
     * @return {?}
     */
    getColumnWidth(column) {
        if (column.width) {
            return column.width;
        }
        return this.config.fixedColumnWidth ? 100 / this.columns.length + '%' : null;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRowDrag(event) {
        this.emitEvent(Event.onRowDrag, event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRowDrop(event) {
        this.emitEvent(Event.onRowDrop, event);
    }
    /**
     * @param {?} column
     * @return {?}
     */
    getColumnDefinition(column) {
        return column.searchEnabled || typeof column.searchEnabled === 'undefined';
    }
    /**
     * @return {?}
     */
    get arrowDefinition() {
        return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
    }
    /**
     * @param {?} $event
     * @param {?} row
     * @param {?} key
     * @param {?} colIndex
     * @param {?} rowIndex
     * @return {?}
     */
    onContextMenu($event, row, key, colIndex, rowIndex) {
        if (typeof this.config.showContextMenu === 'undefined' || !this.config.showContextMenu) {
            return;
        }
        $event.preventDefault();
        /** @type {?} */
        const value = {
            event: $event,
            row,
            key,
            rowId: rowIndex,
            colId: colIndex,
        };
        this.emitEvent(Event.onRowContextMenu, value);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    doApplyData(data) {
        /** @type {?} */
        const column = this.columns.find((c) => !!c.orderBy);
        if (column) {
            this.sortByIcon.order = (column.orderBy === 'asc') ? 'desc' : 'asc';
            this.orderBy(column);
        }
        else {
            this.data = [...data.currentValue];
        }
    }
}
BaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-table',
                providers: [ConfigService, UtilsService],
                template: "<div class=\"ngx-container\">\n  <div class=\"ngx-global-search\"\n       *ngIf=\"config.globalSearchEnabled\">\n    <global-search (globalUpdate)=\"onGlobalSearch($event)\"></global-search>\n  </div>\n  <table id=\"table\"\n         class=\"ngx-table\"\n    [class.ngx-table__table--tiny]=\"config.tableLayout.style === 'tiny'\"\n    [class.ngx-table__table--normal]=\"config.tableLayout.style === 'normal'\"\n    [class.ngx-table__table--big]=\"config.tableLayout.style === 'big'\"\n    [class.ngx-table__table--borderless]=\"config.tableLayout.borderless\"\n    [class.ngx-table__table--dark]=\"config.tableLayout.theme === 'dark'\"\n    [class.ngx-table__table--hoverable]=\"config.tableLayout.hover\"\n    [class.ngx-table__table--striped]=\"config.tableLayout.striped\"\n    [class.ngx-table__horizontal-scroll]=\"config.horizontalScroll && !isLoading\">\n    <thead>\n    <tr class=\"ngx-table__header\" *ngIf=\"config.headerEnabled\">\n      <th *ngIf=\"config.checkboxes\" width=\"3%\">\n        <label class=\"ngx-form-checkbox\">\n          <input type=\"checkbox\" (change)=\"onSelectAll()\">\n          <i class=\"ngx-form-icon\" id=\"selectAllCheckbox\"></i>\n        </label>\n      </th>\n      <ng-container *ngFor=\"let column of columns;let colIndex = index\">\n        <th class=\"ngx-table__header-cell\"\n          #th\n          [attr.width]=\"getColumnWidth(column)\"\n          (mousedown)=\"onMouseDown($event, th)\"\n          (mouseup)=\"onMouseUp($event)\"\n          (mousemove)=\"onMouseMove($event)\">\n          <div (click)=\"orderBy(column)\" [class.pointer]=\"isOrderEnabled(column)\">\n            <div class=\"ngx-table__header-title\">{{ column['title'] }}<span>&nbsp;</span>\n              <i *ngIf=\"sortByIcon.key === column['key'] && sortByIcon.order==='asc'\"\n                [style.display]=\"config.orderEnabled?'':'none' \"\n                class=\"ngx-icon ngx-icon-arrow-up\">\n              </i>\n              <i *ngIf=\"sortByIcon.key === column['key'] && sortByIcon.order==='desc'\"\n                [style.display]=\"config.orderEnabled?'':'none' \"\n                class=\"ngx-icon ngx-icon-arrow-down\">\n              </i>\n            </div>\n          </div>\n          <div class=\"ngx-table__column-resizer\" *ngIf=\"config.resizeColumn\"></div>\n        </th>\n      </ng-container>\n      <th *ngIf=\"config.additionalActions || config.detailsTemplate || config.collapseAllRows || config.groupRows\"\n        class=\"ngx-table__header-cell-additional-actions\">\n        <div class=\"ngx-dropdown ngx-active\"\n          *ngIf=\"config.additionalActions\"\n          [class.ngx-active]=\"menuActive\">\n          <a class=\"ngx-btn ngx-btn-link\" (click)=\"menuActive = !menuActive\">\n            <span class=\"ngx-icon ngx-icon-menu\"></span>\n          </a>\n          <ul class=\"ngx-menu ngx-table__table-menu\">\n            <li class=\"ngx-menu-item\">\n              <app-csv-export [data]=\"data\"\n                *ngIf=\"config.exportEnabled\">\n              </app-csv-export>\n            </li>\n          </ul>\n        </div>\n      </th>\n    </tr>\n    <tr *ngIf=\"config.searchEnabled && !filtersTemplate\"\n      class=\"ngx-table__sort-header\">\n      <th *ngIf=\"config.checkboxes\"></th>\n      <ng-container *ngFor=\"let column of columns\">\n        <th>\n          <table-header\n            *ngIf=\"getColumnDefinition(column)\"\n            (update)=\"onSearch($event)\"\n            [column]=\"column\">\n          </table-header>\n        </th>\n      </ng-container>\n      <th *ngIf=\"config.additionalActions || config.detailsTemplate\"></th>\n    </tr>\n    <ng-container *ngIf=\"filtersTemplate\">\n      <tr>\n        <ng-container [ngTemplateOutlet]=\"filtersTemplate\">\n        </ng-container>\n      </tr>\n    </ng-container>\n    </thead>\n    <tbody *ngIf=\"data && !isLoading  && !config.draggable\">\n    <ng-container *ngIf=\"rowTemplate\">\n      <ng-container *ngFor=\"let row of data | sort:sortBy | search:term | global:globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n              let rowIndex = index\">\n        <tr\n          (click)=\"onClick($event, row, '', null, rowIndex)\"\n          (contextmenu)=\"onContextMenu($event, row, '', null, rowIndex)\"\n          (dblclick)=\"onDoubleClick($event, row, '', null, rowIndex)\"\n          [class.ngx-table__table-row--selected]=\"rowIndex == selectedRow && !config.selectCell\">\n          <ng-container\n            [ngTemplateOutlet]=\"rowTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\">\n          </ng-container>\n          <td *ngIf=\"config.detailsTemplate\">\n            <span class=\"ngx-icon\"\n              *ngIf=\"arrowDefinition\"\n              [ngClass]=\"isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\"\n              (click)=\"collapseRow(rowIndex)\">\n            </span>\n          </td>\n        </tr>\n        <tr\n          *ngIf=\"(config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) || config.collapseAllRows\">\n          <td [attr.colspan]=\"columns.length + 1\">\n            <ng-container\n              [ngTemplateOutlet]=\"detailsTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex  }\">\n            </ng-container>\n          </td>\n        </tr>\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n      <ng-container\n        *ngFor=\"let row of data | sort:sortBy | search:term | global:globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n                  let rowIndex = index\">\n        <tr [class.ngx-table__table-row--selected]=\"rowIndex == selectedRow && !config.selectCell\">\n          <td *ngIf=\"config.checkboxes\">\n            <label class=\"ngx-form-checkbox\">\n              <input type=\"checkbox\"\n                id=\"checkbox-{{rowIndex}}\"\n                [checked]=\"isSelected\"\n                (change)=\"onCheckboxSelect($event.target.value, row, rowIndex)\">\n              <i class=\"ngx-form-icon\"></i>\n            </label>\n          </td>\n          <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n            <td (click)=\"onClick($event, row, column['key'], colIndex, rowIndex)\"\n              (contextmenu)=\"onContextMenu($event, row, column['key'], colIndex, rowIndex)\"\n              (dblclick)=\"onDoubleClick($event, row, column['key'], colIndex, rowIndex)\"\n              [class.ngx-table__table-col--selected]=\"colIndex == selectedCol && !config.selectCell\"\n              [class.ngx-table__table-cell--selected]=\"colIndex == selectedCol && rowIndex == selectedRow && !config.selectCol && !config.selectRow\"\n            >\n              <div *ngIf=\"!column.cellTemplate\">{{ row | render:column.key }}</div>\n              <ng-container\n                *ngIf=\"column.cellTemplate\"\n                [ngTemplateOutlet]=\"column.cellTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row }\">\n              </ng-container>\n            </td>\n          </ng-container>\n          <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n            <span class=\"ngx-icon\"\n              *ngIf=\"arrowDefinition\"\n              [ngClass]=\"isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\"\n              (click)=\"collapseRow(rowIndex)\">\n            </span>\n          </td>\n        </tr>\n        <tr\n          *ngIf=\"(config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) || config.collapseAllRows\">\n          <td *ngIf=\"config.checkboxes\"></td>\n          <td [attr.colspan]=\"columns.length + 1\">\n            <ng-container\n              [ngTemplateOutlet]=\"detailsTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\">\n            </ng-container>\n          </td>\n        </tr>\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"!rowTemplate && config.groupRows\">\n      <ng-container\n        *ngFor=\"let group of grouped; let rowIndex = index\">\n        <tr>\n          <ng-container *ngIf=\"!groupRowsHeaderTemplate\">\n            <td [attr.colspan]=\"columns.length\">\n              <div>{{group[0][groupRowsBy]}} ({{group.length}})</div>\n            </td>\n          </ng-container>\n          <ng-container\n            *ngIf=\"groupRowsHeaderTemplate\"\n            [ngTemplateOutlet]=\"groupRowsHeaderTemplate\"\n            [ngTemplateOutletContext]=\"{\n              total: group.length,\n              key: groupRowsBy,\n              value: group[0][groupRowsBy],\n              group: group,\n              index: rowIndex\n            }\">\n          </ng-container>\n          <td>\n            <span class=\"ngx-icon\"\n              *ngIf=\"arrowDefinition\"\n              [ngClass]=\"isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\"\n              (click)=\"collapseRow(rowIndex)\">\n            </span>\n          </td>\n        </tr>\n        <ng-container *ngIf=\"selectedDetailsTemplateRowId.has(rowIndex)\">\n          <tr *ngFor=\"let row of group\">\n            <td *ngFor=\"let column of columns\">\n              {{ row | render:column.key }}\n              <!-- TODO allow users to add groupRowsTemplateRef -->\n            </td>\n            <td></td>\n          </tr>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n    </tbody>\n    <tbody *ngIf=\"data && !config.isLoading && config.draggable\"\n      class=\"ngx-dnd-container\"\n      (drag)=\"onRowDrag($event)\"\n      (drop)=\"onRowDrop($event)\"\n      ngxDroppable>\n    <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n      <ng-container\n        *ngFor=\"let row of data | sort:sortBy | search:term | global:globalSearchTerm | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n                  let rowIndex = index\">\n        <tr [class.ngx-table__table-row--selected]=\"rowIndex == selectedRow && !config.selectCell\"\n          class=\"ngx-dnd-item\"\n          ngxDraggable>\n          <td *ngIf=\"config.checkboxes\">\n            <label class=\"ngx-form-checkbox\">\n              <input type=\"checkbox\"\n                id=\"checkbox-draggable-{{rowIndex}}\"\n                [checked]=\"isSelected\"\n                (change)=\"onCheckboxSelect($event.target.value, row, rowIndex)\">\n              <i class=\"ngx-form-icon\"></i>\n            </label>\n          </td>\n          <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n            <td (click)=\"onClick($event, row, column['key'], colIndex, rowIndex)\"\n              (dblclick)=\"onDoubleClick($event, row, column['key'], colIndex, rowIndex)\"\n              [class.ngx-table__table-col--selected]=\"colIndex == selectedCol && !config.selectCell\"\n              [class.ngx-table__table-cell--selected]=\"colIndex == selectedCol && rowIndex == selectedRow && !config.selectCol && !config.selectRow\"\n            >\n              <div>{{ row | render:column.key }}</div>\n            </td>\n          </ng-container>\n        </tr>\n      </ng-container>\n    </ng-container>\n    </tbody>\n    <tbody *ngIf=\"!data || (data && data.length < 1)\">\n    <tr class=\"ngx-table__body-empty\">\n      <td [attr.colspan]=\"columns && columns.length + 1\">\n        <div class=\"ngx-table__table-no-results\">\n          No results\n        </div>\n      </td>\n    </tr>\n    </tbody>\n    <tbody *ngIf=\"isLoading\">\n    <tr class=\"ngx-table__body-loading\">\n      <td [attr.colspan]=\"columns && columns.length + 1\">\n        <div [style.height]=\"loadingHeight\"\n          class=\"ngx-table__table-loader-wrapper\">\n          <div class=\"ngx-table__table-loader\"></div>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n    <tfoot *ngIf=\"summaryTemplate\">\n    <tr>\n      <ng-container\n        [ngTemplateOutlet]=\"summaryTemplate\"\n        [ngTemplateOutletContext]=\"{ total: data.length, limit: limit, page: page  }\">\n      </ng-container>\n    </tr>\n    </tfoot>\n  </table>\n  <pagination\n    id=\"pagination\"\n    *ngIf=\"config.paginationEnabled\"\n    [id]=\"id\"\n    [config]=\"config\"\n    [pagination]=\"pagination\"\n    (updateRange)=\"onPagination($event)\">\n  </pagination>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
BaseComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
BaseComponent.propDecorators = {
    configuration: [{ type: Input, args: ['configuration',] }],
    data: [{ type: Input }],
    pagination: [{ type: Input }],
    groupRowsBy: [{ type: Input }],
    toggleRowIndex: [{ type: Input }],
    detailsTemplate: [{ type: Input }],
    summaryTemplate: [{ type: Input }],
    groupRowsHeaderTemplate: [{ type: Input }],
    filtersTemplate: [{ type: Input }],
    columns: [{ type: Input }],
    event: [{ type: Output }],
    rowTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};
if (false) {
    /** @type {?} */
    BaseComponent.prototype.selectedRow;
    /** @type {?} */
    BaseComponent.prototype.selectedCol;
    /** @type {?} */
    BaseComponent.prototype.term;
    /** @type {?} */
    BaseComponent.prototype.globalSearchTerm;
    /** @type {?} */
    BaseComponent.prototype.grouped;
    /** @type {?} */
    BaseComponent.prototype.menuActive;
    /** @type {?} */
    BaseComponent.prototype.isSelected;
    /** @type {?} */
    BaseComponent.prototype.page;
    /** @type {?} */
    BaseComponent.prototype.count;
    /** @type {?} */
    BaseComponent.prototype.limit;
    /** @type {?} */
    BaseComponent.prototype.sortBy;
    /** @type {?} */
    BaseComponent.prototype.sortByIcon;
    /** @type {?} */
    BaseComponent.prototype.selectedDetailsTemplateRowId;
    /** @type {?} */
    BaseComponent.prototype.id;
    /** @type {?} */
    BaseComponent.prototype.th;
    /** @type {?} */
    BaseComponent.prototype.startOffset;
    /** @type {?} */
    BaseComponent.prototype.loadingHeight;
    /** @type {?} */
    BaseComponent.prototype.config;
    /** @type {?} */
    BaseComponent.prototype.data;
    /** @type {?} */
    BaseComponent.prototype.pagination;
    /** @type {?} */
    BaseComponent.prototype.groupRowsBy;
    /** @type {?} */
    BaseComponent.prototype.toggleRowIndex;
    /** @type {?} */
    BaseComponent.prototype.detailsTemplate;
    /** @type {?} */
    BaseComponent.prototype.summaryTemplate;
    /** @type {?} */
    BaseComponent.prototype.groupRowsHeaderTemplate;
    /** @type {?} */
    BaseComponent.prototype.filtersTemplate;
    /** @type {?} */
    BaseComponent.prototype.columns;
    /** @type {?} */
    BaseComponent.prototype.event;
    /** @type {?} */
    BaseComponent.prototype.rowTemplate;
    /** @type {?} */
    BaseComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUdOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBbUIsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQVc1RCxNQUFNOzs7O0lBK0NKLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3VCQTFDM0IsRUFBRTswQkFDSixLQUFLOzBCQUNMLEtBQUs7b0JBQ1gsQ0FBQztxQkFDQSxJQUFJO3NCQUVrQztZQUM1QyxHQUFHLEVBQUUsRUFBRTtZQUNQLEtBQUssRUFBRSxLQUFLO1NBQ2I7MEJBQ2lEO1lBQ2hELEdBQUcsRUFBRSxFQUFFO1lBQ1AsS0FBSyxFQUFFLEtBQUs7U0FDYjs0Q0FDOEIsSUFBSSxHQUFHLEVBQUU7NkJBSXhCLE1BQU07cUJBcUJKLElBQUksWUFBWSxFQUFFO1FBSWxDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25DOzs7OztJQXZCRCxJQUNJLGFBQWEsQ0FBQyxLQUFhO1FBQzdCLElBQUks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LENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7Ozs7WUE5VkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUN4QywydllBQW9DO2dCQUNwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQTNCQyxpQkFBaUI7Ozs0QkFzRGhCLEtBQUssU0FBQyxlQUFlO21CQVNyQixLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSztzQ0FDTCxLQUFLOzhCQUNMLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxNQUFNOzBCQUNOLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZsYXRNYXAsIGdyb3VwQnksIHJlZHVjZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbHVtbnMsIENvbmZpZywgRXZlbnQgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXRpbHMtc2VydmljZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uT2JqZWN0IH0gZnJvbSAnLi4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5cbnR5cGUgS2V5VHlwZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10YWJsZScsXG4gIHByb3ZpZGVyczogW0NvbmZpZ1NlcnZpY2UsIFV0aWxzU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXNlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIHB1YmxpYyBzZWxlY3RlZFJvdzogbnVtYmVyO1xuICBwdWJsaWMgc2VsZWN0ZWRDb2w6IG51bWJlcjtcbiAgcHVibGljIHRlcm07XG4gIHB1YmxpYyBnbG9iYWxTZWFyY2hUZXJtO1xuICBncm91cGVkOiBhbnkgPSBbXTtcbiAgbWVudUFjdGl2ZSA9IGZhbHNlO1xuICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gIHBhZ2UgPSAxO1xuICBjb3VudCA9IG51bGw7XG4gIGxpbWl0O1xuICBzb3J0Qnk6IHsga2V5OiBzdHJpbmcgfSAmIHsgb3JkZXI6IHN0cmluZyB9ID0ge1xuICAgIGtleTogJycsXG4gICAgb3JkZXI6ICdhc2MnLFxuICB9O1xuICBzb3J0QnlJY29uOiB7IGtleTogc3RyaW5nIH0gJiB7IG9yZGVyOiBzdHJpbmcgfSA9IHtcbiAgICBrZXk6ICcnLFxuICAgIG9yZGVyOiAnYXNjJyxcbiAgfTtcbiAgc2VsZWN0ZWREZXRhaWxzVGVtcGxhdGVSb3dJZCA9IG5ldyBTZXQoKTtcbiAgaWQ7XG4gIHRoO1xuICBzdGFydE9mZnNldDtcbiAgbG9hZGluZ0hlaWdodCA9ICczMHB4JztcbiAgcHVibGljIGNvbmZpZzogQ29uZmlnO1xuXG4gIEBJbnB1dCgnY29uZmlndXJhdGlvbicpXG4gIHNldCBjb25maWd1cmF0aW9uKHZhbHVlOiBDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGNvbmZpZ3VyYXRpb24oKTogQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgcGFnaW5hdGlvbjtcbiAgQElucHV0KCkgZ3JvdXBSb3dzQnk6IHN0cmluZztcbiAgQElucHV0KCkgdG9nZ2xlUm93SW5kZXg7XG4gIEBJbnB1dCgpIGRldGFpbHNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgc3VtbWFyeVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBncm91cFJvd3NIZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgZmlsdGVyc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBASW5wdXQoKSBjb2x1bW5zOiBDb2x1bW5zW107XG4gIEBPdXRwdXQoKSBldmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgcHVibGljIHJvd1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuaWQgPSBVdGlsc1NlcnZpY2UucmFuZG9tSWQoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5jb2x1bW5zKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbY29sdW1uc10gcHJvcGVydHkgcmVxdWlyZWQhJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIENvbmZpZ1NlcnZpY2UuY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZyA9IENvbmZpZ1NlcnZpY2UuY29uZmlnO1xuICAgIHRoaXMubGltaXQgPSB0aGlzLmNvbmZpZy5yb3dzO1xuICAgIGlmICh0aGlzLmdyb3VwUm93c0J5KSB7XG4gICAgICB0aGlzLmRvR3JvdXBSb3dzKCk7XG4gICAgfVxuICAgIHRoaXMuZG9EZWNvZGVQZXJzaXN0ZWRTdGF0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBkYXRhOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmRhdGE7XG4gICAgY29uc3QgcGFnaW5hdGlvbjogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5wYWdpbmF0aW9uO1xuICAgIGNvbnN0IGdyb3VwUm93c0J5OiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmdyb3VwUm93c0J5O1xuICAgIHRoaXMudG9nZ2xlUm93SW5kZXggPSBjaGFuZ2VzLnRvZ2dsZVJvd0luZGV4O1xuICAgIGlmIChkYXRhICYmIGRhdGEuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmRvQXBwbHlEYXRhKGRhdGEpO1xuICAgIH1cbiAgICBpZiAocGFnaW5hdGlvbiAmJiBwYWdpbmF0aW9uLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5jb3VudCA9IHBhZ2luYXRpb24uY3VycmVudFZhbHVlLmNvdW50O1xuICAgIH1cbiAgICBpZiAoZ3JvdXBSb3dzQnkgJiYgZ3JvdXBSb3dzQnkuY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmRvR3JvdXBSb3dzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvZ2dsZVJvd0luZGV4ICYmIHRoaXMudG9nZ2xlUm93SW5kZXguY3VycmVudFZhbHVlKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLnRvZ2dsZVJvd0luZGV4LmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMuY29sbGFwc2VSb3cocm93LmluZGV4KTtcbiAgICB9XG4gIH1cblxuICBpc09yZGVyRW5hYmxlZChjb2x1bW46IENvbHVtbnMpIHtcbiAgICBjb25zdCBjb2x1bW5PcmRlckVuYWJsZWQgPSBjb2x1bW4ub3JkZXJFbmFibGVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFjb2x1bW4ub3JkZXJFbmFibGVkO1xuICAgIHJldHVybiBDb25maWdTZXJ2aWNlLmNvbmZpZy5vcmRlckVuYWJsZWQgJiYgY29sdW1uT3JkZXJFbmFibGVkO1xuICB9XG5cbiAgb3JkZXJCeShjb2x1bW46IENvbHVtbnMpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGNvbHVtbi5vcmRlckVuYWJsZWQgIT09ICd1bmRlZmluZWQnICYmICFjb2x1bW4ub3JkZXJFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IGNvbHVtbi5rZXk7XG4gICAgaWYgKCFDb25maWdTZXJ2aWNlLmNvbmZpZy5vcmRlckVuYWJsZWQgfHwga2V5ID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc29ydEJ5SWNvbi5rZXkgPSBrZXk7XG4gICAgaWYgKHRoaXMuc29ydEJ5SWNvbi5vcmRlciA9PT0gJ2FzYycpIHtcbiAgICAgIHRoaXMuc29ydEJ5SWNvbi5vcmRlciA9ICdkZXNjJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3J0QnlJY29uLm9yZGVyID0gJ2FzYyc7XG4gICAgfVxuXG4gICAgaWYgKCFDb25maWdTZXJ2aWNlLmNvbmZpZy5vcmRlckV2ZW50T25seSAmJiAhY29sdW1uLm9yZGVyRXZlbnRPbmx5KSB7XG4gICAgICB0aGlzLnNvcnRCeS5rZXkgPSB0aGlzLnNvcnRCeUljb24ua2V5O1xuICAgICAgdGhpcy5zb3J0Qnkub3JkZXIgPSB0aGlzLnNvcnRCeUljb24ub3JkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc29ydEJ5LmtleSA9ICcnO1xuICAgICAgdGhpcy5zb3J0Qnkub3JkZXIgPSAnJztcbiAgICB9XG4gICAgaWYgKCFDb25maWdTZXJ2aWNlLmNvbmZpZy5zZXJ2ZXJQYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLmRhdGEgPSBbLi4udGhpcy5kYXRhXTtcbiAgICB9XG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBrZXksXG4gICAgICBvcmRlcjogdGhpcy5zb3J0QnlJY29uLm9yZGVyLFxuICAgIH07XG4gICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25PcmRlciwgdmFsdWUpO1xuICB9XG5cbiAgb25DbGljaygkZXZlbnQ6IG9iamVjdCwgcm93OiBvYmplY3QsIGtleTogS2V5VHlwZSwgY29sSW5kZXg6IG51bWJlciB8IG51bGwsIHJvd0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoQ29uZmlnU2VydmljZS5jb25maWcuc2VsZWN0Um93KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUm93ID0gcm93SW5kZXg7XG4gICAgfVxuICAgIGlmIChDb25maWdTZXJ2aWNlLmNvbmZpZy5zZWxlY3RDb2wgJiYgY29sSW5kZXgpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2wgPSBjb2xJbmRleDtcbiAgICB9XG4gICAgaWYgKENvbmZpZ1NlcnZpY2UuY29uZmlnLnNlbGVjdENlbGwgJiYgY29sSW5kZXgpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRSb3cgPSByb3dJbmRleDtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2wgPSBjb2xJbmRleDtcbiAgICB9XG4gICAgaWYgKENvbmZpZ1NlcnZpY2UuY29uZmlnLmNsaWNrRXZlbnQpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgICBldmVudDogJGV2ZW50LFxuICAgICAgICByb3csXG4gICAgICAgIGtleSxcbiAgICAgICAgcm93SWQ6IHJvd0luZGV4LFxuICAgICAgICBjb2xJZDogY29sSW5kZXgsXG4gICAgICB9O1xuICAgICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25DbGljaywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRG91YmxlQ2xpY2soJGV2ZW50OiBvYmplY3QsIHJvdzogb2JqZWN0LCBrZXk6IEtleVR5cGUsIGNvbEluZGV4OiBudW1iZXIgfCBudWxsLCByb3dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBldmVudDogJGV2ZW50LFxuICAgICAgcm93LFxuICAgICAga2V5LFxuICAgICAgcm93SWQ6IHJvd0luZGV4LFxuICAgICAgY29sSWQ6IGNvbEluZGV4LFxuICAgIH07XG4gICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25Eb3VibGVDbGljaywgdmFsdWUpO1xuICB9XG5cbiAgb25DaGVja2JveFNlbGVjdCgkZXZlbnQ6IG9iamVjdCwgcm93OiBvYmplY3QsIHJvd0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIGV2ZW50OiAkZXZlbnQsXG4gICAgICByb3csXG4gICAgICByb3dJZDogcm93SW5kZXgsXG4gICAgfTtcbiAgICB0aGlzLmVtaXRFdmVudChFdmVudC5vbkNoZWNrYm94U2VsZWN0LCB2YWx1ZSk7XG4gIH1cblxuICBvblNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLmlzU2VsZWN0ZWQgPSAhdGhpcy5pc1NlbGVjdGVkO1xuICAgIHRoaXMuZW1pdEV2ZW50KEV2ZW50Lm9uU2VsZWN0QWxsLCB0aGlzLmlzU2VsZWN0ZWQpO1xuICB9XG5cbiAgb25TZWFyY2goJGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFDb25maWdTZXJ2aWNlLmNvbmZpZy5zZXJ2ZXJQYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLnRlcm0gPSAkZXZlbnQ7XG4gICAgfVxuICAgIHRoaXMuZW1pdEV2ZW50KEV2ZW50Lm9uU2VhcmNoLCAkZXZlbnQpO1xuICB9XG5cbiAgb25HbG9iYWxTZWFyY2goJGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFDb25maWdTZXJ2aWNlLmNvbmZpZy5zZXJ2ZXJQYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLmdsb2JhbFNlYXJjaFRlcm0gPSAkZXZlbnQ7XG4gICAgfVxuICAgIHRoaXMuZW1pdEV2ZW50KEV2ZW50Lm9uR2xvYmFsU2VhcmNoLCAkZXZlbnQpO1xuICB9XG5cbiAgb25QYWdpbmF0aW9uKHBhZ2luYXRpb246IFBhZ2luYXRpb25PYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UgPSBwYWdpbmF0aW9uLnBhZ2U7XG4gICAgdGhpcy5saW1pdCA9IHBhZ2luYXRpb24ubGltaXQ7XG4gICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25QYWdpbmF0aW9uLCBwYWdpbmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdEV2ZW50KGV2ZW50OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoeyBldmVudCwgdmFsdWUgfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBlcnNpc3RTdGF0ZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZXZlbnQsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5sb2dnZXIpIHtcbiAgICAgIGNvbnNvbGUubG9nKHsgZXZlbnQsIHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxhcHNlUm93KHJvd0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZERldGFpbHNUZW1wbGF0ZVJvd0lkLmhhcyhyb3dJbmRleCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREZXRhaWxzVGVtcGxhdGVSb3dJZC5kZWxldGUocm93SW5kZXgpO1xuICAgICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25Sb3dDb2xsYXBzZWRIaWRlLCByb3dJbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREZXRhaWxzVGVtcGxhdGVSb3dJZC5hZGQocm93SW5kZXgpO1xuICAgICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25Sb3dDb2xsYXBzZWRTaG93LCByb3dJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkb0RlY29kZVBlcnNpc3RlZFN0YXRlKCkge1xuICAgIGlmICghdGhpcy5jb25maWcucGVyc2lzdFN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBhZ2luYXRpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFdmVudC5vblBhZ2luYXRpb24pO1xuICAgIGNvbnN0IHNvcnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFdmVudC5vbk9yZGVyKTtcbiAgICBjb25zdCBzZWFyY2ggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShFdmVudC5vblNlYXJjaCk7XG4gICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMub25QYWdpbmF0aW9uKEpTT04ucGFyc2UocGFnaW5hdGlvbikpO1xuICAgIH1cbiAgICBpZiAoc29ydCkge1xuICAgICAgY29uc3QgeyBrZXksIG9yZGVyIH0gPSBKU09OLnBhcnNlKHNvcnQpO1xuICAgICAgdGhpcy5zb3J0Qnkua2V5ID0ga2V5O1xuICAgICAgdGhpcy5zb3J0Qnkub3JkZXIgPSBvcmRlcjtcbiAgICAgIHRoaXMuZGF0YSA9IFsuLi50aGlzLmRhdGFdO1xuICAgIH1cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICB0aGlzLnRlcm0gPSBKU09OLnBhcnNlKHNlYXJjaCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkb0dyb3VwUm93cygpIHtcbiAgICB0aGlzLmdyb3VwZWQgPSBbXTtcbiAgICBmcm9tKHRoaXMuZGF0YSkucGlwZShcbiAgICAgIGdyb3VwQnkoKHJvdykgPT4gcm93W3RoaXMuZ3JvdXBSb3dzQnldKSxcbiAgICAgIGZsYXRNYXAoKGdyb3VwKSA9PiBncm91cC5waXBlKFxuICAgICAgICByZWR1Y2UoKGFjYzogb2JqZWN0W10sIGN1cnIpID0+IFsuLi5hY2MsIGN1cnJdLCBbXSksXG4gICAgICApKSxcbiAgICApLnN1YnNjcmliZSgocm93KSA9PiB0aGlzLmdyb3VwZWQucHVzaChyb3cpKTtcbiAgfVxuXG4gIGlzUm93Q29sbGFwc2VkKHJvd0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jb25maWcuY29sbGFwc2VBbGxSb3dzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWREZXRhaWxzVGVtcGxhdGVSb3dJZC5oYXMocm93SW5kZXgpO1xuICB9XG5cbiAgb25Nb3VzZURvd24oZXZlbnQsIHRoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5yZXNpemVDb2x1bW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50aCA9IHRoO1xuICAgIHRoaXMuc3RhcnRPZmZzZXQgPSB0aC5vZmZzZXRXaWR0aCAtIGV2ZW50LnBhZ2VYO1xuICAgIHRoaXMuZW1pdEV2ZW50KEV2ZW50Lm9uQ29sdW1uUmVzaXplTW91c2VEb3duLCBldmVudCk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5jb25maWcucmVzaXplQ29sdW1uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRoICYmIHRoaXMudGguc3R5bGUpIHtcbiAgICAgIHRoaXMudGguc3R5bGUud2lkdGggPSB0aGlzLnN0YXJ0T2Zmc2V0ICsgZXZlbnQucGFnZVggKyAncHgnO1xuICAgICAgdGhpcy50aC5zdHlsZS5jdXJzb3IgPSAnY29sLXJlc2l6ZSc7XG4gICAgICB0aGlzLnRoLnN0eWxlWyd1c2VyLXNlbGVjdCddID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcChldmVudCkge1xuICAgIGlmICghdGhpcy5jb25maWcucmVzaXplQ29sdW1uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZW1pdEV2ZW50KEV2ZW50Lm9uQ29sdW1uUmVzaXplTW91c2VVcCwgZXZlbnQpO1xuICAgIHRoaXMudGguc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMudGggPSB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXQgaXNMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlJyk7XG4gICAgaWYgKHRhYmxlICYmIHRhYmxlWydyb3dzJ10gJiYgdGFibGVbJ3Jvd3MnXS5sZW5ndGggPiAzKSB7XG4gICAgICB0aGlzLmdldExvYWRpbmdIZWlnaHQodGFibGVbJ3Jvd3MnXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5pc0xvYWRpbmc7XG4gIH1cblxuICBnZXRMb2FkaW5nSGVpZ2h0KHJvd3M6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaEVuYWJsZWQgPSB0aGlzLmNvbmZpZy5zZWFyY2hFbmFibGVkID8gMSA6IDA7XG4gICAgY29uc3QgaGVhZGVyRW5hYmxlZCA9IHRoaXMuY29uZmlnLmhlYWRlckVuYWJsZWQgPyAxIDogMDtcbiAgICBjb25zdCBib3JkZXJUckhlaWdodCA9IDE7XG4gICAgY29uc3QgYm9yZGVyRGl2SGVpZ2h0ID0gMjtcbiAgICB0aGlzLmxvYWRpbmdIZWlnaHQgPSAocm93cy5sZW5ndGggLSBzZWFyY2hFbmFibGVkIC0gaGVhZGVyRW5hYmxlZCkgKiAocm93c1szXS5vZmZzZXRIZWlnaHQgLSBib3JkZXJUckhlaWdodCkgLSBib3JkZXJEaXZIZWlnaHQgKyAncHgnO1xuICB9XG5cbiAgZ2V0Q29sdW1uV2lkdGgoY29sdW1uOiBhbnkpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoY29sdW1uLndpZHRoKSB7XG4gICAgICByZXR1cm4gY29sdW1uLndpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZml4ZWRDb2x1bW5XaWR0aCA/IDEwMCAvIHRoaXMuY29sdW1ucy5sZW5ndGggKyAnJScgOiBudWxsO1xuICB9XG5cbiAgb25Sb3dEcmFnKGV2ZW50KSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25Sb3dEcmFnLCBldmVudCk7XG4gIH1cblxuICBvblJvd0Ryb3AoZXZlbnQpIHtcbiAgICB0aGlzLmVtaXRFdmVudChFdmVudC5vblJvd0Ryb3AsIGV2ZW50KTtcbiAgfVxuXG4gIGdldENvbHVtbkRlZmluaXRpb24oY29sdW1uOiBDb2x1bW5zKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbHVtbi5zZWFyY2hFbmFibGVkIHx8IHR5cGVvZiBjb2x1bW4uc2VhcmNoRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICBnZXQgYXJyb3dEZWZpbml0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5zaG93RGV0YWlsc0Fycm93IHx8IHR5cGVvZiB0aGlzLmNvbmZpZy5zaG93RGV0YWlsc0Fycm93ID09PSAndW5kZWZpbmVkJztcbiAgfVxuXG4gIG9uQ29udGV4dE1lbnUoJGV2ZW50OiBhbnksIHJvdzogb2JqZWN0LCBrZXk6IEtleVR5cGUsIGNvbEluZGV4OiBudW1iZXIgfCBudWxsLCByb3dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5zaG93Q29udGV4dE1lbnUgPT09ICd1bmRlZmluZWQnIHx8ICF0aGlzLmNvbmZpZy5zaG93Q29udGV4dE1lbnUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBldmVudDogJGV2ZW50LFxuICAgICAgcm93LFxuICAgICAga2V5LFxuICAgICAgcm93SWQ6IHJvd0luZGV4LFxuICAgICAgY29sSWQ6IGNvbEluZGV4LFxuICAgIH07XG4gICAgdGhpcy5lbWl0RXZlbnQoRXZlbnQub25Sb3dDb250ZXh0TWVudSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBkb0FwcGx5RGF0YShkYXRhKSB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoKGMpID0+ICEhYy5vcmRlckJ5KTtcbiAgICBpZiAoY29sdW1uKSB7XG4gICAgICB0aGlzLnNvcnRCeUljb24ub3JkZXIgPSAoY29sdW1uLm9yZGVyQnkgPT09ICdhc2MnKSA/ICdkZXNjJyA6ICdhc2MnO1xuICAgICAgdGhpcy5vcmRlckJ5KGNvbHVtbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YSA9IFsuLi5kYXRhLmN1cnJlbnRWYWx1ZV07XG4gICAgfVxuICB9XG59XG4iXX0=