import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
 constructor(private httpClient:HttpClient , @Inject(api_url) private apiPath:string) { }

  getAllBrands():Observable<any>{

  return  this.httpClient.get(`${environment.basUrl}/api/v1/brands`);

  }

  getBrandById(id:string):Observable<any>{
    return  this.httpClient.get(`${environment.basUrl}/api/v1/brands/${id}`)
  
    }
}
