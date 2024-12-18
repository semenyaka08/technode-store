import {Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import {Order} from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl = environment.hubUrl;
  hubConnection?: HubConnection;
  orderSignal = signal<Order | undefined>(undefined);

  createHubConnection(){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .catch(error=> {
        console.log('yo')
        console.log(error)
      })

    this.hubConnection.on("Order complete notification", (order: Order)=>{
      this.orderSignal.set(order);
    })
  }

  stopHubConnection(){
    if(this.hubConnection?.state == HubConnectionState.Connected){
      this.hubConnection.stop().catch(err=>console.log(err));
    }
  }
}
