import { IndexState } from '@/types/views/index.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as IndexApi from '@/api/index'

const state: IndexState = {
  author: 'zz'
}

// 强制使用getter获取state
const getters: GetterTree<IndexState, any> = {}

// 更改state
const mutations: MutationTree<IndexState> = {
  // 更新state都用该方法
  UPDATE_INDEX_STATE(state: any, data: any) {
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        return
      }
      state[key] = data[key]
    }
  }
}

const actions: ActionTree<IndexState, any> = {
  UPDATE_STATE_ASYN({ commit }, data: IndexState) {
    commit('UPDATE_INDEX_STATE', data)
  },
  GET_DATA_ASYN() {
    // IndexApi.getData()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
