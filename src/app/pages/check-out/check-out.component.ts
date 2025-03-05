import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {

  private readonly formBuilder=inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly ordersService=inject(OrdersService)

checkOutform!:FormGroup
cartId:string="";

ngOnInit(): void {
    this.initForm()
    this.getCartId()
}

initForm():void{



  this.checkOutform=this.formBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required ,Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    city:[null,[Validators.required]]
  })
}

getCartId():void{
this.activatedRoute.paramMap.subscribe({
  next:(param)=>{
    this.cartId =param.get('id')!
  },
  error:(err)=>{
    console.log(err);
  }
})


}


submitForm():void{
  console.log(this.checkOutform.value)
  
  this.ordersService.checkoutPayMent(this.cartId , this.checkOutform.value).subscribe({
    next:(res)=>{
     // console.log(res)
     if(res.status ==='success'){
      open(res.session.url ,'_self')
     }
    },
    error:(err)=>{
     console.log(err)
    }
  })
}

}
