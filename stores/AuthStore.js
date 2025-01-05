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
  setPassword(value) {
    this.password = value;
    }
    
  signIn = async () => {
    this.loading = true;
    try {
      localStorage.setItem("user", JSON.stringify({ email: this.email }));
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}
