import {Component, OnDestroy, Input} from '@angular/core';
import {formatDate, registerLocaleData} from '@angular/common';
import localeAR from '@angular/common/locales/ar-EG';
import {ViewChild} from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';
registerLocaleData(localeAR);
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TableService} from '@app/core/services/table.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public restaurantTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';

  constructor(private httpClient: HttpClient,
              private _activeRoute: ActivatedRoute) {
    /* Default sort field for url table is id*/
    this.restaurantTable.sortField = 'id';
    this.load();
  }

  public load() {
    const result = this.httpClient.get<any[]>('/api/v1/restaurant?status=APPROVED').subscribe(
      (resultData: any) => {
        this.restaurantTable.records = resultData.data;
      }, error => {
        console.log(error);
      });
  }
}
