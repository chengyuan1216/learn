import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
let store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    test: {
      state: {
        a: 1
      },
      getters: {
        a: state => state.a,
        count(state, getter, rootState, rootGetter) {
          return state.a * 2
        },
        rootCount(state, getter, rootState, rootGetter) {
          return rootState.count * 2
        }
      }
    },
    testNamespace: {
      namespaced: true,
      state: {
        a: 1
      },
      getters: {
        geta(state) {
          return state.a * 100
        }
      }
    }
  },
  plugins: [function(store){
    store.subscribe((mutation, state) => {
    })
  }]
})
window.store = store
export default store
