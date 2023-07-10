import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';
import { FormControl } from '@angular/forms';
import { count, filter } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  FakeData = {
    posts: [
      {
        id: 1,
        title: 'json-server',
        author: 'typicode',
      },
    ],
    comments: [
      {
        id: 1,
        body: 'some comment',
        postId: 1,
      },
    ],
    profile: {
      name: 'typicode',
    },

    employees: [
      {
        firstName: 'Walilouuu',
        lastName: 'Belhan',
        email: 'walid@mail.fr',
        date: '1925-06-15T23:00:00.000Z',
        gender: '',
        education: 'Post Graduate',
        company: 'Sony',
        experience: 9,
        package: 2,
        id: 2,
      },
      {
        firstName: 'Bilou',
        lastName: 'Bilou',
        email: 'Bolbol@mail.tn',
        date: '2023-06-07T23:00:00.000Z',
        gender: '',
        education: 'Matric',
        company: 'Angular',
        experience: 5,
        package: 1352,
        id: 4,
      },
      {
        firstName: 'Wal',
        lastName: 'Belhan',
        email: 'walid@mail.fr',
        date: '1925-06-15T23:00:00.000Z',
        gender: '',
        education: 'Post Graduate',
        company: 'Sony',
        experience: 4,
        package: 2,
        id: 5,
      },
      {
        firstName: 'Islem',
        lastName: 'Hamzi',
        email: 'islem.hamzi@lulu.tn',
        date: '2023-06-08T23:00:00.000Z',
        gender: '',
        education: 'Post Graduate',
        company: 'Unity',
        experience: 3,
        package: 2000,
        id: 6,
      },
      {
        firstName: 'Timour',
        lastName: 'Spridinov',
        email: 'Timour.Spiridinov',
        date: '2002-07-03T23:00:00.000Z',
        gender: 'male',
        education: 'Post Graduate',
        company: 'T',
        experience: 3,
        package: 3900,
        id: 8,
      },
      {
        firstName: 'Dhaker',
        lastName: 'Badri',
        email: 'dhaker.badri@gmail.com',
        date: '1998-11-30T23:00:00.000Z',
        gender: '',
        education: 'Post Graduate',
        company: 'STEPS',
        experience: 0,
        package: 3000,
        id: 9,
      },
    ],
  };
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  selectedFilter: any;
  sliderValue: any;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'date',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}
  nameFilter = new FormControl('');

  filterValues = {
    firstName: '',
  };

  ngOnInit(): void {
    this.getEmployeeList();
    this.dataSource = new MatTableDataSource(this.displayedColumns);
    this.dataSource.filter = 'firstName';
    this.dataSource.filterPredicate = (data: any, filter: string): boolean =>
      data.firstName.toLowerCase().includes(filter);

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.FakeData.employees,
        datasets: [
          {
            label: 'of Years',
            data: this.FakeData.employees,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        parsing: {
          xAxisKey: 'experience',
          yAxisKey: 'package',
        },
      },
    });
  }

  applyFilter2(filterValue: any) {
    console.log({ selected: this.selectedFilter });

    filterValue = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.firstName.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  applyFilterEduc() {
    console.log(this.selectedFilter);
    const filterValue = this.selectedFilter;
    this.dataSource.filterPredicate = (data: any) => {
      return (
        data.education.toString().toLowerCase() === filterValue.toLowerCase()
      );
    };
    this.dataSource.filter = filterValue;
  }
  // applyFilterExp() {
  //   const filterValue = this.sliderValue;
  //   console.log(filterValue);
  //   this.dataSource.filterPredicate = (data: any) => {
  //     return data.experience >= filterValue;
  //   };
  //   this.dataSource.filter = filterValue.toString();
  // }
  empForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Response is not an array:', res);
          // Handle the error case or provide a default value for the data source
        }
      },
      error: console.log,
    });
  }
  // onSearchKeyUp(search: any) {
  //   console.log({ search });

  //   var currentFilter = search.target.value;
  //   this.dataSource.filter = currentFilter;

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // createFilter(input: string): (data: any, filter: string) => boolean {
  //   let filterFunction = function (data: { firstName: string; }, filter: string): boolean {
  //     let searchTerms = JSON.parse(filter);
  //     return data.firstName.trim().toLowerCase().indexOf(searchTerms.firstName) !== -1;
  //   }
  //   return filterFunction;
  // }

  // createFilter(input: any) {
  //   console.log(input);
  //   this.dataSource.filter = input.trim().toLowerCase();

  // let filterFunction = function (data: { firstName: string; }, filter: string): boolean {
  //   let searchTerms = JSON.parse(filter);
  //   return data.firstName.trim().toLowerCase().indexOf(searchTerms.firstName) !== -1;
  // }
  // return filterFunction;
  // }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
  editForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
