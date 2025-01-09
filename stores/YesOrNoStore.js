import { makeAutoObservable } from "mobx";
import colors from "@/lib/colors";
import icons from "@/lib/icons";

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

  constructor() {
    makeAutoObservable(this);
  }

  setField = (key, value) => {
    this[key] = value;
  };

  toggleCategory = (category) => {
    const index = this.categories.findIndex((c) => c.name === category.name);
    if (index !== -1) {
      // Category exists, remove it
      this.categories = this.categories.filter((_, i) => i !== index);
    } else {
      // Category doesn't exist, add it
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

  save = async () => {
    this.loading = true;
    try {
      // Retrieve the existing array from localStorage
      const existingHabits =
        JSON.parse(localStorage.getItem("yesNoHabits")) || [];

      // Create a new habit object with all necessary properties
      const newHabit = {
        name: this.name,
        question: this.question,
        notes: this.notes,
        categories: this.categories,
        icon: this.selectedIcon,
        color: this.selectedColor,
        type: "yesNo",
        progress: {}, // You can initialize progress tracking here if needed
      };

      // Add the new habit to the array
      existingHabits.push(newHabit);

      // Save the updated array back to localStorage
      localStorage.setItem("yesNoHabits", JSON.stringify(existingHabits));
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export default YesOrNoStore;
