import { CategoryModule } from "../category/category.module"
import { TestModule } from "../test/test.module"



export interface UserModule {
id :string
fullName : string
email : string
birthDate : string
isCriminal : boolean
hasMedicalCondition : boolean
gender :string
phoneNumber :string
CNE :string
password :string
orderedTest : TestModule
dateToPassTest: string
OrderedTestCategory : CategoryModule

 }
