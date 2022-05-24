import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie, IMovieDetail } from 'src/app/models/imovie';
import { ITicket } from 'src/app/models/ITicket';
import { CookieService } from 'src/app/services/cookie.service';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SetAndGetTicketsService } from 'src/app/services/set-and-get-tickets.service';
import { TicketServiceService } from 'src/app/services/ticket-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, private movieService:MovieServiceService, 
    private ticketService:TicketServiceService, private get:SetAndGetTicketsService, 
    private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUpComingMovies();
  }

  upcomingMovieList: IMovie = new IMovie();
  
  inTheatersMovieList: IMovie = new IMovie();

  movie:IMovieDetail = {
    title:"",
    releaseState:"",
    image:"",
    genres:"",
  }

  ticketList: ITicket[] = [];

  ticketDays = [
    {id: 1, name: "Monday"},
    {id: 2, name: "Tuesday"},
    {id: 3, name: "Wednesday"},
    {id: 4, name: "Thursday"},
    {id: 5, name: "Friday"}
  ];

  ticketTimes = [
  {id: 1, name: "5:00PM"},
  {id: 2, name: "8:00PM"},
  {id: 3, name: "10:00PM"}
  ];

  ticketQtys = [
    {id: 1, name: "1"},
    {id: 2, name: "2"},
    {id: 3, name: "3"}
    ];

  ticketInfo = [
    this.ticketDays,
    this.ticketTimes,
    this.ticketQtys
  ];
  
  ticketTime = "";
  ticketDay = "";
  ticketQty = null;

  movieTicketDays: string[] = [];

  ticket: ITicket = {
    price: 15.99,
    movieTitle: "",
    genre: "",
    showTime:"",
    showTimeSlot:"",
    owner:{
      id: "",
      email:"",
      password:""
    },
  }

  purchaseTickets(pageMovie:IMovieDetail, ticketDay:any, ticketTime:any, ticketQty:any){}


  saveTickets(pageMovie:IMovieDetail, ticketDay: any, ticketTime: any, ticketQty:any){
    //Setting up our ticket to send back
    this.ticket.movieTitle = pageMovie.title;
    this.ticket.genre = pageMovie.genres;
    this.ticket.showTime = ticketDay.name;
    this.ticket.showTimeSlot = ticketTime.name;
 
    let id = this.cookieService.getCookie("id");

    for (let i = 0; i < ticketQty.id; i++){
    this.ticketService.createTickets(this.ticket, id)
      .subscribe((data) => {
        console.log(data);
        if(data){
          alert("Tickets have been saved");
        }
      });
    }
  }

  getMovies() {
    this.movieService.getMovies()
    .subscribe((data) => {
      this.inTheatersMovieList = data;
      this.movieTicketDays = new Array(this.inTheatersMovieList.items.length).fill("");
    })

  }

  getUpComingMovies(){
    this.movieService.getUpComingMovies()
    .subscribe((data) => {
      console.log(data);
      this.upcomingMovieList = data;
      this.movieTicketDays = new Array(this.upcomingMovieList.items.length).fill("");
    });
  }
  
  dayChanged(idx: number, event: any) {
    this.movieTicketDays[idx] = event.target.value;
  }

}
