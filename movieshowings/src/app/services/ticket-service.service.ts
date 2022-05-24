import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITicket } from '../models/ITicket';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

const baseUrl = 'http://localhost:8080';
const route = 'tickets';


@Injectable({
  providedIn: 'root'
})


export class TicketServiceService {

  subject:Subject<ITicket[]> = new Subject<ITicket[]>();
  tickets: ITicket[] = [];
  
  constructor(private http:HttpClient, private us: UserService) { }

  getTickets(): void{
    this.http.get<ITicket[]>(`${baseUrl}/${route}/save/${this.us.user.id}`)
    .pipe(
      catchError((e)=> {
        return throwError(e);
      })
      ).subscribe((data) => {
        this.tickets = data;
        this.subject.next(data);
      });
  }


  createTickets(ticket:ITicket, id:String): Observable<ITicket> {
    return this.http.post<ITicket>("http://localhost:8080/tickets/save/" + id, JSON.stringify(ticket),
      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
    .pipe(catchError((e) => {
      return throwError(e);
    }));
  }


  updateTickets(ticket:ITicket, purchaseID:String, ownerID:String): Observable<ITicket> {
    return this.http.post<ITicket>("http://localhost:8080/tickets/update/" + purchaseID + "/" + ownerID, JSON.stringify(ticket),
     {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
    .pipe(catchError((e) => {          return throwError(e);
    }));
     }


}
