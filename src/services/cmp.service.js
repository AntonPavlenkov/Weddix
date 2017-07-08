const urlCmp = 'http://localhost:3003/data/cmp';
const urlPage = 'http://localhost:3003/data/pageEdit';
import axios from 'axios';

//var to allow quick access to Lorem string
var loremIpsumHolder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, incidunt a delectus, ut saepe accusamus assumenda optio sapiente molestiae. Labore, vel rerum delectus harum quod sint distinctio earum laborum. Illum?';

//these are the cmps templates, with some default data
const tmplCmps = [
    {
        type: 'SimpleText',
        label:'Informative Section',
        data: { 
            txtLine1: 'Come join us on our happy day',
            txtLine2: 'We\'ll meet on 7pm for light dinner' ,
            txtLine3: 'Followed by dancing into the night!',
         },
        style: { backgroundColor: 'white', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '20px' },
        cmpPreview: 'http://i.imgur.com/CzBQKi4.png'
    },
    {
        type: 'SimpleTitle',
        label:'Title (Textual)',
        data: { mainTitle: 'Gal and Guy' , subTitle:'Are getting married'},
        style: { backgroundColor: 'white', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Rouge script', fontSize: '30px' },
        cmpPreview: 'http://i.imgur.com/hPmUK91.png'
    },
    {
        type: 'LocationMap',
        label:'Location',
        data: { position: { lat: null, lng: null }, address: { line1: 'HaShaked Garden', line2: 'Egozi 4', line3: 'Ramat Gina' } },
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://i.imgur.com/owR4CHf.png'
    },
    {
        type: 'ImgCarousel',
        label:'Changing Images',
        data: {
            imgUrls: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HZTy2RjjHZcdM7yTCEfkDvwT6-GzlpA7R74GnbXkaqgfyiB5",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRI6OR4uaU5pMP5q4tVeM0UxqJYHVABP0IeVecqkUBqTxM7cV",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsadDoYifEEMztf5jeM3V0GoVTT9nu3_gCfJqFgWeoqoFcle0XA",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF6McM2IpYI2U6nn-mFORZF4FZLpZwjsuF448sbcN9PxHRwsrLpg"
            ]
        },
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://i.imgur.com/zPORY7y.png'
    },
    {
        type: 'CoupleAbout',
<<<<<<< HEAD
        data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'https://wpclipart.com/holiday/wedding/bride_groom/bride_vale_flowers.png', mainImgUrl: 'https://www.shareicon.net/download/2016/05/25/770451_people_512x512.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'http://pngimg.com/uploads/groom/groom_PNG19603.png' },
=======
        label:'Introduction',
        data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'http://ira-realty.com/wp-content/uploads/2015/11/female-placeholder.png', mainImgUrl: 'http://ira-realty.com/wp-content/uploads/2015/11/female-placeholder.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'http://www.cornwallminingalliance.org/wp-content/uploads/2016/04/Placeholder-male-10.jpg' },
>>>>>>> 32eaafdc529df41b7c4c3ecce896b9e9eedb70d8
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://i.imgur.com/z6MJtQZ.png'
    },
    {
        type: 'CountDown',
        data: { date: ''},
        style: {backgroundColor: 'white'},
        cmpPreview: 'http://i.imgur.com/rrOX6tM.png'
    },
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
        // ELAD!!!
//     cmps = bringDataFromLocal() || hardCoded;
//     var copyOfCmps = JSON.parse(JSON.stringify(cmps));
//     return Promise.resolve(copyOfCmps);
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


