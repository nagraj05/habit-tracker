import { AuthStore } from "./AuthStore";


export class RootStore { 
    constructor() {
        this.AuthStore = new AuthStore(this);
    }
}