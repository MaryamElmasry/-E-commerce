import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory/icategory';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../shared/pipes/search/search.pipe";
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-details',
  imports: [FormsModule, RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly categoriesService=inject(CategoriesService)
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly  ngxSpinnerService=inject( NgxSpinnerService);
 search:string=""


  categoryId:any;
  categoryDetails:Icategory={} as Icategory;
  ngOnInit(): void {
    //paramMap btshel l tfsel 
      this.activatedRoute.paramMap.subscribe({
        next:(res)=>{ 
          this.categoryId = res.get("id");
         console.log(this.categoryId)
         this.categoriesService.getSpacificCategories(this.categoryId).subscribe({
          next:(res)=>{
            console.log(res)
          //  this.categoryDetails=res.data;
          },
        error:(err)=>{
  
        }
         })
        },
        error:(err)=>{
  console.log(err)
        }
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
    
}
