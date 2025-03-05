import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService);

  cartDetails:Icart={} as Icart;
  
ngOnInit(): void {
    this.getCartData()
}
  
getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartDetails=res.data;

      },
      error:(err)=>{
        console.log(err)
      }
    })
}

removeItem(id:string):void{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {   
    this.cartService.removeSpecficCartItem(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails=res.data;
        this.cartService.cartNumber.next(res.numOfCartItems)

      },
      error:(err)=>{
        console.log(err)
      }
    })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

}


updateCount(id: string, count: number): void {
  if (count < 1) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeItem(id); // Call remove function
        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your cart.",
          icon: "success"
        });
      }
    });
  } else {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        this.cartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


clearItems():void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.cartService.clearCart().subscribe({
          next:(res)=>{
            console.log(res)
            if(res.message==='success'){
              this.cartDetails={} as Icart;
              this.cartService.cartNumber.next(0)
            }
           
          },
          error:(err)=>{
            console.log(err)
          }
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });


 
}

}
