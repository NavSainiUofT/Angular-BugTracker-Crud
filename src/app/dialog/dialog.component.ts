import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  bugPoints = ["1","2","3","4","5"]
  bugForm!: FormGroup;
  actionBtn : string = "Add Bug"

  constructor(private formBuilder : FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.bugForm = this.formBuilder.group({
      title : ['',Validators.required],
      priority : ['',Validators.required],
      bugPoints : ['',Validators.required],
      bugID : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Save Changes";
      this.bugForm.controls['title'].setValue(this.editData.title);
      this.bugForm.controls['priority'].setValue(this.editData.priority);
      this.bugForm.controls['bugPoints'].setValue(this.editData.bugPoints);
      this.bugForm.controls['bugID'].setValue(this.editData.bugID);
      this.bugForm.controls['description'].setValue(this.editData.description);
      this.bugForm.controls['date'].setValue(this.editData.date);
    }
  }
  addBug(){
    if(!this.editData){
      if(this.bugForm.valid){
        this.api.postBug(this.bugForm.value)
        .subscribe({
          next:(res)=>{
            alert("Bug Added!")
            this.bugForm.reset();
            this.dialogRef.close("save");
          },
          error:()=>{
            alert("Error while adding Bug :(")
          }
  
        })
      }
    }
    else{
      this.updateBug();
    }
  }

  updateBug(){
    this.api.putBug(this.bugForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Bug updated successfully!")
        this.bugForm.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("error while updating the bug");
      }
    })
  }

}
