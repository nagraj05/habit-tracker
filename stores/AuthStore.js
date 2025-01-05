import { makeAutoObservable } from "mobx";



export class AuthStore {
  email = "";
  password = "";
  name = "";
  error = "";
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEmail(value) {
    this.email = value;
  }
}
