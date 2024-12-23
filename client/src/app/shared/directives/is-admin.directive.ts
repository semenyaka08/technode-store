import {Directive, effect, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {AccountService} from '../../core/services/account.service';

@Directive({
  standalone: true,
  selector: '[appIsAdmin]'
})
export class IsAdminDirective {
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  constructor() {
    effect(() => {
      if(this.accountService.isAdmin()){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }else {
        this.viewContainerRef.clear();
      }
    });
  }

}
