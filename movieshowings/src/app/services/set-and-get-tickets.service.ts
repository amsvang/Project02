import { Injectable } from '@angular/core';
import { ITicket } from '../models/ITicket';

@Injectable({
  providedIn: 'root'
})
export class SetAndGetTicketsService {

  constructor() { }

  selectedTickets: ITicket[] = [];

  public setSelectedTickets(tickets: ITicket[]) {
    this.selectedTickets = tickets;
  }

  public getSelectedTickets() {
    return this.selectedTickets;
  }

} 
