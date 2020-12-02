import {Component} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeAR from '@angular/common/locales/ar-EG';
import {ViewChild} from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';

registerLocaleData(localeAR);
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TableService} from '@app/core/services/table.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public ordersTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';

  private _routeListener: any;
  public status = 'PENDING';

  constructor(private httpClient: HttpClient, private _activeRoute: ActivatedRoute,private router: Router) {

    /* Default sort field for url table is id*/
    this.ordersTable.sortField = 'id';

    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        if (qParams.status !== null || qParams.status) {
          if (qParams.status === 'pending') {
            this.status = 'PENDING';
          } else if (qParams.status === 'assigned') {
            this.status = 'ASSIGNED';
          } else if (qParams.status === 'onprogress') {
            this.status = 'ONPROGRESS';
          } else if (qParams.status === 'collected') {
            this.status = 'COLLECTED';
          }
        } else {
          this.status = 'PENDING';
        }
        this.ordersTable.offset = 0;
        this.dataTableComponent.reset();
      });
  }

  public load() {
    let params = new HttpParams()
      .set('page', String((this.ordersTable.offset / this.ordersTable.limit) + 1))
      .set('status', this.status)
  .set('all', String(true));

    // @ts-ignore
    const result = this.httpClient.get<any[]>('/api/v1/orders', {params}).subscribe(
      (resultData: any) => {
        this.ordersTable.records = resultData.data;
        this.ordersTable.totalRecords = resultData.totalCount;
//        this.ordersTable.offset = (resultData.page - 1) * resultData.limit;

      }, error => {
        console.log(error);
      });
  }
  loadOrdersLazy(event: any) {
    this.ordersTable.loadTableLazy(event);
    this.load();
  }
}
