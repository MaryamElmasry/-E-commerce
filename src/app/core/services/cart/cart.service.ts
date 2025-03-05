import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }


  // set value => .next()
  //get value => .subscribe()  


  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}/api/v1/cart`,
      {
        "productId": id
      },
      
    )
  }


  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}/api/v1/cart`,{
     
    })

  }

  removeSpecficCartItem(id:string):Observable<any>{
   return this.httpClient.delete(`${environment.basUrl}/api/v1/cart/${id}`,{
    
   })
  }


  updateProductQuantity(id:string,newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.basUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
       }
    )
 }


  clearCart():Observable<any>{
    return this.httpClient.delete(`${environment.basUrl}/api/v1/cart`,{
   
    })
  }


 
  
}
