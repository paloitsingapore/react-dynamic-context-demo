import React, { ReactNode, useState, useCallback, useEffect } from "react";
import {
  IComponentState,
  DynamicGroupProps,
} from "~/contexts/DynamicGroupContext";

type TGroupData = {
  [key: string]: IComponentState;
};

const createContextFactory = (defaultValue: DynamicGroupProps) => {
  const Context = React.createContext<DynamicGroupProps>(defaultValue);

  return Context;
};

interface DynamicGroupProviderProps {
  children?: ReactNode;
  data: TGroupData;
  contextId: string;
}

export const contextInstances = new Map();

const DynamicGroupProvider: React.FC<DynamicGroupProviderProps> = ({
  children,
  data: groupData,
  contextId,
}) => {
  let Context;
  const [states, setStates] = useState({});

  useEffect(() => {
    setStates(groupData);
  }, []);

  const updateState = useCallback(
    (id: string, updatedState: Record<string, any>) => {
      setStates((prevState: Record<string, any>) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          data: {
            ...prevState[id].data,
            ...updatedState,
          },
        },
      }));
    },
    [states]
  );

  if (!contextInstances.has(contextId)) {
    // No existing context, create a new one
    Context = createContextFactory({
      data: groupData,
      updateState,
    });
    contextInstances.set(contextId, Context); // Store the newly created context
  } else {
    // Retrieve the existing context
    Context = contextInstances.get(contextId);
  }

  return (
    <Context.Provider value={{ data: states, updateState }}>
      {children}
    </Context.Provider>
  );
};

export default DynamicGroupProvider;
