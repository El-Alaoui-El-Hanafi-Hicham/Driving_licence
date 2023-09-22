import { Component,OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
pathName! :string;
constructor(private authService :AuthenticationService ,private router :Router,private renderer: Renderer2 ){}
ngOnInit(): void {
  this.router.events.subscribe((val) => {
    this.pathName = window.location.pathname;
    })
}

  LogOut(){
    this.authService.logOut().subscribe({next:()=>{
      this.router.navigateByUrl('login')
    }}) 
  }
  toggleClasses() {
    // Toggle classes on the body element
    const body = document.body;
    
    console.log(body)
    if(body?.classList.contains('g-sidenav-pinned')){
      this.renderer.removeClass(body, 'bg-white');
      this.renderer.removeClass(body, 'g-sidenav-pinned');
      
     }else{
      this.renderer.addClass(body, 'g-sidenav-pinned');
       this.renderer.addClass(body, 'bg-white');
     }
    // Toggle classes on the sidenav-main element
    const sidenavMain = document.getElementById('sidenav-main');
   if(sidenavMain?.classList.contains('bg-white')){
    this.renderer.removeClass(sidenavMain, 'bg-white');
    
   }else{

     this.renderer.addClass(sidenavMain, 'bg-white');
   }
  }
}
