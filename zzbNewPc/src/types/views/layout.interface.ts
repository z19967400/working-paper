// layout.Data 参数类型
export interface LayoutData {
  pageName: string;
  fullscreenLoading: boolean;
  tags: Array<object>;
  customerVisible: boolean;
  customerVisible2: boolean;
}

// VUEX layout.State 参数类型
export interface LayoutState {
  Routers: string[];
  rouls: string[];
  limit: number;
  payTostType: boolean;
}

// GET_DATA_ASYN 接口参数类型
export interface LayoutOptions {}
