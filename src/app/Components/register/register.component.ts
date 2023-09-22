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
      fullName : this.fb.control('Hicham',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      birthDate: this.fb.control('21/12/2002',[Validators.required]),
      isCriminal: this.fb.control(false,[Validators.required]),
      email:this.fb.control('hicham@Fmi.cs',[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(20)]),
      gender:this.fb.control('male',Validators.required),
      password: ['Pasda12das',[ Validators.required,Validators.pattern(this.passwordPattern)]],
      CNE:this.fb.control('Cne239',[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
      hasMedicalCondition:this.fb.control(false,[Validators.required]),

    })
    this.checkAuth();
  }
  handleRegisterUser() {
    if (this.personalInfoForm.valid) {
      this.authenticationService.registerUser(this.personalInfoForm.value).subscribe({
        next: (user) => {
          // Registration successful
          this.Error = "Registered Successfully";
  
          this.handleLogin(user.email ,user.password )
  
        },
        error: (registrationError) => {
          console.log("Registration Error: " + registrationError);
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
