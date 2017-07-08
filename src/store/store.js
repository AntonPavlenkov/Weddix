
import Vue from 'vue'
import Vuex from 'vuex'
import cmpService from '../services/cmp.service'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    selectedCmps: null,
    tmplCmps: cmpService.tmplCmps,
    isEditMode: false,
    pageEditObj: null,
    isAdding: false,
    // isLoading: true
  },
  getters: {
    //create the array that holds the cmps by the correct order, for rendreing
    cmpsToDisplay: state => {
      if (!state.selectedCmps || !state.pageEditObj) {
        return null;
      }
      //make sure both selectedCmps and cmpsOrder are up to date
      if (state.selectedCmps.length === state.pageEditObj.cmpsOrder.length) {
        var cmpsToDisplay = [];
        state.pageEditObj.cmpsOrder.forEach(cmpId => {
          cmpsToDisplay.push(getCmpById(cmpId))
        });
        return cmpsToDisplay;
      }
    },
    isLoading: (state, getters) => {
      var isLoading = (!getters.cmpsToDisplay || state.isAdding)
      return isLoading;
    }
  },

  mutations: {
    setIsAdding(state, {isAdding}){
      console.log('set is adding')
      state.isAdding = isAdding;
    },
    loadCmp(state, { cmps }) {
      state.selectedCmps = cmps;
    },
    loadPageEditObj(state, { pageEditObj }) {
      state.pageEditObj = pageEditObj;
    },
    addCmp(state, { newCmp, newPage }) {
      state.selectedCmps.push(newCmp);
      state.pageEditObj = newPage;
    },
    deleteCmp(state, { cmp }) {
      var idxToDeleteFromCmps = getCmpIdx(cmp);
      var idxToDeleteFromOrder = state.pageEditObj.cmpsOrder.indexOf(cmp._id);
      state.selectedCmps.splice(idxToDeleteFromCmps, 1);
      state.pageEditObj.cmpsOrder.splice(idxToDeleteFromOrder, 1);
    },
    updateCmp(state, { cmp }) {
      var idx = getCmpIdx(cmp);
      state.selectedCmps.splice(idx, 1, cmp);
    },
    moveCmp(state, { cmpsOrder }) {
      state.pageEditObj.cmpsOrder = cmpsOrder
    },
  },
  actions: {
    loadCmp(context, payload) {
      cmpService.getCmps()
        .then(res => {
          console.log('loaded cmps from db:',res)
          payload.cmps = res;
          context.commit(payload);
        })
    },
    loadPageEditObj(context, payload) {
      cmpService.getPageEdit()
        .then(res => {
          console.log('loaded page from db:',res)          
          payload.pageEditObj = res[0];
          context.commit(payload);
        })
    },
    addCmp(context, payload) {
      //set "isAdding" to false to enable spinner while waiting for db
      context.commit({type:'setIsAdding', isAdding:true});
      cmpService.addCmp(payload.newCmpType)
        .then(cmp => {
          payload.newCmp = cmp;
          var pageEditCopy = Object.assign(context.state.pageEditObj);
          pageEditCopy.cmpsOrder.push(cmp._id)
          payload.newPage = pageEditCopy;
          //set "isAdding" to false to disable spinner
          context.commit({type:'setIsAdding', isAdding:false});
          //commit the new cmp as usual
          context.commit(payload);
          cmpService.updatePage(pageEditCopy)
            .then(res => {
              //do validation...
            })
        })
    },
    deleteCmp(context, payload) {
      context.commit(payload);
      //update cmps collection in db
      cmpService.deleteCmp(payload.cmp)
        .then(() => {
          //do validation...
        })
      //update page in db
      cmpService.updatePage(context.state.pageEditObj)
        .then(() => {
          //do validation...
        })
    },
    updateCmp(context, payload) {
      //support frequesnt changes by updating the client and debounce calls to server
      context.commit(payload);
      debounced(payload.cmp);
    },
    moveCmp(context, payload) {
      var order = context.state.pageEditObj.cmpsOrder.slice();
      //need to find the idx of the cmp in currOrder array
      var currIdx = order.findIndex(currId => currId === payload.cmp._id)
      //newIdx is the destination of the cmp
      var newIdx = (payload.isUp) ? currIdx + 1 : currIdx - 1;
      //swap array values:
      [order[currIdx], order[newIdx]] = [order[newIdx], order[currIdx]]
      payload.cmpsOrder = order;
      context.commit(payload);
      //pageEdit is updated with newOrder because the commit is done
      cmpService.updatePage(context.state.pageEditObj)
        .then(() => {
          // do some validation....
        })
    },
  }
})

function getCmpIdx(cmp) {
  return store.state.selectedCmps.findIndex(currCmp => currCmp._id === cmp._id)
}

function getCmpIdxNew(cmp) {
  return store.getters.cmpsToDisplay.findIndex(currCmp => currCmp._id === cmp._id)
}

function getCmpById(cmpId) {
  return store.state.selectedCmps.find(cmp => cmp._id === cmpId)
}


//this debounce is in order to prevent heavy traffic to server 
//when there are frequent updates (e.g. color picker slider)
var debounced = _.debounce(function (cmp) {
  cmpService.updateCmp(cmp)
    .then(res => {
      console.log(res)
      // do some validation....
    })
}, 1000);

export default store;