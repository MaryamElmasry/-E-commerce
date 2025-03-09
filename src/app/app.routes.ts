import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path:'',redirectTo:'home', pathMatch:'full'},
    {path:'',
        component:AuthLayoutComponent, 
       canActivate:[loggedGuard],
        children:[
        {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent) ,title:'login'},
       
        {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
        {path:'forgetPassword',loadComponent:()=>import('./pages/forgetPassword/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:'forgetPassword'}
    ]},
    {path:'',
        component:BlankLayoutComponent, 
        children:[
        // {path:'home',component:HomeComponent,title:'home'},
        {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),title:'home',canActivate:[authGuard]},
        
        
        {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'cart'},
        {path:'wishList',loadComponent:()=>import('./pages/wish-list/wish-list.component').then((c)=>c.WishListComponent),title:'wishList'},
        {path:'products',loadComponent:()=>import('./pages/product/product.component').then(e=>e.ProductComponent),title:'product'},
        {path:'brands',loadComponent:()=>import('./pages/brands/brands.component').then(e=>e.BrandsComponent),title:'brands'},
        {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then(e=>e.CategoriesComponent),title:'categories'},
        {path:'checkout/:id',loadComponent:()=>import('./pages/check-out/check-out.component').then(e=>e.CheckOutComponent),title:'checkout'},
        {path:'details/:id',loadComponent:()=>import('./pages/details/details.component').then(e=>e.DetailsComponent),title:'details'},
        { path:'brands/:id', loadComponent:()=>import('./pages/spacific-brands/spacific-brands.component').then(e=>e.SpacificBrandsComponent), title:'brands' },
        {path:'categoryDetails/:id',loadComponent:()=>import('./pages/category-details/category-details.component').then(e=>e.CategoryDetailsComponent),title:'categoryDetails'},
        // {path:'allOrders',loadComponent:()=>import('./pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent),title:'allOrders'},
    ]},
    
    {path:'**', component:NotfoundComponent}
];
