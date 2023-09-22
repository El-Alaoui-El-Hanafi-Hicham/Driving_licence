import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { TestModule } from 'src/app/modules/test/test.module';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit{
  tests! : TestModule[]
  TestSearchForm! : FormGroup;
  FilterString! :string;
  displayedColumns: string[] = ['id', 'Title','date','type','action'];
  categoryInfoMap: { [key: string]: CategoryModule[] } = {}; // Map to store category information
  panelOpenState :boolean = false;

  constructor(private testService :TestService,private fb : FormBuilder){  }
  ngOnInit(): void {
   this.getTests(undefined);
   this.TestSearchForm= this.fb.group({
    searchInput : this.fb.control(""),
    _order :this.fb.control('asc'),
    _sort :this.fb.control('')
   })
   
  }
  TestSearch(){
    let filterArray :string[] =[]
    let seachInput=this.TestSearchForm.value.searchInput
    seachInput &&filterArray.push("title="+seachInput)
    let order=this.TestSearchForm.value._order
    order &&filterArray.push("_order="+order)

  
    let sort=this.TestSearchForm.value._sort
    order &&filterArray.push("&_sort="+sort)
    this.FilterString = filterArray.join("&")
    this.getTests(this.FilterString)


  }
getTests(filter : string | undefined){
  
 return this.testService.getTests(filter).subscribe( (response) => {
  // Assign the response to the variable
  this.tests = response;
  for (const test of this.tests) {
    this.getCategoryInfo(test.category);
  }
  console.log('POST Request Successful:', this.tests);
},
(error) => {
  console.error('POST Request Error:', error);
});
}


getCategoryInfo(category :string){
  this.testService.getCategoryInfo(category).subscribe({
    next:(data)=>{
      this.categoryInfoMap[category]=data; //

console.log(this.categoryInfoMap)
  },
  error:()=>{
    console.log("Couldnt get the category info")
  }
})
}

}
