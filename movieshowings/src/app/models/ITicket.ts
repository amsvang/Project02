import { IUser } from "./IUser";


export interface ITicket {
  id?: string;
  price: number;
  movieTitle?: string;
  genre?: string;
  showTime: string;
  showTimeSlot: string;
  owner?: IUser;
}
