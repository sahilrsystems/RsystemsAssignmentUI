import { Account } from "./Account";

export interface Client {
  ClientID: number;
  ClientName:string;
  AccountID: number;
  CreatedDate?: Date;
  ModifiedDate?: Date;
  AccountName:string;
}
