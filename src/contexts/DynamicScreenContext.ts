import { createContext } from "react";

export interface DynamicScreenContextProps {
  screenState: any;
}

const DynamicScreenContext = createContext<DynamicScreenContextProps>({
  screenState: {},
});

export default DynamicScreenContext;
