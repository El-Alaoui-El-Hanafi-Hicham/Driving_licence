import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup! : FormGroup
  passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  hide = true;
LoginError! :string
  constructor(private authService:AuthenticationService,private fb: FormBuilder,private router: Router){}
  ngOnInit(): void {
   this.loginFormGroup = this.fb.group({
    email : this.fb.control('',[Validators.required,Validators.email]),
    password : this.fb.control('',[Validators.required,Validators.pattern(this.passwordPattern)])
   })
  }
  getFieldsErrors(fieldName :string , errors : ValidationErrors){
    return this.authService.generateErrors(fieldName,errors)
    }
    
  
handleLogin() {
  let email = this.loginFormGroup.value.email
  let password = this.loginFormGroup.value.password
  this.authService.authenticateUser(email, password).subscribe({
    next: (resp) => {
      // Authentication successful
      if(resp){
         this.router.navigateByUrl("?message=Logged In Successfully");

      }
    },
    error: (authError) => {
      this.LoginError=authError;
      console.log("Authentication Error: " + authError);
    },
  
  });
}

}
