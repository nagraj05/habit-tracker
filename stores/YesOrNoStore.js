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
}

export default YesOrNoStore;
