import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  confirmCredentials() {
    const localStore = localStorage.getItem('token')

    if(localStore === null){
      alert("Next time. We are setting localStorage right now")

      localStorage.setItem('token', JSON.stringify(btoa('auth')))
      return false
    }else{
      localStorage.clear()
      return true
    }
  }
}
