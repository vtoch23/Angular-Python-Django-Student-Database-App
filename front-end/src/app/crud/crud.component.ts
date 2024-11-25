import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})


export class CrudComponent {
  StudentArray : any[] = [];
 
  name: string ="";
  address: string ="";
  fee: Number =0;
 
  currentStudentID = "";
 
  constructor(private http: HttpClient ){}

  ngOnInit() {
    this.getAllStudents();
  }
 
  saveRecords()
  {
  
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "fee" : this.fee
    };
 
    this.http.post("http://127.0.0.1:8000/student", bodyData).subscribe(()=>
    {
        this.getAllStudents();
    });
  }
 
 
  getAllStudents()
  {
    this.http.get("http://127.0.0.1:8000/student")
    .subscribe((resultData: any)=>
    {
        this.StudentArray = resultData;
        this.name = '';
        this.address = '';
        this.fee  = 0;
    });
  }
 
 
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.fee = data.fee;
   this.currentStudentID = data.id;   
  }
 
 
  UpdateRecords()
  {
    let bodyData = 
    {
      "name" : this.name,
      "address" : this.address,
      "fee" : this.fee
    };
    
    this.http.put("http://127.0.0.1:8000/student/"+ this.currentStudentID , bodyData).subscribe((resultData: any)=>
    {
      this.getAllStudents();
    });
  }


  setDelete(data: any)
  {
    this.http.delete("http://localhost:8000/student"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        this.getAllStudents();
    });
 
  }


}