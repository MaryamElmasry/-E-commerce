import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Icategory } from '../../shared/interfaces/icategory/icategory';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule ,FormsModule ,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
private readonly categoriesService=inject(CategoriesService)
private readonly  ngxSpinnerService=inject( NgxSpinnerService);

private readonly cartService=inject(CartService);
private readonly toastrService=inject(ToastrService);

 
 categories:Icategory[]=[];
 //categories:WritableSignal<Icategory[]> =signal([])
 search:string=""

ngOnInit(): void {
  this.getCategoriesData()
}

getCategoriesData():void{
  this.ngxSpinnerService.show('loading-3')
  
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
    console.log(res.data);
    this.categories=res.data;

      this.ngxSpinnerService.hide('loading-3')
    },
    error:(err)=>{
      console.log(err)
      this.ngxSpinnerService.hide('loading-3')
    },
  })
}





}
