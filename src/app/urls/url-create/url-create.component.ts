import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';

@NgModule({
  imports: [Validators]
})
@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.scss']
})
export class UrlCreateComponent {
  urlForm: FormGroup;
  public formMsg = '';
  public class = '';

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    /* Init Form and input validations */
    this.urlForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.pattern('^(http|https|ftp)?(://)?(www|ftp|([a-z0-9-]+))?.?[a-z0-9-]+(.|:)([a-z0-9-]+)+([/?].*)?$')]],
    });
  }

  /* When Form submitted*/
  onSubmit() {
    if (this.urlForm.valid) {
      const result = this.httpClient.post<any[]>('/api/v1/urls', {text: this.urlForm.controls['text'].value}).subscribe(resultData => {
        if (resultData['success']) {
          this.formMsg = 'Url created successfuly';
          this.class = 'success';
        } else {
          this.formMsg = 'Sorry, Something went wrong!!!';
          this.class = 'error';
        }
      });
    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.urlForm.controls).forEach(field => {
        const control = this.urlForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }
}
