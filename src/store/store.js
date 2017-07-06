
import Vue from 'vue'
import Vuex from 'vuex'
import cmpService from '../services/cmp.service'
import _ from 'lodash'

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
      // console.log('state.selectedCmps', state.selectedCmps)
    },
    updateCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1, cmp);
      // console.log(state.selectedCmps, 'Selected comps')
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
      //support frequesnt changes by updating the client and debounce calls to server
      context.commit(payload);
      debounced(payload.cmp);
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

//this debounce is in order to prevent heavy traffic to server 
//when there are frequent updates (e.g. color picker slider)
var debounced = _.debounce(function (cmp) {
  cmpService.updateCmp(cmp)
    .then(res => {
      console.log(res)
    })
}, 1000);

export default store;