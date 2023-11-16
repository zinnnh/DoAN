const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes/index');
const db = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const { upload } = require('./app/middleware/upload');



// Connect to DB
db.connect();
const app = express()
const port = 3000

// Use staticfolder
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));

//Use multer
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static('./src/public/images/'));

// //Use session
// app.use(session({
//   secret: 'huuzinh123', // Thay 'your-secret-key' bằng một chuỗi bất kỳ để bảo vệ session
//   resave: false,
//   saveUninitialized: false,
//   // cookie: { maxAge: 60000 }
// }));



//Template handlebars
app.engine('hbs', hbs.engine({
        extname: '.hbs',
        helpers: {
          sum: (a, b) => a + b,
        }
      }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "resources", "views",)); 

//Router
route(app);




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})