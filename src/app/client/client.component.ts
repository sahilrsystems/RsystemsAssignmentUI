import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../Entities/Client';
import { ClientService } from '../services/client.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  hideColumn = true;
  displayedColumns: string[] = ['id','accountID', 'name','account','createddate','actions'];
  currentDate=new Date();
  dataSource = new MatTableDataSource<Client>();
  totalItems: number = 0;
  pageSize: number = 10; 
  pageIndex: number = 0;
  selectedCellIndex: number | null = null;
  accountID:number=0;
  accounts: any[]=[];
  searchedValue:string|null=null;
 
  
  constructor(private dataService: ClientService,private accountService: AccountService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItems(this.pageIndex, this.pageSize,this.accountID); // Reload data when pagination changes
  }

  search(event: KeyboardEvent) {
    this.searchedValue=(event.target as HTMLTextAreaElement).value;
    this.loadAccounts();
  }

  loadAccounts(){
    this.accountService.getAccounts(0,25,null)
    .subscribe((data: any) =>  {
      console.log(data.accounts);
      this.accounts = data.accounts;
    }, error => {
    });
  }

  openDeleteDialog(id:number,accountID:number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteClient(id,accountID).subscribe((data:boolean) => { this.loadItems(0,25,this.accountID); },
        error => console.log(error)
       
    );
      }
    });
  }

  onCellClick(index: number): void {
    this.selectedCellIndex = index;
  }

  onEdit(element: Client): void {
    console.log('Element edited:', element);
   
    this.selectedCellIndex = null;
    this.dataService.updateClient(element).subscribe(
      (items: any) => {
        this.loadItems(this.pageIndex, this.pageSize,this.accountID)
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  onAccountChange(accountID:number){
    console.log(accountID);
    this.accountID = accountID;
   this.loadItems(this.pageIndex, this.pageSize,this.accountID)
  }

  loadItems(pageNumber:number,pageCount:number,accountID:number) {
    this.dataService.getClients(pageNumber,pageCount,accountID,this.searchedValue).subscribe(
      (items: any) => {
        console.log(items)
        this.dataSource.data = items.clients;
        this.totalItems= items.totalCount;
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

}
