import { Component } from '@angular/core';
import { Appointment } from '../Entities/Appointment';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../services/appointment.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  hideColumn = true;
  displayedColumns: string[] = ['id','clientName', 'appointmentStartTime','appointmentEndTime','createddate','actions'];
  currentDate=new Date();
  dataSource = new MatTableDataSource<Appointment>();
  dataSource2 = new MatTableDataSource<any>();
  totalItems: number = 0; 
  pageSize: number = 10;
  pageIndex: number = 0;
  selectedCellIndex: number | null = null;
  editingIndex: number | null = null;
  editDateValue: Date = new Date();
  
  constructor(private dataService: AppointmentService,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.loadItems(this.pageIndex,this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItems(this.pageIndex,this.pageSize); 
  }


  onCellClick(index: number): void {
    this.selectedCellIndex = index;
    this.editDateValue = this.dataSource2.data[index].appointmentStartTime;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  saveDate(element: Appointment): void {
    element.AppointmentStartTime = this.editDateValue;
    console.log(element.AppointmentStartTime);
    this.selectedCellIndex = -1;
    this.editingIndex = null;
    this.dataService.updateAppointment(element).subscribe(
      (items: any) => {
       location.reload();
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }

  loadItems(pageIndex:number,pageSize:number) {
    this.dataService.getItems(pageIndex,pageSize).subscribe(
      (items: any) => {
        console.log(items)
        this.dataSource.data = items.appointments;
        this.dataSource2.data = items.appointments;
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
        this.dataService.deleteAppointment(id).subscribe((data:boolean) => { this.loadItems(1,25); },
        error => console.log(error)
       
    );
      }
    });
  }
}
