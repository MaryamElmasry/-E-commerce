import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/iBrands/i-brands';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-spacific-brands',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './spacific-brands.component.html',
  styleUrls: ['./spacific-brands.component.scss']
})
export class SpacificBrandsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);  
  private readonly brandsService = inject(BrandsService); 
  
  brandId: string | null = null;
  brandDetails: IBrands | null = null;

  ngOnInit(): void {
 
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
        if (this.brandId) {
        
          this.brandsService.getBrandById(this.brandId).subscribe({
            next: (res) => {
              this.brandDetails = res.data; 
            },
            error: (err) => {
              console.error('Error fetching brand details:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error retrieving route parameters:', err);
      }
    });

  
  }
}
