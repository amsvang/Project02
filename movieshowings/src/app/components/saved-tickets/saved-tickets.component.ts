import { ITicket } from 'src/app/models/ITicket';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { LocalStorageService} from 'src/app/services/local-storage-services.service'
import { TicketServiceService } from 'src/app/services/ticket-service.service';
import { SetAndGetTicketsService } from 'src/app/services/set-and-get-tickets.service';

// checkbox boolean interface
interface ITicketAddBool extends ITicket {
  checked: boolean;
}

@Component({
  selector: 'app-saved-tickets',
  templateUrl: './saved-tickets.component.html',
  styleUrls: ['./saved-tickets.component.css']
})
export class SavedTicketsComponent implements OnInit {

  tickets: ITicketAddBool[] = [];
  selectAllTicketsState: boolean = false;

  constructor(private router: Router, private ts: TicketServiceService, private set: SetAndGetTicketsService) { }

  ngOnInit(): void {
    this.ts.getTickets();
    this.ts.subject.subscribe((data: ITicket[]) => {
      this.tickets = data.map(item => { //array map function, returns new array because we need the checked: false (unchecked by default)
        return {...item, checked: false} //check is not a part of ITicket but we need it because of checkboxes ...item copies items (spread operator)
      });
    });

  }

  handleChecked(ticket: ITicketAddBool) {
    console.log(ticket);
    ticket.checked = !ticket.checked;
  }

  selectAllTickets() {
    this.selectAllTicketsState = !this.selectAllTicketsState;
    this.tickets.forEach(item => {
      item.checked = this.selectAllTicketsState;
    })
  }

  submitToPurchasePage() {
    const selectedTickets = this.tickets.filter(item => item.checked);
    this.set.setSelectedTickets(selectedTickets);
    this.router.navigate(["/purchase"]);
  }

}
