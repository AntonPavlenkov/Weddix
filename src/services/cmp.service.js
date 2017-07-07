const urlCmp = 'http://localhost:3003/data/cmp';
const urlPage = 'http://localhost:3003/data/pageEdit';
import axios from 'axios';

//var to allow quick access to Lorem
var loremIpsumHolder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus repellat quod, illo inventore. Possimus odit officiis ut dolore, nisi sed sunt aliquam ipsa, et eligendi dolores. Iusto hic, commodi labore.';

//these are the cmps templates, with some default data
const tmplCmps = [
    {
        type: 'SimpleText',
        data: { text1: 'Simple Text - PLACEHOLDER' },
        style: { backgroundColor: 'grey', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
    },
    {
        type: 'SimpleTitle',
        data: { text1: 'Simple Title - PLACEHOLDER' },
        style: { backgroundColor: 'grey', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
    },
    {
        type: 'LocationMap',
        data: { position: { lat: 32.087893, lng: 34.803038 }, address: { line1: 'Line1', line2: 'Line2', line3: 'Line3' } },
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
    },
    {
        type: 'ImgCarousel',
        data: {
            imgUrls: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HZTy2RjjHZcdM7yTCEfkDvwT6-GzlpA7R74GnbXkaqgfyiB5",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRI6OR4uaU5pMP5q4tVeM0UxqJYHVABP0IeVecqkUBqTxM7cV",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsadDoYifEEMztf5jeM3V0GoVTT9nu3_gCfJqFgWeoqoFcle0XA",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF6McM2IpYI2U6nn-mFORZF4FZLpZwjsuF448sbcN9PxHRwsrLpg"
            ]
        },
        style: { backgroundColor: "grey", textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
    },
    {
        type: 'CoupleAbout',
        data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'http://ira-realty.com/wp-content/uploads/2015/11/female-placeholder.png', mainImgUrl: 'http://ira-realty.com/wp-content/uploads/2015/11/female-placeholder.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'http://www.cornwallminingalliance.org/wp-content/uploads/2016/04/Placeholder-male-10.jpg' },
        style: { backgroundColor: "white", textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
    }
];



//TESTING:
// var testCmps = getCmps();
// testCmps.then(res => { console.log('inital array from db:', res) });


// **************************
//functions to work with server:
//***************************
function getCmps() {
    return axios.get(urlCmp)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//not really relevant to this app....
function getCmp(cmp) {
    return axios.get(`${urlCmp}/${cmp._id}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


function addCmp(cmpType) {
    //find a template that matches by type and send it to server
    var newCmp = tmplCmps.find(tmpl => tmpl.type === cmpType)
    return axios.post(urlCmp, newCmp)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function deleteCmp(cmp) {
    return axios.delete(`${urlCmp}/${cmp._id}`)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateCmp(cmp) {
    console.log('send update to server of:', cmp)
    return axios.put(`${urlCmp}/${cmp._id}`, cmp)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updatePage(pageEdit) {
    return axios.put(`${urlPage}/${pageEdit._id}`, pageEdit)
        .then(function (response) {
            // console.log(response.data)
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getPageEdit() {
    return axios.get(urlPage)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


//tests:
// moveCmp();

// //is up => e.g. from idx 1 to idx 2
// function moveCmp(cmp, isUp) {
//     var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id);
//     var newIdx = (isUp) ? idx + 1 : idx - 1;
//     var movedCmp = cmps.splice(idx, 1);
//     cmps.splice(newIdx, 0, movedCmp[0]);
//     return Promise.resolve();
// }

export default {
    tmplCmps,
    getCmps,
    getCmp,
    addCmp,
    deleteCmp,
    updateCmp,
    updatePage,
    getPageEdit
}

//***************************
//dev mode  (withour server):
//***************************
//default start:

// var idCounter = 3;
// var cmps = [{
//     _id: "1",
//     type: "SimpleText",
//     data: {
//         text1: "BUBU"
//     },
//     style: { backgroundColor: "grey", textAlign: "left", fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
// },
// {
//     _id: "2",
//     type: "SimpleText",
//     data: {
//         text1: "DADA"
//     },
//     style: { backgroundColor: "grey", textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'monospace', fontSize: '16px' }
// }
// ]

// //functions:
// function getCmps() {
//     var copyOfCmps = JSON.parse(JSON.stringify(cmps));
//     return Promise.resolve(copyOfCmps);
// }

// function getCmp(cmp) {
//     console.log('action not supported in dev mode')
// }

// function addCmp(cmpType) {
//     var tempCmp = tmplCmps.find(tmpl => tmpl.type === cmpType)
//     var newCmp = JSON.parse(JSON.stringify(tempCmp))
//     newCmp._id = (idCounter++) + '';
//     cmps.push(newCmp);
//     return Promise.resolve(newCmp);
// }

// function deleteCmp(cmp) {
//     var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
//     cmps.splice(idx, 1);
//     return Promise.resolve();
// }

// function updateCmp(cmp) {
//     var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id)
//     cmps.splice(idx, 1, cmp);
//     return Promise.resolve();
// }

// //TODO: this still needs to be implemented as a server function (also in the server side)
// //is up => e.g. from idx 1 to idx 2
// function moveCmp(cmp, isUp) {
//     var idx = cmps.findIndex(currCmp => currCmp._id === cmp._id);
//     var newIdx = (isUp) ? idx + 1 : idx - 1;
//     var movedCmp = cmps.splice(idx, 1);
//     cmps.splice(newIdx, 0, movedCmp[0]);
//     return Promise.resolve();
// }
