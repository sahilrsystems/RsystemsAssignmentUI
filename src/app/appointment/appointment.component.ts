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
  displayedColumns: string[] = ['id','accountID','clientName', 'appointmentStartTime','appointmentEndTime','createddate','actions'];
  currentDate=new Date();
  dataSource = new MatTableDataSource<Appointment>();
  dataSource2 = new MatTableDataSource<any>();
  totalItems: number = 0; 
  pageSize: number = 10;
  pageIndex: number = 0;
  selectedCellIndex: number = -1;
  editingIndex: number | null = null;
  editDateValue: Date = new Date();
  selectedCellType: string = "";
  editStartDateValue: Date= new Date();
  editEndDateValue: Date= new Date();
  
  constructor(private dataService: AppointmentService,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.loadItems(this.pageIndex,this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItems(this.pageIndex,this.pageSize); 
  }


  onCellClick(index: number, type: string): void {
    this.selectedCellIndex = index;
    this.selectedCellType = type;
    this.editDateValue = this.dataSource2.data[index].appointmentStartTime;
    if (type === 'start') {
      this.editStartDateValue = this.dataSource2.data[index].appointmentStartTime;
    } else if (type === 'end') {
      this.editEndDateValue = this.dataSource2.data[index].appointmentEndTime;
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  saveDate(element: any, type: string): void {
    this.dataSource.data[this.selectedCellIndex].AppointmentStartTime = this.editDateValue;
    element.AppointmentStartTime = this.editDateValue;
    if (type === 'start') {
      element.AppointmentStartTime = this.editStartDateValue;
    } else if (type === 'end') {
      element.AppointmentEndTime = this.editEndDateValue;
    }
    this.selectedCellIndex = -1;
    this.editingIndex = null;
    this.selectedCellIndex = -1;
    this.selectedCellType = "";
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

  openDeleteDialog(id:number,accountID:number): void {
    console.log(id,accountID);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteAppointment(id,accountID).subscribe((data:boolean) => { this.loadItems(0,25); },
        error => console.log(error)
       
    );
      }
    });
  }
}
