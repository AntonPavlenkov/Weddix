const urlCmp = 'http://localhost:3003/data/cmp';
import axios from 'axios';

var tmplCmps = [{
    type: 'SimpleText',
    data: 'Simple Text - PLACEHOLDER',
    style: { 'background-color': 'grey' }
},
{
    type: 'SimpleTitle',
    data: 'Simple Title - PLACEHOLDER',
    style: { 'background-color': 'lightblue' }
}];

//***************************
//dev mode  (withour server):
//***************************
//default start:
var cmps = [{
    _id: "1",
    type: "SimpleText",
    data: "BUBU",
    style: { backgroundColor: "grey" }
},
{
    _id: "2",
    type: "SimpleText",
    data: "DADA",
    style: { backgroundColor: "pink" }
}]

//functions:
function getCmps() {
    var copyOfCmps = JSON.parse(JSON.stringify(cmps));
    console.log('returning cmps from service', copyOfCmps)
    return copyOfCmps;
}

function getCmp(cmp) {
    console.log('action not supported in dev mode')
}

function addCmp(cmpType) {
    var tempCmp = tmplCmps.find(tmpl => tmpl.type === cmpType)
    var newCmp = JSON.parse(JSON.stringify(tempCmp))
    newCmp._id = (cmps.length+1)+'';
    cmps.push(newCmp);
    console.log('added cmp in service', cmps)
    return newCmp;
}

function deleteCmp(cmp) {
    var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
    cmps.splice(idx,1);
    console.log('delete cmp by service', cmps);
}

function updateCmp(cmp) {
     var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
     cmps.splice(idx,1,cmp);
     console.log('updated cmp by service', cmps);
}

// //TESTING:
// var testCmps = getCmps();
// var newType = "SimpleTitle"
// addCmp(newType);

// **************************
//functions to work with server:
//***************************
// function getCmps() {
//     return axios.get(urlCmp)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// function getCmp(cmp) {
//     return axios.get(`${urlCmp}/${cmp._id}`)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// function addCmp(cmp) {
//     return axios.post(urlCmp, cmp)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// function deleteCmp(cmp) {
//     return axios.delete(`${urlCmp}/${cmp._id}`)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// function updateCmp(cmp) {
//     return axios.put(`${urlCmp}/${cmp._id}`,cmp)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }


export default {
    tmplCmps,
    getCmps,
    getCmp,
    addCmp,
    deleteCmp,
    updateCmp
}