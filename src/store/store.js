
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)





const store = new Vuex.Store({
  state: {
    selectedCmps: [
      {
        _id: 1,
        type: 'SimpleText',
        data: 'BUBU',
        style: { 'background-color': 'grey' }
      },
      {
        _id: 2,
        type: 'SimpleText',
        data: 'DADA'
      },
      {
        _id: 3,
        type: 'SimpleText',
        data: 'lADA'
      }],
    tmplCmps: [
      {
        type: 'SimpleText',
        data: 'Simple Text - PLACEHOLDER',
        style: { 'background-color': 'grey' }
      },
      {
        type: 'SimpleTitle',
        data: 'Simple Title - PLACEHOLDER',
        style: { 'background-color': 'grey' }
      }]
  },
  mutations: {
    addCmp(state, { newCmpType }) {
      var tempCmp = state.tmplCmps.find(cmp => cmp.type === newCmpType)
      var newCmp = JSON.parse(JSON.stringify(tempCmp))
      console.log(newCmp, '!!!')
      state.selectedCmps.push(newCmp);
    },
    updateCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1, cmp);

    }
  },
  actions: {
    addCmp(context, payload) {
      context.commit(payload)
    },
    updateCmp(context, payload) {
      context.commit(payload);
    }
  }
})

function getCmpIdx(cmp) {
  return store.state.selectedCmps.findIndex(currCmp => currCmp._id === cmp._id)
}

export default store;