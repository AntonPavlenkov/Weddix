const multer = require('multer')

// Configure where uploaded files are going
const uploadFolder = '/uploads';
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + uploadFolder);
	},
	filename: function (req, file, cb) {
		console.log('file', file);
		const ext = file.originalname.substr(
		 file.originalname.lastIndexOf('.'));
		 
		cb(null, file.fieldname + '-' + Date.now() + ext)
	}
})
module.exports = multer({ storage: storage })
