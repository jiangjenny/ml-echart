/**
 * 主要入口文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 定义状态state
const state = {
  ws: ''
}
const getters ={
  getStorage(state){
    //先从state里面获取用户登录信息
    if(!state.ws){
      state.ws = localStorage.getItem('ws')
    }
    return state.ws;
  }
}
const mutations = {
  // 设置localStorage
  setStorage (state,ws) {
    state.ws = ws  //将ws中传过来的账户密码存储在state中 
    localStorage.setItem('ws',ws)   //然后在存到localStorage中
  },
}
const actions = {
  setws({commit},ws){
    commit('setStorage',ws)
  }
}

// 设置暴露接口
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
