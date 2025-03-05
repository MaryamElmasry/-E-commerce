import { HttpInterceptorFn } from '@angular/common/http';

export const headerssInterceptor: HttpInterceptorFn = (req, next) => {
  //logic request --send headers

  if(localStorage.getItem('token')){
    req = req.clone({
      setHeaders:{
        token:localStorage.getItem('token')!
        
      }
    });
  }

  
  return next(req); //logic respons
};
