import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tips: {
      show: false,
      title: ''
    },
    /* provinceList: [], */
    loading: true,
    personalVoteCity: {},
    chartScrollHeight: 0
  },
  mutations: {
    /* changeCityData (state, data) {
      if (data) {
        state.cityData = data
        localStorage.setItem('cityData', data)
      }
    }, */
    changeTips (state, tips) {
      state.tips = tips
      setTimeout(() => {
        state.tips.show = false
      }, 1500)
    },
    selectCity (state, data) {
      state.personalVoteCity = data
    },
    chartSrollHeight (state, data) {
      state.chartScrollHeight = data
      console.log(state.chartScrollHeight)
    }
  },
  actions: {
    chageChartScroll ({ commit }, data) {
      commit('chartSrollHeight', data)
    }
  }
})
