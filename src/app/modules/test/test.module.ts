import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';




export interface TestModule {
  id: number,
  title : string,
  date : string[],
  type : string
  time : Time,
  thumbnail : string
  price : number,
  category : string
  categoryInfo: CategoryModule[]
 }
