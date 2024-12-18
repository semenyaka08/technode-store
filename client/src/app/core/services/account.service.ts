import {inject, Injectable, signal} from '@angular/core';
import {Address, User} from '../../shared/models/user';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {SignalrService} from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);
  signalrService = inject(SignalrService);

  currentUser = signal<User | null>(null);

  getCurrentUser(): Observable<boolean> {
    return this.httpClient.get<User>(this.apiUrl + 'account/user-info', { withCredentials: true }).pipe(
      map(data => {
        this.currentUser.set(data);
        console.log(this.currentUser());
        return true;
      }),
      catchError(() => {
        console.log("Some errors during fetching data about current user");
        return of(false);
      })
    );
  }

  login(values: any){
    let params = new HttpParams();
    params = params.append('useCookies', 'true');

    return this.httpClient.post(this.apiUrl + 'login', values, {params, withCredentials: true})
      .pipe(tap({
        next: () => this.signalrService.createHubConnection()
      }));
  }

  register(values: any){
    return this.httpClient.post(this.apiUrl + 'account/register', values);
  }

  logout(){
    return this.httpClient.post(this.apiUrl + 'account/logout', {}, {withCredentials: true}).pipe(
      tap({
        next: () => this.signalrService.stopHubConnection()
      })
    )
  }

  updateAddress(address:Address){
    return this.httpClient.post<Address>(this.apiUrl + 'account/user-address', address);
  }
}
