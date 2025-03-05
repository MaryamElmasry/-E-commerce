import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private HttpClient:HttpClient) { }

  getAllCategories():Observable<any>{
   return this.HttpClient.get(`${environment.basUrl}/api/v1/categories`)
  };

  getSpacificCategories(id:string):Observable<any>{
    return this.HttpClient.get(`${environment.basUrl}/api/v1/categories/${id}`);
  };
}
