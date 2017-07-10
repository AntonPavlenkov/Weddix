
import Vue from 'vue'
import Vuex from 'vuex'
import cmpService from '../services/cmp.service'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    selectedCmps: null,
    tmplCmps: cmpService.tmplCmps,
    isEditMode: false,
    // pageEditObj: null,
    isAdding: false,
    isReturningUser: false
    // isLoading: true
  },
  getters: {
    //create the array that holds the cmps by the correct order, for rendreing
    cmpsToDisplay: state => {
      return state.selectedCmps;
    },
    isLoading: (state, getters) => {
      var isLoading = (!getters.cmpsToDisplay)
      return isLoading;
    }
  },
  mutations: {
    loadUser(state, { user }) {
      // console.log(user)
      state.user = user;
      state.selectedCmps = user.cmps;
      if (user.cmps.length > 0) {
        state.isReturningUser = true;
      }
      else state.isReturningUser = false;
    },
    addCmp(state, { user }) {
      state.user = user;
      state.selectedCmps = user.cmps;
      state.isReturningUser = true;
    },
    deleteCmp(state, { user }) {
      state.user = user;
      state.selectedCmps = user.cmps;
    },
    updateCmp(state, { user }) {//TODO: rename the mutation to reflect "user"
      state.user = user;
      state.selectedCmps = user.cmps;
    },
    updateUser(state, { user }) {
      state.user = user;
      console.log('user', user)
      state.selectedCmps = user.cmps;
    },
    moveCmp(state, { user }) {
      state.user = user;
      state.selectedCmps = user.cmps;
    },
    dragCmp(state, { user }) {
      state.user = user;
      state.selectedCmps = user.cmps;
    },
  },
  actions: {
    resetAll(context, payload) {
      cmpService.updateUser(payload.user)
        .then(res => {
          payload.user = res;
          payload.type = 'loadUser';
          context.commit(payload);
        })
    },
    loadUser(context, payload) {
      cmpService.getUser()
        .then(res => {
          if (res) {
            payload.user = res;
            context.commit(payload);
          }
          //if no page exists yet - create it
          else {
            let newUser = createEmptyPageObj('user' + findNextId())
            cmpService.createUser(newUser)
              .then(res => {
                payload.user = res;
                context.commit(payload);
              })
          }
        })
    },
    addCmp(context, payload) {//payload has newCmpType (string)
      //  find a template that matches by type 
      let newCmp = cmpService.tmplCmps.find(tmpl => tmpl.type === payload.newCmpType);
      console.log('newCmp', newCmp)
      let userToEdit = JSON.parse(JSON.stringify(context.state.user));
      userToEdit.cmps.push(newCmp);
      userToEdit.cmps[userToEdit.cmps.length - 1]._id = findNextId();
      console.log('user to edit', userToEdit)
      //put the new user obj on the payload
      payload.user = userToEdit;
      context.commit(payload);
      cmpService.updateUser(userToEdit)
        .then(user => {
          //do validation...
        })
    },
    deleteCmp(context, payload) {//payload has: cmp
      // splice from coppied array and send new User to service
      let userToEdit = JSON.parse(JSON.stringify(context.state.user));
      let idxToDeleteFromCmps = getCmpIdx(payload.cmp);
      userToEdit.cmps.splice(idxToDeleteFromCmps, 1);
      payload.user = userToEdit;
      context.commit(payload);
      //update cmps collection in db
      cmpService.updateUser(userToEdit)
        .then(() => {
          //do validation...
        })
    },
    updateCmp(context, payload) {//payload has: cmp
      //support frequesnt changes by updating the client and debounce calls to server
      let userToEdit = JSON.parse(JSON.stringify(context.state.user));
      var idx = getCmpIdx(payload.cmp);
      userToEdit.cmps.splice(idx, 1, payload.cmp);
      payload.user = userToEdit;
      context.commit(payload);
      debounced(userToEdit);
    },
    updateUser(context, payload) {//payload has: user
      context.commit(payload);
      debounced(payload.user);
    },
    moveCmp(context, payload) {//payload has: cmp, isUp
      //need to find the idx of the cmp in currOrder array
      var currIdx = context.state.user.cmps.findIndex(cmp => cmp._id === payload.cmp._id)
      //newIdx is the destination of the cmp
      var newIdx = (payload.isUp) ? currIdx + 1 : currIdx - 1;
      let userToEdit = JSON.parse(JSON.stringify(context.state.user));
      //swap array values:
      [userToEdit.cmps[currIdx], userToEdit.cmps[newIdx]] = [userToEdit.cmps[newIdx], userToEdit.cmps[currIdx]]
      payload.user = userToEdit;
      context.commit(payload);
      cmpService.updateUser(userToEdit)
        .then(() => {
          // do some validation....
        })
    },
    dragCmp(context, payload) {
      var newIndex = payload.newIndex;
      var oldIndex = payload.oldIndex;
      console.log('newIndex', newIndex)
      console.log('oldIndex', oldIndex)
      let userToEdit = JSON.parse(JSON.stringify(context.state.user));
      let cmps = userToEdit.cmps
      //swap the cmps:
      var draggedCmp = cmps[oldIndex];
      cmps[oldIndex] = cmps[newIndex];
      cmps[oldIndex] = draggedCmp;
      payload.user = userToEdit;
      context.commit(payload);
      cmpService.updateUser(userToEdit)
        .then(() => {
          // do some validation....
        })
    }
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

function createEmptyPageObj(userName) {
  return {
    user: userName,
    pageStyle: { backgroundColor: 'none' },
    cmps: []
  }
}

function findNextId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


//this debounce is in order to prevent heavy traffic to server 
//when there are frequent updates (e.g. color picker slider)
var debounced = _.debounce(function (user) {
  cmpService.updateUser(user)
    .then(res => {
      // console.log(res)
      // do some validation....
    })
}, 1000);

export default store;