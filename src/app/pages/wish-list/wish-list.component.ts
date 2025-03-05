import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iwishlist, RootObject } from '../../shared/interfaces/iwishlist/iwishlist';


@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe ,    CommonModule  ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly wishListService=inject(WishListService);


 wishListDetails: { category: RootObject[] } = { category: [] };
  wishListCount: number = 0;
 
ngOnInit(): void {
  this.getWishListtData();
}

getWishListtData(): void {
  this.wishListService.getLoggedUserWishList().subscribe({
    next: (res) => {
      console.log("Wishlist Data:", res.data); 
      this.wishListDetails.category = res.data; 
    },
    error: (err) => console.log("Error fetching wishlist:", err)
  });
}

removeItemFromWishCart(id: string): void {
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
      
    
      this.wishListDetails.category = this.wishListDetails.category.filter(item => item._id !== id);

  
      this.wishListService.removeSpecficWishListItem(id).subscribe({
        next: (res) => {
          console.log(res);
          this.wishListDetails = res.data.category;
          this.wishListService.WishList.next(res.numOfCartItems); 

        
          Swal.fire({
            title: "Deleted!",
            text: "Item removed from your wishlist.",
            icon: "success"
          });
        },
        error: (err) => {
          console.log(err);

         
          Swal.fire({
            title: "Error",
            text: "Failed to remove item. Try again.",
            icon: "error"
          });
        }
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
        this.removeItemFromWishCart(id); // Call remove function
        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your cart.",
          icon: "success"
        });
      }
    });
  } else {
    this.wishListService.updateProductQuantityInWishList(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.wishListDetails = res.data.category;
        this.wishListService.WishList.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

}
