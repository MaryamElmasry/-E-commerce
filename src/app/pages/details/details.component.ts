import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
//as7b l id mmn fo2 b activatedRoute
  private readonly activatedRoute=inject(ActivatedRoute)

  
  private readonly productsService=inject(ProductsService)


  productId:any;
  productDetails:Iproduct={} as Iproduct;

ngOnInit(): void {
  //paramMap btshel l tfsel 
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
       this.productId=(res.get("id"))
       console.log(this.productId)
       this.productsService.getSpecificProduct(this.productId).subscribe({
        next:(res)=>{
          console.log(res.data)
         this.productDetails=res.data;
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
}
