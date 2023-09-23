import { JsonPipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { UserModule } from 'src/app/modules/user/user.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],


})


export class RegisterComponent implements OnInit {

Error! :string; 
  personalInfoForm! : FormGroup;
   passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

constructor(private fb :FormBuilder,private authenticationService :AuthenticationService, private router:Router){
}
  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      id:this.fb.control(nanoid()),
      fullName : this.fb.control('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      birthDate: this.fb.control('',[Validators.required]),
      isCriminal: this.fb.control(false,[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(20)]),
      gender:this.fb.control('',Validators.required),
      password: ['',[ Validators.required,Validators.pattern(this.passwordPattern)]],
      CNE:this.fb.control('',[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
      hasMedicalCondition:this.fb.control(false,[Validators.required]),

    })
    this.checkAuth();
  }
  handleRegisterUser() {
    if (this.personalInfoForm.valid) {
      this.authenticationService.registerUser(this.personalInfoForm.value).subscribe({
        next: (registeredUser) => {
          // Registration successful
          this.Error = "Registered Successfully";
          this.router.navigateByUrl("?message=welcome");

          // Now, you can call handleLogin to log in the user
          this.handleLogin(registeredUser.email, this.personalInfoForm.value.password);
        },
        error: (registrationError) => {
          this.Error = "Registration Error: " + registrationError;
        },
      });
    }
  }
  
getFieldsErrors(fieldName :string , errors : ValidationErrors){
return this.authenticationService.generateErrors(fieldName,errors)
}


handleLogin(email: string, password: string) {
  this.authenticationService.authenticateUser(email, password).subscribe({
    next: (resp) => {
      // Authentication successful
      if(resp){
        this.Error = "Logged Successfully ";
         this.router.navigateByUrl("");

      }
    },
    error: (authError) => {
      console.log("Authentication Error: " + authError);
    },
  
  });
}
checkAuth(){
  this.authenticationService.isAuthenticated().subscribe({
    next: (resp) => {
      // Authentication successful
      if(resp){
        this.Error = "Logged Successfully ";
         this.router.navigateByUrl("");

      }
    },
    error: (authError) => {
      console.log("Authentication Error: " + authError);
    },
  })
}
}
