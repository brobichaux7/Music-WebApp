const express = require('express');
const cors = require('cors');
const app = express();
const DB = 'music'

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config')(DB)
// require('./routes/author.routes')(app);


app.listen(8000, () => console.log("Listening at Port 8000"))