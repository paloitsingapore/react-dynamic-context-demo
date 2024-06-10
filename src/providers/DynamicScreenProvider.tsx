import React, { useEffect, useState } from "react";
import DynamicScreenContext from "~/contexts/DynamicScreenContext";
import DynamicGroupProvider from "~/providers/DynamicGroupProvider";
import _ from "lodash";

export interface ComponentData {
  id: string;
  type: string;
  contextKey: string;
  data: Record<string, any>;
}

interface ScreenRendererProviderProps {
  screenState: any;
  children: React.ReactNode;
}

export const withCombinedProviders =
  (providers: any) => (children: React.ReactNode) => {
    const res = providers.reduce((acc: any, curr: any) => {
      return (
        <>
          <DynamicGroupProvider
            data={curr.provider.props.data}
            contextId={curr.provider.props.contextId}
          >
            {acc}
          </DynamicGroupProvider>
        </>
      );
    }, <>{children}</>);
    return res;
  };

export const Dynamo = ({ contextPool, children }: any) => {
  return withCombinedProviders(contextPool)(children);
};

const DynamicScreenProvider: React.FC<ScreenRendererProviderProps> = ({
  screenState,
  children,
}) => {
  const [contextPool, setContextPool] = useState<any>([]);

  useEffect(() => {
    const componentGroups = _.groupBy(screenState.components, "contextKey");

    const contextProviders: any = [];
    for (let key in componentGroups) {
      const context = {
        provider: (
          <DynamicGroupProvider
            data={_.keyBy(componentGroups[key], "id")}
            contextId={key}
          />
        ),
      };

      contextProviders.push(context);
    }

    setContextPool(contextProviders);
  }, []);

  return (
    <DynamicScreenContext.Provider value={{ screenState }}>
      {contextPool.length > 0 && (
        <Dynamo contextPool={contextPool}>{children}</Dynamo>
      )}
    </DynamicScreenContext.Provider>
  );
};

export default DynamicScreenProvider;
