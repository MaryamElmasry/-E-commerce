import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

isLoading:boolean=false;
msgError:string="";
isSucccess:string="";

private readonly authService=inject(AuthService);
private readonly router=inject(Router);



  registerForm:FormGroup= new FormGroup(
    {
      name:new FormControl(null, [
          Validators.required ,
           Validators.minLength(3) ,
           Validators.maxLength(20) 
          ]),
      email:new FormControl(null ,[ 
        Validators.required ,
        Validators.email 
      ]),
      password :new FormControl(null ,[
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{7,10}$/)
        ]),
      rePassword :new FormControl(null ,[
        Validators.required ,
      ]),
      phone :new FormControl(null , [
        Validators.required ,
        Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)
      ]),
    },{validators: this.confirmPassword}

  );

//{updateOn:'submit'}


  submitForm():void{

  if(this.registerForm.valid){
    this.isLoading = true;


    this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message=='success'){
          //creat account
      
          //display  success message for 1min and then go to login
          this.isSucccess=res.message;

          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 500);
          //navigate path login
         // this.router.navigate(['/login']);
        

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
  else{
    //btkhlek t3ml toutched lkol l inputs 
   this.registerForm.markAllAsTouched()
  }



  }





  //custom validation 
  confirmPassword(group:AbstractControl){
   // password
   const password= group.get('password')?.value;

   // repassword
   const rePassword=group.get('rePassword')?.value;

   if (password === rePassword) {
    //no error
    return null;
  }
  else{
    //error
    return{ minmatch:true}
  }

  }






 

}











