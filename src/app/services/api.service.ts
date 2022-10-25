import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
    postBug(data : any){
      return this.http.post<any>("http://localhost:3000/bugList/", data)
    }
    getBug(){
      return this.http.get<any>("http://localhost:3000/bugList/");
    }

  }

