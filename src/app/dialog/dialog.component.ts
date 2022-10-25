import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  bugPoints = ["1","2","3","4","5"]
  bugForm!: FormGroup;

  constructor(private formBuilder : FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.bugForm = this.formBuilder.group({
      title : ['',Validators.required],
      priority : ['',Validators.required],
      bugPoints : ['',Validators.required],
      bugID : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    })
  }
  addBug(){
    if(this.bugForm.valid){
      this.api.postBug(this.bugForm.value)
      .subscribe({
        next:(res)=>{
          alert("Bug Added!")
          this.bugForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          alert("Error while adding Bug :(")
        }

      })
    }
  }

}
