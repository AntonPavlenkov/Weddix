const urlCmp = 'http://localhost:3003/data/cmp';
const urlPage = 'http://localhost:3003/data/pageEdit';
import axios from 'axios';

//var to allow quick access to Lorem string
var loremIpsumHolder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, incidunt a delectus, ut saepe accusamus assumenda optio sapiente molestiae. Labore, vel rerum delectus harum quod sint distinctio earum laborum. Illum?';

//these are the cmps templates, with some default data
const tmplCmps = [
    {
        type: 'SimpleText',
        label: 'Informative Section',
        data: {
            txtLine1: 'Come join us on our happy day',
            txtLine2: 'We\'ll meet on 7pm for light dinner',
            txtLine3: 'Followed by dancing into the night!',
        },
        style: { backgroundColor: 'white', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '20px' },
        cmpPreview: 'http://i.imgur.com/CzBQKi4.png'
    },
    {
        type: 'SimpleTitle',
        label: 'Title (Textual)',
        data: { mainTitle: 'Gal and Guy', subTitle: 'Are getting married' },
        style: { backgroundColor: 'white', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Rouge script', fontSize: '30px' },
        cmpPreview: 'http://i.imgur.com/hPmUK91.png'
    },
    {
        type: 'LocationMap',
        label: 'Location',
        data: { position: { lat: 32.087893, lng: 34.803038},zoom: 11, address: { line1: 'HaShaked Garden', line2: 'Egozi 4', line3: 'Ramat Gina' } },
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://i.imgur.com/owR4CHf.png'
    },
    {
        type: 'ImgCarousel',
        label: 'Changing Images',
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
        label: 'Introduction',
        data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'https://wpclipart.com/holiday/wedding/bride_groom/bride_vale_flowers.png', mainImgUrl: 'https://www.shareicon.net/download/2016/05/25/770451_people_512x512.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'http://pngimg.com/uploads/groom/groom_PNG19603.png' },
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://i.imgur.com/z6MJtQZ.png'
    },
    {
        type: 'ImgTitle',
        label: 'Image with Titles',
        data: { name1: 'Guy', name2: 'Gal', imgUrl: 'data:image/jpeg;base64,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' },
        shape: 'heart',
        style: { backgroundColor: 'white', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px' },
        cmpPreview: 'http://via.placeholder.com/200x150'
    },
    {
        type: 'CountDown',
        label:'Countdown',
        data: { date: '' },
        style: { backgroundColor: 'white' },
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


