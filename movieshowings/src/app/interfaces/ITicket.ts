import { IUser } from "./IUser";


/*
Expected Ticket Object from server:

{
    id: "",
    price: {
        price: ""
        ageGroup: ""
    },
    movieName: "",
    showTimeDate: ""
    timeslot: ""
    user: {
        id: ""
        first: ""
        last: ""
        email: ""
    }
}
*/


// export interface IPrice {
//     price: string;
//     ageGroup: string;
// }

export interface ITicket {
    id: number;
    price: number;
    movieTitle: string;
    genre: string;
    releaseDate: string;
    showTimeDate: string;
    timeslot: string;
    user?: IUser;
}
