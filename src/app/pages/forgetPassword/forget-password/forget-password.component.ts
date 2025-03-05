import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

private readonly authService=inject(AuthService)
private readonly router=inject(Router)
    
  isLoading:boolean=false;
  step:number=1;


verifyEmail:FormGroup=new FormGroup({
  email:new FormControl(null ,[Validators.required , Validators.email]),
})


verifyCode:FormGroup=new FormGroup({
  resetCode:new FormControl(null ,[
    Validators.required , 
    Validators.pattern(/^\d{6}$/)]),
})


resetPassword:FormGroup=new FormGroup({
  email:new FormControl(null ,[
    Validators.required , 
    Validators.email]),
    

  newPassword :new FormControl(null ,[
    Validators.required,
    Validators.pattern(/^[A-Z][a-z0-9]{7,10}$/)
    ]),
})


verifyEmailSubmit():void{
let emailValue=  this.verifyEmail.get('email')?.value
this.resetPassword.get('email')?.patchValue(emailValue)
this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.statusMsg ==='success'){
      this.step=2;
    }
  },
  error:(err)=>{

    console.log(err)
  }
})
}

verifyCodeSubmit():void{
  this.authService.setCodeVerify(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status ==='Success'){
        this.step=3;
      }
    },
    error:(err)=>{
  
      console.log(err)
    }
  })
  }
  
  reSetPasswordSubmit():void{
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
       localStorage.setItem('token',res.token)
       this.authService.getUserData()
       this.router.navigate(['/home'])

      },
      error:(err)=>{
    
        console.log(err)
      }
    })
    }
    



}
