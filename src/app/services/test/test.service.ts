import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable,throwError,of, map, catchError, mergeMap, forkJoin } from 'rxjs';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { TestModule } from 'src/app/modules/test/test.module';
import { UserModule } from 'src/app/modules/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
tests! : TestModule[]; 
categories! :object 
  constructor(private http : HttpClient) {
this.getCategories().subscribe({
  next:(data)=>{
        this.categories=data;
  }
});
   }
   findTest(id :number):Observable<TestModule>{
    
    return this.http.get<TestModule>('http://localhost:3000/tests/'+id)
     
  }
  getTests(filter : string | undefined):Observable<TestModule[]>{
    return this.http.get<TestModule[]>('http://localhost:3000/tests?'+filter)
     
  }
  getCategories():Observable<CategoryModule[]>{
  return  this.http.get<CategoryModule[]>("http://localhost:3000/category");
  }
  getCategoryInfo(categoryName: string): Observable<CategoryModule[]> {
    for (const [key, value] of Object.entries(this.categories)) {
      
      if (String(key) === categoryName) {
        return of(value)
      }
    }

    // const categoryKey = Object.keys(this.categories).find((key) => String(key) === categoryName);
  return of();
  }
  setTestCategoryInfo(test : TestModule) : Observable<any>{

    
    return this.http.put(`http://localhost:3000/tests?id=${test.id}`,test)
  
    
  }



  
       
    
}

