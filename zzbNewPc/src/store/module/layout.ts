import { LayoutState } from "@/types/views/layout.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";

const state: LayoutState = {
  Routers: [], //合并后的路由
  rouls: [], //权限列表
  limit: 50, //分页设置
  payTostType: true //是否提示支付
};

// 强制使用getter获取state
const getters: GetterTree<LayoutState, any> = {
  limit: (state: LayoutState) => state.limit
};

// 更改state
const mutations: MutationTree<LayoutState> = {
  // 更新state都用该方法
  UPDATE_LAYOUY_STATE(state: any, data: any) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        return;
      }
      state[key] = data[key];
    }
  }
};

const actions: ActionTree<LayoutState, any> = {
  UPDATE_LAYOUY_STATE({ commit, state }, data: LayoutState) {
    commit("UPDATE_LAYOUY_STATE", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
