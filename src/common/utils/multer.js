const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

module.export = {upload}