import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';
import {SnackbarService} from '../services/snackbar.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const snackService = inject(SnackbarService);

  if(accountService.isAdmin()){
    return true;
  }else {
    snackService.error("Nope");
    router.navigate(['']);
    return false;
  }
};
