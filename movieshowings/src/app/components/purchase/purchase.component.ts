import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase-service.service';
import { ITicket } from 'src/app/models/ITicket';
import { Router } from '@angular/router';
import { IPurchase } from '../../models/IPurchase';
import { SetAndGetTicketsService } from '../../services/set-and-get-tickets.service';
import { TicketServiceService } from 'src/app/services/ticket-service.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class PurchaseComponent implements OnInit {

  selectAllTicketsState: boolean = false;
  hide: boolean = true;
  purchaseTotalAmt: number = 0;
  
  ticket: ITicket = {
    id: "",
    price: 0,
    movieTitle: "",
    genre: "",
    showTime: "",
    showTimeSlot: "",
    owner: {
      id: "",
      email: "",
      password: ""
    },
  }

  ticketsForPurchase: ITicket[] = [];

  purchase: IPurchase = {
    id: "",
    price: 0,
    tickets: [],
    owner: {
      id: "",
      email: "",
      password: ""
    },
  }

  constructor(private purchaseService: PurchaseService, private router: Router, private get: SetAndGetTicketsService, 
    private ticketService:TicketServiceService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getTheSelectedTickets();
    console.log(this.getTheSelectedTickets());
  }

  showHide(): void {
    this.hide = !this.hide;
  }
 
  getTheSelectedTickets() {
    this.ticketsForPurchase = this.get.getSelectedTickets();
    console.log(this.ticketsForPurchase);

    //add up the total to display on the page
    this.addTotal();
    console.log("Total: $" + this.purchaseTotalAmt);
  }

  addTotal() {
    var num: number = 0;
    var sum: number = 0;
    while (num < this.ticketsForPurchase.length) {
      sum += this.ticketsForPurchase[num].price;
      num++
    }
    num = parseInt((Math.round(num * 100) / 100).toFixed(2));
    this.purchaseTotalAmt =  this.purchase.price = sum;
  }

   sendPurchase() {
    this.purchase.tickets = this.ticketsForPurchase;

    this.purchase.owner.id = this.cookieService.getCookie("id");
    this.purchase.owner.email = this.cookieService.getCookie("email");
    this.purchase.owner.password = this.cookieService.getCookie("password");

    console.log(this.purchase.tickets);

    this.purchaseService.sendPurchase(this.purchase, this.purchase.owner.id)
      .subscribe((data) => {
        console.log(data);

        if(data.id){
        let id = data.id;
        let purchaseID = id.toString();
        let ownerID = this.cookieService.getCookie("id");

          for(var i = 0; i < data.tickets.length; i++){
            this.ticketService.updateTickets(data.tickets[i], purchaseID, ownerID)
        .subscribe((data) => {
          console.log(data);
        })
          }
        
      }

      })
    
    alert("Thank you for your purchase. Enjoy your movie!")


  }


}

