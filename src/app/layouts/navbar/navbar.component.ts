import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  // constructor(private flowbiteService: FlowbiteService) {}

  // ngOnInit(): void {
  //   this.flowbiteService.loadFlowbite(flowbite => {
  //     // Your custom code here
  //     console.log('Flowbite loaded', flowbite);
  //   });
  // }

//@Input() isLogin:boolean=true;
private readonly cartService=inject(CartService)



private readonly authService=inject(AuthService)
private readonly myTranslateService=inject(MyTranslateService)
private readonly translateService=inject(TranslateService)

isLogin=input<boolean>(true)
isDropdownVisible = false;
countCart!:number;


ngOnInit(): void {
  this.cartService.cartNumber.subscribe({
    next:(value)=>{
      this.countCart=value

    }

  })

  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>
      this.cartService.cartNumber.next(res.numOfCartItems)
  })

}

logout():void{
  this.authService.logoutUser()
}

toggleDropdown() {
  console.log('Dropdown toggled');
  this.isDropdownVisible = !this.isDropdownVisible;
}

change(lang:string):void{
  this.myTranslateService.changeLang(lang);
}

currentLang(lang:string):boolean{
  return this.translateService.currentLang === lang
}

}
