const urlCmp = 'http://localhost:3003/data/cmp';
import axios from 'axios';

var tmplCmps = [{
    type: 'SimpleText',
    data: { text_1: 'Simple Text - PLACEHOLDER' },
    style: { backgroundColor: 'grey', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
},
{
    type: 'SimpleTitle',
    data: { text_1: 'Simple Title - PLACEHOLDER' },
    style: { backgroundColor: 'grey', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
},
{
    type: 'LocationMap',
    data: { position:{ lat: 32.087893, lng: 34.803038 }, address: { line1:'Line1', line2:'Line2' ,line3:'Line3'} },
    style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
}
];

//***************************
//dev mode  (withour server):
//***************************
//default start:

var idCounter = 3;
var cmps = [{
    _id: "1",
    type: "SimpleText",
    data: {
        text_1: "BUBU"
    },
    style: { backgroundColor: "grey", textAlign: "left", fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
},
{
    _id: "2",
    type: "SimpleText",
    data: {
        text_1: "DADA"
    },
    style: { backgroundColor: "grey", textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
},
{
    _id: "3",
    type: "LocationMap",
    data: { position: { lat: 32.087893, lng: 34.803038 }, address: { line1:'Gan Hapekan', line2:'4 HaShaked St.' ,line3:'Tel Aviv'} },
    style: { backgroundColor: "white", textAlign: "left", fontWeight:"normal", color: 'black', fontFamily: 'monospace', fontSize: '16px' }
}
]

//functions:
function getCmps() {
    var copyOfCmps = JSON.parse(JSON.stringify(cmps));
    return Promise.resolve(copyOfCmps);
}

function getCmp(cmp) {
    console.log('action not supported in dev mode')
}

function addCmp(cmpType) {
    var tempCmp = tmplCmps.find(tmpl => tmpl.type === cmpType)
    var newCmp = JSON.parse(JSON.stringify(tempCmp))
    newCmp._id = (idCounter++) + '';
    cmps.push(newCmp);
    return Promise.resolve(newCmp);
}

function deleteCmp(cmp) {
    var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
    cmps.splice(idx, 1);
    return Promise.resolve();
}

function updateCmp(cmp) {
    var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
    cmps.splice(idx, 1, cmp);
    return Promise.resolve();
}

//TODO: this still needs to be implemented as a server function (also in the server side)
//is up => e.g. from idx 1 to idx 2
function moveCmp(cmp, isUp) {
    var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id);
    var newIdx = (isUp) ? idx + 1 : idx - 1;
    var movedCmp = cmps.splice(idx, 1);
    cmps.splice(newIdx, 0, movedCmp[0]);
    return Promise.resolve();
}


//TESTING:
var testCmps = getCmps();
// var newType = "SimpleText"
// addCmp(newType);
// moveCmp(cmps[1],false);

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
    updateCmp,
    moveCmp
}