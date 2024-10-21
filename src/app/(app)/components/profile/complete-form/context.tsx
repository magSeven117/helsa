import { createContext, useContext } from "react";
import { CompleteStore, useCompleteStore } from "./state";

export const CompleteContext = createContext<CompleteStore | null>(null);

export const CompleteProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useCompleteStore();
  return <CompleteContext.Provider value={store}>{children}</CompleteContext.Provider>;
}

export const useComplete = () => useContext(CompleteContext);