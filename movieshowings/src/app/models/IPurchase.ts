import { ITicket } from './ITicket';
import { IUser } from './IUser';

//purchaseID and userID in the database have the stored ticket and user info we need
export interface IPurchase {
  id?: string;
  price: number;
  tickets: ITicket[];
  owner: IUser;
}
