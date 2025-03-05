import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpClient:HttpClient) { }

  WishList:BehaviorSubject<number>=new BehaviorSubject(0)
  
    addProductToWishList(id:string):Observable<any>{
      return this.httpClient.post(`${environment.basUrl}/api/v1/wishlist`,
        {
          "productId": id
        },
        
      )
    }

   
    getLoggedUserWishList():Observable<any>{
      return this.httpClient.get(`${environment.basUrl}/api/v1/wishlist`,{
       
      })
  
    }
  
    removeSpecficWishListItem(id:string):Observable<any>{
     return this.httpClient.delete(`${environment.basUrl}/api/v1/wishlist/${id}`,{
      
     })
    }
  
    updateProductQuantityInWishList(id:string,newCount:number):Observable<any>{
      return this.httpClient.put(`${environment.basUrl}/api/v1/wishlist/${id}`,
        {
          "count": newCount
         }
      )
   }
  

}







