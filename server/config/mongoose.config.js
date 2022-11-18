const mongoose = require('mongoose');

module.exports = (DB) => {

    mongoose.connect('mongodb://localhost/' + DB)
        .then(() => console.log(`Established a connection to the ${DB} database`))
        .catch(err => console.log(`Something went wrong when connecting to ${DB} `, err));
}