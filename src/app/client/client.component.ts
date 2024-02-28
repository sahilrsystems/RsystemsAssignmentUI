import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../Entities/Client';
import { ClientService } from '../services/client.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  hideColumn = true;
  displayedColumns: string[] = ['id', 'name','account','createddate','actions'];
  currentDate=new Date();
  dataSource = new MatTableDataSource<Client>();
  totalItems: number = 0;
  pageSize: number = 10; 
  pageIndex: number = 0;
  selectedCellIndex: number | null = null;
  
  constructor(private dataService: ClientService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadItems(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItems(this.pageIndex, this.pageSize); // Reload data when pagination changes
  }

  openDeleteDialog(id:number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteClient(id).subscribe((data:boolean) => { this.loadItems(1,25); },
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
        this.loadItems(this.pageIndex, this.pageSize)
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  loadItems(pageNumber:number,pageCount:number) {
    this.dataService.getClients(pageNumber,pageCount).subscribe(
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
