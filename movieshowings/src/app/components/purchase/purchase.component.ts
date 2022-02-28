import { Time } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { PurchaseService } from 'src/app/services/purchase-service.service';

@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  hide: boolean = true;

  showHide(): void {
    this.hide = !this.hide;
  }

    constructor() { }
    constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
  }

  userID: number = 0;
  userFirst: String = "";
  userLast: String = "";
  userEmail: String = "";
  userPassword: String = "";

  ticketMovieName: String = "";
  ticketPrice: Number = 0;
  ticketQuantity: Number = 0;
  ticketDateAndTime: Date = new Date(); //date and time of movie showing

  purchaseID: number = 0;
  purchaseTotalAmt: Number = 0;
  purchasedDate: Date = new Date(); //get current date

  //transporter = nodemailer.createTransport();

  ticketInfo = {
    movieName: "",
    pricePerTicket: 0,
    numberTickets: 0,
    showingDateAndTime: new Date()
    }



    onSubmit(): void {
        console.log(this.ticketInfo);

        //connect to purchaseService
        this.purchaseService.purchase(this.userID)
            .subscribe(data => {
                let movieName2 = "";
                let tPrice = 0;
                let tQuant = 0;
                let tDateandTime = "";
                let userID = 0;
                let purchaseID = 0;
                if (data.userID) {
                    userID = data.userID;
                }
                if (data.purchaseID) {
                purchaseID = data.purchaseID;
                }
                
                this.purchaseService.ticket = {
                    movieName: movieName2,
                    price: tPrice,
                    quantity: tQuant,
                    show_date_and_time: tDateandTime
                };
            });
    }

  //get the information from when the tickets were saved to user account
  getTicketInfoFromSaveTickets($event: any): void{
    console.log("called getTicketInfoFromSaveTickets");
    console.log($event);

    this.ticketInfo = $event;

    this.ticketMovieName = this.ticketInfo.movieName;
    this.ticketPrice = this.ticketInfo.pricePerTicket;
    this.ticketQuantity = this.ticketInfo.numberTickets;
    this.ticketDateAndTime = this.ticketInfo.showingDateAndTime;
  }

  sendPurchase(): void {
    
    this.purchaseService.purchase(this.purchaseID, this.userID);

    
    const message = {
      from: "sender@MovieTheater.com",
      to: this.userEmail,
      subject: "Purchase Confirmation",
      text: "Thank you for your purchase! A purchase of " + this.purchaseTotalAmt + " was made on " +
        this.purchasedDate + ". Enjoy your movie!",
    }

   // this.transporter.sendMail(message); //hopefully this sends email to this.userEmail


    alert("Thank you for your purchase. Enjoy your movie!")

    this.purchaseTotalAmt = 0;
    this.purchasedDate = new Date();


  }

}
