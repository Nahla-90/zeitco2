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
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public urlsTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';

  constructor(private httpClient: HttpClient,
              private _activeRoute: ActivatedRoute) {
    /* Default sort field for url table is id*/
    this.urlsTable.sortField = 'id';
  }

  public load() {
    const params = new HttpParams()
      .set('limit', String(this.urlsTable.limit))
      .set('offset', String(this.urlsTable.offset))
      .set('sortOrder', this.urlsTable.sortOrder)
      .set('sortField', this.urlsTable.sortField);

    const result = this.httpClient.get<any[]>('/api/v1/urls', {params}).subscribe(
      (resultData: any) => {
        this.urlsTable.records = resultData.urls;
        this.urlsTable.totalRecords = resultData.total;
      }, error => {
        console.log(error);
      });
  }

  /* Called When any thing changed on table like ( sorting, filter, pagination...etc)*/
  loadUrlsLazy(event: any) {
    this.urlsTable.loadTableLazy(event);
    this.load();
  }

  /* Check Url Status*/
  getUrlStatus(urlId) {
    const result = this.httpClient.get<any[]>('/api/v1/urls/' + urlId, {}).subscribe(
      (resultData: any) => {
        alert(resultData.status);
      }, error => {
        console.log(error);
      });
  }

  /* Delete Url */
  deleteUrl(urlId) {
    const result = this.httpClient.delete<any[]>('/api/v1/urls/' + urlId, {}).subscribe(
      (resultData: any) => {
        if (resultData['success']) {
          this.formMsg = 'Url deleted successfuly';
          this.class = 'success';
          /* reload Url Table*/
          this.load();
        } else {
          this.formMsg = 'Sorry, Something went wrong!!!';
          this.class = 'error';
        }
      }, error => {
        console.log(error);
      });
  }

  /* Update Url*/
  updateUrl(url: any) {
    const result = this.httpClient.patch<any[]>('/api/v1/urls/' + url.id, {text: url.text}).subscribe(
      (resultData: any) => {
        if (resultData['success']) {
          this.formMsg = 'Url updated successfuly';
          this.class = 'success';
          this.load();
        } else {
          this.formMsg = 'Sorry, Something went wrong!!!';
          this.class = 'error';
        }
      }, error => {
        console.log(error);
      });
  }
}
