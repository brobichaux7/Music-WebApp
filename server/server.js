const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 8000;
const DB = "music"


//----- MiddleWare -----
app.use(cors({credentials: true, origin: 'http://localhost:3000'}), express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());

//----------------------

//.env
require('dotenv').config();

//Connect to the database
require("./config/mongoose.config")(DB);

//Connect to the DB
require("./routes/music.route")(app);
require("./routes/users.route")(app);




// Start the server
app.listen(PORT, () => console.log(`The server is up and running on ${PORT}`));