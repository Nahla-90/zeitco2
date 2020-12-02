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
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public driversTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';
  private _routeListener: any;

  socket: SocketIOClient.Socket;
  public orderId;
  public user;


  constructor(private httpClient: HttpClient, private _activeRoute: ActivatedRoute, private router: Router) {

    /* Default sort field for url table is id*/
    this.driversTable.sortField = 'id';
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.socket = io(environment.serverUrl + '/order', {query: `id=49`, transports: ['websocket', 'xhr-polling']});
    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        this.orderId = qParams.id;
      });
  }

  public load() {
    let params = new HttpParams()
      .set('page', String((this.driversTable.offset / this.driversTable.limit) + 1))
      .set('type', 'DRIVER');

    // @ts-ignore
    const result = this.httpClient.get<any[]>('/api/v1/find', {params}).subscribe(
      (resultData: any) => {
        this.driversTable.records = resultData.data;
        this.driversTable.totalRecords = resultData.totalCount;
//        this.driversTable.offset = (resultData.page - 1) * resultData.limit;

      }, error => {
        console.log(error);
      });
  }

  loadDriversLazy(event: any) {
    this.driversTable.loadTableLazy(event);
    this.load();
  }

  assignToDriver(driverId) {
    this.socket.emit('assignOrder', {
      userId: this.user.user.id,
      orderId: this.orderId,
      driverId: driverId
    });
    this.formMsg = 'Order assigned to driver successfuly';
    this.class = 'success';
  }
}
