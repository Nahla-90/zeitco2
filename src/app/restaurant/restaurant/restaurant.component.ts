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
  public display = false;
  public declineId=0;
  public declineReason='';

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

  public declineSubmitReason() {
    if(this.declineReason!==''){
      const result = this.httpClient.put<any[]>('/api/v1/restaurant/'+this.declineId+'/ignore',{declineReason:this.declineReason}).subscribe(
        (resultData: any) => {
          this.formMsg = 'Restaurant declined successfuly';
          this.class = 'success';
          this.display=false;
        }, error => {
          console.log(error);
        });
    }else{
      this.formMsg = 'Decline Reason required';
      this.class = 'error';
      this.display=false;

    }

    //
  }
  public declineRestaurant(restId){
    this.display=true;
    this.declineId=restId;
    this.declineReason='';
  }
}
