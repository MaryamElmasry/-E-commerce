import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ForgetPasswordComponent } from './pages/forgetPassword/forget-password/forget-password.component';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';
import { SpacificBrandsComponent } from './pages/spacific-brands/spacific-brands.component';

export const routes: Routes = [
    {path:'',redirectTo:'home', pathMatch:'full'},
    {path:'',
        component:AuthLayoutComponent, 
       canActivate:[loggedGuard],
        children:[
        {path:'login',component:LoginComponent ,title:'login'},
       
        {path:'register',component:RegisterComponent,title:'register'},
        {path:'forgetPassword',component:ForgetPasswordComponent,title:'forgetPassword'}
    ]},
    {path:'',
        component:BlankLayoutComponent, 
        children:[
        // {path:'home',component:HomeComponent,title:'home'},
        {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),title:'home',canActivate:[authGuard]},
        
        
        {path:'cart',loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent),title:'cart'},
        {path:'wishList',loadComponent:()=>import('./pages/wish-list/wish-list.component').then((c)=>c.WishListComponent),title:'wishList'},
        {path:'products',component:ProductComponent,title:'product'},
        {path:'brands',component:BrandsComponent,title:'brands'},
        {path:'categories',component:CategoriesComponent,title:'categories'},
        {path:'checkout/:id',component:CheckOutComponent,title:'checkout'},
        {path:'details/:id',component:DetailsComponent,title:'details'},
        { path:'brands/:id', component: SpacificBrandsComponent, title:'brands' },
        {path:'categoryDetails/:id',component:CategoryDetailsComponent,title:'categoryDetails'},
        // {path:'allOrders',loadComponent:()=>import('./pages/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent),title:'allOrders'},
    ]},
    
    {path:'**', component:NotfoundComponent}
];
