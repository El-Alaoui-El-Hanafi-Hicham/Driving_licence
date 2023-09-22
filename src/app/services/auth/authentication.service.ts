  import { Observable,catchError,map,of, switchMap, throwError } from 'rxjs';
  import { UserModule } from '../../modules/user/user.module';
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { TestModule } from 'src/app/modules/test/test.module';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { ValidationErrors } from '@angular/forms';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    logIn() {
      throw new Error('Method not implemented.');
    }
  users :UserModule[] =[]
    authenticatedUser : UserModule | undefined
    
    constructor(private http :HttpClient) {
      this.getUsers();
      let user = localStorage.getItem('authUser')
      if(user){
        this.authenticatedUser = JSON.parse(user)
      }
    }
    getUsers():Observable<boolean> {
      this.http.get('http://localhost:3000/users').subscribe({
        next: (users ) => {
        if((users as UserModule) && users!= undefined && Array.isArray(users)){
          this.users = users
          return of(true);
        }
       return of(false);
        
        },
        error:(error)=>{
          console.error('Error fetching user:', error);
          return throwError('fetch failed. Please try again.'); // You can customize this error message
        }
      })
      return of(false);
    }
    registerUser(user :UserModule):Observable<UserModule>{
      return this.http.post<UserModule>('http://localhost:3000/users', user).pipe(
        switchMap(() => {
          return this.getUsers().pipe(
            map(() => {
              this.authenticatedUser = user;
              localStorage.setItem('authUser', JSON.stringify({ email: user.email, id: user.id }));
              this.getUsers();
              return user;
            })
          );
        }),
        catchError((error) => {
          return throwError(() => new Error('Registration failed. Please try again.')); 
        })
      );
        }
      
  public authenticateUser(email : string, password :string ):  Observable<boolean>{
    console.log(email,password)
    let user =this.users.find(user=>user.email==email)
    if(user?.password ==password){
      this.authenticatedUser=user;
      localStorage.setItem('authUser',JSON.stringify({email:user.email,id:user.id}))
      return of(true);
    }else{

      return throwError(()=>new Error("Bad Credentials"));
    }
    
  }
  public logOut () : Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser")
    return of(true)
  }
  public isAuthenticated() : Observable<boolean>{
  return of(this.authenticatedUser!=undefined);
  }
  public getAuthUser(): Observable<UserModule>{
    if(this.authenticatedUser){
return this.http.get<UserModule>('http://localhost:3000/users/'+this.authenticatedUser?.id);
  }else{
    return throwError(new Error("User Not Found"))
  }
}
addParticipant(user :UserModule,test:TestModule,type : CategoryModule,choosedDate:string) :Observable<UserModule>{
  user.orderedTest=test;
user.dateToPassTest=choosedDate;
  user.OrderedTestCategory=type;
  
  console.log(user)
  
    // Ensuite, nous renvoyons la requête PUT avec le test modifié
    return this.http.put<UserModule>(`http://localhost:3000/users/${user.id}`, user);
  
 

}
changeDate(date :string){
 let userID=this.authenticatedUser?.id
 let user! : UserModule 
 this.http.get<UserModule>(`http://localhost:3000/users/${userID}`).subscribe((resp)=>user= resp);
 user.dateToPassTest=date;
 return this.http.put<UserModule>(`http://localhost:3000/users/${userID}`, user);

}

public generateErrors(fieldName :string,errors :ValidationErrors){
  if(errors['required']){
    return fieldName +" is required"
    }
    if(errors['minlength']){
    let requiredLength = errors['minlength']['requiredLength']
    let actualLength = errors['minlength']['actualLength']
    
    return fieldName +" is only "+actualLength+" characters, it should be more the "+requiredLength +" character ."
    }
    if(errors['maxlength']){
      let requiredLength = errors['maxlength']['requiredLength']
      let actualLength = errors['maxlength']['actualLength']
      
      return fieldName +" is "+actualLength+" characters, it should be less the "+requiredLength +" character ."
      }
      if(errors['pattern']){
        return fieldName +" should contain at least one word uppercase and a digit"
      }
      if(errors['email']){
        return "Please enter a properly formatted email address "
      }
    
    // {"minlength":{"requiredLength":5,"actualLength":3}}
    return JSON.stringify(errors)
}

  }