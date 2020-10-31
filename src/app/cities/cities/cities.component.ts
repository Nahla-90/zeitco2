import {Component, OnDestroy, Input} from '@angular/core';
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
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public citiesTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';

  constructor(private httpClient: HttpClient,
              private _activeRoute: ActivatedRoute, private router: Router) {
    /* Default sort field for url table is id*/
    this.citiesTable.sortField = 'id';

    this.load();
  }

  public load() {
    const result = this.httpClient.get<any[]>('/api/v1/cities').subscribe(
      (resultData: any) => {
        this.citiesTable.records = resultData;
        this.citiesTable.totalRecords = resultData.length;
      }, error => {
        console.log(error);
      });
  }
  /* Delete Url */
  delete(cityId) {
    const result = this.httpClient.delete<any[]>('/api/v1/cities/' + cityId, {}).subscribe(
      (resultData: any) => {
          this.formMsg = 'City deleted successfuly';
          this.class = 'success';
          /* reload Url Table*/
          this.load();
      }, error => {
        this.formMsg = 'City deleted successfuly';
        this.class = 'success';
        this.load();
      });
  }
}
