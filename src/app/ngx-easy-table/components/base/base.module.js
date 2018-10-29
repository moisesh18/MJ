/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { CsvExportComponent } from '../csv-export.component';
import { GlobalSearchComponent } from '../global-search/global-search.component';
import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { GlobalSearchPipe } from '../../pipes/global-search-pipe';
import { RenderPipe } from '../../pipes/render-pipe';
import { SearchPipe } from '../../pipes/search-pipe';
import { SortPipe } from '../../pipes/sort.pipe';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxPaginationModule } from 'ngx-pagination';
export class BaseModule {
}
BaseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BaseComponent,
                    GlobalSearchComponent,
                    CsvExportComponent,
                    HeaderComponent,
                    PaginationComponent,
                    SearchPipe,
                    RenderPipe,
                    GlobalSearchPipe,
                    SortPipe,
                ],
                imports: [
                    CommonModule,
                    NgxPaginationModule,
                    NgxDnDModule,
                ],
                exports: [BaseComponent],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZWFzeS10YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbmd4LWVhc3ktdGFibGUvY29tcG9uZW50cy9iYXNlL2Jhc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDakYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXFCckQsTUFBTTs7O1lBbkJMLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixnQkFBZ0I7b0JBQ2hCLFFBQVE7aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IENzdkV4cG9ydENvbXBvbmVudCB9IGZyb20gJy4uL2Nzdi1leHBvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEdsb2JhbFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4uL2dsb2JhbC1zZWFyY2gvZ2xvYmFsLXNlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBHbG9iYWxTZWFyY2hQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMvZ2xvYmFsLXNlYXJjaC1waXBlJztcbmltcG9ydCB7IFJlbmRlclBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9yZW5kZXItcGlwZSc7XG5pbXBvcnQgeyBTZWFyY2hQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMvc2VhcmNoLXBpcGUnO1xuaW1wb3J0IHsgU29ydFBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9zb3J0LnBpcGUnO1xuXG5pbXBvcnQgeyBOZ3hEbkRNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRuZCc7XG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCYXNlQ29tcG9uZW50LFxuICAgIEdsb2JhbFNlYXJjaENvbXBvbmVudCxcbiAgICBDc3ZFeHBvcnRDb21wb25lbnQsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIFBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgU2VhcmNoUGlwZSxcbiAgICBSZW5kZXJQaXBlLFxuICAgIEdsb2JhbFNlYXJjaFBpcGUsXG4gICAgU29ydFBpcGUsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBOZ3hEbkRNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtCYXNlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQmFzZU1vZHVsZSB7XG59XG4iXX0=