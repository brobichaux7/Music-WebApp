const express = require('express');
const cors = require('cors');
const app = express();
const DB = 'Authors'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config')(DB)
require('./routes/author.routes')(app);


app.listen(8000, () => console.log("Listening at Port 8000"))