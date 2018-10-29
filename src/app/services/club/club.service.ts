import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Club } from '../../models/club';
import { environment } from '../../../environments/environment';
import { Config } from '../../ngx-easy-table/model/config';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  public static config: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
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
    resizeColumn: true,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    tableLayout: {
      style: 'normal', // or big or tiny
      theme: 'normal', // or dark
      border: true,
      hover: true,
      striped: false,
    }
  };
  selected: Club;
  selectOptions: {};
  plural: Club[];
  ip = window.location.hostname;
  readonly URL_API = environment.baseUrl + "/api/clubs";
  constructor(private http: HttpClient) {
    this.selected = new Club();
  }

  get() {
    console.log(this.URL_API);
    return this.http.get(this.URL_API);
  }

  getDirectors(_id: String) {
    return this.http.get(this.URL_API + `/${_id}/directors`);
  }

  getEnrolls(_id: String) {
    return this.http.get(this.URL_API + `/${_id}/enrolls`);
  }

  post(single: Club) {
    return this.http.post(this.URL_API, single);
  }

  put(single: Club) {
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
