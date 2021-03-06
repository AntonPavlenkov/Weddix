import axios from 'axios';

// const urlUser = `http://localhost:${port}/data/user`;
// console.log('port in service:',port);
// const urlUser = '/data/user';


// var port = process.env.PORT || 3003;
// const urlUser = `http://localhost:${port}/data/user`;

let urlUser = 'http://localhost:3003/data/user';
if (process.env.NODE_ENV !== 'development') {
    urlUser = '/data/user';
}

//var to allow quick access to Lorem string
// var loremIpsumHolder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, incidunt a delectus, ut saepe accusamus assumenda optio sapiente molestiae. Labore, vel rerum delectus harum quod sint distinctio earum laborum. Illum?';
var loremIpsumHolder = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, incidunt a delectus';

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
        style: { background: 'none', textAlign: 'center', fontWeight: 'bold', color: 'black', fontFamily: 'Rouge script', fontSize: '36px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://imgur.com/vhSs8p2.png'
    },
    {
        type: 'SimpleTitle',
        label: 'Title (Textual)',
        data: { mainTitle: 'Gal and Guy', subTitle: 'Are getting married' },
        style: { background: 'none', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Rouge script', fontSize: '70px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/kHKSAlf.png'
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
        style: { background: 'none', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Average', fontSize: '16px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/Dz8CLuE.png'
    },
    {
        type: 'CoupleAbout',
        label: 'Introduction',
        // data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'https://wpclipart.com/holiday/wedding/bride_groom/bride_vale_flowers.png', mainImgUrl: 'https://www.shareicon.net/download/2016/05/25/770451_people_512x512.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'http://pngimg.com/uploads/groom/groom_PNG19603.png' },
        data: { aboutName1: 'Cinderella', aboutInfo1: loremIpsumHolder, aboutImgUrl1: 'https://image.flaticon.com/icons/png/128/161/161846.png', mainImgUrl: 'https://www.shareicon.net/download/2016/05/25/770451_people_512x512.png', aboutName2: 'Prince', aboutInfo2: loremIpsumHolder, aboutImgUrl2: 'https://d30y9cdsu7xlg0.cloudfront.net/png/2104-200.png' },
        style: { background: 'none', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Rouge script', fontSize: '36px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/hipydPu.png'
    },
    {
        type: 'ImgTitle',
        label: 'Image with Titles',
        // data: { name1: 'Guy', name2: 'Gal', imgUrl: 'https://lotuseventsmanagement.com/wp-content/uploads/2015/11/Wedding-Avatar2.png' },
        data: { name1: 'Guy', name2: 'Gal', imgUrl: 'https://image.freepik.com/free-vector/cartoon-wedding-card_23-2147493889.jpg' },
        shape: 'heart',
        style: { background: 'none', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Dancing Script', fontSize: '50px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/uNx3atU.png'
    },
    {
        type: 'LocationMap',
        label: 'Location',
        data: { position: { lat: 32.087893, lng: 34.803038 }, zoom: 11, address: { line1: 'HaShaked Garden', line2: 'Egozi 4', line3: 'Ramat Gina' } },
        style: { background: 'none', textAlign: 'left', fontWeight: 'normal', color: 'black', fontFamily: 'Courgette', fontSize: '18px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/YHRlnZm.png'
    },
    {
        type: 'CountDown',
        label: 'Animated Countdown',
        data: { date: '' },
        style: { background: 'none' },
        cmpPreview: 'http://i.imgur.com/Yps0Ko6.png'
    },
    {
        type: 'GiftPicker',
        label: 'Dynamic Gift Picker',
        data: { gifts: [] },
        style: { background: 'none', textAlign: 'center', fontWeight: 'normal', color: 'black', fontFamily: 'Courgette', fontSize: '16px', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
        cmpPreview: 'http://i.imgur.com/BsKbq3Q.png'
    },
];

const createUser = (user) => {
    return axios.post(urlUser, user)
        .then(response => response.data)
        .catch(error => console.log);
}

//called on page load
const getUser = () => {
    // let dataFromLocal = loadFromStorage('WeddixUser');
    // if (dataFromLocal) return Promise.resolve(dataFromLocal);
    return axios.get(urlUser)
        .then(response => {
            console.log(response)            
            //we need only the first (and only) user
            //in the future (when login will be implemented),
            //this will be replaced by a get with ID
            saveToStorage('WeddixUser', response.data[0])
            return response.data[0];
        })
        .catch(error =>{
            console.log(error)
        } );
}

const updateUser = (user) => {
    saveToStorage('WeddixUser', user)
    return axios.put(`${urlUser}/${user._id}`, user)
        .then(response => response.data)
        .catch(error => console.log);
}

const saveToStorage = (key, any) => {
    try { localStorage.setItem(key, JSON.stringify(any)) }
    catch (err) { console.error('Problem saving to storage', err) }
}

const loadFromStorage = (key) => {
    let any = null;
    try { any = JSON.parse(localStorage.getItem(key)) }
    catch (err) {
        console.warn('Removing Corrupted data from storage', err);
        localStorage.removeItem(key);
    }
    return any;
}

export default {
    tmplCmps,
    getUser,
    createUser,
    updateUser,
}





