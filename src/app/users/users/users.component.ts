import {Component, OnDestroy, Input, OnInit} from '@angular/core';
import {formatDate, registerLocaleData} from '@angular/common';
import localeAR from '@angular/common/locales/ar-EG';
import {ViewChild} from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';

registerLocaleData(localeAR);
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TableService} from '@app/core/services/table.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  @Input() type: string=null;
  @Input() assignBtn: boolean = false;
  @Input() restaurantId: number = 0;

  @ViewChild('dt') dataTableComponent: DataTable;
  public usersTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';

  constructor(private httpClient: HttpClient,
              private _activeRoute: ActivatedRoute, private router: Router) {
    /* Default sort field for url table is id*/
    this.usersTable.sortField = 'id';

  }
  ngOnInit() {
    this.load();

  }

  public load() {
    const params = new HttpParams()
      .set('page', String((this.usersTable.offset / this.usersTable.limit) + 1))
      .set('type',this.type);
    const result = this.httpClient.get<any[]>('/api/v1/find',{params}).subscribe(
      (resultData: any) => {
        this.usersTable.records = resultData.data;
        this.usersTable.totalRecords = resultData.totalCount;
      }, error => {
        console.log(error);
      });
  }
  public assignRestaurant(rowId) {
    const result = this.httpClient.put<any[]>('/api/v1/restaurant/'+this.restaurantId+'/purchasing/'+rowId,{}).subscribe(
      (resultData: any) => {
        this.formMsg = 'Restaurant assigned to purchaser successfuly';
        this.class = 'success';
      }, error => {
        console.log(error);
      });
  }
}
