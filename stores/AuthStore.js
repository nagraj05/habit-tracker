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

  setData = (key, value) => {
    this[key] = value;
  };

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

  register = async () => {
    this.loading = true;
    try {
      localStorage.setItem(
        "register",
        JSON.stringify({ email: this.email, name: this.name })
      );
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export default AuthStore;
