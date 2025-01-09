import AuthStore from "./AuthStore";
import MeasurableStore from "./MeasurableStore";
import YesOrNoStore from "./YesOrNoStore";

export class RootStore {
  YesOrNoStore;
  AuthStore;
  MeasurableStore;
  constructor() {
    this.AuthStore = new AuthStore(this);
    this.YesOrNoStore = new YesOrNoStore(this);
    this.MeasurableStore = new MeasurableStore(this);
  }
}
