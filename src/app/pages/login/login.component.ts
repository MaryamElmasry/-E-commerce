import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,TranslatePipe , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  
  isLoading:boolean=false;
  msgError:string="";
  isSucccess:string="";
  
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  
  
  
    loginForm:FormGroup= new FormGroup(
      {
       
        email:new FormControl(null ,[ 
          Validators.required ,
          Validators.email 
        ]),
        password :new FormControl(null ,[
          Validators.required,
          Validators.pattern(/^[A-Z][a-z0-9]{7,10}$/)
          ]),
      
      },{updateOn:'submit'}
  
    );

  //l validathion yzhr b3d m a3ml click 3la supmit
  //{updateOn:'submit'}
  
  
    submitForm():void{
  
    if(this.loginForm.valid){
      this.isLoading = true;
  
  
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message=='success'){
            //creat account
        
            //display  success message for 1min and then go to home
            this.isSucccess=res.message;
  
            setTimeout(() => {

              //1)save token 
              localStorage.setItem("token",res.token)

              //2)  hyrg3 m3lomat l user
              this.authService.getUserData()

              //3)  //navigate path home
              this.router.navigate(['/home'])
            }, 500);
        
           // this.router.navigate(['/home']);
          
  
            this.isLoading = false;
          }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
          //show messsage to user
          this.msgError=  err.error.message
  
          this.isLoading = false;
  
        }
      })
    }
  
  
  
    }
   
}
