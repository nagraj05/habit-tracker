import { makeAutoObservable } from "mobx";
import colors from "@/lib/colors";
import icons from "@/lib/icons";
import { toast } from "sonner";
import axios from "axios";

class YesOrNoStore {
  name = "";
  question = "";
  notes = "";
  categories = [];
  selectedIcon = icons[0];
  selectedColor = colors[0];
  isColorModalOpen = false;
  isIconModalOpen = false;
  isDrawerOpen = false;
  isLoading = false;
  userEmail = "";
  error = "";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.loadUserEmail();
    }
  }

  loadUserEmail() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      this.userEmail = user.email;
    }
  }

  setField = (key, value) => {
    this[key] = value;
  };

  toggleCategory = (category) => {
    const index = this.categories.findIndex((c) => c.name === category.name);
    if (index !== -1) {
      this.categories = this.categories.filter((_, i) => i !== index);
    } else {
      this.categories = [...this.categories, category];
    }
  };

  closeDrawer = () => {
    this.isDrawerOpen = false;
  };

  closeColorModal = () => {
    this.isColorModalOpen = false;
  };

  closeIconModal = () => {
    this.isIconModalOpen = false;
  };

  saveHabit = async () => {
    this.isLoading = true;
    this.error = "";
    try {
      const habitData = {
        name: this.name,
        type: "YES_NO",
        question: this.question,
        notes: this.notes,
        iconName: this.selectedIcon.name,
        colorHex: this.selectedColor,
        categories: this.categories.map((cat) => cat.name),
        userEmail: this.userEmail,
      };

      const response = await axios.post("/api/habits", habitData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Habit created successfully!");
      return true;
    } catch (error) {
      console.log("Failed to save habit:", error);
      this.error =
        error.response?.data?.message ||
        error.message ||
        "Failed to create habit";
      toast.error(this.error);
      return false;
    } finally {
      this.isLoading = false;
    }
  };

  validate = () => {
    if (!this.name) return "Name is required";
    if (!this.question) return "Question is required";
    return null;
  };
}

export default YesOrNoStore;
