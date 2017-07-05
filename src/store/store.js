
import Vue from 'vue'
import Vuex from 'vuex'
import cmpService from '../services/cmp.service'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    selectedCmps: [],
    tmplCmps: cmpService.tmplCmps,
    isEditMode: false
  },
  mutations: {
    loadCmp(state, { cmps }) {
      state.selectedCmps = cmps;
    },
    addCmp(state, { newCmp }) {
      state.selectedCmps.push(newCmp);
    },
    deleteCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      console.log(idx)
      state.selectedCmps.splice(idx, 1);
      console.log('state.selectedCmps', state.selectedCmps)
    },
    updateCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1, cmp);
      console.log(state.selectedCmps, 'Selected comps')
    },
    moveCmp(state, { cmp, isUp }) {
      var idx = getCmpIdx(cmp);
      var newIdx = (isUp) ? idx + 1 : idx - 1;
      var movedCmp = state.selectedCmps.splice(idx, 1);
      state.selectedCmps.splice(newIdx, 0, movedCmp[0]);
    },
  },
  actions: {
    loadCmp(context, payload) {
      cmpService.getCmps()
        .then(res => {
          payload.cmps = res;
          context.commit(payload);
        })
    },
    addCmp(context, payload) {
      cmpService.addCmp(payload.newCmpType)
        .then(res => {
          payload.newCmp = res;
          context.commit(payload);
        })
    },
    deleteCmp(context, payload) {
      cmpService.deleteCmp(payload.cmp)
        .then(() => {
          context.commit(payload)
        })
    },
    updateCmp(context, payload) {
      cmpService.updateCmp(payload.cmp)
        .then(() => {
          context.commit(payload);
        })
    },
    moveCmp(context, payload) {
      cmpService.moveCmp(payload.cmp, payload.isUp)
        .then(() => {
          context.commit(payload);
        })
    }
  }
})

function getCmpIdx(cmp) {
  return store.state.selectedCmps.findIndex(currCmp => currCmp._id === cmp._id)
}

export default store;