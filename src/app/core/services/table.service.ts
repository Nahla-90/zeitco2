import { HttpClient, HttpParams } from '@angular/common/http';

/* Service to simplify PrimeNG table function */
/**
 * PrimeNG is a collection of rich UI components for Angular.
 * https://www.primefaces.org/primeng
 */
export class TableService {
  public records: any[] = [];
  public offset = 0;
  public limit = 10;
  public sortField = 'id';
  public sortOrder = 'ASC';
  public filters: object = {};
  public totalRecords = 0;
  public paginationList: string[] = ['20', '50', '500', '1000', '3000'];

  public constructor(private httpClient: HttpClient) {}
  loadTableLazy(event: any) {
    /* this function done when anything clicked on primeNg Table (Pagination & Sorting & etc)*/
    this.filters = {};
    this.offset = event.first;
    this.limit = event.rows;
    if (event.sortField !== undefined && event.sortField !== null) {
      this.sortField = event.sortField;
    }
    if (event.sortOrder > 0) {
      this.sortOrder = 'ASC';
    } else {
      this.sortOrder = 'DESC';
    }

    for (const key of Object.keys(event.filters)) {
      this.filters[key] = event.filters[key]['value'];
    }
  }
}
