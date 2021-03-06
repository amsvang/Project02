import { Injectable } from '@angular/core';
import { ITicket } from '../interfaces/ITicket';

@Injectable({
  providedIn: 'root'
})
export class SetAndGetTickets {

  selectedTickets: ITicket[] = [];

  public setSelectedTickets(tickets: ITicket[]) {
    this.selectedTickets = tickets;
  }

  public getSelectedTickets() {
    return this.selectedTickets;
  }

}
