/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
/**
 * From version 5.0 CsvExportComponent will be deprecated,
 * and from version 6.0 moved to CsvExportComponent plugin
 */
export class CsvExportComponent {
    /**
     * @return {?}
     */
    exportCsv() {
        /** @type {?} */
        const data = this.data;
        /** @type {?} */
        let csvContent = 'data:text/csv;charset=utf-8,';
        /** @type {?} */
        let dataString = '';
        /** @type {?} */
        const x = [];
        /** @type {?} */
        const keys = Object.keys(this.data[0]);
        data.forEach((row, index) => {
            x[index] = [];
            keys.forEach((i) => {
                if (row.hasOwnProperty(i)) {
                    if (typeof row[i] === 'object') {
                        row[i] = 'Object'; // so far just change object to "Object" string
                    }
                    x[index].push(row[i]);
                }
            });
        });
        csvContent += keys + '\n';
        x.forEach((row, index) => {
            dataString = row.join(',');
            csvContent += index < data.length ? dataString + '\n' : dataString;
        });
        /** @type {?} */
        const encodedUri = encodeURI(csvContent);
        /** @type {?} */
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'my_data.csv');
        link.click();
    }
}
CsvExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-csv-export',
                template: `
    <a (click)="exportCsv()" class="ngx-menu-item">
      CSV export
    </a>`
            }] }
];
CsvExportComponent.propDecorators = {
    data: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CsvExportComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2LWV4cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvY29tcG9uZW50cy9jc3YtZXhwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7Ozs7QUFZQSxNQUFNOzs7O0lBR0csU0FBUzs7UUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztRQUN2QixJQUFJLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQzs7UUFDaEQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDOztRQUNwQixNQUFNLENBQUMsR0FBVSxFQUFFLENBQUM7O1FBQ3BCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN6QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDOUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztxQkFDbkI7b0JBQ0QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkI7YUFDRixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxVQUFVLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLFVBQVUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1NBQ3BFLENBQUMsQ0FBQzs7UUFDSCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7O1FBQ3pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7O1lBM0NoQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7U0FHSDthQUNSOzs7bUJBT0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNzdi1leHBvcnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhIChjbGljayk9XCJleHBvcnRDc3YoKVwiIGNsYXNzPVwibmd4LW1lbnUtaXRlbVwiPlxuICAgICAgQ1NWIGV4cG9ydFxuICAgIDwvYT5gLFxufSlcblxuLyoqXG4gKiBGcm9tIHZlcnNpb24gNS4wIENzdkV4cG9ydENvbXBvbmVudCB3aWxsIGJlIGRlcHJlY2F0ZWQsXG4gKiBhbmQgZnJvbSB2ZXJzaW9uIDYuMCBtb3ZlZCB0byBDc3ZFeHBvcnRDb21wb25lbnQgcGx1Z2luXG4gKi9cbmV4cG9ydCBjbGFzcyBDc3ZFeHBvcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXRhO1xuXG4gIHB1YmxpYyBleHBvcnRDc3YoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICBsZXQgY3N2Q29udGVudCA9ICdkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsJztcbiAgICBsZXQgZGF0YVN0cmluZyA9ICcnO1xuICAgIGNvbnN0IHg6IGFueVtdID0gW107XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YVswXSk7XG4gICAgZGF0YS5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gICAgICB4W2luZGV4XSA9IFtdO1xuICAgICAga2V5cy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgIGlmIChyb3cuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJvd1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJvd1tpXSA9ICdPYmplY3QnOyAvLyBzbyBmYXIganVzdCBjaGFuZ2Ugb2JqZWN0IHRvIFwiT2JqZWN0XCIgc3RyaW5nXG4gICAgICAgICAgfVxuICAgICAgICAgIHhbaW5kZXhdLnB1c2gocm93W2ldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjc3ZDb250ZW50ICs9IGtleXMgKyAnXFxuJztcbiAgICB4LmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFTdHJpbmcgPSByb3cuam9pbignLCcpO1xuICAgICAgY3N2Q29udGVudCArPSBpbmRleCA8IGRhdGEubGVuZ3RoID8gZGF0YVN0cmluZyArICdcXG4nIDogZGF0YVN0cmluZztcbiAgICB9KTtcbiAgICBjb25zdCBlbmNvZGVkVXJpID0gZW5jb2RlVVJJKGNzdkNvbnRlbnQpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBlbmNvZGVkVXJpKTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnbXlfZGF0YS5jc3YnKTtcblxuICAgIGxpbmsuY2xpY2soKTtcbiAgfVxufVxuIl19