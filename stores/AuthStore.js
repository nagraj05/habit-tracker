import axios from "axios";
import { makeAutoObservable } from "mobx";

export class AuthStore {
  email = "";
  password = "";
  name = "";
  error = "";
  loading = false;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setData = (key, value) => {
    this[key] = value;
  };

  signIn = async () => {
    this.loading = true;
    this.error = "";

    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      this.isAuthenticated = true;

      this.password = "";
      this.email = "";

      return true;
    } catch (error) {
      if (error.response) {
        this.error = error.response.data.error || "Invalid credentials";
      } else if (error.request) {
        this.error = "Network error. Please try again.";
      } else {
        this.error = "An unexpected error occurred";
      }

      return false;
    } finally {
      this.loading = false;
    }
  };

  register = async () => {
    this.loading = true;
    this.error = "";
    try {
      const response = await axios.post(
        "/api/auth/register",
        {
          email: this.email,
          password: this.password,
          name: this.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      this.email = "";
      this.password = "";
      this.name = "";

      return true;
    } catch (error) {
      if (error.response) {
        this.error = error.response.data.error || "Invalid credentials";
      } else if (error.request) {
        this.error = "Network error. Please try again.";
      } else {
        this.error = "An unexpected error occurred";
      }

      return false;
    } finally {
      this.loading = false;
    }
  };

  logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.isAuthenticated = false;
  };
}

export default AuthStore;
