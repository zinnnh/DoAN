const multer = require('multer');
const path = require('path');
 

var storage = multer.diskStorage({
    destination: function (req, file, cb ){
      if(file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"||
        file.mimetype === "image/png"){
          cb(null,'./src/public/images/');
    } else {
        cb(new Error('Not image'),false);
    }
  },
   filename: function(req,file,cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
  
});
 
 const upload = multer({ storage: storage });

 module.exports = upload;