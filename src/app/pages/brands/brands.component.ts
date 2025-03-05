import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/iBrands/i-brands';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports:[CommonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
  private readonly toastrService = inject(ToastrService);

  brands: IBrands[] = [];
  selectedBrand: IBrands | null = null;
 

  ngOnInit(): void {
    this.getBrandsData();
  
  }

  getBrandsData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  getSpacificBrandsData(brand: IBrands): void {
  
    this.selectedBrand = brand;
    console.log("Selected Brand: ", this.selectedBrand);
   
  }
  trackByIndex(index: number, item: IBrands): string {
    return item._id;  
  }
  
}
