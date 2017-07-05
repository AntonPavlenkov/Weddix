
import Vue from 'vue'
import Vuex from 'vuex'
import cmpService from '../services/cmp.service'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    selectedCmps: [],
    tmplCmps: cmpService.tmplCmps
  },
  mutations: {
    loadCmp(state, {cmps}){
      state.selectedCmps = cmps;
    },
    addCmp(state, { newCmp }) {      
      state.selectedCmps.push(newCmp);
    },
     deleteCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1);

    },
    updateCmp(state, { cmp }) {
        console.log('CMP AT MUTATIONS',cmp)
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1, cmp);
      console.log(state.selectedCmps, 'Selected comps')
    }
  },
  actions: {
    loadCmp(context, payload) {
      payload.cmps = cmpService.getCmps()
      //need to be a promise
      console.log('payload in action:',payload)
      context.commit(payload)
    },
    addCmp(context, payload) {
      var newCmp = cmpService.addCmp(payload.newCmpType);
      //need to be a promise
      payload.newCmp = newCmp;
      console.log('payload sent from Action addCmp:',payload)
      context.commit(payload)
    },
    deleteCmp(context, payload) {
      //need to be a promise
      cmpService.deleteCmp(payload.cmp)
      context.commit(payload);
    },
    updateCmp(context, payload) {
       //need to be a promise
       console.log(payload,'update request at store from actions')
      cmpService.updateCmp(payload.cmp)
      context.commit(payload);
    },
  }
})

function getCmpIdx(cmp) {
  return store.state.selectedCmps.findIndex(currCmp => currCmp._id === cmp._id)
}

export default store;