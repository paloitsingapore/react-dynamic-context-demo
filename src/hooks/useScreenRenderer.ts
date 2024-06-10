import { useContext } from "react";
import { DynamicGroupProps } from "~/contexts/DynamicGroupContext";
import { contextInstances } from "~/providers/DynamicGroupProvider";

export const useScreenRenderer = (contextId?: string): any => {
  const context = useContext(contextInstances.get(contextId));
  return context;
};
