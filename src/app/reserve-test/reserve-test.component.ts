import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { TestModule } from 'src/app/modules/test/test.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'app-reserve-test',
  templateUrl: './reserve-test.component.html',
  styleUrls: ['./reserve-test.component.css']
})
export class ReserveTestComponent implements OnInit{
  id! : number;
  test: TestModule={
    id: 0,
    title: '',
    date: [],
    type: '',
    time: {
      hours: 0,
      minutes: 0
    },
    thumbnail: '',
    price: 0,
    category: '',
    categoryInfo: []
  };
  isLinear = true;
  categoryInfo!:CategoryModule[]
  AuthUserInfoForm! : FormGroup
  paymentFormGroup! : FormGroup
  TestFormGroup! : FormGroup
  authUser! : UserModule  
  SelectedCategory :CategoryModule ={
    id: '',
    vehicule: '',
    description: '',
    specs: {}
  }





constructor(private activatedRoute : ActivatedRoute, private router : Router
  ,private fb :FormBuilder,
  private testService : TestService, private authService :AuthenticationService){
 

}




ngOnInit(): void {
   this.getAuthUser()
  this.activatedRoute.params.subscribe(params => {
    this.id = params['id'];
  // Use 'id' as needed
    if(!this.id){
      this.router.navigateByUrl('/tests')
  }
  this.findTest();
  
  }); 
  this.AuthUserInfoForm = this.fb.group({
    fullName : this.fb.control(`${this.authUser?.fullName}`,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
    isCriminal: this.fb.control(this.authUser?.isCriminal,[Validators.required]),
    email:this.fb.control(this.authUser?.email,[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(20)]),
    gender:this.fb.control(this.authUser?.gender,Validators.required),
    CNE:this.fb.control(this.authUser?.CNE,[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
    hasMedicalCondition:this.fb.control(this.authUser?.hasMedicalCondition,[Validators.required]),
  });
  
  
  this.TestFormGroup = this.fb.group({
 type:this.fb.control('',[Validators.required]),
  choosedDate : this.fb.control('',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
});


  this.paymentFormGroup = this.fb.group({
    cardholderName: ['das', Validators.required],
    cardNumber: ['faksf', Validators.required],
    expirationMonth: ['askf', Validators.required],
    expirationYear: ['asf', Validators.required],
    cvv: ['saf', Validators.required],
    billingAddress: ['aksf', Validators.required],
    
    paymentMethod: ['', Validators.required],
    termsAndConditions  : [true, Validators.requiredTrue],
  });




}



findTest() {
  this.testService.findTest(this.id).subscribe({
    next:(data)=>{
      this.test = data
      this.testService.getCategoryInfo(this.test.category).subscribe({
        next:(data)=>{
          this.categoryInfo=data
  },
  error:()=>{
    console.log("error")
  }
})
    },
    error:(error)=>{
console.log(error)
    }
  })
}

getAuthUser(){
  this.authService.getAuthUser().subscribe((respnse)=>{
    this.authUser=respnse 
    this.AuthUserInfoForm = this.fb.group({
      fullName : this.fb.control(`${respnse?.fullName}`,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]),
      isCriminal: this.fb.control(respnse?.isCriminal,[Validators.required]),
      email:this.fb.control(respnse?.email,[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(20)]),
      gender:this.fb.control(respnse?.gender,Validators.required),
      CNE:this.fb.control(respnse?.CNE,[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
      hasMedicalCondition:this.fb.control(respnse?.hasMedicalCondition,[Validators.required]),
    });
  })
}
addParticipant(){
  let type=this.SelectedCategory;
  let choosedDate=this.TestFormGroup.value.choosedDate;
  console.log(this.authUser)
  this.authService.addParticipant(this.authUser,this.test,type,choosedDate).subscribe({next:()=>{
    let message="Test Ordered Succesfully"
this.router.navigateByUrl("/?message="+message)  
  },
error:()=>{
  console.log("error")
}
})
}
loadTypeInfo(){
  let categoryId :string = this.TestFormGroup.value.type;
  console.log(this.test.categoryInfo)
    for (const category of this.categoryInfo) {
    if(category.id==categoryId && category!= undefined){
      console.log(category)
      this.SelectedCategory=category
    }
  }
}

}
