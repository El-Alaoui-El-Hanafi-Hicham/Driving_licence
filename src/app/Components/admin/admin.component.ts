import {  Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,  Router } from '@angular/router';
import  {Chart, registerables} from 'node_modules/chart.js';
import { map } from 'rxjs';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { TestModule } from 'src/app/modules/test/test.module';
import { UserModule } from 'src/app/modules/user/user.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TestService } from 'src/app/services/test/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
AuthUser : UserModule={
  id: '',
  fullName: '',
  email: '',
  birthDate: '',
  isCriminal: false,
  hasMedicalCondition: false,
  gender: '',
  phoneNumber: '',
  CNE: '',
  password: '',
  orderedTest: {
    id: 0,
    title: '',
    date: [],
    type: '',
    time: {
      hours: 0,
      minutes: 0
    },
    thumbnail:'',
    price: 0,
    category: '',
    categoryInfo: []
  },
  dateToPassTest: '',
  OrderedTestCategory: {
    id: '',
    vehicule: '',
    description: '',
    specs: []
  }
};
OrderedTest! :any;
Message! :string;
Tests! : TestModule[]

  constructor (private authService : AuthenticationService,private activatedRoute :ActivatedRoute,
    private _snackBar: MatSnackBar,private route :Router,private testService :TestService){}

    ngOnInit(): void {
      this.getAllTests()
      this.getAuthUser()
      this.getMessage()
      this.changeTestDate()
      if(this.Message){
        Swal.fire({
          title: 'Notification',
          text: this.Message,
          icon: 'success', // You can use 'info', 'success', 'warning', 'error', or 'question'
          toast: true,
          position: 'top-end', // You can change the toast position
          showConfirmButton: false,
          timer: 3000, // Adjust the duration of the toast (in milliseconds)
        });
        // Get the current page URL
const currentURL = window.location.href;

// Create a URL object to work with the URL
const url = new URL(currentURL);

// Remove the parameter you want to delete
url.searchParams.delete('message');

// Replace the current URL in the browser's history with the updated URL
window.history.replaceState({}, document.title, url.href);
      }
      Chart.register(...registerables);
   

    new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Cars', 'Motocycles', 'Light vehicles and quad bikes',
          'Medium-sized vehicles', 'Large vehicles', 'Minibuses', 'Buses'
        ],
        datasets: [{
          backgroundColor: [
            '#ff9999', // Light Red
            '#ffcc99', // Light Orange
            '#ffdb4d', // Yellow
            '#99ff99', // Light Green
            '#66b3ff', // Light Blue
            '#c2c2f0', // Lavender
            '#ffb3e6'  // Light Pink
          ],
          label: 'Percentage',
          data: [12, 19, 11, 6, 3, 5, 8], // Add your data here
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          subtitle: {
            display: true,
            text: 'Custom Chart Subtitle'
          }
        }
      }
    });
    new Chart('licenseChart', {
      type: "bar",
      data: {
          labels:["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
          datasets: [
              {
                  label: "New Licenses Issued",
                  data: [25000, 26000, 27000, 28000, 29000, 31000, 32000, 33000, 34000, 35000, 36000, 37000],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1
              },
              {
                  label: "Licenses Renewed",
                  data: [12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500],
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1
              },
              {
                  label: "Licenses Suspended",
                  data:  [800, 820, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300],
                  backgroundColor: "rgba(255, 205, 86, 0.6)",
                  borderColor: "rgba(255, 205, 86, 1)",
                  borderWidth: 1
              }
          ]
      },
      options: {
          scales: {
              x: {
                  beginAtZero: true
              },
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }


  

// Create a chart


  getAuthUser(){
this.authService.getAuthUser().subscribe((data)=>{console.log(data); this.AuthUser=data; this.OrderedTest=data.orderedTest})
  }
  getMessage(){
    this.activatedRoute.queryParamMap.subscribe(params => {
      // Retrieve the 'id' query parameter
      let message=params.get('message');
      if(message != null){
        this.Message = message

      }
  
  
    });
  }
  openSnackBar( ) {
    this._snackBar.open(this.Message, "close");
  }

  getAllTests(){
    this.testService.getTests("_limit=3").subscribe((data)=>this.Tests = data)
  }

  changeTestDate(){
this.testService.findTest(this.OrderedTest?.id).subscribe({
  next:(test)=>{
    console.log(test)
// this.authService.
  },
  error:()=>{
    console.log("couldn't find the test :" )
  }
})
  }
}
