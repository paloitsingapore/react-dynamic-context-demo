export interface IComponentState {
  id: string;
  type: string;
  // contextKey: string;
  data: Record<string, any>;
}

export type TComponentStates = Record<string, IComponentState>;

export interface DynamicGroupProps {
  data: { [key: string]: IComponentState };
  updateState?: (id: string, data: { data: Record<string, any> }) => void;
}
