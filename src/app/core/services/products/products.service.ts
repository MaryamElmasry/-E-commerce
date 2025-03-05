import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient , @Inject(api_url) private apiPath:string) { }

//hstkhdm l function f component tany f h3ml subscribe w 3lshan kda lazm tkon btreturn observable
  getAllProducts():Observable<any>{
  //return  this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  return  this.httpClient.get(this.apiPath+'/products');


  }

  getSpecificProduct(id:string):Observable<any>{
    return  this.httpClient.get(`${environment.basUrl}/api/v1/products/${id}`)
  
    }

}
