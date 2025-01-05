"use client";
import { RootStore } from "@/stores/RootStore";
import { createContext, useContext } from "react";

const storeContext = createContext(null);

export function StoreProvider({ children }) {
  const store = new RootStore();
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

export function useStore() {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
}
