import { Module } from 'vuex'

export interface AppState {
  size: string
}

let store: Module<AppState, any> = {
  namespaced: true,
  state: {
    size: 'medium'
  }
}

export default store
