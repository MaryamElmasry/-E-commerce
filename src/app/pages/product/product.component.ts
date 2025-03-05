import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wishList/wish-list.service';


@Component({
  selector: 'app-product',
  imports: [CarouselModule , UpperCasePipe , LowerCasePipe ,CurrencyPipe ,SearchPipe,FormsModule ,RouterLink,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{


  

private readonly  productsService=inject(ProductsService);
private readonly categoriesService=inject(CategoriesService);
private readonly cartService=inject(CartService);
private readonly toastrService=inject(ToastrService);
private readonly  ngxSpinnerService=inject( NgxSpinnerService);
private readonly  wishListService=inject( WishListService);

 
// products:Iproduct[]=[];

products:WritableSignal<Iproduct[]> =signal([])
categories:Icategory[]=[];
wishlist: string[] = [];
search:string=""

ngOnInit(): void {
  this.getProductsData();
};

getProductsData():void{

  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
    // console.log(res.data);
      this.products.set(res.data);
    },
    error:(err)=>{
      console.log(err);
    },
  })
}


addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
  console.log(res);
  
  //show alert (success)
  if(res.status === 'success'){
    this.toastrService.success(res.message,'Fresh Cart')
    this.cartService.cartNumber.next(res.numOfCartItems)
    console.log(this.cartService.cartNumber.getValue())
  
  }
  
    },
    error:(err)=>{
      console.log(err);
      this.toastrService.success
    }
  })
}
  

getWishlistData(): void {
  this.wishListService.getLoggedUserWishList().subscribe((res) => {
    this.wishlist = res.data;
    // Store the wishlist in localStorage for persistence
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  });
}
addToWishList(productId: string): void {
  if (this.isProductInWishlist(productId)) {
    this.removeFromWishlist(productId);
  } else {
    this.wishListService.addProductToWishList(productId).subscribe({
      next: (res) => {
        // Add to wishlist and update localStorage
        this.wishlist.push(productId);
        this.wishlist = [...this.wishlist]; // Force Angular to detect the change
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      },
      error: (err) => {
        console.log('Error adding to wishlist:', err);
      },
    });
  }
}
removeFromWishlist(productId: string): void {
  this.wishListService.removeSpecficWishListItem(productId).subscribe(() => {
    // Remove from wishlist and update localStorage
    this.wishlist = this.wishlist.filter((id) => id !== productId);
    this.wishlist = [...this.wishlist]; // Force Angular to detect the change
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  });
}

isProductInWishlist(productId: string): boolean {
  // Check localStorage for wishlist persistence
  const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return storedWishlist.includes(productId);
}

  




}
