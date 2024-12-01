import {Component, inject} from '@angular/core';
import {MatBadge} from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadge,
    MatIcon,
    MatButton,
    MatAnchor,
    MatFormField,
    MatInput,
    MatIconButton,
    MatFormFieldModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);

  searchPhrase?: string;

  onSearchChange(): void {
    console.log(this.searchPhrase);
    if (this.searchPhrase) {
      this.router.navigate(['/products'], {queryParams: {searchPhrase: this.searchPhrase}});
     }
  }
}
