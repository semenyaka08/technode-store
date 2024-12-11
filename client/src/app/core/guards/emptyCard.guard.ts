import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CartService} from '../services/cart.service';
import {SnackbarService} from '../services/snackbar.service';

export const emptyCardGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snackService = inject(SnackbarService);

  if(!cartService.cart()?.cartItems || cartService.cart()?.cartItems.length === 0){
    snackService.error('Your cart is empty');
    router.navigateByUrl('/cart');
    return false;
  }

  return true;
};
