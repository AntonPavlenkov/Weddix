
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)





const store = new Vuex.Store({
  state: {
    selectedCmps:[{name:'SimpleText', data:'BUBU'},{name:'SimpleText', data:'DADA'},{name:'SimpleText', data:'lADA'}],
    tmplCmps:[{name:'SimpleText', data:'PLACEHOLDER'},{name:'SimpleTitle', data:'PLACEHOLDER'}]
  },
  mutations: {
   addCmp(state, {newCmpName}){
      var tempCmp =  state.tmplCmps.find(cmp=>cmp.name===newCmpName)
      var newCmp = JSON.parse(JSON.stringify(tempCmp))
      console.log(newCmp,'!!!')
      state.selectedCmps.push(newCmp);
   }
  },
  actions: {
   addCmp(context, payload){
       console.log('Adding new ', payload)
       context.commit(payload)
   }
  }
})



export default store;