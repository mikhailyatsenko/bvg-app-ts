import { Provider } from "react-redux";
import { type ReactNode } from "react";
import { createReduxStore } from "../config/store";
import { type StateSchema } from "../config/StateSchema";

interface StoreProviderProps {
  children: ReactNode;
  initalState?: StateSchema;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, initalState }) => {
  const store = createReduxStore(initalState);
  return <Provider store={store}>{children}</Provider>;
};
