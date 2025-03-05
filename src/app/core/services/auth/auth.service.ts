import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import{jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly router=inject(Router)
  userData:any;

sendRegisterForm(data:object):Observable<any>{
return  this.httpClient.post(`${environment.basUrl}/api/v1/auth/signup`,data)
}

sendLoginForm(data:object):Observable<any>{
  return  this.httpClient.post(`${environment.basUrl}/api/v1/auth/signin`,data)
}

getUserData():void{
 this.userData= jwtDecode(localStorage.getItem("token")!)
 console.log(this.userData)
}

logoutUser():void{
// 1) delete token
localStorage.removeItem("token")

// 2) hnshel l uderData mn l varuble l kont 3mllha save feha
this.userData=null;


// 3) hwdeh ll login page 
this.router.navigate(['./login'])

}

setEmailVerify(data :object):Observable<any>{
  return this.httpClient.post(`${environment.basUrl}/api/v1/auth/forgotPasswords` ,data)
}



setCodeVerify(data :object):Observable<any>{
  return this.httpClient.post(`${environment.basUrl}/api/v1/auth/verifyResetCode` ,data)
}

setResetPass(data :object):Observable<any>{
  return this.httpClient.put(`${environment.basUrl}/api/v1/auth/resetPassword` ,data)
}




}
