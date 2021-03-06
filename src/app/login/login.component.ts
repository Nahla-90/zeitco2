import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '@app/core';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  /* When Module Init*/
  ngOnInit() {
    /* Init Form and input validations */
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    /* get return url from route parameters or default to / */
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /* When Login Form Submitted*/
  onSubmit() {
    /* If Login Data valid*/
    if (this.loginForm.valid) {
      this.loading = true;
      this.authenticationService
        .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/outlets'], {queryParams: {}});
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        );
    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }
}
