import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../Entities/Account';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  hideColumn = true;
  displayedColumns: string[] = ['id', 'name','createddate','actions'];
  currentDate=new Date();
  dataSource = new MatTableDataSource<Account>();
  totalItems: number = 0; 
  pageSize: number = 5;
  pageIndex: number = 0;
  selectedCellIndex: number | null = null;
  searchedValue:string|null=null;

  constructor(private dataService: AccountService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadItems();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItems(); // Reload data when pagination changes
  }

  onCellClick(index: number): void {
    this.selectedCellIndex = index;
  }

  search(event: KeyboardEvent) {
    this.searchedValue=(event.target as HTMLTextAreaElement).value
    this.loadItems();
  }

  onEdit(element: Account): void {
    console.log('Element edited:', element);
   
    this.selectedCellIndex = null;
    this.dataService.updateAccount(element).subscribe(
      (items: any) => {
        this.loadItems()
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  loadItems() {
    console.log(this.searchedValue);
    this.dataService.getAccounts(this.pageIndex, this.pageSize,this.searchedValue).subscribe(
      (items: any) => {
        console.log(items)
        this.dataSource.data = items.accounts;
        this.totalItems= items.totalCount;
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  openDeleteDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteAccount(id).subscribe((data:boolean) => { this.loadItems(); },
        error => console.log(error)
       
    );
      }
    });
  }
}
