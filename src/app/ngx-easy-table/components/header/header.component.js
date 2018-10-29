/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class HeaderComponent {
    constructor() {
        this.update = new EventEmitter();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    unifyKey(key) {
        return key.replace('.', '_');
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-header',
                template: `
    <label for="search_{{ unifyKey(column.key) }}">
      <input type="text"
             id="search_{{ unifyKey(column.key) }}"
             aria-label="Search"
             placeholder="{{ column.placeholder ? column.placeholder : column.title }}"
             class="ngx-table__header-search"
             #input
             (input)="update.emit({value: input.value, key: column.key})"
      >
    </label>`
            }] }
];
HeaderComponent.propDecorators = {
    column: [{ type: Input }],
    update: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    HeaderComponent.prototype.column;
    /** @type {?} */
    HeaderComponent.prototype.update;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1lYXN5LXRhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9uZ3gtZWFzeS10YWJsZS9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBa0J2RSxNQUFNOztzQkFFZSxJQUFJLFlBQVksRUFBRTs7Ozs7O0lBRXJDLFFBQVEsQ0FBQyxHQUFXO1FBQ2xCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDOUI7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7OzthQVVDO2FBQ1o7OztxQkFHRSxLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sdW1ucyB9IGZyb20gJy4uLy4uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGFibGUtaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWwgZm9yPVwic2VhcmNoX3t7IHVuaWZ5S2V5KGNvbHVtbi5rZXkpIH19XCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgIGlkPVwic2VhcmNoX3t7IHVuaWZ5S2V5KGNvbHVtbi5rZXkpIH19XCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGNvbHVtbi5wbGFjZWhvbGRlciA/IGNvbHVtbi5wbGFjZWhvbGRlciA6IGNvbHVtbi50aXRsZSB9fVwiXG4gICAgICAgICAgICAgY2xhc3M9XCJuZ3gtdGFibGVfX2hlYWRlci1zZWFyY2hcIlxuICAgICAgICAgICAgICNpbnB1dFxuICAgICAgICAgICAgIChpbnB1dCk9XCJ1cGRhdGUuZW1pdCh7dmFsdWU6IGlucHV0LnZhbHVlLCBrZXk6IGNvbHVtbi5rZXl9KVwiXG4gICAgICA+XG4gICAgPC9sYWJlbD5gLFxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbHVtbjogQ29sdW1ucztcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB1bmlmeUtleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKCcuJywgJ18nKTtcbiAgfVxufVxuIl19