import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPurchase } from '../models/IPurchase';
import { ITicket } from '../models/ITicket';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

 

  //can have many tickets on diff dates part of purchase. But all have same purchase date and 1 total cost.

  /*
  getSavedTickets(){
    var savedTickets: ITicket[] = []; 
    return savedTickets = this.get.getSelectedTickets(); //not sure if we can save ITicket[] into IPurchase[]
  }
  */
  

  

  //Add total of all ticket prices inside purchases array
  addTotal(ticket: ITicket[]) {
    var num: number = 0;
    var sum: number = 0;
    while(num <= ticket.length) {
      sum += ticket[num].price;
    }
    sum = Math.round(sum * 100) / 100;
    return sum;
  }


  sendPurchase(purchase: IPurchase, id:String): Observable<IPurchase> {
    console.log("inside sendPurchase()");
    console.log(id);
    return this.http.post<IPurchase>("http://localhost:8080/purchase/" + id, JSON.stringify(purchase), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(catchError((e) => {
        return throwError(e);
      }));
    //backend will send email using info stored in db when purchase is made
  }
  

  /*
  doPurchase(purchase: IPurchase): Observable<IPurchase> {
    console.log("inside doPurchase()");
    return this.http.post<IPurchase>("http://localhost:8080/purchase/", JSON.stringify(purchase), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(catchError((e) => {
        return throwError(e);
      }));
    //backend will send email using info stored in db when purchase is made
  }
  */
  constructor(private http: HttpClient) { }
}
