import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/core';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  /* When Page Init*/
  ngOnInit() {
    /* Init Form and input validations */
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('.{1,}@[_a-z0-9A-Z]+(\\.[a-z0-9A-Z]+)+')]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      phone_number: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]\\d+$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  /* When Register Form Submitted*/
  onSubmit() {
    if (this.registerForm.valid) {
      this.authenticationService.register(
          this.registerForm.controls.email.value,
          this.registerForm.controls.username.value,
          this.registerForm.controls.phone_number.value,
          this.registerForm.controls.password.value);
    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }
}
