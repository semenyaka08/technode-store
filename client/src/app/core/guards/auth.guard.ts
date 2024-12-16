import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  if(accountService.currentUser())
    return true
  else{
    router.navigate(['account/login'], {queryParams: {returnUrl: state.url}})

    return false;
  }
};
